# GUÍA DEL PROYECTO — Apuntes FyQ

Sistema unificado de apuntes de Física y Química para ESO, publicados en HTML
estático y servidos vía GitHub + jsDelivr.

- **Repo:** `ivancrack80/apuntesfyq`
- **CDN base:** `https://cdn.jsdelivr.net/gh/ivancrack80/apuntesfyq@main`

---

## 1. Estructura del repositorio

```
apuntesfyq/
├── css/
│   └── gs-styles.css              ← Hoja de estilos única del sistema
├── js/
│   └── gs-core.js                 ← Núcleo JS común (afecta a TODAS las páginas)
├── pictogramas/                   ← SVGs de pictogramas GHS
├── materiales/                    ← Fotos del material de laboratorio
├── 2eso/
│   ├── presentacion.html          ← Presentación del curso
│   ├── guia-evaluacion.html       ← Guía de evaluación del curso
│   └── ud1/
│       ├── README.md              ← Resumen de la unidad
│       ├── 2eso_ud1_0.html        ← Portada de la unidad
│       ├── 2eso_ud1_1.html        ← Punto 1
│       ├── 2eso_ud1_2.html        ← Punto 2
│       └── ...
├── 3eso/
│   ├── presentacion.html
│   ├── guia-evaluacion.html
│   └── ud1/
│       ├── README.md
│       ├── 3eso_ud1_0.html        ← Portada
│       ├── 3eso_ud1_1.html        ← Punto 1: Método científico
│       ├── 3eso_ud1_2.html        ← Punto 2: Magnitudes y SI
│       ├── 3eso_ud1_3.html        ← Punto 3: Laboratorio
│       ├── 3eso_ud1_4.html        ← Punto 4: Datos y gráficas
│       ├── 3eso_ud1_sda.html      ← Situación de Aprendizaje
│       └── js/
│           └── ud1_02.js          ← JS local (solo afecta a ud1_2)
├── 4eso/
│   ├── presentacion.html
│   ├── guia-evaluacion.html
│   └── ud1/
│       └── ...
└── GUIA.md                        ← Este archivo
```

### Convenciones de nombres

- **Carpetas de curso:** `2eso/`, `3eso/`, `4eso/`.
- **Carpetas de unidad:** `ud1/`, `ud2/`, ...
- **Archivos HTML:** `{curso}_ud{N}_{M}.html`, donde `M` es el número de
  página (`0` = portada, `1..n` = apartados, `sda` = situación de aprendizaje).
- **IDs de unidad para el solucionario:** `{curso}_ud{N}_{M}` (ej: `3eso_ud1_2`).
- **JS local de una página:** dentro de `ud{N}/js/`, con nombre `ud{N}_{MM}.js`
  (ej: `ud1/js/ud1_02.js`).

### Diferencia entre `js/gs-core.js` y `udN/js/udX_YY.js`

| Archivo | Ubicación | Alcance | Función |
|---|---|---|---|
| `gs-core.js` | `js/` (raíz) | **Todas** las páginas | Accesibilidad, MathJax, JSXGraph, solucionario, PDF, helpers globales (`window.GS`) |
| `udX_YY.js` | `udN/js/` | **Solo una página** | Generación de actividades aleatorias, lógica específica de esa página |

Los HTML cargan primero `gs-core.js` y, si procede, también su JS local:

```html
<script src="https://cdn.jsdelivr.net/gh/ivancrack80/apuntesfyq@main/js/gs-core.js"></script>
<script src="js/ud1_02.js"></script>  <!-- solo si hace falta -->
```

---

## 2. Estructura fija de una unidad

Cada unidad sigue **siempre** este patrón:

| Página | Contenido |
|---|---|
| `udX_0.html` | **Portada**: gancho + ruta de la unidad + debate inicial |
| `udX_1.html` | **Punto de estudio 1** + actividades |
| `udX_2.html` | **Punto de estudio 2** + actividades |
| `udX_3.html` | **Punto de estudio 3** + actividades |
| `udX_4.html` | **Punto de estudio 4** + actividades |
| `udX_sda.html` | **Situación de Aprendizaje** (página independiente) |
| (opcional) | **Actividades finales** de la unidad |

### Orden interno de una página de punto de estudio

1. `<h2 class="gs-section-title">` con el número y título del apartado.
2. Explicación introductoria.
3. Bloques `.gs-box` según convenga (`.gs-comprender`, `.gs-lectura`, `.gs-ejemplo`).
4. Boards interactivos JSXGraph si procede.
5. `.gs-box.gs-aplicar` con las actividades.
6. `.sol-lock-box[data-unit="..."]`.

### Estructura de la unidad completa

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
```

**Reglas:**

- El sistema carga automáticamente Google Fonts, Font Awesome, MathJax 3 y JSXGraph.
- `gs-core.js` dispara el evento `gs-ready` cuando todo está listo.
- Los scripts locales **siempre** esperan a `gs-ready` antes de inicializar boards.

---

## 4. Esqueleto del `<body>`

```html
<div class="gs-container">

    <!-- 1. BARRA DE ACCESIBILIDAD (idéntica en todos) -->
    <div class="accessibility-bar">
        <div class="font-size-controls" title="Ajustar tamaño de texto">
            <span style="font-size: 0.75rem; color: #64748b; margin-right: 4px; font-weight:600;">
                <i class="fa-solid fa-text-height"></i>
            </span>
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
```

**Nota sobre el solucionario:** durante la migración, `gs-core.js` es
**retrocompatible**: acepta tanto el `.sol-lock-box` "completo" (con
formulario dentro) como el "vacío" (solo con `data-unit`). El JS autogenera
el formulario si detecta que está vacío.

---

## 5. Catálogo de componentes CSS

### 5.1. Estructura general

- `.gs-container` — contenedor principal de todas las páginas.
- `.gs-header` — cabecera con título y subtítulo.
- `.gs-header-meta` — línea pequeña superior (curso, materia, unidad).
- `.gs-title` — título principal (`<h1>`).
- `.gs-subtitle` — subtítulo bajo el título.
- `.gs-section-title` — título de apartado (`<h2>`), con icono FA.
- `.gs-latex-container` — caja para fórmulas LaTeX destacadas.

### 5.2. Bloques de contenido (`.gs-box` + modificador)

| Modificador | Título interno | Uso |
|---|---|---|
| `.gs-comprender` | `.gs-comprender-title` | Conceptos clave, definiciones |
| `.gs-lectura` | `.gs-lectura-title` | Lecturas, narrativas, casos |
| `.gs-ejemplo` | `.gs-ejemplo-title` | Ejemplos resueltos paso a paso |
| `.gs-aplicar` | `.gs-aplicar-title` | Bloque de actividades |

### 5.3. Bloques temáticos (sin `.gs-box`)

- `.gs-norma-box` + variantes de color:
  `.gs-norma-preparacion`, `.gs-norma-trabajo`, `.gs-norma-quimicos`,
  `.gs-norma-calor`, `.gs-norma-accidentes`.
  Título: `.gs-norma-box-title`.
- `.gs-pseudo` + `.gs-pseudo-title` — bloque de pseudociencias (similar a norma).

### 5.4. Diálogos (dentro de `.gs-box.gs-lectura`)

```html
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
```

Variantes por personaje: `.gs-dialogo-lucia`, `.gs-dialogo-diego`, etc.

### 5.5. Flowchart (método científico)

```html
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
```

### 5.6. Gráficas interactivas (JSXGraph)

```html
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
```

Variantes de color del valor: `--azul`, `--rojo`, `--verde`, `--ambar`.

### 5.7. Ejemplo con gráfica al lado

```html
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
```

### 5.8. Tablas

- `.gs-table-wrapper` > `table.gs-table` — tabla grande con cabecera.
- `.gs-tabla-datos` — tabla pequeña de datos dentro de un ejemplo.

### 5.9. Galerías

- **Pictogramas:** `.gs-pictogramas-grid` > `.gs-pictograma-card`
  (`.gs-pictograma-img`, `.gs-pictograma-nombre`, `.gs-pictograma-desc`).
- **Materiales:** `.gs-material-grupo` (con `--calentamiento`, `--medida`,
  `--soporte`, `--separacion`, `--reaccion`) > `.gs-material-grid` >
  `.gs-material-card` (`.gs-material-img`, `.gs-material-nombre`,
  `.gs-material-desc`).

### 5.10. Índice / ruta de la unidad (portada)

```html
<ul class="gs-index-list">
    <li class="gs-index-item">
        <span class="gs-index-num">1</span>
        <div class="gs-index-content">
            <span class="gs-index-name">Título del punto</span>
            <span class="gs-index-desc">Descripción breve.</span>
        </div>
    </li>
</ul>
```

### 5.11. Selector de vistas (botones conmutadores)

```html
<div class="gs-selector-btns">
    <button class="gs-selector-btn active" onclick="...">Opción A</button>
    <button class="gs-selector-btn" onclick="...">Opción B</button>
</div>
```

### 5.12. Utilidades

- `.no-print` — elemento que no se imprime.
- `.accessibility-bar` — se elimina al generar PDF.
- `.sol-lock-box` — se elimina al generar PDF sin soluciones.

---

## 6. API JavaScript de `gs-core.js`

### 6.1. Accesibilidad

- `window.setFontSize('normal'|'small'|'large'|'xlarge')`
- `window.toggleDyslexiaMode()`

### 6.2. Impresión (a refactorizar — ver §9)

- `window.generarPDFSinSolucionario()` — actual.
- `window.generarPDF(opciones)` — futuro con 4 botones.

### 6.3. Solucionario

- `window.verifySolPin()` — valida el PIN contra GAS.
- `window.GS.verifyPinOnly(pin)` — valida PIN sin pedir HTML.

### 6.4. Helpers (`window.GS.*`)

| Función | Descripción |
|---|---|
| `GS.setPanel(id, valor)` | Asigna texto a un elemento por id |
| `GS.num(v, dec)` | Redondea a `dec` decimales (string) |
| `GS.punto(x, y, dec)` | Devuelve `"(x, y)"` |
| `GS.vector(x, y, dec)` | Devuelve `"xi + yj"` |
| `GS.aNotacionCientifica(v, dec)` | Notación científica tipo `"3,45·10^8"` |
| `GS.redondear(v, dec)` | Redondeo numérico |
| `GS.prefijosSI` | Array con los prefijos del SI |

### 6.5. Aleatoriedad (`window.GS.aleatorio.*`)

`entero`, `decimal`, `elemento`, `variosDistintos`, `booleano`,
`signo`, `potencia10`, `barajar`.

### 6.6. Eventos

- `document.addEventListener('gs-ready', ...)` — todo cargado.

---

## 7. Convenciones de estilo

### 7.1. Colores (referencia para JSXGraph y CSS)

- Azul primario: `#1e3a8a`
- Azul claro: `#2563eb`
- Rojo: `#dc2626`
- Verde: `#16a34a` / `#166534`
- Ámbar: `#b45309`
- Gris: `#94a3b8` / `#cbd5e1` / `#64748b`
- Fondo claro: `#f1f5f9`

### 7.2. Iconos Font Awesome

Siempre `fa-solid`. Coherentes con el contenido:

- Seguridad: `fa-shield-halved`, `fa-triangle-exclamation`, `fa-skull-crossbones`.
- Química: `fa-flask`, `fa-flask-vial`, `fa-atom`.
- Física: `fa-calculator`, `fa-compass-drafting`, `fa-arrows-to-dot`.
- Datos: `fa-chart-line`, `fa-chart-simple`, `fa-table`.
- Acciones: `fa-lightbulb` (ejemplo), `fa-pen-nib` (aplicar),
  `fa-circle-check` (validación).

### 7.3. Idioma y tono

- Español de España.
- Rigor científico, pero cercano.
- Uso de `\text{...}` en MathJax para unidades.
- Vectores con `\vec{F}`.
- Los ejemplos y problemas usan unidades SI y notación científica.

### 7.4. Boards JSXGraph — patrón

```js
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
```

**Boards del solucionario** → dentro de `window.initSolutionBoards()`, con flag
`solutionBoardsInit`. Se invoca desde `gs-core.js` tras validar el PIN.

**Convención de ids:** `box_elem`, `box_ops`, `box_ej1`, `box_graf`,
`box_sol_v1`, `box_sol_v2`, ...

---

## 8. Flujo de creación de una unidad nueva

1. **Definir los 4 puntos de estudio** de la unidad.
2. **Diseñar el gancho** (portada): historia, noticia, caso, experimento mental.
3. **Diseñar la SdA**: hilo conductor que recorre los 4 puntos y desemboca en un
   producto final.
4. **Crear el `README.md`** de la unidad con: puntos, saberes, tabla de páginas,
   estado, pendientes.
5. **Crear las páginas** una a una, siguiendo el esqueleto y el catálogo de
   componentes.
6. **Crear las soluciones** en HTML separado para el GAS.
7. **Subir los recursos** (imágenes, SVGs) a las carpetas correspondientes.

---

## 9. Tareas pendientes del sistema

### 9.1. Solucionario autogenerado desde JS (retrocompatible)

**Objetivo:** que los HTML solo declaren

```html
<div class="sol-lock-box" data-unit="Xeso_udN_M"></div>
```

y `gs-core.js` inyecte el formulario completo.

**Estado:** pendiente. Mientras se migran las 20 páginas **a mano**, el JS
debe ser **retrocompatible**: si el `.sol-lock-box` ya tiene hijos (versión
antigua), no tocar nada; si está vacío, generar el formulario.

### 9.2. Cuatro modos de impresión

Sustituir `generarPDFSinSolucionario()` por `generarPDF(opciones)` con:

- 📄 Contenidos **sin** soluciones.
- 📄 Contenidos **con** soluciones (solo si se ha desbloqueado).
- 📝 Solo **actividades** sin soluciones.
- 📝 Solo **actividades** con soluciones.

El panel de botones se inyecta dentro del solucionario desbloqueado.

### 9.3. Arreglos menores detectados

- `3eso_ud1_2` tiene anidación incorrecta de tablas (un `.gs-table-wrapper`
  sin cerrar antes de otro, y `<thead>` no cierra bien).
- Homogeneizar `type="number"` vs `type="text" inputmode="numeric"` en los PIN.
- Homogeneizar `verifySolPin()` vs `window.verificarPin()`.

### 9.4. Recursos de curso pendientes

- `presentacion.html` de cada curso (2º, 3º, 4º).
- `guia-evaluacion.html` de cada curso.

---

## 10. Estado actual del proyecto

### 2º ESO

- [ ] Presentación
- [ ] Guía de evaluación
- [ ] Unidades por crear

### 3º ESO

- [x] **UD1 — La Actividad Científica**
  - [x] Portada (`3eso_ud1_0.html`)
  - [x] Punto 1 — Método científico (`3eso_ud1_1.html`)
  - [x] Punto 2 — Magnitudes y SI (`3eso_ud1_2.html` + `js/ud1_02.js`)
  - [x] Punto 3 — Laboratorio (`3eso_ud1_3.html`)
  - [x] Punto 4 — Datos y gráficas (`3eso_ud1_4.html`)
  - [ ] **SdA — "El misterio del lago contaminado"** (`3eso_ud1_sda.html`)
    - [ ] Sesión 1 — El caso
    - [ ] Sesión 2 — Medidas experimentales
    - [ ] Sesión 3 — Representación gráfica
    - [ ] Sesión 4 — Pictogramas y seguridad
    - [ ] Sesión 5 — Producto final
  - [ ] Actividades finales de la unidad
- [ ] UD2 en adelante

### 4º ESO

- [x] **UD1 — Álgebra Vectorial** (parcial: al menos el punto 4)
- [ ] Resto por confirmar

---

## 11. Situación de Aprendizaje — "El misterio del lago contaminado"

**Curso:** 3º ESO · **Unidad:** UD1 — La Actividad Científica
**Archivo:** `3eso/ud1/3eso_ud1_sda.html`
**Producto final:** informe técnico (grupal, adaptable a individual)

### Hilo conductor

En un lago cercano al instituto han aparecido **peces muertos**. El
ayuntamiento ha tomado una muestra de agua y ha detectado que su **densidad es
anómala** (`1,08 g/cm³` en lugar de `1,00`) y que hay **restos de una
sustancia blanquecina** en la orilla. Se contrata al alumnado como **analistas
químicos** para identificar la sustancia responsable y evaluar su peligrosidad.

### Sustancias candidatas

Se barajan 5 posibles causantes, todas ellas con densidad superior a la del
agua pura. El alumnado debe decidir cuál encaja con los datos:

| Sustancia | Fórmula | Densidad (g/cm³) | Pictogramas | Notas |
|---|---|---|---|---|
| **Nitrato de potasio** | KNO₃ | ~2,11 (sólido) | Irritante | **Candidato principal.** Fertilizante, blanquecino, se confunde con sal/azúcar |
| **Cloruro de calcio** | CaCl₂ | ~2,15 (sólido) | Irritante | Usado en carreteras, muy soluble |
| **Ácido cítrico** | C₆H₈O₇ | ~1,66 (sólido) | Irritante | Uso alimentario, mide pH |
| **Sulfato de cobre(II)** | CuSO₄ | ~3,60 (sólido) | Irritante + Peligro medio ambiente | **Descartado a propósito** por su color azul inconfundible |
| **Cloruro de sodio** | NaCl | ~2,16 (sólido) | No peligroso | Sal común, poco contaminante |

> Los datos de densidad que el alumnado maneja son de **disoluciones** a
> distintas concentraciones, no del sólido puro. Ese es el dato clave para
> la gráfica.

### Desarrollo por sesiones

**Sesión 1 — El caso** (método científico)
- Presentación del informe del ayuntamiento.
- Lluvia de hipótesis sobre qué sustancia puede ser.
- Identificación de las fases del método científico ya aplicadas y las que faltan.

**Sesión 2 — Medidas experimentales** (magnitudes, SI, notación científica)
- Tabla de densidades de disoluciones de las 5 sustancias candidatas a distintas
  concentraciones.
- Conversión de todas las unidades al SI.
- Uso de notación científica para concentraciones muy bajas o muy altas.

**Sesión 3 — Representación gráfica** (datos y gráficas)
- Representar densidad (Y) frente a concentración (X) para cada candidata.
- Todas son rectas, pero con **pendiente distinta** (huella dactilar).
- Calcular pendiente y ordenada en el origen.
- Identificar cuál encaja con la muestra problema.

**Sesión 4 — Pictogramas y seguridad** (laboratorio)
- Buscar pictogramas de la sustancia identificada.
- Interpretar frases H y P.
- Decidir precauciones para manipular muestras.
- Analizar el impacto medioambiental del vertido.

**Sesión 5 — Producto final** (comunicación)
- Informe técnico al ayuntamiento con: gráfica comparativa, sustancia
  identificada y justificación, ficha de seguridad, recomendaciones de
  limpieza y prevención.
- Adaptable a formato presentación o póster.

### Repaso curricular

| Punto de la UD1 | Dónde se trabaja en la SdA |
|---|---|
| 1. Método científico | Sesión 1 (hipótesis) y Sesión 4 (experimentación) |
| 2. Magnitudes y SI | Sesiones 1, 2 y 4 (cambios de unidad, notación) |
| 3. Seguridad y pictogramas | Sesión 4 (integrado en la investigación) |
| 4. Datos y gráficas | Sesión 3 (rectas, pendiente, ordenada) |

### ODS relacionados

- **ODS 6** — Agua limpia y saneamiento.
- **ODS 14** — Vida submarina.

### Formato del producto final

- **Grupal** (recomendado): informe de 3-4 personas con roles (analista,
  redactor, diseñador de gráfica, portavoz).
- **Individual** (alternativa): informe personal.

---

## 12. Cómo usar esta guía en una conversación nueva

Si en una ventana nueva del chat necesitas que el asistente retome el contexto:

1. Pégale este `GUIA.md`.
2. Pégale el `gs-core.js` actual (si ha cambiado).
3. Pégale el `README.md` de la unidad en la que estés trabajando.
4. Pégale **un HTML de ejemplo** representativo (portada + un punto + solucionario).

Con esos 4 archivos, el asistente puede continuar sin más contexto.

---
