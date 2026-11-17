# GUÍA DEL PROYECTO — Apuntes FyQ

Sistema unificado de apuntes de Física y Química para ESO, publicados en HTML estático y servidos vía GitHub Pages.

- **Repo:** `ivancrack80/apuntesfyq`
- **URL Base:** `https://ivancrack80.github.io/apuntesfyq/`

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
├── soluciones/                    ← HTML con las soluciones para el GAS
├── 2eso/
│   ├── info.html                  ← Presentación del curso
│   ├── criterios.html             ← Guía de evaluación
│   ├── ud1/ ...
│   └── ud2/
│       ├── README.md
│       ├── 2eso_ud2_0.html
│       ├── 2eso_ud2_1.html
│       ├── 2eso_ud2_2.html
│       ├── 2eso_ud2_3.html
│       └── js/ (scripts locales de la unidad)
├── 3eso/
│   ├── info.html
│   ├── criterios.html
│   └── ud1/
│       ├── README.md
│       ├── 3eso_ud1_0.html
│       ├── 3eso_ud1_1.html
│       ├── 3eso_ud1_2.html
│       ├── 3eso_ud1_3.html
│       ├── 3eso_ud1_4.html
│       ├── 3eso_ud1_sda.html
│       ├── 3eso_ud1_actfin.html
│       └── js/ud1_02.js
├── 4eso/
│   ├── info.html
│   ├── criterios.html
│   └── ud2/
│       ├── README.md
│       ├── 4eso_ud2_0.html
│       ├── 4eso_ud2_1.html
│       ├── 4eso_ud2_2.html
│       ├── 4eso_ud2_3.html
│       └── 4eso_ud2_4.html
└── GUIA.md                        ← Este archivo

```

### Convenciones de nombres
- **Carpetas de curso:** `2eso/`, `3eso/`, `4eso/`.
- **Carpetas de unidad:** `ud1/`, `ud2/`, ...
- **Archivos HTML:** `{curso}_ud{N}_{MM}.html` (`00` portada, `01..n` apartados, `sda` situación de aprendizaje, `actfin` actividades finales).
- **IDs de unidad (GAS):** `{curso}_ud{N}_{M}` (ej. `4eso_ud2_3`).
- **JS local:** dentro de `ud{N}/js/`, llamado `ud{N}_{MM}.js`.

---

## 2. Cabecera común de todos los HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>...</title>
    <link rel="stylesheet" href="https://ivancrack80.github.io/apuntesfyq/css/gs-styles.css">
    <script src="https://ivancrack80.github.io/apuntesfyq/js/gs-core.js"></script>
    <!-- Si hace falta JS propio: <script src="js/udX_YY.js"></script> -->
</head>
<body>
<div class="gs-container">
    ...
</div>
</body>
</html>
```

Reglas:

· El sistema carga automáticamente Google Fonts, Font Awesome, MathJax 3 y JSXGraph.
· gs-core.js dispara el evento gs-ready cuando todo está listo.
· Los scripts locales esperan a gs-ready antes de inicializar.

---

3. Esqueleto del <body>

```html
<div class="gs-container">
    <!-- 1. BARRA DE ACCESIBILIDAD -->
    <div class="accessibility-bar">
        <!-- Botones A-, A, A+, A++ y Lectura Fácil -->
    </div>

    <!-- 2. CABECERA -->
    <header class="gs-header">
        <div class="gs-header-meta">Física y Química • X.º ESO • Unidad N</div>
        <h1 class="gs-title">Título de la página</h1>
        <div class="gs-subtitle">Subtítulo breve</div>
        <!-- Se puede añadir la temporalización aquí -->
    </header>

    <!-- 3. CONTENIDO -->
    ...

    <!-- 4. SOLUCIONARIO -->
    <div class="sol-lock-box" data-unit="Xeso_udN_M"></div>
</div>
```

---

4. Catálogo de componentes CSS

4.1. Estructura general

· .gs-container — contenedor principal.
· .gs-header, .gs-header-meta, .gs-title, .gs-subtitle.
· .gs-section-title — título de apartado (<h2>), con icono FA.
· .gs-latex-container — caja para fórmulas LaTeX.

4.2. Bloques de contenido (.gs-box + modificador)

Modificador Título interno Uso
.gs-comprender .gs-comprender-title Conceptos clave, definiciones
.gs-lectura .gs-lectura-title Lecturas, narrativas
.gs-ejemplo .gs-ejemplo-title Ejemplos resueltos
.gs-aplicar .gs-aplicar-title Bloque de actividades

4.3. Otros componentes

· Diálogos: .gs-dialogo, .gs-dialogo-linea, .gs-dialogo-nombre.
· Flowchart: .gs-flowchart, .gs-flow-step, .gs-flow-arrow, .gs-flow-decision, .gs-flow-branches.
· Gráficas: .gs-visual-block, .gs-graph-wrapper, .gs-panel-datos.
· Tablas: .gs-table-wrapper + .gs-table (grandes), .gs-tabla-datos (pequeñas).
· Galerías: .gs-pictogramas-grid, .gs-material-grupo, .gs-material-grid.
· Índice: .gs-index-list, .gs-index-item.
· Selectores: .gs-selector-btns, .gs-selector-btn.
· Utilidades: .no-print.

4.4. Iframe de Ptable

Se usa la clase .iframe-cropper y .cropped-iframe (definidas en el CSS) para recortar la tabla periódica interactiva y ocultar la publicidad. En la impresión, se oculta y se muestra un aviso con #aviso-tabla-impresa.

---

5. API JavaScript de gs-core.js

· Accesibilidad: window.setFontSize(), window.toggleDyslexiaMode().
· Impresión: window.generarPDFSinSolucionario().
· Solucionario: window.verifySolPin(), window.GS.verifyPinOnly(pin).
· Helpers (window.GS.*): setPanel, num, punto, vector, aNotacionCientifica, redondear.
· Aleatoriedad (window.GS.aleatorio.*): entero, decimal, elemento, variosDistintos, booleano, signo, potencia10, barajar.
· Eventos: document.addEventListener('gs-ready', ...).

---

6. Sistema de Actividades Aleatorias con JS Local

A partir de la UD2 de 2º ESO, se implementó un sistema de actividades aleatorias generadas por JS (ej. js/ud2_01.js y js/ud2_03.js).

¿Cómo funciona?

1. El JS local genera los datos aleatorios y los inyecta en el HTML (ej. act-densidad-1).
2. El JS calcula las soluciones exactas y las guarda en una variable interna (ej. problemasActuales).
3. Cuando el usuario introduce el PIN, el JS llama a GS.verifyPinOnly(pin). Si es correcto, el JS inyecta el HTML con las soluciones exactas usando generarHTMLSoluciones().

Ventajas

· Los alumnos no pueden copiar las soluciones porque los números cambian.
· El GAS solo actúa como "portero" (valida PIN) y no necesita almacenar soluciones estáticas.
· Permite formatear las soluciones paso a paso (Datos - Fórmula - Operaciones - Solución).

Nota sobre el GAS

Para las páginas con actividades fijas (como las de 4º ESO), el solucionario sigue estando en la carpeta soluciones/ y el GAS lo devuelve al validar el PIN.

---

7. Convenciones de estilo

· Colores: azul primario #1e3a8a, rojo #dc2626, verde #16a34a, ámbar #b45309, gris #94a3b8.
· Iconos: fa-solid coherentes con el contenido.
· Idioma: español de España, rigor científico.
· Boards JSXGraph: patrón de inicialización y actualización con GS.setPanel.

---

8. Tareas pendientes del sistema

☐ Solucionario autogenerado: gs-core.js debe inyectar el formulario del solucionario si .sol-lock-box está vacío (retrocompatible).
☐ Cuatro modos de impresión: Implementar generarPDF(opciones).
☐ Recursos de curso: Crear info.html y criterios.html para 2º, 3º y 4º ESO.

---

9. Estado actual del proyecto

2º ESO

☑ UD1 — La Actividad Científica (completa)
☑ UD2 — La Materia y sus Propiedades (completa: teoría, actividades aleatorias y solucionarios dinámicos).
☐ UD3 en adelante.

3º ESO

☑ UD1 — La Actividad Científica (completa, incluye SdA y actividades finales).
☐ UD2 — El Átomo y la Organización Periódica (en proceso: falta la SdA).
☐ UD3 en adelante.

4º ESO

☑ UD1 — Álgebra Vectorial (completa).
☐ UD2 — Estructura Atómica, Enlace y Nomenclatura (en proceso: teoría de átomo, enlace y sistema periódico casi terminada; falta nomenclatura y corregir SVGs de Lewis).

---

10. Flujo de creación de una unidad nueva

1. Definir los puntos de estudio.
2. Diseñar el gancho (portada).
3. Diseñar la SdA.
4. Crear el README.md de la unidad.
5. Crear las páginas HTML.
6. Crear las soluciones (en GAS o generadas por JS).
7. Subir recursos.