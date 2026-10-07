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
        { prefijo: 'Peta',  simbolo: 'P',  factor: 15  },
        { prefijo: 'Tera',  simbolo: 'T',  factor: 12  },
        { prefijo: 'Giga',  simbolo: 'G',  factor: 9   },
        { prefijo: 'Mega',  simbolo: 'M',  factor: 6   },
        { prefijo: 'kilo',  simbolo: 'k',  factor: 3   },
        { prefijo: 'hecto', simbolo: 'h',  factor: 2   },
        { prefijo: 'deca',  simbolo: 'da', factor: 1   },
        { prefijo: 'deci',  simbolo: 'd',  factor: -1  },
        { prefijo: 'centi', simbolo: 'c',  factor: -2  },
        { prefijo: 'mili',  simbolo: 'm',  factor: -3  },
        { prefijo: 'micro', simbolo: 'µ',  factor: -6  },
        { prefijo: 'nano',  simbolo: 'n',  factor: -9  },
        { prefijo: 'pico',  simbolo: 'p',  factor: -12 },
        { prefijo: 'femto', simbolo: 'f',  factor: -15 }
    ];

    var PREFIJOS_RESTRINGIDOS = [
        { prefijo: 'kilo',  simbolo: 'k',  factor: 3  },
        { prefijo: 'hecto', simbolo: 'h',  factor: 2  },
        { prefijo: 'deca',  simbolo: 'da', factor: 1  },
        { prefijo: '',      simbolo: '',   factor: 0  },
        { prefijo: 'deci',  simbolo: 'd',  factor: -1 },
        { prefijo: 'centi', simbolo: 'c',  factor: -2 },
        { prefijo: 'mili',  simbolo: 'm',  factor: -3 }
    ];

    var PREFIJOS_EXTENDIDOS = [
        { prefijo: 'peta',  simbolo: 'P',  factor: 15  },
        { prefijo: 'tera',  simbolo: 'T',  factor: 12  },
        { prefijo: 'giga',  simbolo: 'G',  factor: 9   },
        { prefijo: 'mega',  simbolo: 'M',  factor: 6   },
        { prefijo: 'kilo',  simbolo: 'k',  factor: 3   },
        { prefijo: 'hecto', simbolo: 'h',  factor: 2   },
        { prefijo: 'deca',  simbolo: 'da', factor: 1   },
        { prefijo: '',      simbolo: '',   factor: 0   },
        { prefijo: 'deci',  simbolo: 'd',  factor: -1  },
        { prefijo: 'centi', simbolo: 'c',  factor: -2  },
        { prefijo: 'mili',  simbolo: 'm',  factor: -3  },
        { prefijo: 'micro', simbolo: 'µ',  factor: -6  },
        { prefijo: 'nano',  simbolo: 'n',  factor: -9  },
        { prefijo: 'pico',  simbolo: 'p',  factor: -12 },
        { prefijo: 'femto', simbolo: 'f',  factor: -15 }
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
        return num(coef, 3) + ' \\cdot 10^{' + exp + '}';
    }

    function prefijosParaMagnitud(magnitud) {
        if (magnitud.exponente === 1) {
            return PREFIJOS_EXTENDIDOS;
        } else {
            return PREFIJOS_RESTRINGIDOS;
        }
    }

    function prefijoAleatorio() {
        return GS.aleatorio.elemento(PREFIJOS_RESTRINGIDOS);
    }

    function prefijoAleatorioDe(magnitud) {
        var array = prefijosParaMagnitud(magnitud);
        return GS.aleatorio.elemento(array);
    }

    function calcularDecimalDesdeCientifica(coef, exp) {
        var coefStr = coef.toFixed(3).replace('.', '');
        if (exp >= 0) {
            var digitos = coefStr;
            var ceros = exp - (digitos.length - 1);
            if (ceros >= 0) {
                return digitos + '0'.repeat(ceros);
            }
            return digitos;
        } else {
            var numCeros = Math.abs(exp) - 1;
            return '0{,}' + '0'.repeat(numCeros) + coefStr;
        }
    }

    // ======================================================================
    // 4. GENERADORES
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
            var esGrande = GS.aleatorio.booleano();

            if (esGrande) {
                var numBase = GS.aleatorio.entero(1000, 9999);
                var exponente = GS.aleatorio.entero(1, 15);
                var strBase = numBase.toString();
                var coef = parseFloat(strBase.charAt(0) + '.' + strBase.slice(1));
                var ordenBase = strBase.length - 1;
                var exponenteCientifico = exponente + ordenBase;

                ejercicios.push({
                    tipo: 'decimal_a_cientifica',
                    coeficiente: coef,
                    exponente: exponenteCientifico,
                    decimalStr: strBase + '0'.repeat(exponente)
                });
            } else {
                var numBase2 = GS.aleatorio.entero(1000, 9999);
                var ceros = GS.aleatorio.entero(1, 15);
                var strBase2 = numBase2.toString();
                var coef2 = parseFloat(strBase2.charAt(0) + '.' + strBase2.slice(1));
                var ordenBase2 = strBase2.length - 1;
                var exponenteCientifico2 = -(ceros + ordenBase2);

                ejercicios.push({
                    tipo: 'decimal_a_cientifica',
                    coeficiente: coef2,
                    exponente: exponenteCientifico2,
                    decimalStr: '0,' + '0'.repeat(ceros) + strBase2
                });
            }
        }

        // 5 científica -> decimal
        for (var j = 0; j < 5; j++) {
            var numBase3 = GS.aleatorio.entero(1000, 9999);
            var strBase3 = numBase3.toString();
            var coef3 = parseFloat(strBase3.charAt(0) + '.' + strBase3.slice(1));
            var ordenBase3 = strBase3.length - 1;

            var esGrande2 = GS.aleatorio.booleano();
            var exponente3;

            if (esGrande2) {
                exponente3 = GS.aleatorio.entero(1, 15);
            } else {
                var ceros3 = GS.aleatorio.entero(1, 15);
                exponente3 = -(ceros3 + ordenBase3);
            }

            ejercicios.push({
                tipo: 'cientifica_a_decimal',
                coeficiente: coef3,
                exponente: exponente3
            });
        }

        return GS.aleatorio.barajar(ejercicios);
    }

    function generarCambiosSimples() {
        var ejercicios = [];

        for (var i = 0; i < 2; i++) {
            var magnitud = GS.aleatorio.elemento(MAGNITUDES_SIMPLES.filter(function (m) {
                return m.nombre !== 'capacidad' && m.nombre !== 'superficie' && m.nombre !== 'volumen';
            }));
            var origen = prefijoAleatorioDe(magnitud);
            var destino = prefijoAleatorioDe(magnitud);
            while (destino.simbolo === origen.simbolo) {
                destino = prefijoAleatorioDe(magnitud);
            }
            var valor;
            if (GS.aleatorio.booleano()) {
                valor = GS.aleatorio.entero(1, 9999);
            } else {
                valor = parseFloat(GS.aleatorio.decimal(0.001, 0.999, 3));
            }
            ejercicios.push({
                tipo: 'prefijo',
                magnitud: magnitud,
                origen: origen,
                destino: destino,
                valor: valor
            });
        }

        ejercicios.push({
            tipo: 'litros_a_m3',
            valor: GS.aleatorio.entero(1, 9999)
        });
        ejercicios.push({
            tipo: 'm3_a_litros',
            valor: parseFloat(GS.aleatorio.decimal(0.001, 0.999, 3))
        });

        return GS.aleatorio.barajar(ejercicios);
    }

    // =============================================================
    // CAMBIOS COMPUESTOS
    // =============================================================

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

        var expMasa = pMasaOrigen.factor - pMasaDestino.factor;
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
        var factorTiempo = tOrigen.segundos / tDestino.segundos;
        var factorTotal = Math.pow(10, expMasa) * factorTiempo;
        var resultado = valor * factorTotal;

        return {
            tipo: 'caudal_masico',
            valor: valor, origen: uOrigen, destino: uDestino,
            resultado: resultado, factorMasa: expMasa,
            factorTiempo: factorTiempo,
            pOrigen: pOrigen, pDestino: pDestino,
            tOrigen: tOrigen, tDestino: tDestino
        };
    }

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
        var factorTiempo = tOrigen.segundos / tDestino.segundos;
        var factorTotal = Math.pow(10, expLongitud) * factorTiempo;
        var resultado = valor * factorTotal;

        return {
            tipo: 'velocidad',
            valor: valor, origen: uOrigen, destino: uDestino,
            resultado: resultado, factorLongitud: expLongitud,
            factorTiempo: factorTiempo,
            pOrigen: pOrigen, pDestino: pDestino,
            tOrigen: tOrigen, tDestino: tDestino
        };
    }

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

        var expVolumen = pOrigen.factor - 3 - pDestino.factor;
        var factorTiempo = tOrigen.segundos / tDestino.segundos;
        var factorTotal = Math.pow(10, expVolumen) * factorTiempo;
        var resultado = valor * factorTotal;

        return {
            tipo: 'caudal_volumetrico',
            valor: valor, origen: uOrigen, destino: uDestino,
            resultado: resultado, factorVolumen: expVolumen,
            factorTiempo: factorTiempo,
            pOrigen: pOrigen, pDestino: pDestino,
            tOrigen: tOrigen, tDestino: tDestino
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
    // 5. RENDERIZADO
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
                colD = '\\(' + e.decimalStr.replace(/,/g, '{,}') + '\\)';
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
            var valorStr = Number.isInteger(e.valor) ? e.valor.toString() : num(e.valor, 3);
            if (e.tipo === 'prefijo') {
                var uO = e.origen.simbolo + e.magnitud.unidadBase;
                var uD = e.destino.simbolo + e.magnitud.unidadBase;
                html += '<li>Expresa \\(' + valorStr + '\\, \\text{' + uO + '}\\) en \\(\\text{' + uD + '}\\).</li>';
            } else if (e.tipo === 'litros_a_m3') {
                html += '<li>Expresa \\(' + valorStr + '\\, \\text{L}\\) en \\(\\text{m}^3\\).</li>';
            } else {
                html += '<li>Expresa \\(' + valorStr + '\\, \\text{m}^3\\) en \\(\\text{L}\\).</li>';
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
    // 6. FORMATEO DE RESULTADOS
    // ======================================================================

    function formatearResultado(valor) {
        if (valor === 0) return '0';

        var abs = Math.abs(valor);

        // 1. NOTACIÓN CIENTÍFICA (para valores extremos)
        if (abs >= 1e12 || abs < 1e-4) {
            var exp = Math.floor(Math.log10(abs));
            var coef = valor / Math.pow(10, exp);

            // Redondeamos a 4 cifras significativas para eliminar el ruido del float
            coef = Math.round(coef * 10000) / 10000;

            // Si al redondear llegamos a 10, ajustamos el exponente
            if (Math.abs(coef) >= 10) {
                coef = coef / 10;
                exp = exp + 1;
            }

            var coefStr = coef.toFixed(4);
            coefStr = coefStr.replace(/\.?0+$/, '');
            if (coefStr === '' || coefStr === '-') coefStr = '0';
            coefStr = coefStr.replace('.', ',');

            return coefStr + ' \\cdot 10^{' + exp + '}';
        }

        // 2. NOTACIÓN DECIMAL
        var str = valor.toString();
        if (str.indexOf('.') !== -1) {
            str = str.replace(/0+$/, '').replace(/\.$/, '');
        }
        return str.replace('.', ',');
    }

    // ======================================================================
    // 7. SOLUCIONARIO
    // ======================================================================

    function solucionCambioSimple(e) {
        var valorStr;

        // --- Casos especiales: L <-> m³ ---
        if (e.tipo === 'litros_a_m3') {
            valorStr = Number.isInteger(e.valor) ? e.valor.toString() : num(e.valor, 3);
            var r = e.valor / 1000;
            var rStr = formatearResultado(r);
            var s = '\\(' + valorStr + '\\, \\text{L} = ' + rStr + '\\, \\text{m}^3\\)<br>';
            s += '<div class="gs-latex-container" style="margin:8px 0; padding:10px;">';
            s += '\\(' + valorStr + '\\, \\text{L} \\cdot \\dfrac{1\\, \\text{m}^3}{1000\\, \\text{L}} = ' + rStr + '\\, \\text{m}^3\\)';
            s += '</div>';
            s += '<small style="color:#64748b;">1 m³ = 1000 L. La unidad destino es más grande, así que el número disminuye.</small>';
            return s;
        }

        if (e.tipo === 'm3_a_litros') {
            valorStr = Number.isInteger(e.valor) ? e.valor.toString() : num(e.valor, 3);
            var r2 = e.valor * 1000;
            var r2Str = formatearResultado(r2);
            var s2 = '\\(' + valorStr + '\\, \\text{m}^3 = ' + r2Str + '\\, \\text{L}\\)<br>';
            s2 += '<div class="gs-latex-container" style="margin:8px 0; padding:10px;">';
            s2 += '\\(' + valorStr + '\\, \\text{m}^3 \\cdot \\dfrac{1000\\, \\text{L}}{1\\, \\text{m}^3} = ' + r2Str + '\\, \\text{L}\\)';
            s2 += '</div>';
            s2 += '<small style="color:#64748b;">1 m³ = 1000 L. La unidad destino es más pequeña, así que el número aumenta.</small>';
            return s2;
        }

        // --- Caso prefijo ---
        valorStr = Number.isInteger(e.valor) ? e.valor.toString() : num(e.valor, 3);
        var uO = e.origen.simbolo + e.magnitud.unidadBase;
        var uD = e.destino.simbolo + e.magnitud.unidadBase;
        var expO = e.origen.factor * e.magnitud.exponente;
        var expD = e.destino.factor * e.magnitud.exponente;
        var resultado = e.valor * Math.pow(10, expO - expD);
        var resultadoStr = formatearResultado(resultado);

        var s3 = '\\(' + valorStr + '\\, \\text{' + uO + '} = ' + resultadoStr + '\\, \\text{' + uD + '}\\)<br>';
        s3 += '<div class="gs-latex-container" style="margin:8px 0; padding:10px;">';

        var expNeto = expO - expD;
        var factorFraccion;

        if (expNeto > 0) {
            factorFraccion = '\\dfrac{10^{' + expNeto + '}\\, \\text{' + uD + '}}{1\\, \\text{' + uO + '}}';
        } else if (expNeto < 0) {
            factorFraccion = '\\dfrac{1\\, \\text{' + uD + '}}{10^{' + (-expNeto) + '}\\, \\text{' + uO + '}}';
        } else {
            factorFraccion = '\\dfrac{1\\, \\text{' + uD + '}}{1\\, \\text{' + uO + '}}';
        }

        s3 += '\\(' + valorStr + '\\, \\text{' + uO + '} \\cdot ' + factorFraccion + ' = ' + resultadoStr + '\\, \\text{' + uD + '}\\)';
        s3 += '</div>';

        if (expNeto > 0) {
            s3 += '<small style="color:#64748b;">Multiplicamos por 10<sup>' + expNeto + '</sup>: la unidad destino es más pequeña.</small>';
        } else if (expNeto < 0) {
            s3 += '<small style="color:#64748b;">Dividimos entre 10<sup>' + (-expNeto) + '</sup>: la unidad destino es más grande.</small>';
        } else {
            s3 += '<small style="color:#64748b;">No hay cambio de factor.</small>';
        }
        return s3;
    }

    // ----------------------------------------------------------------------
    // Funciones auxiliares para construir fracciones unitarias
    // Regla: la unidad del origen va al lado OPUESTO en el factor.
    // ----------------------------------------------------------------------

    // Unidad que está en el NUMERADOR del origen → factor lleva esa unidad ABAJO.
    // Ejemplo: "g/m³ → hg/mm³", el g está arriba. Factor: 1 hg / 10² g.
    // exponenteNeto = expOrigen - expDestino
    function fraccionParaNumerador(exponenteNeto, uOrigen, uDestino) {
        if (exponenteNeto > 0) {
            // Origen mayor → fracción: 10^expNeto · uDestino / 1 · uOrigen
            return '\\dfrac{10^{' + exponenteNeto + '}\\, ' + uDestino + '}{1\\, ' + uOrigen + '}';
        } else if (exponenteNeto < 0) {
            // Origen menor → fracción: 1 · uDestino / 10^(-expNeto) · uOrigen
            return '\\dfrac{1\\, ' + uDestino + '}{10^{' + (-exponenteNeto) + '}\\, ' + uOrigen + '}';
        } else {
            return '\\dfrac{1\\, ' + uDestino + '}{1\\, ' + uOrigen + '}';
        }
    }

    // Unidad que está en el DENOMINADOR del origen → factor lleva esa unidad ARRIBA.
    // Ejemplo: "g/dam³ → hg/mm³", el dam³ está abajo. Factor: 1 dam³ / 10¹² mm³.
    // exponenteNeto = expOrigen - expDestino
    function fraccionParaDenominador(exponenteNeto, uOrigen, uDestino) {
        if (exponenteNeto > 0) {
            // Origen mayor → fracción: 1 · uOrigen / 10^expNeto · uDestino
            return '\\dfrac{1\\, ' + uOrigen + '}{10^{' + exponenteNeto + '}\\, ' + uDestino + '}';
        } else if (exponenteNeto < 0) {
            // Origen menor → fracción: 10^(-expNeto) · uOrigen / 1 · uDestino
            return '\\dfrac{10^{' + (-exponenteNeto) + '}\\, ' + uOrigen + '}{1\\, ' + uDestino + '}';
        } else {
            return '\\dfrac{1\\, ' + uOrigen + '}{1\\, ' + uDestino + '}';
        }
    }

    // Tiempo: siempre está en el DENOMINADOR del origen.
    // Por la regla, el tiempo origen va ARRIBA del factor.
    function construirFraccionTiempo(factorTiempo, tOrigen, tDestino) {
        if (factorTiempo === 1) return '';

        // factorTiempo = segOrigen / segDestino
        if (factorTiempo < 1) {
            // Ejemplo: min → h. factorTiempo = 1/60. Fracción: 60 min / 1 h.
            return '\\dfrac{' + (1 / factorTiempo) + '\\, \\text{' + tOrigen + '}}{1\\, \\text{' + tDestino + '}}';
        } else {
            // Ejemplo: h → min. factorTiempo = 60. Fracción: 1 h / 60 min.
            return '\\dfrac{1\\, \\text{' + tOrigen + '}}{' + factorTiempo + '\\, \\text{' + tDestino + '}}';
        }
    }

    // Unidad en LaTeX con prefijo + base
    function latexUnidad(prefijo, base) {
        return '\\text{' + prefijo + base + '}';
    }

    function solucionCambioCompuesto(e) {
        var s = '\\(' + num(e.valor, 2) + '\\, \\text{' + e.origen + '} = ' + formatearResultado(e.resultado) + '\\, \\text{' + e.destino + '}\\)<br>';
        s += '<div class="gs-latex-container" style="margin:8px 0; padding:10px;">';

        // -------------------------------------------------------------
        // A) Área másica: [p]g/[p']m² ↔ [p]g/[p']m²
        // g va arriba del origen → fraccionParaNumerador
        // m² va abajo del origen → fraccionParaDenominador
        // -------------------------------------------------------------
        if (e.tipo === 'area_masica') {
            var uMasaO = latexUnidad(e.pOrigenMasa.simbolo, 'g');
            var uMasaD = latexUnidad(e.pDestinoMasa.simbolo, 'g');
            var uSupO = latexUnidad(e.pOrigenSup.simbolo, 'm') + '^2';
            var uSupD = latexUnidad(e.pDestinoSup.simbolo, 'm') + '^2';

            var fMasa = fraccionParaNumerador(e.factorMasa, uMasaO, uMasaD);
            var fSup = fraccionParaDenominador(e.factorSuperficie, uSupO, uSupD);

            s += '\\(' + num(e.valor, 2) + '\\, \\dfrac{' + uMasaO + '}{' + uSupO + '}';
            s += ' \\cdot ' + fMasa + ' \\cdot ' + fSup;
            s += ' = ' + formatearResultado(e.resultado) + '\\, \\dfrac{' + uMasaD + '}{' + uSupD + '}\\)';

        // -------------------------------------------------------------
        // B) Caudal másico: [p]g/[h|min|s] ↔ [p]g/[h|min|s]
        // g va arriba → fraccionParaNumerador
        // tiempo va abajo → construirFraccionTiempo
        // -------------------------------------------------------------
        } else if (e.tipo === 'caudal_masico') {
            var uMO = latexUnidad(e.pOrigen.simbolo, 'g');
            var uMD = latexUnidad(e.pDestino.simbolo, 'g');
            var fMasa2 = fraccionParaNumerador(e.factorMasa, uMO, uMD);
            var fTiempo = construirFraccionTiempo(e.factorTiempo, e.tOrigen.simbolo, e.tDestino.simbolo);

            s += '\\(' + num(e.valor, 2) + '\\, \\dfrac{' + uMO + '}{\\text{' + e.tOrigen.simbolo + '}}';
            s += ' \\cdot ' + fMasa2;
            if (fTiempo) s += ' \\cdot ' + fTiempo;
            s += ' = ' + formatearResultado(e.resultado) + '\\, \\dfrac{' + uMD + '}{\\text{' + e.tDestino.simbolo + '}}\\)';

        // -------------------------------------------------------------
        // C) Densidad con L: [p]g/L ↔ [p]g/m³
        // g va arriba → fraccionParaNumerador
        // L (o m³) va abajo → el factor de L↔m³ se construye explícitamente
        // -------------------------------------------------------------
        } else if (e.tipo === 'densidad_L') {
            var uMO2 = latexUnidad(e.pOrigenMasa.simbolo, 'g');
            var uMD2 = latexUnidad(e.pDestinoMasa.simbolo, 'g');
            var fMasa3 = fraccionParaNumerador(e.factorMasa, uMO2, uMD2);

            if (e.origenL) {
                // g/L → g/m³. L está abajo del origen → L va arriba: 10³ L / 1 m³
                s += '\\(' + num(e.valor, 2) + '\\, \\dfrac{' + uMO2 + '}{\\text{L}}';
                s += ' \\cdot ' + fMasa3;
                s += ' \\cdot \\dfrac{10^{3}\\, \\text{L}}{1\\, \\text{m}^3}';
                s += ' = ' + formatearResultado(e.resultado) + '\\, \\dfrac{' + uMD2 + '}{\\text{m}^3}\\)';
            } else {
                // g/m³ → g/L. m³ está abajo del origen → m³ va arriba: 1 m³ / 10³ L
                s += '\\(' + num(e.valor, 2) + '\\, \\dfrac{' + uMO2 + '}{\\text{m}^3}';
                s += ' \\cdot ' + fMasa3;
                s += ' \\cdot \\dfrac{1\\, \\text{m}^3}{10^{3}\\, \\text{L}}';
                s += ' = ' + formatearResultado(e.resultado) + '\\, \\dfrac{' + uMD2 + '}{\\text{L}}\\)';
            }

        // -------------------------------------------------------------
        // D) Velocidad: [p]m/[h|min|s] ↔ [p]m/[h|min|s]
        // m va arriba → fraccionParaNumerador
        // tiempo va abajo → construirFraccionTiempo
        // -------------------------------------------------------------
        } else if (e.tipo === 'velocidad') {
            var uLO = latexUnidad(e.pOrigen.simbolo, 'm');
            var uLD = latexUnidad(e.pDestino.simbolo, 'm');
            var fLong = fraccionParaNumerador(e.factorLongitud, uLO, uLD);
            var fTiempo2 = construirFraccionTiempo(e.factorTiempo, e.tOrigen.simbolo, e.tDestino.simbolo);

            s += '\\(' + num(e.valor, 2) + '\\, \\dfrac{' + uLO + '}{\\text{' + e.tOrigen.simbolo + '}}';
            s += ' \\cdot ' + fLong;
            if (fTiempo2) s += ' \\cdot ' + fTiempo2;
            s += ' = ' + formatearResultado(e.resultado) + '\\, \\dfrac{' + uLD + '}{\\text{' + e.tDestino.simbolo + '}}\\)';

        // -------------------------------------------------------------
        // E) Masa/Volumen con prefijos cúbicos
        // g va arriba → fraccionParaNumerador
        // m³ va abajo → fraccionParaDenominador
        // -------------------------------------------------------------
        } else if (e.tipo === 'masa_por_volumen') {
            var uMO3 = latexUnidad(e.pOrigenMasa.simbolo, 'g');
            var uMD3 = latexUnidad(e.pDestinoMasa.simbolo, 'g');
            var fMasa4 = fraccionParaNumerador(e.factorMasa, uMO3, uMD3);

            var uVO2 = latexUnidad(e.pOrigenVol.simbolo, 'm') + '^3';
            var uVD2 = latexUnidad(e.pDestinoVol.simbolo, 'm') + '^3';
            var fVol = fraccionParaDenominador(e.factorVolumen, uVO2, uVD2);

            s += '\\(' + num(e.valor, 2) + '\\, \\dfrac{' + uMO3 + '}{' + uVO2 + '}';
            s += ' \\cdot ' + fMasa4 + ' \\cdot ' + fVol;
            s += ' = ' + formatearResultado(e.resultado) + '\\, \\dfrac{' + uMD3 + '}{' + uVD2 + '}\\)';

        // -------------------------------------------------------------
        // F) Caudal volumétrico: [p]L/[h|min|s] ↔ [p]m³/[h|min|s]
        // L va arriba → fraccionParaNumerador (con L como unidad)
        // tiempo va abajo → construirFraccionTiempo
        // -------------------------------------------------------------
        } else if (e.tipo === 'caudal_volumetrico') {
            var uLO2 = latexUnidad(e.pOrigen.simbolo, 'L');
            var uLD2 = latexUnidad(e.pDestino.simbolo, 'm') + '^3';
            var fVol2 = fraccionParaNumerador(e.factorVolumen, uLO2, uLD2);
            var fTiempo3 = construirFraccionTiempo(e.factorTiempo, e.tOrigen.simbolo, e.tDestino.simbolo);

            s += '\\(' + num(e.valor, 2) + '\\, \\dfrac{' + uLO2 + '}{\\text{' + e.tOrigen.simbolo + '}}';
            s += ' \\cdot ' + fVol2;
            if (fTiempo3) s += ' \\cdot ' + fTiempo3;
            s += ' = ' + formatearResultado(e.resultado) + '\\, \\dfrac{' + uLD2 + '}{\\text{' + e.tDestino.simbolo + '}}\\)';
        }

        s += '</div>';
        return s;
    }

    function generarHTMLSoluciones() {
        var html = '';

        html += '<div class="gs-box gs-ejemplo" style="border-left-color: var(--gs-green);">';
        html += '<div class="gs-ejemplo-title"><i class="fa-solid fa-table"></i> Tabla 1: Magnitudes y Unidades</div>';
        html += '<table class="gs-tabla-datos" style="max-width:100%;"><thead><tr><th>Magnitud</th><th>Unidad (SI)</th><th>Tipo</th></tr></thead><tbody>';
        estado.tablaMagnitudes.forEach(function (f) {
            html += '<tr><td>' + f.magnitud + '</td><td>' + f.unidad + '</td><td>' + f.tipo + '</td></tr>';
        });
        html += '</tbody></table></div>';

        html += '<div class="gs-box gs-ejemplo" style="border-left-color: var(--gs-green);">';
        html += '<div class="gs-ejemplo-title"><i class="fa-solid fa-layer-group"></i> Tabla 2: Prefijos SI</div>';
        html += '<table class="gs-tabla-datos" style="max-width:100%;"><thead><tr><th>Prefijo</th><th>Símbolo</th><th>Factor</th></tr></thead><tbody>';
        estado.tablaPrefijos.forEach(function (f) {
            html += '<tr><td>' + f.prefijo + '</td><td>' + f.simbolo + '</td><td>\\(10^{' + f.factor + '}\\)</td></tr>';
        });
        html += '</tbody></table></div>';

        html += '<div class="gs-box gs-ejemplo" style="border-left-color: var(--gs-green);">';
        html += '<div class="gs-ejemplo-title"><i class="fa-solid fa-calculator"></i> Bloque 3: Notación Científica</div>';
        html += '<table class="gs-tabla-datos" style="max-width:100%;"><thead><tr><th>Notación científica</th><th>Forma decimal</th></tr></thead><tbody>';
        estado.notacionCientifica.forEach(function (e) {
            var colC = '\\(' + latexNotacionCientifica(e.coeficiente, e.exponente) + '\\)';
            var colD;
            if (e.tipo === 'decimal_a_cientifica') {
                colD = '\\(' + e.decimalStr.replace(/,/g, '{,}') + '\\)';
            } else {
                colD = '\\(' + calcularDecimalDesdeCientifica(e.coeficiente, e.exponente) + '\\)';
            }
            html += '<tr><td>' + colC + '</td><td>' + colD + '</td></tr>';
        });
        html += '</tbody></table></div>';

        html += '<div class="gs-box gs-ejemplo" style="border-left-color: var(--gs-green);">';
        html += '<div class="gs-ejemplo-title"><i class="fa-solid fa-arrows-rotate"></i> Bloque 4: Cambios Simples de Unidades</div>';
        html += '<ol>';
        estado.cambiosSimples.forEach(function (e) {
            html += '<li>' + solucionCambioSimple(e) + '</li>';
        });
        html += '</ol></div>';

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
    // 8. VERIFICAR PIN
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
    // 9. GENERAR TODO
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
