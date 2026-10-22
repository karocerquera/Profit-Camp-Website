# Propuesta de rediseño visual: marca Salto Cuántico

Alcance: **solo cambia lo visual** de `index.html` (landing) y `payouts/index.html`. Todo el copy y los (PLACEHOLDERS) quedan igual.
Fuente analizada: https://seminariosaltocuantico.com/landing-copy-copy (1440 y 390) + imágenes de marca en `/workspace/Profit/brand/`.

## 1. Sistema visual actual de su página (extraído)
**Colores (estilos computados)**
| Uso | Hex |
|---|---|
| Fondo claro principal | `#FFFFFF` (también `#F2F2F8`, `#F5F5F9`) |
| Fondo oscuro de secciones | `#00020F` (azul noche) y `#000000` |
| Botón principal de compra | `#3C1682` (violeta profundo), texto blanco, radio 0 |
| Botón CTA "¡QUIERO MI CUPO!" | `#646AC2` (índigo), borde 2px blanco, radio 13px |
| Botón CTA alterno | `#8DA8EC` (periwinkle), texto negro, borde 2px `#141414`, radio 13px |
| Acento de titulares ("reales", nombres) | violeta ~`#6A3CE0` (muestreado de la captura) |
| Barra de acento | lima ~`#CAE628` |
| Texto | `#000000`, `#444444`, `#2D2D2D`, `#999999`, `#FFFFFF` |

**Tipografía:** Oswald 700 (titulares en mayúsculas, 20–48px) · League Spartan 700/800 (titulares grandes, 42px; "Resultados reales") · Arial 400/700 (cuerpo 14–19px). También se cargan Lato, Archivo Black, Orbitron, Hammersmith One y Playfair, pero apenas se usan.
**Radios:** 5px, 13px y 25px; avatares al 50%. **Sombras:** suaves (`0 0 15px 3px rgba(0,0,0,.05)`, `-4px 0 21px 3px rgba(170,170,170,.25)`). No hay glows.
**Fondos:** alterna bloques blancos y bloques azul noche con **separadores curvos** (onda negra). Fotos de estilo cyberpunk de neón (ciudad, personas, ticket VIP holográfico iridiscente).
**Animaciones:** fadeInUp, bouncySlideLeft/Up, zoomIn (entradas con rebote).
**Mascota:** pequeña, arriba (encabezado) y abajo (pie), sobre la curva.
Capturas: `_screenshots/brand-1440-sec1..3.png`, `brand-390-sec1..3.png`, `brand-*-full.png`.

**Imágenes de marca (muestreo)**
- Mascota: lima `#CAE628` / `#C4E113`, brillo `#E1F761`, sombra `#9BB51A`, contorno oscuro `#46580A`; ojos negros ovalados.
- Escena: cielo `#3F216D` → magenta `#B16290` / `#9B507F` → horizonte melocotón `#F7B28B`; pasto `#344511` / `#2A3C19`; blobs en rojo, azul, naranja, violeta, amarillo y blanco brillante; islas vóxel flotantes. (Hex medidos sobre la imagen; los tonos de los blobs varían con la luz y son aproximados.)

## 2. Mapeo de paleta (actual → nueva)
| Rol | Ahora | Propuesta |
|---|---|---|
| Fondo | `#030504` | `#00020F` azul noche (su color) con un degradado sutil a `#1A0B3D` |
| Acento principal / CTA | `#07E575` verde | **`#CAE628` lima mascota** (degradado `#E1F761`→`#CAE628`→`#9BB51A`) |
| Acento secundario | — | **`#646AC2` índigo** y `#8DA8EC` periwinkle (badges, bordes, enlaces, gráficos) |
| Profundidad / glow | glow verde | glow violeta `#3C1682`/`#3F216D` + halo lima solo en CTA y números |
| Negativo (96%, "NO", ✗) | `#EF4444` | rosa coral `#FF5A7A` (encaja con el atardecer) |
| Superficies (cards) | cristal verdoso | cristal violeta: `rgba(141,168,236,.08)` + borde `rgba(141,168,236,.22)` |
| Texto | blanco / gris | blanco / `#C9CDF5` (lavanda) / `#999` |

## 3. Tipografía
- Titulares: **League Spartan 800–900**, el "hero" de su marca (redondeada y amable, combina con los blobs).
- Eyebrows, etiquetas y botones: **Oswald 600–700** en mayúsculas (como sus CTAs).
- Cuerpo: **Inter 400/600** en lugar de Arial (más legible; mismo carácter neutro).
- Cifras (contadores, montos de payouts): League Spartan 900 con `tabular-nums`.

## 4. Formas, cards y botones
- Más redondo, para que todo se sienta "blob": radios de 24–32px en cards, 999px en botones y pills, y vídeos a 28px.
- Botón principal "ÚNETE HOY": píldora lima con **efecto 3D "gomita"** (sombra sólida inferior `0 8px 0 #6F8312` + glow lima). Al hacer hover sube; al presionar se hunde. Es un guiño al brillo de la mascota.
- Botones secundarios: índigo `#646AC2` con borde 2px blanco y radio 13px (su estilo actual), para dar continuidad.
- Cards: cristal violeta (blur 14px), borde periwinkle tenue, highlight interior arriba (`inset 0 1px 0 rgba(255,255,255,.15)`) para un acabado "glossy".
- Separadores entre secciones: **curvas/ondas** como en su página (SVG) en lugar de cortes rectos.
- Checks ✓ en lima; cruces ✗ en coral; bullets como mini-blobs de colores (rojo, azul, naranja, violeta) que rotan.

## 5. Uso de la mascota y la escena
**Assets que hacen falta:** la mascota con **fondo transparente** (PNG o WebP recortado) y 3–4 poses (saludando, señalando, celebrando, pensando). Hoy solo hay versiones sobre blanco y sobre negro; en el mockup se ve el cuadrado negro.

| Lugar | Landing | Payouts |
|---|---|---|
| Hero | Escena de fondo (atardecer + islas), oscurecida hacia `#00020F` para leer el texto; mascota flotando junto al vídeo (animación float) | Mascota pequeña junto a "AI Profit Camp Ranking"; escena difuminada solo en la franja superior |
| Separadores | Mini-blobs de colores "asomándose" por encima de las curvas entre secciones | Igual, pero más discretos |
| Stats / contadores | Al terminar el conteo, una mascota pequeña "celebra" (salto) | Total retirado: confeti de mini-blobs una sola vez |
| Testimonios | Avatares (placeholder) con anillo lima; blob-bullet de color distinto en cada card | — |
| FAQ | Mascota "pensando" junto a "¿Tienes preguntas?"; al abrir una respuesta, el ícono + rota | — |
| Estados vacíos | — | Búsqueda sin resultados: mascota triste + "Sin resultados" (texto ya existente) |
| Loader | Mascota rebotando (CSS) mientras cargan vídeos o datos | Mientras lee `data.json` |
| CTA fijo en móvil | Píldora lima con la cabeza de la mascota a la izquierda | Igual, con "Únete a AI Profit Camp →" |
| Footer | Mascota sobre la curva negra (como en su página) | Igual |

## 6. Movimiento
- Mantener: scroll-reveal, contadores, marquee de pruebas, ticker y hovers.
- Cambiar a easing "gomita": `cubic-bezier(.34,1.56,.64,1)` (rebote suave) en entradas, botones y cards (como sus bouncySlideUp/zoomIn).
- Mascota: flotación de 4s y parpadeo de ojos cada ~5s (scaleY de los óvalos).
- Parallax ligero de las islas flotantes en el hero (solo escritorio; desactivado con reduced-motion).
- Velas del hero actual → sustituir por **mini-blobs flotantes** o mantener velas con colores lima/coral (ver Dirección B).

## 7. Qué se mantiene del diseño actual
La estructura de 13 bloques, el orden, el copy y los placeholders; el modo oscuro; el glassmorphism; los contadores; el muro arrastrable con modal; la tabla con filtros, orden y paginación; el CTA fijo en móvil; el responsive sin desbordes (390/375) y `prefers-reduced-motion`.

## 8. Dos direcciones
**A: "Mundo Salto Cuántico" (lúdica, recomendada para la landing).** Escena 3D en el hero, mascota protagonista, blobs de colores en separadores y bullets, lima + violeta y botón gomita. Es la más diferenciadora y "de marca": quita la sensación de trading frío y la acerca a su comunidad.

**B: "Cuántico Pro" (sobria, recomendada para Payouts).** Fondo `#00020F` sin escena (solo un glow violeta y una cuadrícula sutil); lima solo para cifras y CTA, índigo para la UI; mascota únicamente en el logo, el loader, los estados vacíos y el footer; velas y gráficos en lima/coral. Transmite credibilidad de datos (registro público) sin perder la marca.

Combinación sugerida: **A en la landing y B en payouts**, compartiendo paleta, tipografías y botón gomita para que se sientan del mismo sitio.

## 9. Mockup
`_screenshots/proposal-hero.png`: hero de la landing con la Dirección A (escena de fondo, titular League Spartan con frase en lima, callout de cristal, vídeo con play lima y mascota). Fuente: `_screenshots/proposal-hero.html`. La mascota aparece con fondo negro porque falta la versión recortada; además, en el mockup queda cortada por el borde derecho y el botón "ÚNETE HOY" queda fuera del encuadre.
