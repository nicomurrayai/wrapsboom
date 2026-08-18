# Eliminación de la carta interna y CTA de WhatsApp

## Objetivo

Eliminar completamente la sección de carta dinámica de la landing y convertir las acciones de las categorías destacadas en accesos directos a WhatsApp.

## Comportamiento aprobado

- La sección “La carta completa / Elegí sin vueltas” y todas sus cards de producto dejan de renderizarse.
- Los tres botones “Ver opciones” abren WhatsApp al número actual de Wrap Boom.
- Los tres botones comparten el mensaje: “Hola, quiero hacer un pedido en Wrap Boom.”
- El teléfono se obtiene de los datos actuales del negocio y usa un fallback con el número publicado para evitar CTA inactivos.
- La navegación “Productos” pasa a ser un enlace directo a “Hay un Boom para cada antojo”.
- Los enlaces internos del Hero y de la introducción que apuntaban a la carta o categorías eliminadas pasan a la sección de antojos.
- Los CTA “Pedí online” conservan su destino actual en LaCarta.

## Verificación

- No quedan anchors hacia `#menu`, `#wraps`, `#combos`, `#ensaladas` o `#postres`.
- Los tres CTA generan la misma URL segura de WhatsApp.
- La landing conserva el resto de sus secciones y el formulario sin cambios.
- Lint, tipos y build de producción deben completarse correctamente.
