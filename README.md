# GUÍA DEL PROYECTO — Apuntes FyQ

Sistema unificado de apuntes de Física y Química para ESO,
publicados en HTML estático y servidos vía GitHub + jsDelivr.

Repo: `ivancrack80/apuntesfyq`
CDN: `https://cdn.jsdelivr.net/gh/ivancrack80/apuntesfyq@main`
---

## 1. Estructura del repositorio
apuntesfyq/
├── css/
│ └── gs-styles.css ← Hoja de estilos única del sistema
├── js/
│ ├── gs-core.js ← Núcleo JS común (todos los HTML)
│ 
├── pictogramas/ ← SVGs de pictogramas GHS
├── materiales/ ← Fotos del material de laboratorio
├── 2eso/
│ ├── presentacion.html ← Presentación del curso
│ ├── guia-evaluacion.html ← Guía de evaluación del curso
│ └── ud1/
│ ├── README.md ← Resumen de la unidad
│ ├── 2eso_ud1_0.html ← Portada de la unidad
│ ├── 2eso_ud1_1.html ← Punto 1
│ ├── 2eso_ud1_2.html ← Punto 2
│ └── ...
├── 3eso/
│ ├── presentacion.html
│ ├── guia-evaluacion.html
│ └── ud1/
│ ├── README.md
│ ├── 3eso_ud1_0.html
│ ├── 3eso_ud1_1.html
│ ├── 3eso_ud1_2.html
│ ├── 3eso_ud1_3.html
│ ├── 3eso_ud1_4.html
│ └── js/
│ └── ud1_02.js   <-- js individual de cada página para crear actividades con variables aleatorias
├── 4eso/
│ ├── presentacion.html
│ ├── guia-evaluacion.html
│ └── ud1/
│ └── ...
└── GUIA.md ← Este archivo


**Convenciones de nombres:**
- Carpetas de curso: `2eso/`, `3eso/`, `4eso/`.
- Carpetas de unidad: `ud1/`, `ud2/`, ...
- Archivos HTML: `{curso}_ud{N}_{M}.html`, donde `M` es el número de página
  (`0` = portada, `1..n` = apartados).
- IDs de unidad para el solucionario: `{curso}_ud{N}_{M}` (ej: `3eso_ud1_2`).
- JS específico de página: `ud{N}_{MM}.js` (ej: `ud1_02.js`).

---

## 2. Estructura fija de una unidad

Cada unidad sigue **siempre** este patrón:

| Página | Contenido |
|---|---|
| `udX_0.html` | **Portada**: gancho histórico + ruta de la unidad + debate inicial |
| `udX_1.html` | **Punto de estudio 1** + actividades |
| `udX_2.html` | **Punto de estudio 2** + actividades |
| `udX_3.html` | **Punto de estudio 3** + actividades |
| `udX_4.html` | **Punto de estudio 4** + actividades |
| (opcional) | **SdA** puede vivir en su propia página o repartirse |
| (opcional) | **Actividades finales** de la unidad |

**Orden interno de una página de punto de estudio:**
1. `<h2 class="gs-section-title">` con el número y título del apartado.
2. Explicación introductoria.
3. Bloques `.gs-box` según convenga (`.gs-comprender`, `.gs-lectura`, `.gs-ejemplo`).
4. Boards interactivos JSXGraph si procede.
5. `.gs-box.gs-aplicar` con las actividades.
6. `.sol-lock-box[data-unit="..."]`.

**Estructura de la unidad completa:**
1. **Gancho** (portada) — historia/noticia que engancha y justifica la unidad.
2. **Puntos de desarrollo** — 4 (o más) páginas con los contenidos.
3. **SdA (Situación de Aprendizaje)** — hilo conductor que recorre la unidad.
4. **Actividades finales** — repaso integrador.

---

## 3. Cabecera común de todos los HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>...</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ivancrack80/apuntesfyq@main/css/gs-styles.css">
    <script src="https://cdn.jsdelivr.net/gh/ivancrack80/apuntesfyq@main/js/gs-core.js"></script>
    <!-- Si hace falta JS propio: -->
    <!-- <script src="js/udX_YY.js"></script> -->
</head>
<body>
<div class="gs-container">
    ...
</div>
</body>
</html>

Reglas:

El sistema carga automáticamente Google Fonts, Font Awesome, MathJax 3 y JSXGraph.

gs-core.js dispara el evento gs-ready cuando todo está listo.

Los scripts locales siempre esperan a gs-ready antes de inicializar boards.


<div class="gs-container">

    <!-- 1. BARRA DE ACCESIBILIDAD (idéntica en todos) -->
    <div class="accessibility-bar">
        <div class="font-size-controls" title="Ajustar tamaño de texto">
            <span style="..."><i class="fa-solid fa-text-height"></i></span>
            <button class="font-btn" onclick="setFontSize('small')">A-</button>
            <button class="font-btn" onclick="setFontSize('normal')">A</button>
            <button class="font-btn" onclick="setFontSize('large')">A+</button>
            <button class="font-btn" onclick="setFontSize('xlarge')">A++</button>
        </div>
        <button class="dyslexia-btn" onclick="toggleDyslexiaMode()" id="dyslexiaToggleBtn">
            <i class="fa-solid fa-universal-access"></i> Lectura Fácil
        </button>
    </div>

    <!-- 2. CABECERA -->
    <header class="gs-header">
        <div class="gs-header-meta">Física y Química • X.º ESO • Unidad N</div>
        <h1 class="gs-title">Título de la página</h1>
        <div class="gs-subtitle">Subtítulo breve</div>
    </header>

    <!-- 3. CONTENIDO -->
    ...

    <!-- 4. SOLUCIONARIO -->
    <div class="sol-lock-box" data-unit="Xeso_udN_M"></div>

</div>

5. Catálogo de componentes CSS
5.1. Estructura general
.gs-container — contenedor principal de todas las páginas.

.gs-header — cabecera con título y subtítulo.

.gs-header-meta — línea pequeña superior (curso, materia, unidad).

.gs-title — título principal (<h1>).

.gs-subtitle — subtítulo bajo el título.

.gs-section-title — título de apartado (<h2>), con icono FA.

.gs-latex-container — caja para fórmulas LaTeX destacadas.

5.2. Bloques de contenido (.gs-box + modificador)
Modificador	Título interno	Uso
.gs-comprender	.gs-comprender-title	Conceptos clave, definiciones
.gs-lectura	.gs-lectura-title	Lecturas, narrativas, casos
.gs-ejemplo	.gs-ejemplo-title	Ejemplos resueltos paso a paso
.gs-aplicar	.gs-aplicar-title	Bloque de actividades
5.3. Bloques temáticos (sin .gs-box)
.gs-norma-box + variantes de color:
.gs-norma-preparacion, .gs-norma-trabajo, .gs-norma-quimicos,
.gs-norma-calor, .gs-norma-accidentes.
Título: .gs-norma-box-title.

.gs-pseudo + .gs-pseudo-title — bloque de pseudociencias (similar a norma).

5.4. Diálogos (dentro de .gs-box.gs-lectura)
html
<div class="gs-dialogo">
    <div class="gs-dialogo-linea gs-dialogo-lucia">
        <span class="gs-dialogo-nombre">Lucía:</span>
        Texto de la intervención.
    </div>
    <div class="gs-dialogo-linea gs-dialogo-diego">
        <span class="gs-dialogo-nombre">Diego:</span>
        Texto de la intervención.
    </div>
</div>
Variantes por personaje: .gs-dialogo-lucia, .gs-dialogo-diego, etc.

5.5. Flowchart (método científico)
html
<div class="gs-flowchart">
    <div class="gs-flow-step">1ª FASE: ... <small>Descripción</small></div>
    <div class="gs-flow-arrow"><i class="fa-solid fa-arrow-down"></i></div>
    <div class="gs-flow-decision">¿Pregunta?</div>
    <div class="gs-flow-branches">
        <div class="gs-flow-branch gs-flow-branch--no">...</div>
        <div class="gs-flow-branch">...</div>
    </div>
    <div class="gs-sub-branches">
        <div class="gs-sub-box">...</div>
        <div class="gs-sub-box">...</div>
    </div>
</div>
5.6. Gráficas interactivas (JSXGraph)
html
<div class="gs-visual-block">
    <div class="gs-graph-wrapper">      <!-- o --wide -->
        <div id="box_XXX" class="jxgbox"></div>
    </div>
    <div class="gs-graph-explanation">
        <h3>Título del visualizador</h3>
        <p><strong>Instrucciones:</strong> ...</p>
        <div class="gs-panel-datos">
            <div class="gs-panel-datos__fila">
                <span class="gs-panel-datos__label">Etiqueta:</span>
                <span id="panel-X" class="gs-panel-datos__valor gs-panel-datos__valor--azul">valor</span>
            </div>
            <hr class="gs-panel-datos__separador">
            ...
        </div>
    </div>
</div>
Variantes de color del valor: --azul, --rojo, --verde, --ambar.

5.7. Ejemplo con gráfica al lado
html
<div class="gs-ejemplo-flex">
    <div class="gs-ejemplo-flex__texto">
        <p>Planteamiento...</p>
        <table class="gs-tabla-datos">...</table>
        <ol>Resolución paso a paso...</ol>
    </div>
    <div class="gs-graph-wrapper" style="max-width: 340px;">
        <div id="box_ejX" class="jxgbox" style="aspect-ratio: 4/3;"></div>
    </div>
</div>
5.8. Tablas
.gs-table-wrapper > table.gs-table — tabla grande con cabecera.

.gs-tabla-datos — tabla pequeña de datos dentro de un ejemplo.

5.9. Galerías
Pictogramas: .gs-pictogramas-grid > .gs-pictograma-card
(.gs-pictograma-img, .gs-pictograma-nombre, .gs-pictograma-desc).

Materiales: .gs-material-grupo (con --calentamiento, --medida,
--soporte, --separacion, --reaccion) > .gs-material-grid >
.gs-material-card (.gs-material-img, .gs-material-nombre,
.gs-material-desc).

5.10. Índice / ruta de la unidad (portada)
html
<ul class="gs-index-list">
    <li class="gs-index-item">
        <span class="gs-index-num">1</span>
        <div class="gs-index-content">
            <span class="gs-index-name">Título del punto</span>
            <span class="gs-index-desc">Descripción breve.</span>
        </div>
    </li>
</ul>
5.11. Selector de vistas (botones conmutadores)
html
<div class="gs-selector-btns">
    <button class="gs-selector-btn active" onclick="...">Opción A</button>
    <button class="gs-selector-btn" onclick="...">Opción B</button>
</div>
5.12. Utilidades
.no-print — elemento que no se imprime.

.accessibility-bar — se elimina al generar PDF.

.sol-lock-box — se elimina al generar PDF sin soluciones.

6. API JavaScript de gs-core.js
6.1. Accesibilidad
window.setFontSize('normal'|'small'|'large'|'xlarge')

window.toggleDyslexiaMode()

6.2. Impresión (a refactorizar — ver §9)
window.generarPDFSinSolucionario() — actual.

window.generarPDF(opciones) — futuro con 4 botones.

6.3. Solucionario
window.verifySolPin() — valida el PIN contra GAS.

window.GS.verifyPinOnly(pin) — valida PIN sin pedir HTML.

6.4. Helpers (window.GS.*)
Función	Descripción
GS.setPanel(id, valor)	Asigna texto a un elemento por id
GS.num(v, dec)	Redondea a dec decimales (string)
GS.punto(x, y, dec)	Devuelve "(x, y)"
GS.vector(x, y, dec)	Devuelve "xi + yj"
GS.aNotacionCientifica(v, dec)	Notación científica tipo "3,45·10^8"
GS.redondear(v, dec)	Redondeo numérico
GS.prefijosSI	Array con los prefijos del SI
6.5. Aleatoriedad (window.GS.aleatorio.*)
entero, decimal, elemento, variosDistintos, booleano,
signo, potencia10, barajar.

6.6. Eventos
document.addEventListener('gs-ready', ...) — todo cargado.

7. Convenciones de estilo
7.1. Colores (referencia para JXGraph y CSS)
Azul primario: #1e3a8a

Azul claro: #2563eb

Rojo: #dc2626

Verde: #16a34a / #166534

Ámbar: #b45309

Gris: #94a3b8 / #cbd5e1 / #64748b

Fondo claro: #f1f5f9

7.2. Iconos Font Awesome
Siempre fa-solid. Coherentes con el contenido:

Seguridad: fa-shield-halved, fa-triangle-exclamation, fa-skull-crossbones.

Química: fa-flask, fa-flask-vial, fa-atom.

Física: fa-calculator, fa-compass-drafting, fa-arrows-to-dot.

Datos: fa-chart-line, fa-chart-simple, fa-table.

Acciones: fa-lightbulb (ejemplo), fa-pen-nib (aplicar), fa-circle-check (validación).

7.3. Idioma y tono
Español de España.

Rigor científico, pero cercano.

Uso de \text{...} en MathJax para unidades.

Vectores con \vec{F}.

Los ejemplos y problemas usan unidades SI y notación científica.

7.4. Boards JSXGraph — patrón
js
document.addEventListener('gs-ready', function () {
    const bX = JXG.JSXGraph.initBoard('box_X', {
        boundingbox: [...], axis: true, showCopyright: false
    });
    const pA = bX.create('point', [x, y], {name: 'A', color: '#1e3a8a', size: 4});
    function updateX() { GS.setPanel('panel-X', ...); }
    pA.on('drag', updateX);
    bX.on('update', updateX);
    updateX();  // llamada inicial
});
Boards del solucionario → dentro de window.initSolutionBoards(), con flag
solutionBoardsInit. Se invoca desde gs-core.js tras validar el PIN.

Convención de ids: box_elem, box_ops, box_ej1, box_graf,
box_sol_v1, box_sol_v2, ...

8. Flujo de creación de una unidad nueva
Definir los 4 puntos de estudio de la unidad.

Diseñar el gancho (portada): historia, noticia, caso, experimento mental.

Diseñar la SdA: hilo conductor que recorre los 4 puntos y desemboca en un
producto final.

Crear el README.md de la unidad con: puntos, saberes, tabla de páginas,
estado, pendientes.

Crear las páginas una a una, siguiendo el esqueleto y el catálogo de
componentes.

Crear las soluciones en HTML separado para el GAS.

Subir los recursos (imágenes, SVGs) a las carpetas correspondientes.

9. Tareas pendientes del sistema
9.1. Solucionario autogenerado desde JS (retrocompatible)
Objetivo: que los HTML solo declaren

html
<div class="sol-lock-box" data-unit="Xeso_udN_M"></div>
y gs-core.js inyecte el formulario completo.

Estado: pendiente. Mientras se migran las 20 páginas a mano, el JS
debe ser retrocompatible: si el .sol-lock-box ya tiene hijos (versión
antigua), no tocar nada; si está vacío, generar el formulario.

9.2. Cuatro modos de impresión
Sustituir generarPDFSinSolucionario() por generarPDF(opciones) con:

📄 Contenidos sin soluciones.

📄 Contenidos con soluciones (solo si se ha desbloqueado).

📝 Solo actividades sin soluciones.

📝 Solo actividades con soluciones.

El panel de botones se inyecta dentro del solucionario desbloqueado.

9.3. Arreglos menores detectados
ud1_2 tiene anidación incorrecta de tablas (un .gs-table-wrapper sin cerrar).

Homogeneizar type="number" vs type="text" inputmode="numeric" en los PIN.

Homogeneizar verifySolPin() vs window.verificarPin().

9.4. Recursos de curso pendientes
presentacion.html de cada curso (2º, 3º, 4º).

guia-evaluacion.html de cada curso.

10. Estado actual del proyecto
2º ESO
□ Presentación
□ Guía de evaluación
□ Unidades por crear
3º ESO
☑ UD1 — La Actividad Científica
☑ Portada
☑ Punto 1 — Método científico
☑ Punto 2 — Magnitudes y SI
☑ Punto 3 — Laboratorio
☑ Punto 4 — Datos y gráficas
□ SdA (en diseño — propuesta del "lago contaminado")
□ Actividades finales
□ UD2 en adelante
4º ESO
☑ UD1 — Álgebra Vectorial (parcial: al menos el punto 4)
□ Resto por confirmar
11. Cómo usar esta guía en una conversación nueva
Si en una ventana nueva del chat necesitas que el asistente retome el contexto:

Pégale este GUIA.md.

Pégale el gs-core.js actual (si ha cambiado).

Pégale el README.md de la unidad en la que estés trabajando.

Pégale un HTML de ejemplo representativo (portada + un punto + solucionario).

Con esos 4 archivos, el asistente puede continuar sin más contexto.
