/* ==========================================================================
   UD1_02.JS — Módulo de actividades aleatorias para 3º ESO ud1_02
   Contenido: Magnitudes, unidades, prefijos SI, notación científica,
   cambios simples y cambios compuestos de unidades.
   Uso: <script src="js/ud1_02.js"></script> (después de gs-core.js)
   ========================================================================== */

(function () {
    'use strict';

    // ======================================================================
    // 1. DATOS BASE
    // ======================================================================

    var MAGNITUDES = [
        { nombre: 'Longitud',                unidad: 'm',      tipo: 'Fundamental' },
        { nombre: 'Masa',                    unidad: 'kg',     tipo: 'Fundamental' },
        { nombre: 'Tiempo',                  unidad: 's',      tipo: 'Fundamental' },
        { nombre: 'Temperatura absoluta',    unidad: 'K',      tipo: 'Fundamental' },
        { nombre: 'Cantidad de sustancia',   unidad: 'mol',    tipo: 'Fundamental' },
        { nombre: 'Intensidad de corriente', unidad: 'A',      tipo: 'Fundamental' },
        { nombre: 'Intensidad luminosa',     unidad: 'cd',     tipo: 'Fundamental' },
        { nombre: 'Superficie (Área)',       unidad: 'm²',     tipo: 'Derivada' },
        { nombre: 'Volumen',                 unidad: 'm³',     tipo: 'Derivada' },
        { nombre: 'Densidad',                unidad: 'kg/m³',  tipo: 'Derivada' },
        { nombre: 'Velocidad',               unidad: 'm/s',    tipo: 'Derivada' },
        { nombre: 'Aceleración',             unidad: 'm/s²',   tipo: 'Derivada' },
        { nombre: 'Fuerza',                  unidad: 'N',      tipo: 'Derivada' },
        { nombre: 'Presión',                 unidad: 'Pa',     tipo: 'Derivada' },
        { nombre: 'Energía / Trabajo',       unidad: 'J',      tipo: 'Derivada' },
        { nombre: 'Potencia',                unidad: 'W',      tipo: 'Derivada' }
    ];

    var PREFIJOS_TABLA = [
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

    // Prefijos restringidos para actividades (k, h, da, sin prefijo, d, c, m)
    var PREFIJOS_ACTIVIDAD = [
        { prefijo: 'kilo',  simbolo: 'k',  factor: 3  },
        { prefijo: 'hecto', simbolo: 'h',  factor: 2  },
        { prefijo: 'deca',  simbolo: 'da', factor: 1  },
        { prefijo: '',      simbolo: '',   factor: 0  },
        { prefijo: 'deci',  simbolo: 'd',  factor: -1 },
        { prefijo: 'centi', simbolo: 'c',  factor: -2 },
        { prefijo: 'mili',  simbolo: 'm',  factor: -3 }
    ];

    var MAGNITUDES_SIMPLES = [
        { nombre: 'longitud',   unidadBase: 'm',  exponente: 1 },
        { nombre: 'masa',       unidadBase: 'g',  exponente: 1 },
        { nombre: 'capacidad',  unidadBase: 'L',  exponente: 1 },
        { nombre: 'superficie', unidadBase: 'm²', exponente: 2 },
        { nombre: 'volumen',    unidadBase: 'm³', exponente: 3 }
    ];

    var TIEMPOS = [
        { simbolo: 'h',   segundos: 3600 },
        { simbolo: 'min', segundos: 60   },
        { simbolo: 's',   segundos: 1    }
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

    // Formatea un entero con separador de millares mediante \, de LaTeX
    function numGrandeLatex(n) {
        if (Math.abs(n) > 1e15 || (n !== 0 && Math.abs(n) < 1e-15)) {
            return n.toExponential(2).replace('.', ',');
        }
        var str = Math.abs(Math.round(n)).toString();
        var partes = [];
        while (str.length > 3) {
            partes.unshift(str.slice(-3));
            str = str.slice(0, -3);
        }
        partes.unshift(str);
        return (n < 0 ? '-' : '') + partes.join('\\,');
    }

    function latexNotacionCientifica(coef, exp) {
        return num(coef, 2) + ' \\cdot 10^{' + exp + '}';
    }

    function prefijoAleatorio() {
        return GS.aleatorio.elemento(PREFIJOS_ACTIVIDAD);
    }

    // Calcula la representación decimal de un número en notación científica
    function calcularDecimalDesdeCientifica(coef, exp) {
        var coefStr = coef.toFixed(2).replace('.', ''); // "567" para 5,67
        if (exp >= 0) {
            // Número grande: "567" + ceros
            var digitos = coefStr;
            var ceros = exp - (digitos.length - 1);
            if (ceros >= 0) {
                return digitos + '0'.repeat(ceros);
            }
            return digitos;
        } else {
            // Número pequeño: "0,000..." + coefStr
            var numCeros = Math.abs(exp) - 1;
            return '0{,}' + '0'.repeat(numCeros) + coefStr;
        }
    }

    // ======================================================================
    // 4. GENERADORES DE ACTIVIDADES
    // ======================================================================

    function generarTablaMagnitudes() {
        var seleccion = GS.aleatorio.variosDistintos(MAGNITUDES, 10);
        return seleccion.map(function (m) {
            var darMagnitud = GS.aleatorio.booleano();
            return {
                magnitud: m.nombre,
                unidad: m.unidad,
                tipo: m.tipo,
                dato: darMagnitud ? 'magnitud' : 'unidad'
            };
        });
    }

    function generarTablaPrefijos() {
        var seleccion = GS.aleatorio.variosDistintos(PREFIJOS_TABLA, 10);
        return seleccion.map(function (p) {
            return {
                prefijo: p.prefijo,
                simbolo: p.simbolo,
                factor: p.factor,
                dato: GS.aleatorio.entero(0, 2)
            };
        });
    }

    function generarNotacionCientifica() {
        var ejercicios = [];

        // 5 decimal -> científica
        for (var i = 0; i < 5; i++) {
            var entero = GS.aleatorio.entero(100, 9999);
            var strNum = entero.toString();
            var coefStr = strNum.charAt(0) + ',' + strNum.slice(1);
            var coef = parseFloat(coefStr.replace(',', '.'));
            var ordenMagnitud = Math.floor(Math.log10(entero));
            var numCeros = GS.aleatorio.entero(1, 15);
            var exponente = -(numCeros + ordenMagnitud);

            ejercicios.push({
                tipo: 'decimal_a_cientifica',
                coeficiente: coef,
                exponente: exponente,
                decimalStr: '0,' + '0'.repeat(numCeros) + strNum
            });
        }

        // 5 científica -> decimal (positivo o negativo)
        for (var j = 0; j < 5; j++) {
            var entero2 = GS.aleatorio.entero(100, 9999);
            var strNum2 = entero2.toString();
            var coefStr2 = strNum2.charAt(0) + ',' + strNum2.slice(1);
            var coef2 = parseFloat(coefStr2.replace(',', '.'));
            var ordenMagnitud2 = Math.floor(Math.log10(entero2));

            var esGrande = GS.aleatorio.booleano();
            var exponente2;
            if (esGrande) {
                // Exponencial positivo: entre 1 y 15
                exponente2 = GS.aleatorio.entero(1, 15);
            } else {
                // Exponencial negativo
                var numCeros2 = GS.aleatorio.entero(1, 15);
                exponente2 = -(numCeros2 + ordenMagnitud2);
            }

            ejercicios.push({
                tipo: 'cientifica_a_decimal',
                coeficiente: coef2,
                exponente: exponente2
            });
        }

        return GS.aleatorio.barajar(ejercicios);
    }

    function generarCambiosSimples() {
        var ejercicios = [];

        // 2 cambios entre prefijos (longitud, masa, superficie, volumen)
        for (var i = 0; i < 2; i++) {
            var magnitud = GS.aleatorio.elemento(MAGNITUDES_SIMPLES.filter(function (m) {
                return m.nombre !== 'capacidad';
            }));
            var origen = prefijoAleatorio();
            var destino = prefijoAleatorio();
            while (destino.simbolo === origen.simbolo) {
                destino = prefijoAleatorio();
            }
            ejercicios.push({
                tipo: 'prefijo',
                magnitud: magnitud,
                origen: origen,
                destino: destino,
                valor: GS.aleatorio.decimal(0.5, 999, 2)
            });
        }

        // 2 cambios L <-> m³
        ejercicios.push({
            tipo: 'litros_a_m3',
            valor: GS.aleatorio.decimal(0.5, 999, 2)
        });
        ejercicios.push({
            tipo: 'm3_a_litros',
            valor: GS.aleatorio.decimal(0.001, 5, 3)
        });

        return GS.aleatorio.barajar(ejercicios);
    }

    // =============================================================
    // CAMBIOS COMPUESTOS
    // =============================================================

    // A) Área másica: [p]g/[p']m² ↔ [p]g/[p']m²
    function generarCambioAreaMasica() {
        var pMasaOrigen = prefijoAleatorio();
        var pMasaDestino = prefijoAleatorio();
        while (pMasaDestino.simbolo === pMasaOrigen.simbolo) {
            pMasaDestino = prefijoAleatorio();
        }
        var pSupOrigen = prefijoAleatorio();
        var pSupDestino = prefijoAleatorio();
        while (pSupDestino.simbolo === pSupOrigen.simbolo) {
            pSupDestino = prefijoAleatorio();
        }

        var valor = GS.aleatorio.decimal(0.5, 999, 2);

        var uOrigen = pMasaOrigen.simbolo + 'g/' + pSupOrigen.simbolo + 'm²';
        var uDestino = pMasaDestino.simbolo + 'g/' + pSupDestino.simbolo + 'm²';

        // Factor masa (exponente): origen - destino
        var expMasa = pMasaOrigen.factor - pMasaDestino.factor;
        // Factor superficie: como es m², se multiplica por 2
        var expSuperficie = 2 * (pSupOrigen.factor - pSupDestino.factor);

        var factorTotal = Math.pow(10, expMasa + expSuperficie);
        var resultado = valor * factorTotal;

        return {
            tipo: 'area_masica',
            valor: valor, origen: uOrigen, destino: uDestino,
            resultado: resultado, factorMasa: expMasa, factorSuperficie: expSuperficie,
            pOrigenMasa: pMasaOrigen, pDestinoMasa: pMasaDestino,
            pOrigenSup: pSupOrigen, pDestinoSup: pSupDestino
        };
    }

    // B) Caudal másico: [p]g/[h|min|s] ↔ [p]g/[h|min|s]
    function generarCambioCaudalMasico() {
        var pOrigen = prefijoAleatorio();
        var pDestino = prefijoAleatorio();
        while (pDestino.simbolo === pOrigen.simbolo) {
            pDestino = prefijoAleatorio();
        }

        var tOrigen = GS.aleatorio.elemento(TIEMPOS);
        var tDestino = GS.aleatorio.elemento(TIEMPOS);
        while (tDestino.simbolo === tOrigen.simbolo) {
            tDestino = GS.aleatorio.elemento(TIEMPOS);
        }

        var valor = GS.aleatorio.decimal(0.5, 999, 2);
        var uOrigen = pOrigen.simbolo + 'g/' + tOrigen.simbolo;
        var uDestino = pDestino.simbolo + 'g/' + tDestino.simbolo;

        var expMasa = pOrigen.factor - pDestino.factor;
        // Si el tiempo del origen es mayor (por ejemplo, h), el valor se divide por el factor de segundos
        // 1 g/h = 1 g / 3600 s = (1/3600) g/s
        var expTiempo = Math.log10(tOrigen.segundos) - Math.log10(tDestino.segundos);

        var factorTotal = Math.pow(10, expMasa) * Math.pow(10, expTiempo);
        var resultado = valor * factorTotal;

        return {
            tipo: 'caudal_masico',
            valor: valor, origen: uOrigen, destino: uDestino,
            resultado: resultado, factorMasa: expMasa, factorTiempo: expTiempo,
            pOrigen: pOrigen, pDestino: pDestino, tOrigen: tOrigen, tDestino: tDestino
        };
    }

    // C) Densidad con L: [p]g/L ↔ [p]g/m³
    function generarCambioDensidadConL() {
        var pOrigenMasa = prefijoAleatorio();
        var pDestinoMasa = prefijoAleatorio();
        while (pDestinoMasa.simbolo === pOrigenMasa.simbolo) {
            pDestinoMasa = prefijoAleatorio();
        }

        var origenL = GS.aleatorio.booleano();
        var valor = GS.aleatorio.decimal(0.5, 999, 2);

        var uOrigen, uDestino, expVolumen;

        if (origenL) {
            uOrigen = pOrigenMasa.simbolo + 'g/L';
            uDestino = pDestinoMasa.simbolo + 'g/m³';
            // 1 L = 10⁻³ m³ → 1 g/L = 10³ g/m³
            expVolumen = 3;
        } else {
            uOrigen = pOrigenMasa.simbolo + 'g/m³';
            uDestino = pDestinoMasa.simbolo + 'g/L';
            expVolumen = -3;
        }

        var expMasa = pOrigenMasa.factor - pDestinoMasa.factor;
        var factorTotal = Math.pow(10, expMasa + expVolumen);
        var resultado = valor * factorTotal;

        return {
            tipo: 'densidad_L',
            valor: valor, origen: uOrigen, destino: uDestino,
            resultado: resultado, factorMasa: expMasa, factorVolumen: expVolumen,
            pOrigenMasa: pOrigenMasa, pDestinoMasa: pDestinoMasa, origenL: origenL
        };
    }

    // D) Velocidad: [p]m/[h|min|s] ↔ [p]m/[h|min|s]
    function generarCambioVelocidad() {
        var pOrigen = prefijoAleatorio();
        var pDestino = prefijoAleatorio();
        while (pDestino.simbolo === pOrigen.simbolo) {
            pDestino = prefijoAleatorio();
        }

        var tOrigen = GS.aleatorio.elemento(TIEMPOS);
        var tDestino = GS.aleatorio.elemento(TIEMPOS);
        while (tDestino.simbolo === tOrigen.simbolo) {
            tDestino = GS.aleatorio.elemento(TIEMPOS);
        }

        var valor = GS.aleatorio.decimal(0.5, 999, 2);
        var uOrigen = pOrigen.simbolo + 'm/' + tOrigen.simbolo;
        var uDestino = pDestino.simbolo + 'm/' + tDestino.simbolo;

        var expLongitud = pOrigen.factor - pDestino.factor;
        var expTiempo = Math.log10(tOrigen.segundos) - Math.log10(tDestino.segundos);
        var factorTotal = Math.pow(10, expLongitud) * Math.pow(10, expTiempo);
        var resultado = valor * factorTotal;

        return {
            tipo: 'velocidad',
            valor: valor, origen: uOrigen, destino: uDestino,
            resultado: resultado, factorLongitud: expLongitud, factorTiempo: expTiempo,
            pOrigen: pOrigen, pDestino: pDestino, tOrigen: tOrigen, tDestino: tDestino
        };
    }

    // E) Masa/Volumen con prefijos cúbicos: [p]g/[p]m³ ↔ [p]g/[p]m³
    function generarCambioMasaPorVolumen() {
        var pOrigenMasa = prefijoAleatorio();
        var pDestinoMasa = prefijoAleatorio();
        while (pDestinoMasa.simbolo === pOrigenMasa.simbolo) {
            pDestinoMasa = prefijoAleatorio();
        }
        var pVolOrigen = prefijoAleatorio();
        var pVolDestino = prefijoAleatorio();
        while (pVolDestino.simbolo === pVolOrigen.simbolo) {
            pVolDestino = prefijoAleatorio();
        }

        var valor = GS.aleatorio.decimal(0.5, 999, 2);
        var uOrigen = pOrigenMasa.simbolo + 'g/' + pVolOrigen.simbolo + 'm³';
        var uDestino = pDestinoMasa.simbolo + 'g/' + pVolDestino.simbolo + 'm³';

        var expMasa = pOrigenMasa.factor - pDestinoMasa.factor;
        // Volumen: exponente cúbico → multiplicamos por 3
        var expVolumen = 3 * (pVolOrigen.factor - pVolDestino.factor);

        var factorTotal = Math.pow(10, expMasa + expVolumen);
        var resultado = valor * factorTotal;

        return {
            tipo: 'masa_por_volumen',
            valor: valor, origen: uOrigen, destino: uDestino,
            resultado: resultado, factorMasa: expMasa, factorVolumen: expVolumen,
            pOrigenMasa: pOrigenMasa, pDestinoMasa: pDestinoMasa,
            pOrigenVol: pVolOrigen, pDestinoVol: pVolDestino
        };
    }

    // F) Caudal volumétrico: [p]L/[h|min|s] ↔ [p]m³/[h|min|s]
    function generarCambioCaudalVolumetrico() {
        var pOrigen = prefijoAleatorio();
        var pDestino = prefijoAleatorio();
        while (pDestino.simbolo === pOrigen.simbolo) {
            pDestino = prefijoAleatorio();
        }

        var tOrigen = GS.aleatorio.elemento(TIEMPOS);
        var tDestino = GS.aleatorio.elemento(TIEMPOS);
        while (tDestino.simbolo === tOrigen.simbolo) {
            tDestino = GS.aleatorio.elemento(TIEMPOS);
        }

        var valor = GS.aleatorio.decimal(0.5, 999, 2);
        var uOrigen = pOrigen.simbolo + 'L/' + tOrigen.simbolo;
        var uDestino = pDestino.simbolo + 'm³/' + tDestino.simbolo;

        // 1 L = 10⁻³ m³. Si el prefijo es c, 1 cL = 10⁻² L = 10⁻⁵ m³.
        // Factor volumen: 10⁻³ · 10^(3·factorOrigen) / 10^(3·factorDestino)
        var expVolumen = -3 + 3 * pOrigen.factor - 3 * pDestino.factor;
        var expTiempo = Math.log10(tOrigen.segundos) - Math.log10(tDestino.segundos);
        var factorTotal = Math.pow(10, expVolumen + expTiempo);
        var resultado = valor * factorTotal;

        return {
            tipo: 'caudal_volumetrico',
            valor: valor, origen: uOrigen, destino: uDestino,
            resultado: resultado, factorVolumen: expVolumen, factorTiempo: expTiempo,
            pOrigen: pOrigen, pDestino: pDestino, tOrigen: tOrigen, tDestino: tDestino
        };
    }

    function generarCambiosCompuestos() {
        var generadores = [
            generarCambioAreaMasica,
            generarCambioCaudalMasico,
            generarCambioDensidadConL,
            generarCambioVelocidad,
            generarCambioMasaPorVolumen,
            generarCambioCaudalVolumetrico
        ];

        var ejercicios = [];
        var usados = [];
        for (var i = 0; i < 4; i++) {
            // Evitamos repetir el mismo generador
            var indice;
            var intentos = 0;
            do {
                indice = GS.aleatorio.entero(0, generadores.length - 1);
                intentos++;
            } while (usados.indexOf(indice) !== -1 && intentos < 20);
            usados.push(indice);
            ejercicios.push(generadores[indice]());
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
        html += '<thead><tr><th>Magnitud</th><th>Símbolo de unidad</th><th>Fundamental o Derivada</th></tr></thead><tbody>';
        estado.tablaMagnitudes.forEach(function (f) {
            var colMag = (f.dato === 'magnitud') ? f.magnitud : '';
            var colUni = (f.dato === 'unidad') ? f.unidad : '';
            html += '<tr><td>' + colMag + '</td><td>' + colUni + '</td><td></td></tr>';
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
            var cP = '', cS = '', cF = '';
            if (f.dato === 0) cP = f.prefijo;
            else if (f.dato === 1) cS = f.simbolo;
            else cF = '\\(10^{' + f.factor + '}\\)';
            html += '<tr><td>' + cP + '</td><td>' + cS + '</td><td>' + cF + '</td></tr>';
        });
        html += '</tbody></table>';
        cont.innerHTML = html;
    }

    function renderNotacionCientifica() {
        var cont = document.getElementById('act-notacion-cientifica');
        if (!cont) return;
        var html = '<table class="gs-tabla-datos" style="max-width:100%;">';
        html += '<thead><tr><th>Notación científica</th><th>Forma decimal</th></tr></thead><tbody>';
        estado.notacionCientifica.forEach(function (e) {
            var colC = '', colD = '';
            if (e.tipo === 'decimal_a_cientifica') {
                colD = '\\(' + e.decimalStr.replace(',', '{,}') + '\\)';
            } else {
                colC = '\\(' + latexNotacionCientifica(e.coeficiente, e.exponente) + '\\)';
            }
            html += '<tr><td>' + colC + '</td><td>' + colD + '</td></tr>';
        });
        html += '</tbody></table>';
        cont.innerHTML = html;
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
            } else {
                html += '<li>Expresa \\(' + num(e.valor, 3) + '\\, \\text{m}^3\\) en \\(\\text{L}\\).</li>';
            }
        });
        html += '</ol>';
        cont.innerHTML = html;
    }

    function renderCambiosCompuestos() {
        var cont = document.getElementById('act-cambios-compuestos');
        if (!cont) return;
        var html = '<ol>';
        estado.cambiosCompuestos.forEach(function (e) {
            html += '<li>Transforma \\(' + num(e.valor, 2) + '\\, \\text{' + e.origen + '}\\) a \\(\\text{' + e.destino + '}\\).</li>';
        });
        html += '</ol>';
        cont.innerHTML = html;
    }

    // ======================================================================
    // 6. SOLUCIONARIO
    // ======================================================================

    function solucionCambioSimple(e) {
        if (e.tipo === 'litros_a_m3') {
            var r = e.valor / 1000;
            var s = '\\(' + num(e.valor, 2) + '\\, \\text{L} = ' + num(r, 6) + '\\, \\text{m}^3\\)<br>';
            s += '<div class="gs-latex-container" style="margin:8px 0; padding:10px;">';
            s += '\\(' + num(e.valor, 2) + '\\, \\text{L} \\cdot \\dfrac{1\\, \\text{m}^3}{1000\\, \\text{L}} = ' + num(r, 6) + '\\, \\text{m}^3\\)';
            s += '</div>';
            s += '<small style="color:#64748b;">1 m³ = 1000 L. La unidad destino es más grande, así que el número disminuye.</small>';
            return s;
        }
        if (e.tipo === 'm3_a_litros') {
            var r2 = e.valor * 1000;
            var s2 = '\\(' + num(e.valor, 3) + '\\, \\text{m}^3 = ' + numGrandeLatex(r2) + '\\, \\text{L}\\)<br>';
            s2 += '<div class="gs-latex-container" style="margin:8px 0; padding:10px;">';
            s2 += '\\(' + num(e.valor, 3) + '\\, \\text{m}^3 \\cdot \\dfrac{1000\\, \\text{L}}{1\\, \\text{m}^3} = ' + numGrandeLatex(r2) + '\\, \\text{L}\\)';
            s2 += '</div>';
            s2 += '<small style="color:#64748b;">1 m³ = 1000 L. La unidad destino es más pequeña, así que el número aumenta.</small>';
            return s2;
        }

        var uO = e.origen.simbolo + e.magnitud.unidadBase;
        var uD = e.destino.simbolo + e.magnitud.unidadBase;
        var expO = e.origen.factor * e.magnitud.exponente;
        var expD = e.destino.factor * e.magnitud.exponente;
        var resultado = e.valor * Math.pow(10, expO) / Math.pow(10, expD);

        var s3 = '\\(' + num(e.valor, 2) + '\\, \\text{' + uO + '} = ' + num(resultado, 6) + '\\, \\text{' + uD + '}\\)<br>';
        s3 += '<div class="gs-latex-container" style="margin:8px 0; padding:10px;">';
        s3 += '\\(' + num(e.valor, 2) + '\\, \\text{' + uO + '} \\cdot \\dfrac{10^{' + expD + '}\\, \\text{' + uD + '}}{10^{' + expO + '}\\, \\text{' + uO + '}} = ' + num(resultado, 6) + '\\, \\text{' + uD + '}\\)';
        s3 += '</div>';

        var expNeto = expO - expD;
        if (expNeto > 0) {
            s3 += '<small style="color:#64748b;">Multiplicamos por 10<sup>' + expNeto + '</sup>: la unidad destino es más pequeña.</small>';
        } else if (expNeto < 0) {
            s3 += '<small style="color:#64748b;">Dividimos entre 10<sup>' + Math.abs(expNeto) + '</sup>: la unidad destino es más grande.</small>';
        } else {
            s3 += '<small style="color:#64748b;">No hay cambio de factor.</small>';
        }
        return s3;
    }

    function solucionCambioCompuesto(e) {
        var s = '\\(' + num(e.valor, 2) + '\\, \\text{' + e.origen + '} = ' + num(e.resultado, 6) + '\\, \\text{' + e.destino + '}\\)<br>';
        s += '<div class="gs-latex-container" style="margin:8px 0; padding:10px;">';

        if (e.tipo === 'area_masica') {
            s += '\\(' + num(e.valor, 2) + '\\, \\dfrac{\\text{' + e.pOrigenMasa.simbolo + 'g}}{\\text{' + e.pOrigenSup.simbolo + 'm}^2} \\cdot \\dfrac{10^{' + (-e.factorMasa) + '}\\, \\text{' + e.pDestinoMasa.simbolo + 'g}}{1\\, \\text{' + e.pOrigenMasa.simbolo + 'g}} \\cdot \\dfrac{10^{' + (-e.factorSuperficie) + '}\\, \\text{' + e.pDestinoSup.simbolo + 'm}^2}{1\\, \\text{' + e.pOrigenSup.simbolo + 'm}^2} = ' + num(e.resultado, 6) + '\\, \\dfrac{\\text{' + e.pDestinoMasa.simbolo + 'g}}{\\text{' + e.pDestinoSup.simbolo + 'm}^2}\\)';
        } else if (e.tipo === 'caudal_masico') {
            s += '\\(' + num(e.valor, 2) + '\\, \\dfrac{\\text{' + e.pOrigen.simbolo + 'g}}{\\text{' + e.tOrigen.simbolo + '}} \\cdot \\dfrac{10^{' + (-e.factorMasa) + '}\\, \\text{' + e.pDestino.simbolo + 'g}}{1\\, \\text{' + e.pOrigen.simbolo + 'g}} \\cdot \\dfrac{' + e.tOrigen.segundos + '\\, \\text{s}}{1\\, \\text{' + e.tOrigen.simbolo + '}} \\cdot \\dfrac{1\\, \\text{' + e.tDestino.simbolo + '}}{' + e.tDestino.segundos + '\\, \\text{s}} = ' + num(e.resultado, 6) + '\\, \\dfrac{\\text{' + e.pDestino.simbolo + 'g}}{\\text{' + e.tDestino.simbolo + '}}\\)';
        } else if (e.tipo === 'densidad_L') {
            var uO = e.origenL ? 'L' : 'm^3';
            var uD = e.origenL ? 'm^3' : 'L';
            s += '\\(' + num(e.valor, 2) + '\\, \\dfrac{\\text{' + e.pOrigenMasa.simbolo + 'g}}{\\text{' + uO + '}} \\cdot \\dfrac{10^{' + (-e.factorMasa) + '}\\, \\text{' + e.pDestinoMasa.simbolo + 'g}}{1\\, \\text{' + e.pOrigenMasa.simbolo + 'g}} \\cdot \\dfrac{' + (e.origenL ? '10^3\\, \\text{L}' : '1\\, \\text{m}^3') + '}{' + (e.origenL ? '1\\, \\text{m}^3' : '10^3\\, \\text{L}') + '} = ' + num(e.resultado, 6) + '\\, \\dfrac{\\text{' + e.pDestinoMasa.simbolo + 'g}}{\\text{' + uD + '}}\\)';
        } else if (e.tipo === 'velocidad') {
            s += '\\(' + num(e.valor, 2) + '\\, \\dfrac{\\text{' + e.pOrigen.simbolo + 'm}}{\\text{' + e.tOrigen.simbolo + '}} \\cdot \\dfrac{10^{' + (-e.factorLongitud) + '}\\, \\text{' + e.pDestino.simbolo + 'm}}{1\\, \\text{' + e.pOrigen.simbolo + 'm}} \\cdot \\dfrac{' + e.tOrigen.segundos + '\\, \\text{s}}{1\\, \\text{' + e.tOrigen.simbolo + '}} \\cdot \\dfrac{1\\, \\text{' + e.tDestino.simbolo + '}}{' + e.tDestino.segundos + '\\, \\text{s}} = ' + num(e.resultado, 6) + '\\, \\dfrac{\\text{' + e.pDestino.simbolo + 'm}}{\\text{' + e.tDestino.simbolo + '}}\\)';
        } else if (e.tipo === 'masa_por_volumen') {
            s += '\\(' + num(e.valor, 2) + '\\, \\dfrac{\\text{' + e.pOrigenMasa.simbolo + 'g}}{\\text{' + e.pOrigenVol.simbolo + 'm}^3} \\cdot \\dfrac{10^{' + (-e.factorMasa) + '}\\, \\text{' + e.pDestinoMasa.simbolo + 'g}}{1\\, \\text{' + e.pOrigenMasa.simbolo + 'g}} \\cdot \\dfrac{10^{' + (-e.factorVolumen) + '}\\, \\text{' + e.pDestinoVol.simbolo + 'm}^3}{1\\, \\text{' + e.pOrigenVol.simbolo + 'm}^3} = ' + num(e.resultado, 6) + '\\, \\dfrac{\\text{' + e.pDestinoMasa.simbolo + 'g}}{\\text{' + e.pDestinoVol.simbolo + 'm}^3}\\)';
        } else if (e.tipo === 'caudal_volumetrico') {
            s += '\\(' + num(e.valor, 2) + '\\, \\dfrac{\\text{' + e.pOrigen.simbolo + 'L}}{\\text{' + e.tOrigen.simbolo + '}} \\cdot \\dfrac{10^{' + (-e.factorVolumen) + '}\\, \\text{' + e.pDestino.simbolo + 'm}^3}{1\\, \\text{' + e.pOrigen.simbolo + 'L}} \\cdot \\dfrac{' + e.tOrigen.segundos + '\\, \\text{s}}{1\\, \\text{' + e.tOrigen.simbolo + '}} \\cdot \\dfrac{1\\, \\text{' + e.tDestino.simbolo + '}}{' + e.tDestino.segundos + '\\, \\text{s}} = ' + num(e.resultado, 6) + '\\, \\dfrac{\\text{' + e.pDestino.simbolo + 'm}^3}{\\text{' + e.tDestino.simbolo + '}}\\)';
        }

        s += '</div>';
        return s;
    }

    function generarHTMLSoluciones() {
        var html = '';

        // Tabla 1
        html += '<div class="gs-box gs-ejemplo" style="border-left-color: var(--gs-green);">';
        html += '<div class="gs-ejemplo-title"><i class="fa-solid fa-table"></i> Tabla 1: Magnitudes y Unidades</div>';
        html += '<table class="gs-tabla-datos" style="max-width:100%;"><thead><tr><th>Magnitud</th><th>Unidad (SI)</th><th>Tipo</th></tr></thead><tbody>';
        estado.tablaMagnitudes.forEach(function (f) {
            html += '<tr><td>' + f.magnitud + '</td><td>' + f.unidad + '</td><td>' + f.tipo + '</td></tr>';
        });
        html += '</tbody></table></div>';

        // Tabla 2
        html += '<div class="gs-box gs-ejemplo" style="border-left-color: var(--gs-green);">';
        html += '<div class="gs-ejemplo-title"><i class="fa-solid fa-layer-group"></i> Tabla 2: Prefijos SI</div>';
        html += '<table class="gs-tabla-datos" style="max-width:100%;"><thead><tr><th>Prefijo</th><th>Símbolo</th><th>Factor</th></tr></thead><tbody>';
        estado.tablaPrefijos.forEach(function (f) {
            html += '<tr><td>' + f.prefijo + '</td><td>' + f.simbolo + '</td><td>\\(10^{' + f.factor + '}\\)</td></tr>';
        });
        html += '</tbody></table></div>';

        // Notación científica
        html += '<div class="gs-box gs-ejemplo" style="border-left-color: var(--gs-green);">';
        html += '<div class="gs-ejemplo-title"><i class="fa-solid fa-calculator"></i> Bloque 3: Notación Científica</div>';
        html += '<table class="gs-tabla-datos" style="max-width:100%;"><thead><tr><th>Notación científica</th><th>Forma decimal</th></tr></thead><tbody>';
        estado.notacionCientifica.forEach(function (e) {
            var colC = '\\(' + latexNotacionCientifica(e.coeficiente, e.exponente) + '\\)';
            var colD;
            if (e.tipo === 'decimal_a_cientifica') {
                colD = '\\(' + e.decimalStr.replace(',', '{,}') + '\\)';
            } else {
                colD = '\\(' + calcularDecimalDesdeCientifica(e.coeficiente, e.exponente) + '\\)';
            }
            html += '<tr><td>' + colC + '</td><td>' + colD + '</td></tr>';
        });
        html += '</tbody></table></div>';

        // Cambios simples
        html += '<div class="gs-box gs-ejemplo" style="border-left-color: var(--gs-green);">';
        html += '<div class="gs-ejemplo-title"><i class="fa-solid fa-arrows-rotate"></i> Bloque 4: Cambios Simples de Unidades</div>';
        html += '<ol>';
        estado.cambiosSimples.forEach(function (e) {
            html += '<li>' + solucionCambioSimple(e) + '</li>';
        });
        html += '</ol></div>';

        // Cambios compuestos
        html += '<div class="gs-box gs-ejemplo" style="border-left-color: var(--gs-green);">';
        html += '<div class="gs-ejemplo-title"><i class="fa-solid fa-flask"></i> Bloque 5: Cambios Compuestos de Unidades</div>';
        html += '<ol>';
        estado.cambiosCompuestos.forEach(function (e) {
            html += '<li>' + solucionCambioCompuesto(e) + '</li>';
        });
        html += '</ol></div>';

        return html;
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

        if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise();
        }
    }

    window.generarNuevasActividades = function() {
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

        var actDiv = document.getElementById('act-tabla-magnitudes');
        if (actDiv) actDiv.scrollIntoView({ behavior: 'smooth' });
    };

    document.addEventListener('gs-ready', generarTodo);

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(generarTodo, 100);
    }

})();