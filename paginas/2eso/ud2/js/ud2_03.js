(function () {
    'use strict';

    let problemasActuales = [];

    function random(min, max, dec = 0) {
        let num = Math.random() * (max - min) + min;
        return parseFloat(num.toFixed(dec));
    }

    function elegirAlAzar(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function num(valor, decimales) {
        let d = decimales === undefined ? 2 : decimales;
        return valor.toFixed(d).replace('.', ',');
    }

    function generarHTMLSoluciones() {
        let html = `
        <div class="no-print" style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 15px; margin-bottom: 22px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
            <div>
                <strong style="color: #166534; font-size: 0.98rem; display: block;"><i class="fa-solid fa-print"></i> Panel de Impresión Docente</strong>
                <span style="font-size: 0.85rem; color: #15803d;">Genera un PDF maquetado como libro de texto.</span>
            </div>
            <button onclick="window.generarPDFSinSolucionario()" style="background-color: #16a34a; color: white; border: none; padding: 10px 18px; border-radius: 6px; font-weight: 700; font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                <i class="fa-solid fa-file-pdf"></i> Imprimir / Guardar PDF
            </button>
        </div>
        `;

        html += '<div class="gs-box gs-ejemplo" style="border-left-color: var(--gs-green);">';
        html += '<div class="gs-ejemplo-title"><i class="fa-solid fa-pen-clip"></i> Resolución paso a paso</div>';
        html += '<ol>';

        problemasActuales.forEach(p => {
            html += '<li style="margin-bottom: 20px;">';
            html += '<strong>Problema:</strong> ' + p.enunciado + '<br><br>';
            html += '<div style="background: #f8fafc; padding: 10px; border-radius: 6px; border-left: 3px solid #0284c7;">';
            html += '<strong>Solución:</strong><br>' + p.solucion;
            html += '</div></li>';
        });

        html += '</ol></div>';
        return html;
    }

    window.generarNuevasActividades = function() {
        if (!document.getElementById('act-gas-1')) return;
        
        problemasActuales = [];

        // --- BLOQUE 1: Cambio de unidades de Temperatura ---
        let c1 = random(-50, 200);
        let k1 = c1 + 273;
        let en1 = `Convierte <strong>${c1} °C</strong> a Kelvin.`;
        document.getElementById('act-gas-1').innerHTML = en1;
        problemasActuales.push({ 
            enunciado: en1, 
            solucion: `Aplicamos la fórmula: \\(T(K) = t(°C) + 273\\)<br> \\(T = ${c1} + 273 = \\mathbf{${k1} \\text{ K}}\\)` 
        });

        // --- BLOQUE 2: Cambio de unidades de Presión ---
        let tipo2 = elegirAlAzar(['atm_a_pa', 'pa_a_atm', 'mbar_a_pa']);
        let en2 = '', sol2 = '';
        if (tipo2 === 'atm_a_pa') {
            let atm = random(0.5, 10, 1);
            let pa = atm * 101325;
            en2 = `Convierte <strong>${num(atm, 1)} atm</strong> a Pascales (Pa).`;
            sol2 = `Sabemos que \\(1 \\text{ atm} = 101325 \\text{ Pa}\\).<br> \\(${num(atm, 1)} \\text{ atm} \\cdot 101325 = \\mathbf{${num(pa, 0)} \\text{ Pa}}\\)`;
        } else if (tipo2 === 'pa_a_atm') {
            let atm = random(0.5, 10, 1);
            let pa = atm * 101325;
            en2 = `Convierte <strong>${num(pa, 0)} Pa</strong> a atmósferas (atm).`;
            sol2 = `Sabemos que \\(101325 \\text{ Pa} = 1 \\text{ atm}\\).<br> \\(${num(pa, 0)} / 101325 = \\mathbf{${num(atm, 1)} \\text{ atm}}\\)`;
        } else {
            let mbar = random(500, 2000);
            let pa = mbar * 100;
            en2 = `Convierte <strong>${mbar} mbar</strong> a Pascales (Pa).`;
            sol2 = `Sabemos que \\(1 \\text{ mbar} = 100 \\text{ Pa}\\).<br> \\(${mbar} \\cdot 100 = \\mathbf{${num(pa, 0)} \\text{ Pa}}\\)`;
        }
        document.getElementById('act-gas-2').innerHTML = en2;
        problemasActuales.push({ enunciado: en2, solucion: sol2 });

        // --- BLOQUE 3: Ley de Boyle (P1V1 = P2V2) ---
        let p1_b = random(1, 5, 1);
        let v1_b = random(2, 20, 1);
        let k_b = p1_b * v1_b;
        let p2_b = random(2, 10, 1);
        let v2_b = k_b / p2_b;
        let en3 = `Un gas ocupa un volumen de <strong>${num(v1_b, 1)} L</strong> a una presión de <strong>${num(p1_b, 1)} atm</strong>. Si lo comprimimos hasta una presión de <strong>${num(p2_b, 1)} atm</strong> manteniendo la temperatura constante, ¿qué volumen ocupará?`;
        document.getElementById('act-gas-3').innerHTML = en3;
        problemasActuales.push({ 
            enunciado: en3, 
            solucion: `Es la Ley de Boyle (T constante): \\(P_1 \\cdot V_1 = P_2 \\cdot V_2\\)<br>
            1º Despejamos \\(V_2\\): \\(V_2 = \\frac{P_1 \\cdot V_1}{P_2}\\)<br>
            2º Sustituimos: \\(V_2 = \\frac{${num(p1_b,1)} \\cdot ${num(v1_b,1)}}{${num(p2_b,1)}} = \\mathbf{${num(v2_b, 2)} \\text{ L}}\\)` 
        });

        // --- BLOQUE 4: Ley de Charles (V1/T1 = V2/T2) ---
        let v1_c = random(1, 10, 1);
        let t1_c = random(273, 400);
        let t2_c = random(400, 600);
        let v2_c = (v1_c * t2_c) / t1_c;
        let en4 = `Tenemos <strong>${num(v1_c, 1)} L</strong> de gas a <strong>${t1_c} K</strong>. Si calentamos el gas hasta <strong>${t2_c} K</strong> a presión constante, ¿cuál será su nuevo volumen?`;
        document.getElementById('act-gas-4').innerHTML = en4;
        problemasActuales.push({ 
            enunciado: en4, 
            solucion: `Es la Ley de Charles (P constante): \\(\\frac{V_1}{T_1} = \\frac{V_2}{T_2}\\)<br>
            1º Despejamos \\(V_2\\): \\(V_2 = \\frac{V_1 \\cdot T_2}{T_1}\\)<br>
            2º Sustituimos: \\(V_2 = \\frac{${num(v1_c,1)} \\cdot ${t2_c}}{${t1_c}} = \\mathbf{${num(v2_c, 2)} \\text{ L}}\\)` 
        });

        // --- BLOQUE 5: Ley General (P1V1/T1 = P2V2/T2) ---
        // Generamos un problema donde T varía, P varía y V es la incógnita
        let p1_g = random(1, 3, 1);
        let v1_g = random(5, 15, 1);
        let t1_g = random(273, 350);
        let p2_g = random(1, 3, 1);
        let t2_g = random(350, 450);
        let v2_g = (p1_g * v1_g * t2_g) / (t1_g * p2_g);
        
        let en5 = `Un gas se encuentra a <strong>${num(p1_g,1)} atm</strong> y <strong>${num(v1_g,1)} L</strong> a una temperatura de <strong>${t1_g} K</strong>. Si cambiamos las condiciones a <strong>${num(p2_g,1)}
