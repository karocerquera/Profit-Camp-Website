# Análisis de 1mpayouts.com (solo lectura, 21/10/2026, 15:59–16:00 hora de Nueva York)

Método: Playwright y curl, sin login, sin envíos, unas 3 cargas por página. "VISTO" es lo observado; "INFERIDO" es una deducción.
Las capturas con datos reales se movieron fuera del paquete, a `/workspace/Profit_private/` (no se incluyen en el zip).

## Infraestructura (VISTO)
- Next.js (App Router, Turbopack, React Server Components: peticiones `?_rsc=`) detrás de **Apache** (cabecera `server: Apache`). No es Vercel: no hay `x-vercel-cache` ni `x-nextjs-cache`.
- Todas las páginas devuelven `cache-control: private, no-cache, no-store, max-age=0, must-revalidate` y no llevan cabecera `age`. Por tanto se **renderizan en el servidor en cada petición**, sin caché ni ISR.
- Los tiempos relativos ("hace 20 horas", "Actualizado hace 20 horas") ya vienen en el HTML del servidor. No los actualiza ningún reloj del navegador.
- Durante 30 s con la página abierta: **ningún WebSocket ni polling** (solo prefetch RSC de enlaces). Animaciones activas: `pulse-dot` y `marquee` (CSS).
- Dos cargas de /, /ranking y /trader/(SLUG TRADER B) con ~1 min de diferencia dieron un HTML idéntico, porque no hubo retiros nuevos en ese tiempo. INFERIDO: un retiro aprobado aparece en la siguiente carga, ya que no hay caché.
- Las imágenes se sirven desde la propia app: `/_next/image?url=/api/files/comprobantes/<id>.png` y `/api/files/avatares/<id>.webp`. INFERIDO: el almacenamiento está detrás de su propia ruta `/api/files` (disco local o un bucket con proxy; no se ve el proveedor).

## Páginas de navegación

### /registro: "Registro público" (`analysis-registro.png`)
- Cabecera: etiqueta REGISTRO PÚBLICO · "Todos los retiros" · "576 retiros verificados · esta página suma (CIFRA)".
- Formulario de filtros (GET, al servidor): **Prop firm** (Todas, Apex Trader Funding, FTMO, Topstep, Lucid, Alpha Capital Group, Blue Guardian, Goat Funded Trader, Funded Trading Plus, Maven Trading…), **País** (Todos + 21 países con bandera), **Monto mínimo** (número), botón **Filtrar**.
- Tabla con 40 filas por página: ID | Trader (bandera + nombre, enlaza al perfil; algunos aparecen como "Trader anónimo") | Prop firm | Monto | Fecha | Estado ("Verificado").
- **Paginación** en el servidor: "Página 1 de 15 · Siguiente →" (`?p=2`). **Sin buscador de texto y sin ordenar por columnas.**
- Footer común (marca, "Los datos los suben los traders · el equipo verifica cada comprobante", copyright de la empresa, aviso de riesgo, Discord / Registro / Privacy Policy).

### /ranking: "Leaderboard" (`analysis-ranking.png`)
- Etiqueta LEADERBOARD · "AI Profit Camp Ranking" · "Ordenado por lo que cada trader ha retirado de verdad. Solo entran los retiros con comprobante revisado por el equipo: lo que está en revisión no puntúa."
- **Podio top 3** en tarjetas: posición, avatar o inicial, bandera, nombre, total, "N retiros · último <relativo>".
- Tabla del puesto 4 al 100: # | Trader | País | Retirado | Retiros | Último (relativo). Top 100 fijo, **sin filtros, sin paginación y sin ordenar**.
- Lo de "en revisión no puntúa" confirma (VISTO en el texto) que existe un estado de revisión.

### /certificados: "Comprobantes" (`analysis-certificados.png`)
- Etiqueta COMPROBANTES · "La pared de las pruebas" · "120 comprobantes de retiros verificados. Arrástralos con el mouse o el dedo, y toca cualquiera para verlo completo."
- Dos filas de tarjetas arrastrables que se mueven solas (marquee). Cada tarjeta muestra la imagen del comprobante, el nombre del trader o la prop firm y el monto. Al tocarla se abre un modal (visto en la home): monto, nombre, ID y "Ver registro verificado".
- Muestra 120 de los 576 retiros. INFERIDO: solo los que tienen imagen pública.

### /retiro/<ID> (ejemplo (ID RETIRO A)) (`analysis-retiro.png`)
- "← Volver al registro". Tarjeta: RETIRO VERIFICADO + insignia "Verificado"; monto grande en verde; "Retirado por 🇲🇽 <nombre>" (enlaza a /trader/slug) y "hace 20 horas".
- Rejilla de campos: PROP FIRM, CUENTA, FECHA DE PAGO, MÉTODO, PAÍS, ID PÚBLICO (con botón **Copiar**). Los campos vacíos se muestran como "—".
- COMPROBANTE: **imagen subida** (PNG) mostrada tal cual. En este caso es el "Payout Certificate" generado por la propia prop firm (logo de la firma, "Proudly awarded to", nombre, payout amount, QR, código, firma del CEO y fecha). **Ese diseño no lo genera AI Profit Camp Payouts: es la imagen original de la prop firm.**
- Pie: "✓ Verificado el 21 de octubre de 2026 contra el comprobante original."
- **No hay botones de descarga ni de compartir** (VISTO). Lo único compartible es la URL permanente.
- Observación: en este retiro el monto registrado ((CIFRA)) no coincide con el de la imagen ((CIFRA) que parece pertenecer a otro retiro). Puede ser un error de carga de datos.

### /trader/<slug> (ejemplo (SLUG TRADER B)) (`analysis-trader.png`)
- PERFIL PÚBLICO: avatar, bandera, nombre, @usuario, país, "Primer retiro el <fecha>", bio escrita por el trader.
- KPIs: TOTAL RETIRADO · RETIROS · CAPITAL FONDEADO · TASA DE FONDEO ("0 de 5 cuentas").
- "Prop firms que ha usado" (chips).
- "Sus retiros": línea de tiempo (monto, prop firm, fecha · ID enlazado). Todos los retiros, sin paginación.
- "Sus cuentas": tabla Prop firm | Tamaño | Comprada | Estado (p. ej. "Quemada"). INFERIDO: los traders registran sus cuentas en el panel (la contabilidad de la que habla la home).

### /login y /app
- Existen. /app redirige a /login, que tiene email + contraseña, "Olvidé mi contraseña" (/recuperar) y "¿Todavía no estás en la comunidad? Únete al Discord →". No se investigó más, por cambio de alcance.

## Cómo se construye un "comprobante" (resumen)
Es un registro de retiro con estos campos: ID público PY-XXXXXX, trader, monto, prop firm, cuenta, fecha de pago, método, país, estado y fecha de verificación, más una **imagen subida por el trader** (captura o certificado de la prop firm) que el equipo revisa a mano. No se genera ningún certificado propio en HTML ni en imagen, no hay QR propio y no hay descarga ni compartir. La "prueba" es la página permanente /retiro/ID con la insignia Verificado.

## Clasificación de secciones
Leyenda: **STATIC** = texto y diseño fijos en el código · **BACKEND** = datos de su base de datos renderizados en el servidor en cada petición (no-store, VISTO en cabeceras) · **AUTO** = se actualiza o anima en el navegador.
"VISTO" = comprobado; "INF." = inferido.

| Página | Sección | Tipo | Evidencia |
|---|---|---|---|
| Todas | Navegación, footer, aviso legal | STATIC | Idéntico en todas las páginas (VISTO) |
| Home | Ticker "EN VIVO" | BACKEND (contenido) + AUTO (desplazamiento CSS `marquee`) | Sin polling ni WS; no añade retiros sin recargar (VISTO) |
| Home | Hero "Actualizado hace X", nº traders/retiros | BACKEND | Texto relativo presente en el HTML del servidor (VISTO) |
| Home | Mapa por país | BACKEND (cifras) + AUTO (zoom/arrastre interactivo, no actualiza datos) | VISTO |
| Home | Total retirado | BACKEND + AUTO (contador animado: (CIFRA) → (CIFRA) al cargar) | VISTO |
| Home | Ranking por país | BACKEND | VISTO (HTML) |
| Home | Pulso, capital fondeado, gráficos | BACKEND | VISTO; gráficos dibujados en el servidor (INF.) |
| Home | Último retiro, promedio, mediano, máx. | BACKEND | VISTO |
| Home | Top 3 | BACKEND | VISTO |
| Home | Muro de comprobantes + modal | BACKEND + AUTO (marquee, arrastre) | VISTO (`marquee`) |
| Home | Tabla últimos retiros (6) | BACKEND | VISTO |
| Home | CTA "Entrar a mi panel" | STATIC | VISTO |
| /registro | Cabecera con totales y suma de la página | BACKEND | VISTO |
| /registro | Filtros + tabla + paginación | BACKEND (GET al servidor) | VISTO (`?p=2`, form submit) |
| /ranking | Texto de cabecera | STATIC | VISTO |
| /ranking | Podio + tabla top 100 + "último hace X" | BACKEND (relativo calculado en el servidor) | VISTO |
| /certificados | Cabecera (texto) / contador 120 | STATIC / BACKEND | VISTO |
| /certificados | Pared arrastrable + modal | BACKEND + AUTO (animación) | VISTO |
| /retiro/ID | Etiquetas de campos, texto "Verificado el… contra el comprobante original" | STATIC (plantilla) | VISTO |
| /retiro/ID | Valores, imagen, "hace X" | BACKEND | VISTO |
| /trader/slug | Plantilla (títulos KPI, "Sus retiros", "Sus cuentas") | STATIC | VISTO |
| /trader/slug | Perfil, KPIs, línea de tiempo, cuentas | BACKEND | VISTO |

Nada se actualiza solo en el navegador con datos nuevos: no hay polling ni websockets (VISTO). "AUTO" se refiere solo a animaciones e interacción. Para ver datos nuevos hay que recargar, y cada recarga pide datos frescos al servidor (no-store). Las dos cargas se hicieron con ~1 min de separación; no se repitió la comprobación con varios minutos de diferencia.
