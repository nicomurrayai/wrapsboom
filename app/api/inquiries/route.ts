import { NextRequest, NextResponse } from "next/server";

const inquiriesEndpoint = process.env.BOOM_INQUIRIES_ENDPOINT;

export async function POST(request: NextRequest) {
  if (!inquiriesEndpoint) {
    return NextResponse.json(
      { ok: false, error: "ENDPOINT_NOT_CONFIGURED" },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "INVALID_BODY" },
      { status: 400 },
    );
  }

  if (!isRecord(body)) {
    return NextResponse.json(
      { ok: false, error: "INVALID_BODY" },
      { status: 400 },
    );
  }

  const payload = {
    brandSlug: "wrapsboom",
    fullName: readString(body.fullName),
    email: readString(body.email),
    phone: readOptionalString(body.phone),
    message: readString(body.message),
    source: "wrapsboom-contact-section",
    sourceUrl: readOptionalString(body.sourceUrl),
    website: readOptionalString(body.website),
  };

  try {
    const response = await fetch(inquiriesEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const responsePayload = (await response.json().catch(() => null)) as
      | { ok?: boolean; error?: string }
      | null;

    return NextResponse.json(
      responsePayload ?? { ok: false, error: "INVALID_RESPONSE" },
      { status: response.status },
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "SUBMIT_FAILED" },
      { status: 502 },
    );
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function readOptionalString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0
    ? value
    : undefined;
}
