# Profit: landing + AI Profit Camp Payouts (rediseño de marca Salto Cuántico, v3)

Todo el copy es el original, con los datos privados sustituidos por (PLACEHOLDERS). El diseño sigue `PROPUESTA_DISENO.md`: **Dirección A "Mundo Salto Cuántico"** en la landing y **Dirección B "Cuántico Pro"** en Payouts, con la misma paleta (lima `#CAE628`, índigo `#646AC2`, periwinkle `#8DA8EC`, azul noche `#00020F`, coral `#FF5A7A`), las mismas tipografías (League Spartan, Oswald, Inter) y el mismo botón "gomita".

## Cómo abrir
Haz doble clic en `index.html` (landing) o en `payouts/index.html`. No necesita servidor; las fuentes se cargan de Google Fonts (con internet).

## Estructura
| Archivo | Qué es |
|---|---|
| `index.html` | Landing (13 bloques). Fondo del hero: `brand/escena.png`. |
| `privacy-policy/index.html` | Privacy Policy como página (también `privacy-policy.md`). |
| `assets/brand.css` | Sistema compartido: colores, tipografías, botones, tarjetas, mascota y poses, loader, olas, CTA fijo en móvil, footer y estilos "Pro". |
| `assets/brand.js` | Compartido: mascota (con parpadeo), loader, aparición al hacer scroll, contadores, CTA fijo. |
| `brand/logo.png` | Logo y mascota oficial (fondo transparente), usado en todas partes. Las poses (flotar, inclinar, pensar, rebotar, aplastar, celebrar, triste, asomarse) y los blobs de colores (rotación de tono) son CSS. |
| `payouts/index.html` | Home de AI Profit Camp Payouts. |
| `payouts/registro/index.html` | Registro público: filtros (prop firm, país, monto mínimo) + Filtrar, 40 por página, paginación (`?p=2`). |
| `payouts/ranking/index.html` | Podio top 3 + tabla desde el puesto 4 (# · Trader · País · Retirado · Retiros · Último). |
| `payouts/comprobantes/index.html` | "La pared de las pruebas" (arrastrable) + modal. |
| `payouts/retiro/index.html?id=PY-DEMO001` | Plantilla del detalle de un retiro. |
| `payouts/trader/index.html?slug=demo-trader-1` | Plantilla del perfil de un trader. |
| `payouts/data.json` | Datos de EJEMPLO (falsos): 25 traders, 60 retiros, cuentas. |
| `payouts/data.js` | Copia de `data.json` para abrir con doble clic. **Si editas `data.json`, regenera `data.js`** (mismo contenido, precedido de `window.PAYOUTS_DATA=`). En un servidor web se lee `data.json` directamente. |
| `payouts/payouts.js`, `payouts/payouts.css` | Lógica y estilos de las páginas de Payouts. |
| `payouts/_build_pages.py`, `_v3.py` | Scripts que generan los HTML (opcionales). |
| `assets/proofs/cert-1…8.webp` | Certificados reales de Karolay y su equipo (Lucid Trading), 1200 px, optimizados desde `brand/proofs/`. Se usan solo en el carrusel de pruebas de la landing. |
| `payouts/_derive_summary.py` | Recalcula `summary`/`countries` desde los retiros de `data.json` y regenera `data.js`. |
| `copywriting.md`, `payouts/copywriting.md` | Copy palabra por palabra. |
| `payouts/ANALISIS.md` | Análisis de 1mpayouts.com (anonimizado). |
| `PROPUESTA_DISENO.md` | Propuesta de diseño. |
| `_screenshots/brand-v3-*.png` | Capturas de cada página a 1440, 390 y 375 px (`-top` = primera pantalla). |

Enlaces: la navegación Inicio / Registro / Ranking / Comprobantes es igual en todas las páginas de Payouts. Cada fila de tabla abre su retiro y cada nombre abre el perfil del trader. "Únete a AI Profit Camp" lleva a `../index.html` (la landing).

## Placeholders a reemplazar
**Landing:** (FOTO MENTOR 1–2), (NOMBRE ALUMNO 1–9), (CIFRA RESULTADO), (PRECIO), (PRECIO CUOTA), (LINK DE PAGO), (VIDEO 1–9), AI Profit Camp. Mentores ya definidos: Alejandro Prieto (@alejandroprieto) y Karol Cerquera (@karolaycerquera) (sin mentor 3). Testimonios FAQ 1: Alejandro Prieto y Carol.
**Privacy / footers:** (NOMBRE EMPRESA), (NÚMERO DE REGISTRO), (DIRECCIÓN EMPRESA), (EMAIL DE CONTACTO), (DOMINIO WEB).
**Payouts (en `data.json`):** (NOMBRE TRADER n), (USUARIO TRADER n), (BIO TRADER n), (FOTO TRADER n), (CIFRA RETIRO), (CAPITAL FONDEADO), (CUENTA), (MÉTODO), (FOTO COMPROBANTE n); los IDs `PY-DEMO###` y los slugs `demo-trader-n` son ficticios. `amountValue` es un número inventado que solo sirve para ordenar y filtrar.
**Payouts (en el HTML):** (LINK LOGIN), (LINK PANEL), (LINK DISCORD), (CIFRA) y (Nº) en la cabecera de Registro, (TEXTO RETIRO NO ENCONTRADO), (TEXTO TRADER NO ENCONTRADO).
**Cifras de comunidad (Payouts):** ya no queda ninguna copiada del sitio original. Totales, conteos, promedios/mediana/máximo, países, frecuencia y "Actualizado …" se calculan desde los retiros demo de `payouts/data.json` con `python3 payouts/_derive_summary.py` (que también regenera `data.js`). Capital fondeado = $150,000. Placeholders en el copy: (TOTAL RETIRADO), (Nº RETIROS), (Nº TRADERS), (PROMEDIO), (MEDIANA), (MÁXIMO), (FRECUENCIA), (FECHA INICIO), (VARIACIÓN 30 DÍAS), (Nº CUENTAS ACTIVAS), (Nº CUENTAS COMPRADAS), (TOTAL PAÍS), (PROP FIRM 1–10).
**Datos de marca confirmados:** AI Profit Camp · solo prop firms · $150,000 fondeados · +400 operaciones · 10+ años en los mercados financieros · 2 traders gestores: Alejandro Prieto (@alejandroprieto) y Karol Cerquera (@karolaycerquera) · agente AI Trader y Calculadora Estadística IA · "No señales y no trading en vivo".

## Datos privados
Las capturas de análisis con nombres e importes reales, el `ANALISIS.md` original y el script antiguo con los nombres reales están en `/workspace/Profit_private/`, **fuera de este paquete**.
