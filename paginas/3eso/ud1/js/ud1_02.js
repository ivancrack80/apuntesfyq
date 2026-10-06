/* ==========================================================================
   UD1_02.JS — Módulo de actividades aleatorias para 3º ESO ud1_02
   Contenido: Magnitudes, unidades, prefijos SI, notación científica,
   cambios de unidades.
   Uso: <script src="js/ud1_02.js"></script> (después de gs-core.js)
   ========================================================================== */

(function () {
    'use strict';

    // ======================================================================
    // 1. DATOS BASE
    // ======================================================================

    var MAGNITUDES = [
        { nombre: 'Longitud',                simbolo: 'l',  unidad: 'm',      tipo: 'Fundamental' },
        { nombre: 'Masa',                    simbolo: 'm',  unidad: 'kg',     tipo: 'Fundamental' },
        { nombre: 'Tiempo',                  simbolo: 't',  unidad: 's',      tipo: 'Fundamental' },
        { nombre: 'Temperatura absoluta',    simbolo: 'T',  unidad: 'K',      tipo: 'Fundamental' },
        { nombre: 'Cantidad de sustancia',   simbolo: 'n',  unidad: 'mol',    tipo: 'Fundamental' },
        { nombre: 'Intensidad de corriente', simbolo: 'I',  unidad: 'A',      tipo: 'Fundamental' },
        { nombre: 'Intensidad luminosa',     simbolo: 'Iv', unidad: 'cd',     tipo: 'Fundamental' },
        { nombre: 'Superficie (Área)',       simbolo: 'S',  unidad: 'm²',     tipo: 'Derivada' },
        { nombre: 'Volumen',                 simbolo: 'V',  unidad: 'm³',     tipo: 'Derivada' },
        { nombre: 'Densidad',                simbolo: 'd',  unidad: 'kg/m³',  tipo: 'Derivada' },
        { nombre: 'Velocidad',               simbolo: 'v',  unidad: 'm/s',    tipo: 'Derivada' },
        { nombre: 'Aceleración',             simbolo: 'a',  unidad: 'm/s²',   tipo: 'Derivada' },
        { nombre: 'Fuerza',                  simbolo: 'F',  unidad: 'N',      tipo: 'Derivada' },
        { nombre: 'Presión',                 simbolo: 'P',  unidad: 'Pa',     tipo: 'Derivada' },
        { nombre: 'Energía / Trabajo',       simbolo: 'E',  unidad: 'J',      tipo: 'Derivada' },
        { nombre: 'Potencia',                simbolo: 'P',  unidad: 'W',      tipo: 'Derivada' }
    ];

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

    var MAGNITUDES_SIMPLES = [
        { nombre: 'longitud',   unidadBase: 'm',  esCuadratica: false, esCubica: false },
        { nombre: 'masa',       unidadBase: 'g',  esCuadratica: false, esCubica: false },
        { nombre: 'capacidad',  unidadBase: 'L',  esCuadratica: false, esCubica: false },
        { nombre: 'superficie', unidadBase: 'm²', esCuadratica: true,  esCubica: false },
        { nombre: 'volumen',    unidadBase: 'm³', esCuadratica: false, esCubica: true  }
    ];

    var TIPOS_COMPUESTOS = [
        { nombre: 'velocidad', desde: 'km/h',  hasta: 'm/s',   factor: 1 / 3.6,   explicacion: 'dividimos entre 3,6' },
        { nombre: 'densidad',  desde: 'g/cm³', hasta: 'kg/m³', factor: 1000,      explicacion: 'multiplicamos por 1000' },
        { nombre: 'presión',   desde: 'atm',   hasta: 'Pa',    factor: 101325,    explicacion: 'multiplicamos por 101 325' },
        { nombre: 'presión',   desde: 'mmHg',  hasta: 'Pa',    factor: 133.322,   explicacion: 'multiplicamos por 133,322' },
        { nombre: 'energía',   desde: 'kWh',   hasta: 'J',     factor: 3600000,   explicacion: 'multiplicamos por 3 600 000' },
        { nombre: 'potencia',  desde: 'CV',    hasta: 'W',     factor: 735.49875, explicacion: 'multiplicamos por 735,5' }
    ];

    // ======================================================================
    // 2. ESTADO
    // ======================================================================
    var estado = {
        tablaMagnitudes: [],
        tablaPrefijos: [],
        notacionCientifica: [],
        cambiosSimples: [],
        cambiosCompuestos: []
    };

    // ======================================================================
    // 3. UTILIDADES
    // ======================================================================

    function num(valor, decimales) {
        var d = decimales === undefined ? 2 : decimales;
        return valor.toFixed(d).replace('.', ',');
    }

    function numGrande(n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    // ======================================================================
    // 4. GENERADORES
    // ======================================================================

    function generarTablaMagnitudes() {
        var seleccion = GS.aleatorio.variosDistintos(MAGNITUDES, 10);
        var filas = [];
        seleccion.forEach(function (m) {
            filas.push({
                magnitud: m.nombre,
                simbolo: m.simbolo,
                unidad: m.unidad,
                tipo: m.tipo,
                ocultar: GS.aleatorio.entero(0, 3)
            });
        });
        return filas;
    }

    function generarTablaPrefijos() {
        var seleccion = GS.aleatorio.variosDistintos(PREFIJOS, 10);
        var filas = [];
        seleccion.forEach(function (p) {
            filas.push({
                prefijo: p.prefijo,
                simbolo: p.simbolo,
                factor: p.factor,
                ocultar: GS.aleatorio.entero(0, 2)
            });
        });
        return filas;
    }

    function generarNotacionCientifica() {
        var ejercicios = [];

        // 5 decimal -> científica
        for (var i = 0; i < 5; i++) {
            var exp = GS.aleatorio.entero(1, 30) * GS.aleatorio.signo();
            var coef = GS.aleatorio.decimal(1, 9.99, 2);
            var valor = coef * Math.pow(10, exp);
            ejercicios.push({
                tipo: 'decimal_a_cientifica',
                valorDecimal: valor,
                coeficiente: coef,
                exponente: exp
            });
        }

        // 5 científica -> decimal
        for (var j = 0; j < 5; j++) {
            var e2 = GS.aleatorio.entero(1, 15) * GS.aleatorio.signo();
            var c2 = GS.aleatorio.decimal(1, 9.99, 2);
            var v2 = c2 * Math.pow(10, e2);
            ejercicios.push({
                tipo: 'cientifica_a_decimal',
                coeficiente: c2,
                exponente: e2,
                valorDecimal: v2
            });
        }

        // Mezclamos el orden
        return GS.aleatorio.barajar(ejercicios);
    }

    function generarCambiosSimples() {
        var ejercicios = [];
        for (var i = 0; i < 6; i++) {
            var magnitud = GS.aleatorio.elemento(MAGNITUDES_SIMPLES);
            var origen = GS.aleatorio.elemento(PREFIJOS);
            var destino = GS.aleatorio.elemento(PREFIJOS);
            while (destino.simbolo === origen.simbolo) {
                destino = GS.aleatorio.elemento(PREFIJOS);
            }
            ejercicios.push({
                magnitud: magnitud,
                origen: origen,
                destino: destino,
                valor: GS.aleatorio.decimal(0.5, 999, 2)
            });
        }
        return ejercicios;
    }

    function generarCambiosCompuestos() {
        var ejercicios = [];
        for (var i = 0; i < 6; i++) {
            var tipo = GS.aleatorio.elemento(TIPOS_COMPUESTOS);
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
    // 5. RENDERIZADO DE ACTIVIDADES
    // ======================================================================

    function renderTablaMagnitudes() {
        var cont = document.getElementById('act-tabla-magnitudes');
        if (!cont) return;
        var html = '<table class="gs-tabla-datos" style="max-width:100%;">';
        html += '<thead><tr><th>Magnitud</th><th>Símbolo</th><th>Unidad (SI)</th><th>Tipo</th></tr></thead><tbody>';
        estado.tablaMagnitudes.forEach(function (f) {
            html += '<tr>';
            html += '<td>' + (f.ocultar === 0 ? '<em>¿?</em>' : f.magnitud) + '</td>';
            html += '<td>' + (f.ocultar === 1 ? '<em>¿?</em>' : f.simbolo) + '</td>';
            html += '<td>' + (f.ocultar === 2 ? '<em>¿?</em>' : f.unidad) + '</td>';
            html += '<td>' + (f.ocultar === 3 ? '<em>¿?</em>' : f.tipo) + '</td>';
            html += '</tr>';
        });
        html += '</tbody></table>';
        cont.innerHTML = html;
    }

    function renderTablaPrefijos() {
        var cont = document.getElementById('act-tabla-prefijos');
        if (!cont) return;
        var html = '<table class="gs-tabla-datos" style="max-width:100%;">';
        html += '<thead><tr><th>Prefijo</th><th>Símbolo</th><th>Factor (potencia de 10)</th></tr></thead><tbody>';
        estado.tablaPrefijos.forEach(function (f) {
            html += '<tr>';
            html += '<td>' + (f.ocultar === 0 ? '<em>¿?</em>' : f.prefijo) + '</td>';
            html += '<td>' + (f.ocultar === 1 ? '<em>¿?</em>' : f.simbolo) + '</td>';
            html += '<td>' + (f.ocultar === 2 ? '<em>¿?</em>' : '10<sup>' + f.factor + '</sup>') + '</td>';
            html += '</tr>';
        });
        html += '</tbody></table>';
        cont.innerHTML = html;
    }

    function renderNotacionCientifica() {
        var cont = document.getElementById('act-notacion-cientifica');
        if (!cont) return;
        var html = '<ol>';
        estado.notacionCientifica.forEach(function (e) {
            if (e.tipo === 'decimal_a_cientifica') {
                html += '<li>Escribe en notación científica: <strong>' + numGrande(e.valorDecimal) + '</strong></li>';
            } else {
                html += '<li>Escribe en forma decimal: <strong>' + num(e.coeficiente, 2) + ' · 10<sup>' + e.exponente + '</sup></strong></li>';
            }
        });
        html += '</ol>';
        cont.innerHTML = html;
    }

    function renderCambiosSimples() {
        var cont = document.getElementById('act-cambios-simples');
        if (!cont) return;
        var html = '<ol>';
        estado.cambiosSimples.forEach(function (e) {
            var uO = e.origen.simbolo + e.magnitud.unidadBase;
            var uD = e.destino.simbolo + e.magnitud.unidadBase;
            html += '<li>Expresa <strong>' + num(e.valor, 2) + ' ' + uO + '</strong> en <strong>' + uD + '</strong>.</li>';
        });
        html += '</ol>';
        cont.innerHTML = html;
    }

    function renderCambiosCompuestos() {
        var cont = document.getElementById('act-cambios-compuestos');
        if (!cont) return;
        var html = '<ol>';
        estado.cambiosCompuestos.forEach(function (e) {
            html += '<li>Transforma <strong>' + num(e.valor, 2) + ' ' + e.tipo.desde + '</strong> a <strong>' + e.tipo.hasta + '</strong>.</li>';
        });
        html += '</ol>';
        cont.innerHTML = html;
    }

    // ======================================================================
    // 6. SOLUCIONARIO
    // ======================================================================

    function calcularCambioSimple(e) {
        var fO = Math.pow(10, e.origen.factor);
        var fD = Math.pow(10, e.destino.factor);
        if (e.magnitud.esCuadratica) {
            fO = Math.pow(fO, 2);
            fD = Math.pow(fD, 2);
        } else if (e.magnitud.esCubica) {
            fO = Math.pow(fO, 3);
            fD = Math.pow(fD, 3);
        }
        return e.valor * fO / fD;
    }

    function generarHTMLSoluciones() {
        var html = '';

        // Tabla 1
        html += '<div class="gs-box gs-ejemplo" style="border-left-color: var(--gs-green);">';
        html += '<div class="gs-ejemplo-title"><i class="fa-solid fa-table"></i> Tabla 1: Magnitudes y Unidades</div>';
        html += '<table class="gs-tabla-datos" style="max-width:100%;"><thead><tr><th>Magnitud</th><th>Símbolo</th><th>Unidad</th><th>Tipo</th></tr></thead><tbody>';
        estado.tablaMagnitudes.forEach(function (f) {
            html += '<tr><td>' + f.magnitud + '</td><td>' + f.simbolo + '</td><td>' + f.unidad + '</td><td>' + f.tipo + '</td></tr>';
        });
        html += '</tbody></table></div>';

        // Tabla 2
        html += '<div class="gs-box gs-ejemplo" style="border-left-color: var(--gs-green);">';
        html += '<div class="gs-ejemplo-title"><i class="fa-solid fa-layer-group"></i> Tabla 2: Prefijos SI</div>';
        html += '<table class="gs-tabla-datos" style="max-width:100%;"><thead><tr><th>Prefijo</th><th>Símbolo</th><th>Factor</th></tr></thead><tbody>';
        estado.tablaPrefijos.forEach(function (f) {
            html += '<tr><td>' + f.prefijo + '</td><td>' + f.simbolo + '</td><td>10<sup>' + f.factor + '</sup></td></tr>';
        });
        html += '</tbody></table></div>';

        // Notación científica
        html += '<div class="gs-box gs-ejemplo" style="border-left-color: var(--gs-green);">';
        html += '<div class="gs-ejemplo-title"><i class="fa-solid fa-calculator"></i> Bloque 3: Notación Científica</div><ol>';
        estado.notacionCientifica.forEach(function (e) {
            if (e.tipo === 'decimal_a_cientifica') {
                html += '<li>' + numGrande(e.valorDecimal) + ' = <strong>' + num(e.coeficiente, 2) + ' · 10<sup>' + e.exponente + '</sup></strong></li>';
            } else {
                html += '<li>' + num(e.coeficiente, 2) + ' · 10<sup>' + e.exponente + '</sup> = <strong>' + numGrande(e.valorDecimal) + '</strong></li>';
            }
        });
        html += '</ol></div>';

        // Cambios simples
        html += '<div class="gs-box gs-ejemplo" style="border-left-color: var(--gs-green);">';
        html += '<div class="gs-ejemplo-title"><i class="fa-solid fa-arrows-rotate"></i> Bloque 4: Cambios Simples</div><ol>';
        estado.cambiosSimples.forEach(function (e) {
            var uO = e.origen.simbolo + e.magnitud.unidadBase;
            var uD = e.destino.simbolo + e.magnitud.unidadBase;
            var resultado = calcularCambioSimple(e);
            var factor = calcularFactorTexto(e);
            html += '<li>' + num(e.valor, 2) + ' ' + uO + ' = <strong>' + num(resultado, 6) + ' ' + uD + '</strong><br><small style="color:#64748b;">' + factor + '</small></li>';
        });
        html += '</ol></div>';

        // Cambios compuestos
        html += '<div class="gs-box gs-ejemplo" style="border-left-color: var(--gs-green);">';
        html += '<div class="gs-ejemplo-title"><i class="fa-solid fa-flask"></i> Bloque 5: Cambios Compuestos</div><ol>';
        estado.cambiosCompuestos.forEach(function (e) {
            html += '<li>' + num(e.valor, 2) + ' ' + e.tipo.desde + ' = <strong>' + num(e.resultado, 4) + ' ' + e.tipo.hasta + '</strong><br><small style="color:#64748b;">' + e.tipo.explicacion + '</small></li>';
        });
        html += '</ol></div>';

        return html;
    }

    function calcularFactorTexto(e) {
        var factor = Math.pow(10, e.origen.factor - e.destino.factor);
        if (e.magnitud.esCuadratica) factor = Math.pow(factor, 2);
        if (e.magnitud.esCubica) factor = Math.pow(factor, 3);
        if (factor === 1) return 'no hay cambio de factor';
        if (factor > 1) return 'multiplicamos por ' + numGrande(factor);
        return 'dividimos entre ' + numGrande(1 / factor);
    }

    // ======================================================================
    // 7. VERIFICAR PIN
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
    // 8. GENERAR TODO
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

    window.generarNuevasActividades = function() {
        // Si ya se había desbloqueado el solucionario, lo ocultamos
        var contentDiv = document.getElementById('protectedSolutions');
        var authContainer = document.getElementById('solAuthContainer');
        var lockIcon = document.getElementById('lockIcon');
        if (contentDiv) {
            contentDiv.style.display = 'none';
            contentDiv.innerHTML = '';
        }
        if (authContainer) authContainer.style.display = 'flex';
        if (lockIcon) lockIcon.className = 'fa-solid fa-user-lock';

        generarTodo();

        // Scroll suave al inicio del bloque de actividades
        var actDiv = document.getElementById('act-tabla-magnitudes');
        if (actDiv) actDiv.scrollIntoView({ behavior: 'smooth' });
    };

    document.addEventListener('gs-ready', generarTodo);

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(generarTodo, 100);
    }

})();