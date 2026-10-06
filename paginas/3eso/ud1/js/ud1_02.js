/* ==========================================================================
   UD1_02.JS — Módulo de actividades aleatorias para 3º ESO ud1_02
   Contenido: Magnitudes, unidades, prefijos SI, notación científica,
   cambios de unidades.
   
   Uso: <script src="js/ud1_02.js"></script> (después de gs-core.js)
   ========================================================================== */

(function () {
    'use strict';

    // ======================================================================
    // CONFIGURACIÓN
    // ======================================================================
    var UNIDAD_ID = '3eso_ud1_2';

    // ======================================================================
    // 1. DATOS BASE
    // ======================================================================

    // 15 magnitudes (fundamentales + derivadas) para la tabla 1
    var MAGNITUDES = [
        { nombre: 'Longitud',                    simbolo: 'l',   unidad: 'm',       tipo: 'Fundamental' },
        { nombre: 'Masa',                        simbolo: 'm',   unidad: 'kg',      tipo: 'Fundamental' },
        { nombre: 'Tiempo',                      simbolo: 't',   unidad: 's',       tipo: 'Fundamental' },
        { nombre: 'Temperatura absoluta',        simbolo: 'T',   unidad: 'K',       tipo: 'Fundamental' },
        { nombre: 'Cantidad de sustancia',       simbolo: 'n',   unidad: 'mol',     tipo: 'Fundamental' },
        { nombre: 'Intensidad de corriente',     simbolo: 'I',   unidad: 'A',       tipo: 'Fundamental' },
        { nombre: 'Intensidad luminosa',         simbolo: 'Iv',  unidad: 'cd',      tipo: 'Fundamental' },
        { nombre: 'Superficie (Área)',           simbolo: 'S',   unidad: 'm²',      tipo: 'Derivada' },
        { nombre: 'Volumen',                     simbolo: 'V',   unidad: 'm³',      tipo: 'Derivada' },
        { nombre: 'Densidad',                    simbolo: 'd',   unidad: 'kg/m³',   tipo: 'Derivada' },
        { nombre: 'Velocidad',                   simbolo: 'v',   unidad: 'm/s',     tipo: 'Derivada' },
        { nombre: 'Aceleración',                 simbolo: 'a',   unidad: 'm/s²',    tipo: 'Derivada' },
        { nombre: 'Fuerza',                      simbolo: 'F',   unidad: 'N',       tipo: 'Derivada' },
        { nombre: 'Presión',                     simbolo: 'P',   unidad: 'Pa',      tipo: 'Derivada' },
        { nombre: 'Energía / Trabajo',           simbolo: 'E',   unidad: 'J',       tipo: 'Derivada' },
        { nombre: 'Potencia',                    simbolo: 'P',   unidad: 'W',       tipo: 'Derivada' }
    ];

    // Prefijos SI disponibles para los ejercicios (subconjunto más común)
    var PREFIJOS = [
        { prefijo: 'Giga',  simbolo: 'G',  factor: 9   },
        { prefijo: 'Mega',  simbolo: 'M',  factor: 6   },
        { prefijo: 'kilo',  simbolo: 'k',  factor: 3   },
        { prefijo: 'hecto', simbolo: 'h',  factor: 2   },
        { prefijo: 'deca',  simbolo: 'da', factor: 1   },
        { prefijo: '',      simbolo: '',   factor: 0   },
        { prefijo: 'deci',  simbolo: 'd',  factor: -1  },
        { prefijo: 'centi', simbolo: 'c',  factor: -2  },
        { prefijo: 'mili',  simbolo: 'm',  factor: -3  },
        { prefijo: 'micro', simbolo: 'µ',  factor: -6  },
        { prefijo: 'nano',  simbolo: 'n',  factor: -9  }
    ];

    // Magnitudes básicas para los cambios simples
    var MAGNITUDES_SIMPLES = [
        { nombre: 'longitud',   unidadBase: 'm',   esCuadratica: false, esCubica: false },
        { nombre: 'masa',       unidadBase: 'g',   esCuadratica: false, esCubica: false },
        { nombre: 'capacidad',  unidadBase: 'L',   esCuadratica: false, esCubica: false },
        { nombre: 'superficie', unidadBase: 'm²',  esCuadratica: true,  esCubica: false },
        { nombre: 'volumen',    unidadBase: 'm³',  esCuadratica: false, esCubica: true  }
    ];

    // ======================================================================
    // 2. ESTADO GLOBAL DE LA GENERACIÓN
    // ======================================================================
    var estado = {
        tablaMagnitudes: null,
        tablaPrefijos: null,
        notacionCientifica: [],
        cambiosSimples: [],
        cambiosCompuestos: []
    };

    // ======================================================================
    // 3. UTILIDADES
    // ======================================================================

    function formatearNumero(valor, decimales) {
        var d = decimales === undefined ? 2 : decimales;
        return valor.toFixed(d).replace('.', ',');
    }

    function formatearNumeroGrande(n) {
        // Añade puntos de millar cada 3 dígitos
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    // Devuelve una potencia de 10 en formato exponente (por ejemplo "10^3")
    function potencia10Str(exponente) {
        if (exponente === 0) return '';
        return '·10^' + exponente;
    }

    // ======================================================================
    // 4. GENERADORES DE ACTIVIDADES
    // ======================================================================

    // --- TABLA 1: Magnitudes y unidades ---
    function generarTablaMagnitudes() {
        // Elegimos 10 magnitudes al azar
        var seleccionadas = GS.aleatorio.variosDistintos(MAGNITUDES, 10);
        var filas = [];

        seleccionadas.forEach(function (mag) {
            // Decidimos qué columna se oculta (0 = magnitud, 1 = símbolo, 2 = unidad, 3 = tipo)
            var ocultar = GS.aleatorio.entero(0, 3);
            filas.push({
                magnitud: mag.nombre,
                simbolo: mag.simbolo,
                unidad: mag.unidad,
                tipo: mag.tipo,
                ocultar: ocultar
            });
        });

        return filas;
    }

    // --- TABLA 2: Prefijos SI ---
    function generarTablaPrefijos() {
        var seleccionados = GS.aleatorio.variosDistintos(PREFIJOS, 10);
        var filas = [];

        seleccionados.forEach(function (p) {
            // Decidimos qué columna se oculta (0 = prefijo, 1 = símbolo, 2 = factor)
            var ocultar = GS.aleatorio.entero(0, 2);
            filas.push({
                prefijo: p.prefijo,
                simbolo: p.simbolo,
                factor: p.factor,
                ocultar: ocultar
            });
        });

        return filas;
    }

    // --- BLOQUE 3: Notación científica ---
    function generarNotacionCientifica() {
        var ejercicios = [];

        // 5 ejercicios: decimal → científica
        for (var i = 0; i < 5; i++) {
            var exponente = GS.aleatorio.entero(-30, 30);
            if (exponente === 0) exponente = 5;
            var coeficiente = GS.aleatorio.decimal(1, 9.99, 2);
            var valorDecimal = coeficiente * Math.pow(10, exponente);

            ejercicios.push({
                tipo: 'decimal_a_cientifica',
                valorDecimal: valorDecimal,
                coeficiente: coeficiente,
                exponente: exponente
            });
        }

        // 5 ejercicios: científica → decimal
        for (var j = 0; j < 5; j++) {
            var exp = GS.aleatorio.entero(-15, 15);
            if (exp === 0) exp = -3;
            var coef = GS.aleatorio.decimal(1, 9.99, 2);
            var valorDec = coef * Math.pow(10, exp);

            ejercicios.push({
                tipo: 'cientifica_a_decimal',
                coeficiente: coef,
                exponente: exp,
                valorDecimal: valorDec
            });
        }

        return ejercicios;
    }

    // --- BLOQUE 4: Cambios simples ---
    function generarCambiosSimples() {
        var ejercicios = [];

        for (var i = 0; i < 6; i++) {
            var magnitud = GS.aleatorio.elemento(MAGNITUDES_SIMPLES);
            var origen = GS.aleatorio.elemento(PREFIJOS);
            var destino = GS.aleatorio.elemento(PREFIJOS);

            // Evitamos que origen y destino sean el mismo prefijo
            while (destino.simbolo === origen.simbolo) {
                destino = GS.aleatorio.elemento(PREFIJOS);
            }

            var valor = GS.aleatorio.decimal(0.5, 999, 2);

            ejercicios.push({
                magnitud: magnitud,
                origen: origen,
                destino: destino,
                valor: valor
            });
        }

        return ejercicios;
    }

    // --- BLOQUE 5: Cambios compuestos ---
    function generarCambiosCompuestos() {
        var ejercicios = [];

        // Tipos de cambio compuesto
        var tipos = [
            { nombre: 'velocidad',  desde: 'km/h',  hasta: 'm/s',  factor: 1 / 3.6      },
            { nombre: 'densidad',   desde: 'g/cm³', hasta: 'kg/m³', factor: 1000         },
            { nombre: 'presión',    desde: 'atm',   hasta: 'Pa',    factor: 101325       },
            { nombre: 'presión',    desde: 'mmHg',  hasta: 'Pa',    factor: 133.322      },
            { nombre: 'energía',    desde: 'kWh',   hasta: 'J',     factor: 3600000      },
            { nombre: 'potencia',   desde: 'CV',    hasta: 'W',     factor: 735.49875    }
        ];

        for (var i = 0; i < 6; i++) {
            var tipo = GS.aleatorio.elemento(tipos);
            var valor = GS.aleatorio.decimal(0.5, 500, 2);

            ejercicios.push({
                tipo: tipo,
                valor: valor,
                resultado: valor * tipo.factor
            });
        }

        return ejercicios;
    }

    // ======================================================================
    // 5. RENDERIZADO EN EL HTML
    // ======================================================================

    function renderTablaMagnitudes() {
        var contenedor = document.getElementById('act-tabla-magnitudes');
        if (!contenedor) return;

        var filas = estado.tablaMagnitudes;
        var html = '<table class="gs-tabla-datos" style="max-width:100%;">';
        html += '<thead><tr>';
        html += '<th>Magnitud</th>';
        html += '<th>Símbolo</th>';
        html += '<th>Unidad (SI)</th>';
        html += '<th>Tipo</th>';
        html += '</tr></thead><tbody>';

        filas.forEach(function (fila) {
            html += '<tr>';
            html += '<td>' + (fila.ocultar === 0 ? '<em>¿?</em>' : fila.magnitud) + '</td>';
            html += '<td>' + (fila.ocultar === 1 ? '<em>¿?</em>' : fila.simbolo) + '</td>';
            html += '<td>' + (fila.ocultar === 2 ? '<em>¿?</em>' : fila.unidad) + '</td>';
            html += '<td>' + (fila.ocultar === 3 ? '<em>¿?</em>' : fila.tipo) + '</td>';
            html += '</tr>';
        });

        html += '</tbody></table>';
        contenedor.innerHTML = html;
    }

    function renderTablaPrefijos() {
        var contenedor = document.getElementById('act-tabla-prefijos');
        if (!contenedor) return;

        var filas = estado.tablaPrefijos;
        var html = '<table class="gs-tabla-datos" style="max-width:100%;">';
        html += '<thead><tr>';
        html += '<th>Prefijo</th>';
        html += '<th>Símbolo</th>';
        html += '<th>Factor (potencia de 10)</th>';
        html += '</tr></thead><tbody>';

        filas.forEach(function (fila) {
            html += '<tr>';
            html += '<td>' + (fila.ocultar === 0 ? '<em>¿?</em>' : fila.prefijo) + '</td>';
            html += '<td>' + (fila.ocultar === 1 ? '<em>¿?</em>' : fila.simbolo) + '</td>';
            html += '<td>' + (fila.ocultar === 2 ? '<em>¿?</em>' : '10<sup>' + fila.factor + '</sup>') + '</td>';
            html += '</tr>';
        });

        html += '</tbody></table>';
        contenedor.innerHTML = html;
    }

    function renderNotacionCientifica() {
        var contenedor = document.getElementById('act-notacion-cientifica');
        if (!contenedor) return;

        var html = '<ol>';
        estado.notacionCientifica.forEach(function (ej) {
            if (ej.tipo === 'decimal_a_cientifica') {
                html += '<li>Escribe en notación científica el siguiente número: <strong>' +
                        formatearNumeroGrande(ej.valorDecimal) + '</strong></li>';
            } else {
                html += '<li>Escribe en forma decimal el siguiente número expresado en notación científica: <strong>' +
                        formatearNumero(ej.coeficiente, 2) + ' · 10<sup>' + ej.exponente + '</sup></strong></li>';
            }
        });
        html += '</ol>';
        contenedor.innerHTML = html;
    }

    function renderCambiosSimples() {
        var contenedor = document.getElementById('act-cambios-simples');
        if (!contenedor) return;

        var html = '<ol>';
        estado.cambiosSimples.forEach(function (ej) {
            var unidadOrigen = ej.origen.simbolo + ej.magnitud.unidadBase;
            var unidadDestino = ej.destino.simbolo + ej.magnitud.unidadBase;
            html += '<li>Expresa <strong>' + formatearNumero(ej.valor, 2) + ' ' + unidadOrigen +
                    '</strong> en <strong>' + unidadDestino + '</strong>.</li>';
        });
        html += '</ol>';
        contenedor.innerHTML = html;
    }

    function renderCambiosCompuestos() {
        var contenedor = document.getElementById('act-cambios-compuestos');
        if (!contenedor) return;

        var html = '<ol>';
        estado.cambiosCompuestos.forEach(function (ej) {
            html += '<li>Transforma <strong>' + formatearNumero(ej.valor, 2) + ' ' + ej.tipo.desde +
                    '</strong> a <strong>' + ej.tipo.hasta + '</strong>.</li>';
        });
        html += '</ol>';
        contenedor.innerHTML = html;
    }

    // ======================================================================
    // 6. GENERACIÓN DEL SOLUCIONARIO
    // ======================================================================

    function calcularCambioSimple(ej) {
        // Factor de conversión: pasar de origen a base y luego a destino
        var factorOrigen = Math.pow(10, ej.origen.factor);
        var factorDestino = Math.pow(10, ej.destino.factor);

        // Si la unidad es cuadrática o cúbica, hay que elevar el factor
        if (ej.magnitud.esCuadratica) {
            factorOrigen = Math.pow(factorOrigen, 2);
            factorDestino = Math.pow(factorDestino, 2);
        } else if (ej.magnitud.esCubica) {
            factorOrigen = Math.pow(factorOrigen, 3);
            factorDestino = Math.pow(factorDestino, 3);
        }

        return ej.valor * factorOrigen / factorDestino;
    }

    function generarHTMLSoluciones() {
        var html = '';

        // --- SOLUCIÓN TABLA 1 ---
        html += '<div class="gs-box gs-ejemplo" style="border-left-color: var(--gs-green);">';
        html += '<div class="gs-ejemplo-title"><i class="fa-solid fa-table"></i> Tabla 1: Magnitudes y Unidades</div>';
        html += '<table class="gs-tabla-datos" style="max-width:100%;">';
        html += '<thead><tr><th>Magnitud</th><th>Símbolo</th><th>Unidad (SI)</th><th>Tipo</th></tr></thead><tbody>';
        estado.tablaMagnitudes.forEach(function (fila) {
            html += '<tr>';
            html += '<td>' + fila.magnitud + '</td>';
            html += '<td>' + fila.simbolo + '</td>';
            html += '<td>' + fila.unidad + '</td>';
            html += '<td>' + fila.tipo + '</td>';
            html += '</tr>';
        });
        html += '</tbody></table></div>';

        // --- SOLUCIÓN TABLA 2 ---
        html += '<div class="gs-box gs-ejemplo" style="border-left-color: var(--gs-green);">';
        html += '<div class="gs-ejemplo-title"><i class="fa-solid fa-layer-group"></i> Tabla 2: Prefijos SI</div>';
        html += '<table class="gs-tabla-datos" style="max-width:100%;">';
        html += '<thead><tr><th>Prefijo</th><th>Símbolo</th><th>Factor</th></tr></thead><tbody>';
        estado.tablaPrefijos.forEach(function (fila) {
            html += '<tr>';
            html += '<td>' + fila.prefijo + '</td>';
            html += '<td>' + fila.simbolo + '</td>';
            html += '<td>10<sup>' + fila.factor + '</sup></td>';
            html += '</tr>';
        });
        html += '</tbody></table></div>';

        // --- SOLUCIÓN BLOQUE 3 ---
        html += '<div class="gs-box gs-ejemplo" style="border-left-color: var(--gs-green);">';
        html += '<div class="gs-ejemplo-title"><i class="fa-solid fa-calculator"></i> Bloque 3: Notación científica</div>';
        html += '<ol>';
        estado.notacionCientifica.forEach(function (ej) {
            if (ej.tipo === 'decimal_a_cientifica') {
                html += '<li>' + formatearNumeroGrande(ej.valorDecimal) + ' = <strong>' +
                        formatearNumero(ej.coeficiente, 2) + ' · 10<sup>' + ej.exponente + '</sup></strong></li>';
            } else {
                html += '<li>' + formatearNumero(ej.coeficiente, 2) + ' · 10<sup>' + ej.exponente + '</sup> = <strong>' +
                        formatearNumeroGrande(ej.valorDecimal) + '</strong></li>';
            }
        });
        html += '</ol></div>';

        // --- SOLUCIÓN BLOQUE 4 ---
        html += '<div class="gs-box gs-ejemplo" style="border-left-color: var(--gs-green);">';
        html += '<div class="gs-ejemplo-title"><i class="fa-solid fa-arrows-rotate"></i> Bloque 4: Cambios simples</div>';
        html += '<ol>';
        estado.cambiosSimples.forEach(function (ej) {
            var unidadOrigen = ej.origen.simbolo + ej.magnitud.unidadBase;
            var unidadDestino = ej.destino.simbolo + ej.magnitud.unidadBase;
            var resultado = calcularCambioSimple(ej);
            html += '<li>' + formatearNumero(ej.valor, 2) + ' ' + unidadOrigen + ' = <strong>' +
                    formatearNumero(resultado, 6) + ' ' + unidadDestino + '</strong></li>';
        });
        html += '</ol></div>';

        // --- SOLUCIÓN BLOQUE 5 ---
        html += '<div class="gs-box gs-ejemplo" style="border-left-color: var(--gs-green);">';
        html += '<div class="gs-ejemplo-título"><i class="fa-solid fa-flask"></i> Bloque 5: Cambios compuestos</div>';
        html += '<ol>';
        estado.cambiosCompuestos.forEach(function (ej) {
            html += '<li>' + formatearNumero(ej.valor, 2) + ' ' + ej.tipo.desde + ' = <strong>' +
                    formatearNumero(ej.resultado, 4) + ' ' + ej.tipo.hasta + '</strong></li>';
        });
        html += '</ol></div>';

        return html;
    }

    // ======================================================================
    // 7. VERIFICACIÓN DEL PIN Y MOSTRAR SOLUCIONES
    // ======================================================================

    async function verificarPin() {
        var pinInput = document.getElementById('solPinInput');
        var errorMsg = document.getElementById('solErrorMsg');
        var btn = document.getElementById('btnUnlockSol');
        var contentDiv = document.getElementById('protectedSolutions');
        var lockIcon = document.getElementById('lockIcon');

        if (!pinInput) return;
        var pin = pinInput.value.trim();

        if (!pin || pin.length !== 6) {
            if (errorMsg) {
                errorMsg.innerText = 'Escribe el código completo de 6 dígitos.';
                errorMsg.style.color = '#dc2626';
                errorMsg.style.display = 'block';
            }
            return;
        }

        if (errorMsg) {
            errorMsg.innerText = 'Verificando código...';
            errorMsg.style.color = '#1e3a8a';
            errorMsg.style.display = 'block';
        }
        if (btn) btn.disabled = true;

        var ok = await GS.verifyPinOnly(pin);

        if (ok) {
            if (errorMsg) errorMsg.style.display = 'none';
            contentDiv.innerHTML = generarHTMLSoluciones();
            contentDiv.style.display = 'block';
            if (lockIcon) lockIcon.className = 'fa-solid fa-user-check';

            if (window.MathJax && window.MathJax.typesetPromise) {
                window.MathJax.typesetPromise([contentDiv]);
            }

            contentDiv.scrollIntoView({ behavior: 'smooth' });
            var authContainer = document.getElementById('solAuthContainer');
            if (authContainer) authContainer.style.display = 'none';
        } else {
            if (errorMsg) {
                errorMsg.innerText = 'Código incorrecto. Inténtalo de nuevo.';
                errorMsg.style.color = '#dc2626';
                errorMsg.style.display = 'block';
            }
            if (btn) btn.disabled = false;
        }
    }
    window.verificarPin = verificarPin;

    // ======================================================================
    // 8. GENERAR TODO AL CARGAR
    // ======================================================================

    function generarTodo() {
        estado.tablaMagnitudes = generarTablaMagnitudes();
        estado.tablaPrefijos = generarTablaPrefijos();
        estado.notacionCientifica = generarNotacionCientifica();
        estado.cambiosSimples = generarCambiosSimples();
        estado.cambiosCompuestos = generarCambiosCompuestos();

        renderTablaMagnitudes();
        renderTablaPrefijos();
        renderNotacionCientifica();
        renderCambiosSimples();
        renderCambiosCompuestos();
    }

    // Esperamos a que el core esté listo
    document.addEventListener('gs-ready', function () {
        generarTodo();
    });

    // Si el DOM ya está listo cuando se carga el script, generamos inmediatamente
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(generarTodo, 100);
    }

})();