# UD1 — La Actividad Científica
**Curso:** 3.º ESO · **Materia:** Física y Química

---

## Estructura de la unidad

- **Gancho (portada)**: historia del Mars Climate Orbiter (error de unidades que costó 125 millones de dólares).
- **Puntos de desarrollo**: 4 páginas con los contenidos.
- **SdA**: "El misterio del lago contaminado" — investigación integradora en 5 misiones.
- **Actividades finales**: repaso general de la unidad.

---

## Puntos de estudio

1. **El Conocimiento y el Método Científico** — `3eso_ud1_1.html`
2. **La Medida y el Sistema Internacional** — `3eso_ud1_2.html`
3. **Seguridad y Material de Laboratorio** — `3eso_ud1_3.html`
4. **El Lenguaje de la Ciencia: Datos y Gráficas** — `3eso_ud1_4.html`

---

## Saberes básicos (LOMLOE)

- El método científico: fases y aplicación.
- Magnitudes fundamentales y derivadas. Sistema Internacional de Unidades.
- Notación científica. Múltiplos y submúltiplos.
- Cambios de unidades simples y compuestos. Factores de conversión.
- Normas de seguridad en el laboratorio. Pictogramas de peligrosidad (SGA/GHS).
- Material de laboratorio: clasificación y funciones.
- Representación gráfica de datos experimentales: proporcionalidad directa, relación lineal, proporcionalidad inversa.
- Interpretación de pendientes y ordenadas en el origen.

---

## Páginas HTML

| Archivo | Apartados | `data-unit` | Boards | JS propio |
|---|---|---|---|---|
| `3eso_ud1_0.html` | Portada + gancho + ruta + debate inicial | — | No | No |
| `3eso_ud1_1.html` | 1.1–1.4 (Conocimiento científico, método, leyes/teorías, actividades) | `3eso_ud1_1` | No | No |
| `3eso_ud1_2.html` | 2.1–2.5 (Magnitud, SI, prefijos, notación, cambios de unidad) | `3eso_ud1_2` | No | `js/ud1_02.js` |
| `3eso_ud1_3.html` | 3.1–3.4 (Normas, pictogramas, material, actividades) | `3eso_ud1_3` | No | No |
| `3eso_ud1_4.html` | 4.1–4.3 (Gráficas, ecuaciones, aplicaciones) | `3eso_ud1_4` | Sí (4) | inline |
| `3eso_ud1_sda.html` | SdA "El misterio del lago contaminado" | `3eso_ud1_sda` | Sí (1) | inline |
| `3eso_ud1_actfin.html` | Actividades finales de repaso | `3eso_ud1_actfin` | Sí (2) | inline |

---

## Situación de aprendizaje — "El misterio del lago contaminado"

**Archivo:** `3eso_ud1_sda.html`
**Producto final:** informe técnico al ayuntamiento
**Duración:** 2 sesiones + informe final

### Hilo conductor
En el humedal de Valdeflores aparecen peces muertos. La densidad del agua es anómala (1,08 g/cm³) y hay restos de un polvo blanquecino. El alumnado, como equipo de analistas químicos, debe identificar la sustancia responsable, evaluar su peligrosidad y entregar un informe al ayuntamiento.

### Misiones
1. **El informe del ayuntamiento** — conversión de unidades al SI y formulación de hipótesis.
2. **Las muestras del laboratorio** — descarte de candidatas y tabla resumen en el SI.
3. **Cada sustancia tiene su propia relación** — gráficas densidad-concentración, pendientes, identificación de la sustancia culpable (KNO₃).
4. **¿Es peligrosa la sustancia?** — pictogramas rotos, ficha de seguridad, eutrofización.
5. **Informe técnico al ayuntamiento** — producto final.

### Repaso curricular
| Punto de la UD1 | Dónde se trabaja |
|---|---|
| 1. Método científico | Misiones 1 y 4 |
| 2. Magnitudes y SI | Misiones 1, 2 y 4 |
| 3. Seguridad y pictogramas | Misión 4 |
| 4. Datos y gráficas | Misión 3 |

### ODS relacionados
- ODS 6 — Agua limpia y saneamiento.
- ODS 14 — Vida submarina.

### Evaluación
- **Rúbrica** con 7 criterios ponderados (20/20/15/15/15/10/5 %).
- **Autoevaluación** individual por miembro del equipo.
- **Acta de coevaluación** firmada por el coordinador/a.
- **Penalización** por falsedad en el acta.

---

## Recursos usados

- **Pictogramas**: `/pictogramas/*.svg` (usados en UD1 de 3º y 2º ESO).
- **Materiales**: `/materiales/*.jpg|png` (usados en `ud1_3`).
- **Solucionarios**: en `/soluciones/3eso/ud1/` (servidos por el GAS con PIN).
  - `ud1_1.html`, `ud1_2.html`, `ud1_3.html`, `ud1_4.html`, `ud1_sda.html`, `ud1_actfin.html`.

---

## Estado

- [x] Portada (`3eso_ud1_0.html`)
- [x] Punto 1 — Método científico (`3eso_ud1_1.html`)
- [x] Punto 2 — Magnitudes y SI (`3eso_ud1_2.html` + `js/ud1_02.js`)
- [x] Punto 3 — Laboratorio (`3eso_ud1_3.html`)
- [x] Punto 4 — Datos y gráficas (`3eso_ud1_4.html`)
- [x] SdA — "El misterio del lago contaminado" (`3eso_ud1_sda.html`)
- [ ] Actividades finales (`3eso_ud1_actfin.html`) ← en diseño
- [x] Solucionarios en GAS

---

## Pendiente / próximos pasos

- [ ] Crear `3eso_ud1_actfin.html` con las actividades finales de repaso.
- [ ] Crear `soluciones/3eso/ud1/ud1_actfin.html` para el GAS.
- [ ] Migrar el solucionario al JS centralizado (solucionario autogenerado).
- [ ] Añadir los 4 botones de impresión al `gs-core.js`.
- [ ] Crear la presentación del curso (`3eso/presentacion.html`).
- [ ] Crear la guía de evaluación del curso (`3eso/guia-evaluacion.html`).

---

## Notas de diseño

- **Tono**: español de España, cercano pero riguroso.
- **Datos de la SdA**: realistas y coherentes con tablas de laboratorio reales.
- **Gráficas**: el alumnado dibuja las 4 gráficas a mano; el board de la SdA solo muestra una sustancia ficticia de ejemplo.
- **Trazabilidad**: iniciales por tarea + acta de coevaluación + observación directa del profesorado.
- **Unidades SI**: se usa la K (kelvin) como unidad de temperatura; no se convierte a °C.
- **Ficción**: aviso al principio de la SdA aclarando que el caso es ficticio, aunque se sitúa en un entorno reconocible.
