"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

const initialFields = {
  name: "",
  email: "",
  phone: "",
  message: "",
  website: "",
};

export function ContactInquiryForm() {
  const [fields, setFields] = useState(initialFields);
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setErrorMessage("");

    try {
      const name = fields.name.trim();
      const email = fields.email.trim();
      const phone = fields.phone.trim();
      const message = fields.message.trim();

      if (name.length < 2) throw new Error("INVALID_NAME");
      if (!isValidEmail(email)) throw new Error("INVALID_EMAIL");
      if (message.length < 10) throw new Error("INVALID_MESSAGE");

      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: name,
          email,
          phone: phone || undefined,
          message,
          sourceUrl: window.location.href,
          website: fields.website || undefined,
        }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.error ?? "SUBMIT_FAILED");
      }

      setFields(initialFields);
      setState("success");
    } catch (error) {
      setState("error");
      setErrorMessage(getFriendlyError(error));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre" htmlFor="contact-name">
          <input
            id="contact-name"
            name="name"
            value={fields.name}
            onChange={(event) =>
              setFields((current) => ({ ...current, name: event.target.value }))
            }
            autoComplete="name"
            required
            minLength={2}
            maxLength={80}
            className="form-input"
            placeholder="Tu nombre"
          />
        </Field>

        <Field label="Email" htmlFor="contact-email">
          <input
            id="contact-email"
            name="email"
            type="email"
            value={fields.email}
            onChange={(event) =>
              setFields((current) => ({
                ...current,
                email: event.target.value,
              }))
            }
            autoComplete="email"
            required
            maxLength={160}
            className="form-input"
            placeholder="nombre@email.com"
          />
        </Field>
      </div>

      <Field label="Teléfono opcional" htmlFor="contact-phone">
        <input
          id="contact-phone"
          name="phone"
          value={fields.phone}
          onChange={(event) =>
            setFields((current) => ({ ...current, phone: event.target.value }))
          }
          autoComplete="tel"
          maxLength={40}
          className="form-input"
          placeholder="11 1234 5678"
        />
      </Field>

      <Field label="Consulta" htmlFor="contact-message">
        <textarea
          id="contact-message"
          name="message"
          value={fields.message}
          onChange={(event) =>
            setFields((current) => ({
              ...current,
              message: event.target.value,
            }))
          }
          required
          minLength={10}
          maxLength={1200}
          rows={5}
          className="form-textarea"
          placeholder="Contanos si tenés una consulta, un pedido especial o querés recibir información comercial."
        />
      </Field>

      <input
        tabIndex={-1}
        autoComplete="off"
        value={fields.website}
        onChange={(event) =>
          setFields((current) => ({
            ...current,
            website: event.target.value,
          }))
        }
        className="hidden"
        name="website"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={state === "submitting"}
          className="button-lavender disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "submitting" ? "Enviando..." : "Enviar consulta"}
        </button>

        <div aria-live="polite">
          {state === "success" ? (
            <p className="text-sm font-bold text-boom-lavender">
              Consulta recibida. Te respondemos a la brevedad.
            </p>
          ) : null}
          {state === "error" ? (
            <p className="text-sm font-bold text-red-200">{errorMessage}</p>
          ) : null}
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.18em] text-white/58">
        {label}
      </span>
      {children}
    </label>
  );
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getFriendlyError(error: unknown) {
  const message = error instanceof Error ? error.message : "";

  if (message.includes("INVALID_NAME")) {
    return "Revisá el nombre antes de enviar.";
  }

  if (message.includes("INVALID_EMAIL")) {
    return "Necesitamos un email válido para responderte.";
  }

  if (message.includes("INVALID_MESSAGE")) {
    return "La consulta tiene que tener al menos 10 caracteres.";
  }

  if (
    message.includes("INVALID_BRAND") ||
    message.includes("ENDPOINT_NOT_CONFIGURED")
  ) {
    return "El formulario no está disponible en este momento.";
  }

  return "No pudimos enviar la consulta. Intentá nuevamente.";
}
