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

    // Prefijos completos para la tabla de prefijos
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

    // Prefijos restringidos para cambios simples: k, h, da, sin prefijo, d, c, m
    var PREFIJOS_SIMPLES = [
        { prefijo: 'kilo',  simbolo: 'k',  factor: 3  },
        { prefijo: 'hecto', simbolo: 'h',  factor: 2  },
        { prefijo: 'deca',  simbolo: 'da', factor: 1  },
        { prefijo: '',      simbolo: '',   factor: 0  },
        { prefijo: 'deci',  simbolo: 'd',  factor: -1 },
        { prefijo: 'centi', simbolo: 'c',  factor: -2 },
        { prefijo: 'mili',  simbolo: 'm',  factor: -3 }
    ];

    var MAGNITUDES_SIMPLES = [
        { nombre: 'longitud',   unidadBase: 'm',  esCuadratica: false, esCubica: false },
        { nombre: 'masa',       unidadBase: 'g',  esCuadratica: false, esCubica: false },
        { nombre: 'capacidad',  unidadBase: 'L',  esCuadratica: false, esCubica: false },
        { nombre: 'superficie', unidadBase: 'm²', esCuadratica: true,  esCubica: false },
        { nombre: 'volumen',    unidadBase: 'm³', esCuadratica: false, esCubica: true  }
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
        var resultado = partes.join('\\,');
        return (n < 0 ? '-' : '') + resultado;
    }

    function latexNotacionCientifica(coef, exp) {
        return num(coef, 2) + ' \\cdot 10^{' + exp + '}';
    }

    // Devuelve un prefijo aleatorio restringido
    function prefijoAleatorio() {
        return GS.aleatorio.elemento(PREFIJOS_SIMPLES);
    }

    // ======================================================================
    // 4. GENERADORES DE ACTIVIDADES
    // ======================================================================

    // --- TABLA 1: Magnitudes y unidades ---
    function generarTablaMagnitudes() {
        var seleccion = GS.aleatorio.variosDistintos(MAGNITUDES, 10);
        var filas = [];
        seleccion.forEach(function (m) {
            // Damos la magnitud o la unidad, nunca las dos
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

    // --- TABLA 2: Prefijos SI ---
    function generarTablaPrefijos() {
        var seleccion = GS.aleatorio.variosDistintos(PREFIJOS_TABLA, 10);
        var filas = [];
        seleccion.forEach(function (p) {
            filas.push({
                prefijo: p.prefijo,
                simbolo: p.simbolo,
                factor: p.factor,
                dato: GS.aleatorio.entero(0, 2)
            });
        });
        return filas;
    }

    // --- BLOQUE 3: Notación científica ---
    
        function generarNotacionCientifica() {
    var ejercicios = [];

    // 5 decimal -> científica
    for (var i = 0; i < 5; i++) {
        // Generamos un número entero entre 100 y 9999 (nunca un solo dígito)
        var entero = GS.aleatorio.entero(100, 9999);
        var strNum = entero.toString();
        // Coeficiente: primer dígito y luego la coma. Ej: "567" -> 5,67
        var coefStr = strNum.charAt(0) + ',' + strNum.slice(1);
        var coef = parseFloat(coefStr.replace(',', '.'));
        // Orden de magnitud del entero original
        var ordenMagnitud = Math.floor(Math.log10(entero));
        // Número de ceros tras la coma (exponente negativo)
        var numCeros = GS.aleatorio.entero(1, 15);
        var exponente = -(numCeros + ordenMagnitud);

        ejercicios.push({
            tipo: 'decimal_a_cientifica',
            coeficiente: coef,
            exponente: exponente,
            // Representación decimal para mostrar: 0,00000567
            decimalStr: '0,' + '0'.repeat(numCeros) + strNum
        });
    }

    // 5 científica -> decimal
    for (var j = 0; j < 5; j++) {
        var entero2 = GS.aleatorio.entero(100, 9999);
        var strNum2 = entero2.toString();
        var coefStr2 = strNum2.charAt(0) + ',' + strNum2.slice(1);
        var coef2 = parseFloat(coefStr2.replace(',', '.'));
        var ordenMagnitud2 = Math.floor(Math.log10(entero2));
        var numCeros2 = GS.aleatorio.entero(1, 15);
        // Podemos dar la científica con exponente negativo o positivo
        var signo = GS.aleatorio.signo();
        var exponente2;
        if (signo < 0) {
            exponente2 = -(numCeros2 + ordenMagnitud2);
        } else {
            // Positivo: el número se hace grande, añadimos ceros a la derecha
            exponente2 = numCeros2 + (strNum2.length - 1 - ordenMagnitud2) + ordenMagnitud2;
            // Simplificamos: exponente positivo entre 1 y 15
            exponente2 = GS.aleatorio.entero(1, 15);
        }

        ejercicios.push({
            tipo: 'cientifica_a_decimal',
            coeficiente: coef2,
            exponente: exponente2
        });
    }

    return GS.aleatorio.barajar(ejercicios);
}

        

    // --- BLOQUE 4: Cambios simples ---
    function generarCambiosSimples() {
        var ejercicios = [];

        // 4 cambios entre prefijos
        for (var i = 0; i < 4; i++) {
            var magnitud = GS.aleatorio.elemento(MAGNITUDES_SIMPLES);
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

    // --- BLOQUE 5: Cambios compuestos (generador flexible) ---
    //
    // Tipos:
    //   area_masica    : [p1]g/[p2]m²   <->  [p3]g/[p4]cm²
    //   caudal_masico  : [p1]g/[h|min|s]  <->  [p2]g/[h|min|s]
    //   densidad       : [p1]g/[p2]L     <->  [p3]g/[p4]m³     (o con kg/L)
    //   velocidad      : [p1]m/[h|min|s] <->  [p2]m/[h|min|s]  (o con km/h)
    //

    function generarCambioCompuestoAreaMasica() {
        var pOrigenMasa = prefijoAleatorio();
        var pDestinoMasa = prefijoAleatorio();
        while (pDestinoMasa.simbolo === pOrigenMasa.simbolo) {
            pDestinoMasa = prefijoAleatorio();
        }

        var pOrigenSup = prefijoAleatorio();
        var pDestinoSup = prefijoAleatorio();
        while (pDestinoSup.simbolo === pOrigenSup.simbolo) {
            pDestinoSup = prefijoAleatorio();
        }

        var valor = GS.aleatorio.decimal(0.5, 999, 2);

        var uOrigen = pOrigenMasa.simbolo + 'g/' + pOrigenSup.simbolo + 'm²';
        var uDestino = pDestinoMasa.simbolo + 'g/' + pDestinoSup.simbolo + 'cm²';

        // Factor de conversión
        // - Masa: pasar de origen a base (g) y luego a destino
        // - Superficie: pasar de origen a cm², pero como la base es cm² y el origen es [p]m²,
        //   usamos el siguiente razonamiento: 1 [p]m² = 10^(2*exp) m² = 10^(2*exp) · 10^4 cm²
        var expMasa = pOrigenMasa.factor - pDestinoMasa.factor;

        // Para la superficie: el origen está en m² con prefijo. La base de comparación es cm².
        // 1 m² = 10^4 cm²
        // Si origen es [p]m², entonces 1 [p]m² = 10^(2*expOrigen) m² = 10^(2*expOrigen + 4) cm²
        // Si destino es [p]cm², entonces 1 [p]cm² = 10^(2*expDestino) cm²
        // Por tanto el factor de superficie es 10^(2*expOrigen + 4 - 2*expDestino)
        var expSuperficie = 2 * pOrigenSup.factor + 4 - 2 * pDestinoSup.factor;

        var factorTotal = Math.pow(10, expMasa + expSuperficie);
        var resultado = valor * factorTotal;

        return {
            tipo: 'area_masica',
            valor: valor,
            origen: uOrigen,
            destino: uDestino,
            resultado: resultado,
            factorMasa: expMasa,
            factorSuperficie: expSuperficie,
            pOrigenMasa: pOrigenMasa,
            pDestinoMasa: pDestinoMasa,
            pOrigenSup: pOrigenSup,
            pDestinoSup: pDestinoSup
        };
    }

    function generarCambioCompuestoCaudalMasico() {
        var pOrigen = prefijoAleatorio();
        var pDestino = prefijoAleatorio();
        while (pDestino.simbolo === pOrigen.simbolo) {
            pDestino = prefijoAleatorio();
        }

        var tiempos = [
            { simbolo: 'h', nombre: 'h', segundos: 3600 },
            { simbolo: 'min', nombre: 'min', segundos: 60 },
            { simbolo: 's', nombre: 's', segundos: 1 }
        ];
        var tOrigen = GS.aleatorio.elemento(tiempos);
        var tDestino = GS.aleatorio.elemento(tiempos);
        while (tDestino.simbolo === tOrigen.simbolo) {
            tDestino = GS.aleatorio.elemento(tiempos);
        }

        var valor = GS.aleatorio.decimal(0.5, 999, 2);

        var uOrigen = pOrigen.simbolo + 'g/' + tOrigen.simbolo;
        var uDestino = pDestino.simbolo + 'g/' + tDestino.simbolo;

        // Factor total: masa * inverso del tiempo
        // valor · 10^(expOrigen - expDestino) · (segOrigen / segDestino) → pero cuidado, el tiempo va en el denominador
        // Si origen es g/h y destino g/s: valor · 10^0 · (1 h / 3600 s) → pero como el tiempo está en el denominador, invertimos
        var expMasa = pOrigen.factor - pDestino.factor;
        var expTiempo = Math.log10(tOrigen.segundos / tDestino.segundos);

        var factorTotal = Math.pow(10, expMasa + expTiempo);
        var resultado = valor * factorTotal;

        return {
            tipo: 'caudal_masico',
            valor: valor,
            origen: uOrigen,
            destino: uDestino,
            resultado: resultado,
            factorMasa: expMasa,
            factorTiempo: expTiempo,
            pOrigen: pOrigen,
            pDestino: pDestino,
            tOrigen: tOrigen,
            tDestino: tDestino
        };
    }

    function generarCambioCompuestoDensidad() {
        // Dos modos: g/L <-> g/m³, o kg/L <-> g/m³
        var usarKg = GS.aleatorio.booleano();

        var pOrigenMasa = usarKg ? { simbolo: 'k', factor: 3 } : { simbolo: '', factor: 0 };
        var pDestinoMasa = usarKg ? { simbolo: '', factor: 0 } : { simbolo: 'k', factor: 3 };

        // Origen en L o en m³, destino el contrario
        var origenL = GS.aleatorio.booleano();

        var valor = GS.aleatorio.decimal(0.5, 999, 2);

        var uOrigen, uDestino, expVolumen;

        if (origenL) {
            // g/L → kg/m³ (o kg/L → g/m³)
            uOrigen = pOrigenMasa.simbolo + 'g/L';
            uDestino = pDestinoMasa.simbolo + 'g/m³';
            // 1 L = 1 dm³ = 10^-3 m³. Por tanto, g/L = g / 10^-3 m³ = 10^3 g/m³
            expVolumen = 3;
        } else {
            // kg/m³ → g/L (o g/m³ → kg/L)
            uOrigen = pOrigenMasa.simbolo + 'g/m³';
            uDestino = pDestinoMasa.simbolo + 'g/L';
            expVolumen = -3;
        }

        var expMasa = pOrigenMasa.factor - pDestinoMasa.factor;
        var factorTotal = Math.pow(10, expMasa + expVolumen);
        var resultado = valor * factorTotal;

        return {
            tipo: 'densidad',
            valor: valor,
            origen: uOrigen,
            destino: uDestino,
            resultado: resultado,
            factorMasa: expMasa,
            factorVolumen: expVolumen,
            pOrigenMasa: pOrigenMasa,
            pDestinoMasa: pDestinoMasa,
            origenL: origenL
        };
    }

    function generarCambioCompuestoVelocidad() {
        var pOrigen = prefijoAleatorio();
        var pDestino = prefijoAleatorio();

        var tiempos = [
            { simbolo: 'h', nombre: 'h', segundos: 3600 },
            { simbolo: 'min', nombre: 'min', segundos: 60 },
            { simbolo: 's', nombre: 's', segundos: 1 }
        ];
        var tOrigen = GS.aleatorio.elemento(tiempos);
        var tDestino = GS.aleatorio.elemento(tiempos);
        while (tDestino.simbolo === tOrigen.simbolo) {
            tDestino = GS.aleatorio.elemento(tiempos);
        }

        var valor = GS.aleatorio.decimal(0.5, 999, 2);

        var uOrigen = pOrigen.simbolo + 'm/' + tOrigen.simbolo;
        var uDestino = pDestino.simbolo + 'm/' + tDestino.simbolo;

        // Factor: longitud · inverso del tiempo
        var expLongitud = pOrigen.factor - pDestino.factor;
        var expTiempo = Math.log10(tOrigen.segundos / tDestino.segundos);

        var factorTotal = Math.pow(10, expLongitud + expTiempo);
        var resultado = valor * factorTotal;

        return {
            tipo: 'velocidad',
            valor: valor,
            origen: uOrigen,
            destino: uDestino,
            resultado: resultado,
            factorLongitud: expLongitud,
            factorTiempo: expTiempo,
            pOrigen: pOrigen,
            pDestino: pDestino,
            tOrigen: tOrigen,
            tDestino: tDestino
        };
    }

    function generarCambiosCompuestos() {
        var generadores = [
            generarCambioCompuestoAreaMasica,
            generarCambioCompuestoCaudalMasico,
            generarCambioCompuestoDensidad,
            generarCambioCompuestoVelocidad
        ];

        var ejercicios = [];
        for (var i = 0; i < 6; i++) {
            var gen = GS.aleatorio.elemento(generadores);
            ejercicios.push(gen());
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
            var colMag = '';
            var colUni = '';

            if (f.dato === 'magnitud') {
                colMag = f.magnitud;
            } else {
                colUni = f.unidad;
            }

            html += '<tr>';
            html += '<td>' + colMag + '</td>';
            html += '<td>' + colUni + '</td>';
            html += '<td></td>';
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

            if (f.dato === 0) cP = f.prefijo;
            else if (f.dato === 1) cS = f.simbolo;
            else cF = '\\(10^{' + f.factor + '}\\)';

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
        var colC = '', colD = '';

        if (e.tipo === 'decimal_a_cientifica') {
            colD = '\\(' + e.decimalStr.replace(',', '{,}') + '\\)';
        } else {
            colC = '\\(' + latexNotacionCientifica(e.coeficiente, e.exponente) + '\\)';
        }

        html += '<tr>';
        html += '<td>' + colC + '</td>';
        html += '<td>' + colD + '</td>';
        html += '</tr>';
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

    function generarHTMLSoluciones() {
        var html = '';

        // Tabla 1
        html += '<div class="gs-box gs-ejemplo" style="border-left-color: var(--gs-green);">';
        html += '<div class="gs-ejemplo-title"><i class="fa-solid fa-table"></i> Tabla 1: Magnitudes y Unidades</div>';
        html += '<table class="gs-tabla-datos" style="max-width:100%;">';
        html += '<thead><tr><th>Magnitud</th><th>Unidad (SI)</th><th>Tipo</th></tr></thead><tbody>';
        estado.tablaMagnitudes.forEach(function (f) {
            html += '<tr><td>' + f.magnitud + '</td><td>' + f.unidad + '</td><td>' + f.tipo + '</td></tr>';
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
    var colC, colD;
    if (e.tipo === 'decimal_a_cientifica') {
        colD = '\\(' + e.decimalStr.replace(',', '{,}') + '\\)';
        colC = '\\(' + latexNotacionCientifica(e.coeficiente, e.exponente) + '\\)';
    } else {
        colC = '\\(' + latexNotacionCientifica(e.coeficiente, e.exponente) + '\\)';
        // Reconstruimos el decimal a partir del coeficiente y exponente
        var decimalSol = calcularDecimalDesdeCientifica(e.coeficiente, e.exponente);
        colD = '\\(' + decimalSol + '\\)';
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

    function solucionCambioSimple(e) {
        if (e.tipo === 'litros_a_m3') {
            var r = e.valor / 1000;
            var html = '\\(' + num(e.valor, 2) + '\\, \\text{L} = ' + num(r, 6) + '\\, \\text{m}^3\\)<br>';
            html += '<div class="gs-latex-container" style="margin:8px 0; padding:10px;">';
            html += '\\(' + num(e.valor, 2) + '\\, \\text{L} \\cdot \\dfrac{1\\, \\text{m}^3}{1000\\, \\text{L}} = ' + num(r, 6) + '\\, \\text{m}^3\\)';
            html += '</div>';
            html += '<small style="color:#64748b;">1 m³ = 1000 L. La unidad destino es más grande, por eso el número disminuye.</small>';
            return html;
        }

        if (e.tipo === 'm3_a_litros') {
            var r2 = e.valor * 1000;
            var html2 = '\\(' + num(e.valor, 3) + '\\, \\text{m}^3 = ' + numGrandeLatex(r2) + '\\, \\text{L}\\)<br>';
            html2 += '<div class="gs-latex-container" style="margin:8px 0; padding:10px;">';
            html2 += '\\(' + num(e.valor, 3) + '\\, \\text{m}^3 \\cdot \\dfrac{1000\\, \\text{L}}{1\\, \\text{m}^3} = ' + numGrandeLatex(r2) + '\\, \\text{L}\\)';
            html2 += '</div>';
            html2 += '<small style="color:#64748b;">1 m³ = 1000 L. La unidad destino es más pequeña, por eso el número aumenta.</small>';
            return html2;
        }

        // Cambio entre prefijos
        var uO = e.origen.simbolo + e.magnitud.unidadBase;
        var uD = e.destino.simbolo + e.magnitud.unidadBase;

        var expO = e.origen.factor * (e.magnitud.esCuadratica ? 2 : (e.magnitud.esCubica ? 3 : 1));
        var expD = e.destino.factor * (e.magnitud.esCuadratica ? 2 : (e.magnitud.esCubica ? 3 : 1));

        var resultado = e.valor * Math.pow(10, expO) / Math.pow(10, expD);

        var html3 = '\\(' + num(e.valor, 2) + '\\, \\text{' + uO + '} = ' + num(resultado, 6) + '\\, \\text{' + uD + '}\\)<br>';
        html3 += '<div class="gs-latex-container" style="margin:8px 0; padding:10px;">';
        html3 += '\\(' + num(e.valor, 2) + '\\, \\text{' + uO + '} \\cdot \\dfrac{10^{' + expD + '}\\, \\text{' + uD + '}}{10^{' + expO + '}\\, \\text{' + uO + '}} = ' + num(resultado, 6) + '\\, \\text{' + uD + '}\\)';
        html3 += '</div>';

        var expNeto = expO - expD;
        if (expNeto > 0) {
            html3 += '<small style="color:#64748b;">Multiplicamos por 10<sup>' + expNeto + '</sup>: la unidad destino es más pequeña, así que el número aumenta.</small>';
        } else if (expNeto < 0) {
            html3 += '<small style="color:#64748b;">Dividimos entre 10<sup>' + Math.abs(expNeto) + '</sup>: la unidad destino es más grande, así que el número disminuye.</small>';
        } else {
            html3 += '<small style="color:#64748b;">No hay cambio de factor.</small>';
        }

        return html3;
    }

    function solucionCambioCompuesto(e) {
        var html = '\\(' + num(e.valor, 2) + '\\, \\text{' + e.origen + '} = ' + num(e.resultado, 6) + '\\, \\text{' + e.destino + '}\\)<br>';
        html += '<div class="gs-latex-container" style="margin:8px 0; padding:10px;">';

        if (e.tipo === 'area_masica') {
            var p1 = e.pOrigenMasa.simbolo;
            var p2 = e.pDestinoMasa.simbolo;
            var p3 = e.pOrigenSup.simbolo;
            var p4 = e.pDestinoSup.simbolo;
            var expM = e.factorMasa;
            var expS = e.factorSuperficie;

            html += '\\(' + num(e.valor, 2) + '\\, \\dfrac{\\text{' + p1 + 'g}}{\\text{' + p3 + 'm}^2} \\cdot \\dfrac{10^{' + (-expM) + '}\\, \\text{' + p2 + 'g}}{1\\, \\text{' + p1 + 'g}} \\cdot \\dfrac{1\\, \\text{' + p3 + 'm}^2}{10^{' + expS + '}\\, \\text{' + p4 + 'm}^2} = ' + num(e.resultado, 6) + '\\, \\dfrac{\\text{' + p2 + 'g}}{\\text{' + p4 + 'm}^2}\\)';
        } else if (e.tipo === 'caudal_masico') {
            var pm1 = e.pOrigen.simbolo;
            var pm2 = e.pDestino.simbolo;
            var t1 = e.tOrigen.simbolo;
            var t2 = e.tDestino.simbolo;
            var expM2 = e.factorMasa;
            var expT = e.factorTiempo;

            html += '\\(' + num(e.valor, 2) + '\\, \\dfrac{\\text{' + pm1 + 'g}}{\\text{' + t1 + '}} \\cdot \\dfrac{10^{' + (-expM2) + '}\\, \\text{' + pm2 + 'g}}{1\\, \\text{' + pm1 + 'g}} \\cdot \\dfrac{1\\, \\text{' + t1 + '}}{10^{' + (-expT) + '}\\, \\text{' + t2 + '}} = ' + num(e.resultado, 6) + '\\, \\dfrac{\\text{' + pm2 + 'g}}{\\text{' + t2 + '}}\\)';
        } else if (e.tipo === 'densidad') {
            var dm1 = e.pOrigenMasa.simbolo;
            var dm2 = e.pDestinoMasa.simbolo;
            var uV1 = e.origenL ? 'L' : 'm^3';
            var uV2 = e.origenL ? 'm^3' : 'L';
            var expM3 = e.factorMasa;
            var expV = e.factorVolumen;

            html += '\\(' + num(e.valor, 2) + '\\, \\dfrac{\\text{' + dm1 + 'g}}{\\text{' + uV1 + '}} \\cdot \\dfrac{10^{' + (-expM3) + '}\\, \\text{' + dm2 + 'g}}{1\\, \\text{' + dm1 + 'g}} \\cdot \\dfrac{1\\, \\text{' + uV1 + '}}{10^{' + (-expV) + '}\\, \\text{' + uV2 + '}} = ' + num(e.resultado, 6) + '\\, \\dfrac{\\text{' + dm2 + 'g}}{\\text{' + uV2 + '}}\\)';
        } else if (e.tipo === 'velocidad') {
            var pv1 = e.pOrigen.simbolo;
            var pv2 = e.pDestino.simbolo;
            var tv1 = e.tOrigen.simbolo;
            var tv2 = e.tDestino.simbolo;
            var expL = e.factorLongitud;
            var expT2 = e.factorTiempo;

            html += '\\(' + num(e.valor, 2) + '\\, \\dfrac{\\text{' + pv1 + 'm}}{\\text{' + tv1 + '}} \\cdot \\dfrac{10^{' + (-expL) + '}\\, \\text{' + pv2 + 'm}}{1\\, \\text{' + pv1 + 'm}} \\cdot \\dfrac{1\\, \\text{' + tv1 + '}}{10^{' + (-expT2) + '}\\, \\text{' + tv2 + '}} = ' + num(e.resultado, 6) + '\\, \\dfrac{\\text{' + pv2 + 'm}}{\\text{' + tv2 + '}}\\)';
        }

        html += '</div>';
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