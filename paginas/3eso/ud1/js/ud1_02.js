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

    // Cambios compuestos permitidos (solo unidades que aparecen en las tablas anteriores)
    var TIPOS_COMPUESTOS = [
        {
            nombre: 'velocidad',
            desde: 'm/s', hasta: 'km/h',
            factor: 3.6,
            tipoFactor: 'simple',
            explicacion: 'multiplicamos por 3,6'
        },
        {
            nombre: 'velocidad',
            desde: 'km/h', hasta: 'm/s',
            factor: 1 / 3.6,
            tipoFactor: 'simple',
            explicacion: 'dividimos entre 3,6'
        },
        {
            nombre: 'caudal',
            desde: 'kg/h', hasta: 'g/s',
            factor: 1000 / 3600,
            tipoFactor: 'tiempo_masa',
            explicacion: 'pasamos de horas a segundos y de kilogramos a gramos'
        },
        {
            nombre: 'caudal',
            desde: 'g/s', hasta: 'kg/h',
            factor: 3600 / 1000,
            tipoFactor: 'tiempo_masa',
            explicacion: 'pasamos de segundos a horas y de gramos a kilogramos'
        },
        {
            nombre: 'densidad',
            desde: 'g/cm³', hasta: 'kg/m³',
            factor: 1000,
            tipoFactor: 'densidad',
            explicacion: 'multiplicamos por 1000'
        },
        {
            nombre: 'densidad',
            desde: 'kg/m³', hasta: 'g/cm³',
            factor: 1 / 1000,
            tipoFactor: 'densidad',
            explicacion: 'dividimos entre 1000'
        },
        {
            nombre: 'presión superficial',
            desde: 'kJ/m²', hasta: 'J/cm²',
            factor: 0.1,
            tipoFactor: 'superficie',
            explicacion: 'pasamos de kilojulios a julios y de metros cuadrados a centímetros cuadrados'
        }
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

    // Formatea un número con coma decimal, SIN separador de miles (para LaTeX)
    function num(valor, decimales) {
        var d = decimales === undefined ? 2 : decimales;
        return valor.toFixed(d).replace('.', ',');
    }

    // Formatea un número entero con separador de miles mediante espacios finos de LaTeX
    // Ejemplo: 5688788556 -> "5\,688\,788\,556"
    function numGrandeLatex(n) {
        var str = Math.abs(Math.round(n)).toString();
        var partes = [];
        while (str.length > 3) {
            partes.unshift(str.slice(-3));
            str = str.slice(0, -3);
        }
        partes.unshift(str);
        var resultado = partes.join('\\,');
        return (n < 0 ? '-' : '') + resultado;
    }

    // Devuelve una cadena LaTeX lista para meter entre \( ... \)
    function latexNumero(valor, decimales) {
        return num(valor, decimales);
    }

    // Devuelve un coeficiente en notación científica listo para LaTeX
    function latexNotacionCientifica(coef, exp) {
        return num(coef, 2) + ' \\cdot 10^{' + exp + '}';
    }

    // ======================================================================
    // 4. GENERADORES
    // ======================================================================

    function generarTablaMagnitudes() {
        var seleccion = GS.aleatorio.variosDistintos(MAGNITUDES, 10);
        var filas = [];
        seleccion.forEach(function (m) {
            // Decidimos si damos la magnitud o la unidad
            // Si damos magnitud -> unidad vacía y viceversa
            var darMagnitud = GS.aleatorio.booleano();
            filas.push({
                magnitud: m.nombre,
                unidad: m.unidad,
                tipo: m.tipo,
                dato: darMagnitud ? 'magnitud' : 'unidad'
            });
        });
        return filas;
    }

    function generarTablaPrefijos() {
        var seleccion = GS.aleatorio.variosDistintos(PREFIJOS, 10);
        var filas = [];
        seleccion.forEach(function (p) {
            // Elegimos qué dato dar: prefijo, símbolo o factor
            var cual = GS.aleatorio.entero(0, 2);
            filas.push({
                prefijo: p.prefijo,
                simbolo: p.simbolo,
                factor: p.factor,
                dato: cual // 0 = prefijo, 1 = símbolo, 2 = factor
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

        // Mezclamos
        return GS.aleatorio.barajar(ejercicios);
    }

    function generarCambiosSimples() {
        var ejercicios = [];

        // 6 ejercicios normales entre prefijos (m, g, L, m², m³)
        for (var i = 0; i < 4; i++) {
            var magnitud = GS.aleatorio.elemento(MAGNITUDES_SIMPLES);
            var origen = GS.aleatorio.elemento(PREFIJOS);
            var destino = GS.aleatorio.elemento(PREFIJOS);
            while (destino.simbolo === origen.simbolo) {
                destino = GS.aleatorio.elemento(PREFIJOS);
            }
            ejercicios.push({
                tipo: 'prefijo',
                magnitud: magnitud,
                origen: origen,
                destino: destino,
                valor: GS.aleatorio.decimal(0.5, 999, 2)
            });
        }

        // 2 ejercicios específicos de L <-> m³ (usando el puente 1 dm³ = 1 L)
        // 1 L -> m³
        ejercicios.push({
            tipo: 'litros_a_m3',
            valor: GS.aleatorio.decimal(0.5, 999, 2)
        });
        // m³ -> L
        ejercicios.push({
            tipo: 'm3_a_litros',
            valor: GS.aleatorio.decimal(0.001, 5, 3)
        });

        return GS.aleatorio.barajar(ejercicios);
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
        html += '<thead><tr>';
        html += '<th>Magnitud</th>';
        html += '<th>Símbolo de unidad</th>';
        html += '<th>Fundamental o Derivada</th>';
        html += '</tr></thead><tbody>';

        estado.tablaMagnitudes.forEach(function (f) {
            var colMagnitud = '', colUnidad = '';

            if (f.dato === 'magnitud') {
                colMagnitud = f.magnitud;
                colUnidad = ''; // vacío
            } else {
                colMagnitud = ''; // vacío
                colUnidad = f.unidad;
            }

            html += '<tr>';
            html += '<td>' + colMagnitud + '</td>';
            html += '<td>' + colUnidad + '</td>';
            html += '<td></td>'; // siempre vacío
            html += '</tr>';
        });

        html += '</tbody></table>';
        cont.innerHTML = html;
    }

    function renderTablaPrefijos() {
        var cont = document.getElementById('act-tabla-prefijos');
        if (!cont) return;

        var html = '<table class="gs-tabla-datos" style="max-width:100%;">';
        html += '<thead><tr>';
        html += '<th>Prefijo</th>';
        html += '<th>Símbolo</th>';
        html += '<th>Factor (potencia de 10)</th>';
        html += '</tr></thead><tbody>';

        estado.tablaPrefijos.forEach(function (f) {
            var cP = '', cS = '', cF = '';

            if (f.dato === 0) {
                cP = f.prefijo;
            } else if (f.dato === 1) {
                cS = f.simbolo;
            } else {
                cF = '\\(10^{' + f.factor + '}\\)';
            }

            html += '<tr>';
            html += '<td>' + cP + '</td>';
            html += '<td>' + cS + '</td>';
            html += '<td>' + cF + '</td>';
            html += '</tr>';
        });

        html += '</tbody></table>';
        cont.innerHTML = html;
    }

    function renderNotacionCientifica() {
        var cont = document.getElementById('act-notacion-cientifica');
        if (!cont) return;

        var html = '<table class="gs-tabla-datos" style="max-width:100%;">';
        html += '<thead><tr>';
        html += '<th>Notación científica</th>';
        html += '<th>Forma decimal</th>';
        html += '</tr></thead><tbody>';

        estado.notacionCientifica.forEach(function (e) {
            var colCientifica = '', colDecimal = '';

            if (e.tipo === 'decimal_a_cientifica') {
                colCientifica = ''; // vacío
                colDecimal = '\\(' + numGrandeLatex(e.valorDecimal) + '\\)';
            } else {
                colCientifica = '\\(' + latexNotacionCientifica(e.coeficiente, e.exponente) + '\\)';
                colDecimal = ''; // vacío
            }

            html += '<tr>';
            html += '<td>' + colCientifica + '</td>';
            html += '<td>' + colDecimal + '</td>';
            html += '</tr>';
        });

        html += '</tbody></table>';
        cont.innerHTML = html;

        if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise([cont]);
        }
    }

    function renderCambiosSimples() {
        var cont = document.getElementById('act-cambios-simples');
        if (!cont) return;

        var html = '<ol>';
        estado.cambiosSimples.forEach(function (e) {
            if (e.tipo === 'prefijo') {
                var uO = e.origen.simbolo + e.magnitud.unidadBase;
                var uD = e.destino.simbolo + e.magnitud.unidadBase;
                html += '<li>Expresa \\(' + num(e.valor, 2) + '\\, \\text{' + uO + '}\\) en \\(\\text{' + uD + '}\\).</li>';
            } else if (e.tipo === 'litros_a_m3') {
                html += '<li>Expresa \\(' + num(e.valor, 2) + '\\, \\text{L}\\) en \\(\\text{m}^3\\).</li>';
            } else if (e.tipo === 'm3_a_litros') {
                html += '<li>Expresa \\(' + num(e.valor, 3) + '\\, \\text{m}^3\\) en \\(\\text{L}\\).</li>';
            }
        });
        html += '</ol>';
        cont.innerHTML = html;

        if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise([cont]);
        }
    }

    function renderCambiosCompuestos() {
        var cont = document.getElementById('act-cambios-compuestos');
        if (!cont) return;

        var html = '<ol>';
        estado.cambiosCompuestos.forEach(function (e) {
            html += '<li>Transforma \\(' + num(e.valor, 2) + '\\, \\text{' + e.tipo.desde + '}\\) a \\(\\text{' + e.tipo.hasta + '}\\).</li>';
        });
        html += '</ol>';
        cont.innerHTML = html;

        if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise([cont]);
        }
    }

    // ======================================================================
    // 6. SOLUCIONARIO
    // ======================================================================

    function generarHTMLSoluciones() {
        var html = '';

        // Tabla 1
        html += '<div class="gs-box gs-ejemplo" style="border-left-color: var(--gs-green);">';
        html += '<div class="gs-ejemplo-title"><i class="fa-solid fa-table"></i> Tabla 1: Magnitudes y Unidades</div>';
        html += '<table class="gs-tabla-datos" style="max-width:100%;">';
        html += '<thead><tr><th>Magnitud</th><th>Símbolo</th><th>Unidad (SI)</th><th>Tipo</th></tr></thead><tbody>';
        estado.tablaMagnitudes.forEach(function (f) {
            html += '<tr><td>' + f.magnitud + '</td><td>' + f.unidad + '</td><td>' + f.unidad + '</td><td>' + f.tipo + '</td></tr>';
        });
        html += '</tbody></table></div>';

        // Tabla 2
        html += '<div class="gs-box gs-ejemplo" style="border-left-color: var(--gs-green);">';
        html += '<div class="gs-ejemplo-title"><i class="fa-solid fa-layer-group"></i> Tabla 2: Prefijos SI</div>';
        html += '<table class="gs-tabla-datos" style="max-width:100%;">';
        html += '<thead><tr><th>Prefijo</th><th>Símbolo</th><th>Factor</th></tr></thead><tbody>';
        estado.tablaPrefijos.forEach(function (f) {
            html += '<tr><td>' + f.prefijo + '</td><td>' + f.simbolo + '</td><td>\\(10^{' + f.factor + '}\\)</td></tr>';
        });
        html += '</tbody></table></div>';

        // Notación científica
        html += '<div class="gs-box gs-ejemplo" style="border-left-color: var(--gs-green);">';
        html += '<div class="gs-ejemplo-title"><i class="fa-solid fa-calculator"></i> Bloque 3: Notación Científica</div>';
        html += '<table class="gs-tabla-datos" style="max-width:100%;">';
        html += '<thead><tr><th>Notación científica</th><th>Forma decimal</th></tr></thead><tbody>';
        estado.notacionCientifica.forEach(function (e) {
            var colC = '\\(' + latexNotacionCientifica(e.coeficiente, e.exponente) + '\\)';
            var colD = '\\(' + numGrandeLatex(e.valorDecimal) + '\\)';
            html += '<tr><td>' + colC + '</td><td>' + colD + '</td></tr>';
        });
        html += '</tbody></table></div>';

        // Cambios simples
        html += '<div class="gs-box gs-ejemplo" style="border-left-color: var(--gs-green);">';
        html += '<div class="gs-ejemplo-title"><i class="fa-solid fa-arrows-rotate"></i> Bloque 4: Cambios Simples de Unidades</div>';
        html += '<ol>';
        estado.cambiosSimples.forEach(function (e) {
            html += '<li>' + generarSolucionCambioSimple(e) + '</li>';
        });
        html += '</ol></div>';

        // Cambios compuestos
        html += '<div class="gs-box gs-ejemplo" style="border-left-color: var(--gs-green);">';
        html += '<div class="gs-ejemplo-title"><i class="fa-solid fa-flask"></i> Bloque 5: Cambios Compuestos de Unidades</div>';
        html += '<ol>';
        estado.cambiosCompuestos.forEach(function (e) {
            html += '<li>' + generarSolucionCambioCompuesto(e) + '</li>';
        });
        html += '</ol></div>';

        return html;
    }

    // --- Solución detallada de un cambio simple ---
    function generarSolucionCambioSimple(e) {
        if (e.tipo === 'litros_a_m3') {
            var resultado = e.valor / 1000;
            var html = '\\(' + num(e.valor, 2) + '\\, \\text{L} = ' + num(resultado, 6) + '\\, \\text{m}^3\\)<br>';
            html += '<div class="gs-latex-container" style="margin: 8px 0; padding: 10px;">';
            html += '\\(' + num(e.valor, 2) + '\\, \\text{L} \\cdot \\dfrac{1\\, \\text{m}^3}{1000\\, \\text{L}} = ' + num(resultado, 6) + '\\, \\text{m}^3\\)';
            html += '</div>';
            html += '<small style="color:#64748b;">1 m³ = 1000 L. La unidad destino es más grande, por eso el número disminuye.</small>';
            return html;
        }

        if (e.tipo === 'm3_a_litros') {
            var resultado2 = e.valor * 1000;
            var html2 = '\\(' + num(e.valor, 3) + '\\, \\text{m}^3 = ' + numGrandeLatex(resultado2) + '\\, \\text{L}\\)<br>';
            html2 += '<div class="gs-latex-container" style="margin: 8px 0; padding: 10px;">';
            html2 += '\\(' + num(e.valor, 3) + '\\, \\text{m}^3 \\cdot \\dfrac{1000\\, \\text{L}}{1\\, \\text{m}^3} = ' + numGrandeLatex(resultado2) + '\\, \\text{L}\\)';
            html2 += '</div>';
            html2 += '<small style="color:#64748b;">1 m³ = 1000 L. La unidad destino es más pequeña, por eso el número aumenta.</small>';
            return html2;
        }

        // Caso normal entre prefijos
        var uO = e.origen.simbolo + e.magnitud.unidadBase;
        var uD = e.destino.simbolo + e.magnitud.unidadBase;

        var factorOrigen = Math.pow(10, e.origen.factor);
        var factorDestino = Math.pow(10, e.destino.factor);

        var exponenteTexto = '';
        if (e.magnitud.esCuadratica) {
            factorOrigen = Math.pow(factorOrigen, 2);
            factorDestino = Math.pow(factorDestino, 2);
            exponenteTexto = '²';
        } else if (e.magnitud.esCubica) {
            factorOrigen = Math.pow(factorOrigen, 3);
            factorDestino = Math.pow(factorDestino, 3);
            exponenteTexto = '³';
        }

        var resultado3 = e.valor * factorOrigen / factorDestino;

        var expO = e.origen.factor * (e.magnitud.esCuadratica ? 2 : (e.magnitud.esCubica ? 3 : 1));
        var expD = e.destino.factor * (e.magnitud.esCuadratica ? 2 : (e.magnitud.esCubica ? 3 : 1));

        var html3 = '\\(' + num(e.valor, 2) + '\\, \\text{' + uO + '} = ' + num(resultado3, 6) + '\\, \\text{' + uD + '}\\)<br>';

        html3 += '<div class="gs-latex-container" style="margin: 8px 0; padding: 10px;">';
        html3 += '\\(' + num(e.valor, 2) + '\\, \\text{' + uO + '} \\cdot \\dfrac{10^{' + expD + '}\\, \\text{' + uD + '}}{10^{' + expO + '}\\, \\text{' + uO + '}} = ' + num(resultado3, 6) + '\\, \\text{' + uD + '}\\)';
        html3 += '</div>';

        var factorNeto = expO - expD;
        if (factorNeto > 0) {
            html3 += '<small style="color:#64748b;">Multiplicamos por 10<sup>' + factorNeto + '</sup>: la unidad destino es más pequeña, así que el número aumenta.</small>';
        } else if (factorNeto < 0) {
            html3 += '<small style="color:#64748b;">Dividimos entre 10<sup>' + Math.abs(factorNeto) + '</sup>: la unidad destino es más grande, así que el número disminuye.</small>';
        } else {
            html3 += '<small style="color:#64748b;">No hay cambio de factor.</small>';
        }

        return html3;
    }

    // --- Solución detallada de un cambio compuesto ---
    function generarSolucionCambioCompuesto(e) {
        var html = '\\(' + num(e.valor, 2) + '\\, \\text{' + e.tipo.desde + '} = ' + num(e.resultado, 4) + '\\, \\text{' + e.tipo.hasta + '}\\)<br>';

        var factorTexto = '';

        if (e.tipo.nombre === 'velocidad' && e.tipo.desde === 'km/h') {
            factorTexto = num(e.valor, 2) + '\\, \\dfrac{\\text{km}}{\\text{h}} \\cdot \\dfrac{10^3\\, \\text{m}}{1\\, \\text{km}} \\cdot \\dfrac{1\\, \\text{h}}{3600\\, \\text{s}} = ' + num(e.resultado, 4) + '\\, \\dfrac{\\text{m}}{\\text{s}}';
        } else if (e.tipo.nombre === 'velocidad' && e.tipo.desde === 'm/s') {
            factorTexto = num(e.valor, 2) + '\\, \\dfrac{\\text{m}}{\\text{s}} \\cdot \\dfrac{1\\, \\text{km}}{10^3\\, \\text{m}} \\cdot \\dfrac{3600\\, \\text{s}}{1\\, \\text{h}} = ' + num(e.resultado, 4) + '\\, \\dfrac{\\text{km}}{\\text{h}}';
        } else if (e.tipo.nombre === 'densidad' && e.tipo.desde === 'g/cm³') {
            factorTexto = num(e.valor, 2) + '\\, \\dfrac{\\text{g}}{\\text{cm}^3} \\cdot \\dfrac{1\\, \\text{kg}}{10^3\\, \\text{g}} \\cdot \\dfrac{10^6\\, \\text{cm}^3}{1\\, \\text{m}^3} = ' + num(e.resultado, 4) + '\\, \\dfrac{\\text{kg}}{\\text{m}^3}';
        } else if (e.tipo.nombre === 'densidad' && e.tipo.desde === 'kg/m³') {
            factorTexto = num(e.valor, 2) + '\\, \\dfrac{\\text{kg}}{\\text{m}^3} \\cdot \\dfrac{10^3\\, \\text{g}}{1\\, \\text{kg}} \\cdot \\dfrac{1\\, \\text{m}^3}{10^6\\, \\text{cm}^3} = ' + num(e.resultado, 4) + '\\, \\dfrac{\\text{g}}{\\text{cm}^3}';
        } else if (e.tipo.nombre === 'caudal' && e.tipo.desde === 'kg/h') {
            factorTexto = num(e.valor, 2) + '\\, \\dfrac{\\text{kg}}{\\text{h}} \\cdot \\dfrac{10^3\\, \\text{g}}{1\\, \\text{kg}} \\cdot \\dfrac{1\\, \\text{h}}{3600\\, \\text{s}} = ' + num(e.resultado, 4) + '\\, \\dfrac{\\text{g}}{\\text{s}}';
        } else if (e.tipo.nombre === 'caudal' && e.tipo.desde === 'g/s') {
            factorTexto = num(e.valor, 2) + '\\, \\dfrac{\\text{g}}{\\text{s}} \\cdot \\dfrac{1\\, \\text{kg}}{10^3\\, \\text{g}} \\cdot \\dfrac{3600\\, \\text{s}}{1\\, \\text{h}} = ' + num(e.resultado, 4) + '\\, \\dfrac{\\text{kg}}{\\text{h}}';
        } else if (e.tipo.nombre === 'presión superficial') {
            factorTexto = num(e.valor, 2) + '\\, \\dfrac{\\text{kJ}}{\\text{m}^2} \\cdot \\dfrac{10^3\\, \\text{J}}{1\\, \\text{kJ}} \\cdot \\dfrac{1\\, \\text{m}^2}{10^4\\, \\text{cm}^2} = ' + num(e.resultado, 4) + '\\, \\dfrac{\\text{J}}{\\text{cm}^2}';
        } else {
            factorTexto = num(e.valor, 2) + '\\, \\text{' + e.tipo.desde + '} \\cdot ' + num(e.tipo.factor, 5) + ' = ' + num(e.resultado, 4) + '\\, \\text{' + e.tipo.hasta + '}';
        }

        html += '<div class="gs-latex-container" style="margin: 8px 0; padding: 10px;">';
        html += '\\(' + factorTexto + '\\)';
        html += '</div>';
        html += '<small style="color:#64748b;">' + e.tipo.explicacion.charAt(0).to