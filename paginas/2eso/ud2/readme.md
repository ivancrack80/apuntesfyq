# UD2 — La Materia y sus Propiedades
**Curso:** 2.º ESO · **Materia:** Física y Química

---

## Estructura de la unidad
- **Portada (`2eso_ud2_0.html`)**: Gancho del Titanic + Ruta de la unidad.
- **Contenidos**:
  - `2eso_ud2_1.html`: Materia, propiedades generales (masa, volumen) y características (densidad).
  - `2eso_ud2_2.html`: Estados de agregación (TCM, modelos de bolas, cambios de estado y gráfica).
  - `2eso_ud2_3.html`: Estudio de los gases (Presión, Temperatura, leyes de Boyle, Charles, Gay-Lussac y Ley General).

---

## Saberes básicos (LOMLOE)
- La materia y sus propiedades. Masa, volumen y densidad.
- Teoría Cinético-Molecular.
- Estados de agregación y cambios de estado.
- Presión y temperatura absoluta. Leyes de los gases.

---

## Páginas HTML
| Archivo | Apartados | `data-unit` | Boards | JS propio |
|---|---|---|---|---|
| `2eso_ud2_0.html` | Portada + ruta | — | No | No |
| `2eso_ud2_1.html` | Materia, masa, volumen y densidad | `2eso_ud2_1` | No | `js/ud2_01.js` (actividades) |
| `2eso_ud2_2.html` | Estados de agregación y TCM | `2eso_ud2_2` | Sí (gráfica) | Inline (gráfica) |
| `2eso_ud2_3.html` | Gases: conceptos y leyes | `2eso_ud2_3` | Sí (3 gráficas) | `js/ud2_03.js` (actividades) |

---

## Situación de aprendizaje
- Pendiente de diseño (se descartó el escape room por tiempo).
- Se centrará en el laboratorio y la aplicación de las leyes de los gases.

---

## Estado
- [x] Portada (`2eso_ud2_0.html`)
- [x] Punto 1 — Materia y propiedades (`2eso_ud2_1.html`)
- [x] Punto 2 — Estados de agregación (`2eso_ud2_2.html`)
- [x] Punto 3 — Gases (`2eso_ud2_3.html`)
- [ ] SdA (Pendiente)
- [ ] Actividades finales
- [x] Solucionarios en GAS (los generados por JS dinámico y los estáticos).

---

## Notas de diseño
- **Actividades aleatorias**: Implementadas en JS (`js/ud2_01.js` y `js/ud2_03.js`). 
  - `ud2_01.js`: Cálculo de densidad, despeje de variables y geometría. El solucionario se genera al validar el PIN con `GS.verifyPinOnly()`.
  - `ud2_03.js`: Cambios de unidades y aplicación de las leyes de los gases. El solucionario se genera con el formato "Datos - Fórmula - Operaciones - Solución".
- **Gráficas de gases**: Implementadas en JSXGraph con `boundingbox` ajustado para que se vean los ejes, usando `board.freeBoard()` para alternar entre calentamiento y enfriamiento.
- **Iframe**: Corregido el recorte de ptable y el aviso de impresión (`#aviso-tabla-impresa`).