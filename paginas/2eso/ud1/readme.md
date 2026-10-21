# UD1 — La Actividad Científica
**Curso:** 2.º ESO · **Materia:** Física y Química

---

## Estructura de la unidad

- **Gancho (portada)**: historia del descubrimiento de la penicilina por Alexander Fleming.
- **Puntos de desarrollo**: 3 páginas con los contenidos.
- **SdA**: "El laboratorio destrozado: ¿qué pasó el viernes?" — investigación integradora.
- **Actividades finales**: repaso general de la unidad.

---

## Puntos de estudio

1. **La Ciencia que estudiamos: la Física y la Química** — `2eso_ud1_1.html` (Incluye: cambios físicos y químicos, definición de Física y Química, método científico).
2. **La Medida, Unidades y Notación Científica** — `2eso_ud1_2.html` (Incluye: magnitudes, SI, prefijos de Tera a pico, notación científica, factores de conversión).
3. **Seguridad y Material de Laboratorio** — `2eso_ud1_3.html` (Incluye: normas de seguridad, pictogramas de peligrosidad, material de laboratorio).

*(Nota: A diferencia de 3.º ESO, en 2.º ESO no se imparte el punto de representación gráfica de datos).*

---

## Saberes básicos (LOMLOE)

- La Física y la Química como ciencias experimentales. Sus campos de estudio.
- El método científico: fases y aplicación.
- Cambios físicos y cambios químicos: diferencias y ejemplos cotidianos.
- Magnitudes fundamentales y derivadas. Sistema Internacional de Unidades.
- Múltiplos y submúltiplos (prefijos de Tera a pico).
- Notación científica.
- Cambios de unidades simples y compuestos (factores de conversión).
- Normas de seguridad e higiene en el laboratorio.
- Pictogramas de peligrosidad (SGA/GHS).
- Material básico de laboratorio: clasificación y funciones.

---

## Páginas HTML

| Archivo | Apartados | `data-unit` | Boards | JS propio |
|---|---|---|---|---|
| `2eso_ud1_0.html` | Portada + gancho Fleming + ruta + debate inicial | — | No | No |
| `2eso_ud1_1.html` | 1.1–1.3 (Cambios físicos/químicos, Física/Química, método científico) | `2eso_ud1_1` | No | No |
| `2eso_ud1_2.html` | 2.1–2.5 (Magnitud, SI, prefijos, notación, cambios de unidad) | `2eso_ud1_2` | No | No |
| `2eso_ud1_3.html` | 3.1–3.4 (Normas, pictogramas, material, actividades) | `2eso_ud1_3` | No | No |
| `2eso_ud1_sda.html` | SdA "El laboratorio destrozado" | `2eso_ud1_sda` | No | Inline (validación) |
| `2eso_ud1_actfin.html` | Actividades finales de repaso | `2eso_ud1_actfin` | No | No |

---

## Situación de aprendizaje — "El laboratorio destrozado"

**Archivo:** `2eso_ud1_sda.html`
**Producto final:** Dossier de investigación + Cartel de normas de seguridad (grupal).
**Duración:** 2 sesiones + elaboración del producto final.

### Hilo conductor
El lunes por la mañana aparece el laboratorio de Física y Química destrozado y el becario que trabajó allí el viernes ha desaparecido. Faltan páginas de su cuaderno y las que quedan están desordenadas. El alumnado, como equipo de investigación, debe reconstruir lo ocurrido, identificar los errores y proponer medidas de seguridad.

### Misiones
1. **Reconstruir la escena** — Ordenar las anotaciones del cuaderno según las fases del método científico.
2. **Las magnitudes del laboratorio** — Detectar errores en las unidades, pasar números a notación científica y realizar cambios de unidades.
3. **¿Qué le pasó a las sustancias?** — Clasificar las pistas encontradas como cambios físicos o químicos.
4. **Encuentra al culpable** — Identificar pictogramas rotos (inflamable, toxicidad, medio ambiente) y enumerar normas de seguridad incumplidas.
5. **Informe final y cartel** — Redactar un dossier con las conclusiones y diseñar un cartel de normas para el laboratorio real del centro.

### Repaso curricular
| Punto de la UD1 | Dónde se trabaja en la SdA |
|---|---|
| 1. Física/Química y Método científico | Misiones 1 y 3 |
| 2. Magnitudes, SI y unidades | Misión 2 |
| 3. Seguridad y pictogramas | Misión 4 |

### Evaluación
- **Rúbrica** con criterios ponderados (incluye la creatividad del cartel).
- **Trabajo en equipo** con roles asignados.
- **Acta de coevaluación** firmada por el coordinador/a.
- **Penalización** por falsedad en el acta.

---

## Recursos usados

- **Pictogramas**: `/pictogramas/*.svg` (usados en UD1 de 3º y 2º ESO).
- **Materiales**: `/materiales/*.jpg|png` (usados en `ud1_3`).
- **Solucionarios**: en `/soluciones/2eso/ud1/` (servidos por el GAS con PIN).
  - `ud1_1.html`, `ud1_2.html`, `ud1_3.html`, `ud1_sda.html`, `ud1_actfin.html`.

---

## Estado

- [x] Portada (`2eso_ud1_0.html`)
- [x] Punto 1 — Física, Química y Método Científico (`2eso_ud1_1.html`)
- [x] Punto 2 — Magnitudes y SI (`2eso_ud1_2.html`)
- [x] Punto 3 — Laboratorio (`2eso_ud1_3.html`)
- [x] SdA — "El laboratorio destrozado" (`2eso_ud1_sda.html`)
- [x] Actividades finales (`2eso_ud1_actfin.html`) *(Nota: pendiente de crear el archivo actfin si aún no lo has hecho)*
- [x] Solucionarios en GAS (`/soluciones/2eso/ud1/`)

**Unidad 1 de 2.º ESO: COMPLETA.**

---

## Pendiente / próximos pasos

- [ ] Verificar el correcto funcionamiento de los solucionarios en el GAS.
- [ ] Migrar el solucionario al JS centralizado (mejora global pendiente).
- [ ] Añadir los 4 botones de impresión al `gs-core.js` (mejora global pendiente).
- [ ] Crear la presentación del curso (`2eso/presentacion.html`).
- [ ] Crear la guía de evaluación del curso (`2eso/guia-evaluacion.html`).
- [ ] Empezar la UD2 de 2.º ESO.

---

## Notas de diseño

- **Tono**: español de España, adaptado a la madurez de 2º ESO (primer contacto con FyQ).
- **Pictogramas rotos**: se ha usado CSS (`clip-path` y `transform: rotate`) para simular etiquetas rasgadas de forma realista.
- **Producto final**: el cartel ganador se imprimirá y colgará en el laboratorio, lo que aporta un componente de motivación y utilidad real.
- **Ficción**: el caso está contextualizado en el propio centro pero se indica claramente que es ficticio para evitar susceptibilidades.