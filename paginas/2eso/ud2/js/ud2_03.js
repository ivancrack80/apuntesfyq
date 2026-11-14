    window.generarNuevasActividades = function() {
        if (!document.getElementById('act-gas-1')) return;
        
        problemasActuales = [];

        // --- BLOQUE 1: Cambios de temperatura (3 de ºC a K y 2 de K a ºC) ---
        let en1 = '<strong>Cambios de temperatura:</strong> Realiza las siguientes conversiones:<br><ul style="margin-top: 5px; margin-bottom: 0;">';
        let sol1 = '<strong>Cambios de temperatura:</strong><br><ul style="margin-top: 5px; margin-bottom: 0;">';
        
        for (let i = 0; i < 3; i++) {
            let c = random(-40, 150);
            let k = c + 273;
            en1 += `<li>${c} °C a Kelvin.</li>`;
            sol1 += `<li>\\(T = ${c} + 273 = \\mathbf{${k} \\text{ K}}\\)</li>`;
        }
        for (let i = 0; i < 2; i++) {
            let k = random(150, 450);
            let c = k - 273;
            en1 += `<li>${k} K a grados Celsius.</li>`;
            sol1 += `<li>\\(t = ${k} - 273 = \\mathbf{${c} °C}\\)</li>`;
        }
        en1 += '</ul>';
        sol1 += '</ul>';
        
        document.getElementById('act-gas-1').innerHTML = en1;
        problemasActuales.push({ enunciado: en1, solucion: sol1 });

        // --- BLOQUE 2: Cambios de presión (3 de atm a mmHg y 2 de atm a Pa) ---
        let en2 = '<strong>Cambios de presión:</strong> Realiza las siguientes conversiones (recuerda: 1 atm = 760 mmHg = 101325 Pa):<br><ul style="margin-top: 5px; margin-bottom: 0;">';
        let sol2 = '<strong>Cambios de presión:</strong><br><ul style="margin-top: 5px; margin-bottom: 0;">';
        
        for (let i = 0; i < 3; i++) {
            let atm = random(0.5, 5, 1);
            let mmhg = atm * 760;
            en2 += `<li>${num(atm, 1)} atm a mmHg.</li>`;
            sol2 += `<li>\\(${num(atm, 1)} \\cdot 760 = \\mathbf{${num(mmhg, 0)} \\text{ mmHg}}\\)</li>`;
        }
        for (let i = 0; i < 2; i++) {
            let atm = random(0.5, 5, 1);
            let pa = atm * 101325;
            en2 += `<li>${num(atm, 1)} atm a Pascales (Pa).</li>`;
            sol2 += `<li>\\(${num(atm, 1)} \\cdot 101325 = \\mathbf{${num(pa, 0)} \\text{ Pa}}\\)</li>`;
        }
        en2 += '</ul>';
        sol2 += '</ul>';
        
        document.getElementById('act-gas-2').innerHTML = en2;
        problemasActuales.push({ enunciado: en2, solucion: sol2 });

        // --- BLOQUE 3: Ley de Boyle ---
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

        // --- BLOQUE 4: Ley de Charles (con ciclo completo de temperatura) ---
        // T1 en ºC, T2 en K. Pedimos T2 final en ºC.
        let t1_c = random(10, 50);
        let t1_k = t1_c + 273;
        let v1_c = random(1, 10, 1);
        let v2_c = random(v1_c + 1, v1_c + 5, 1); // V2 mayor que V1
        let t2_k = (v2_c * t1_k) / v1_c;
        let t2_c = t2_k - 273;
        let t2_c_texto = t2_c.toFixed(0);
        
        let en4 = `Tenemos <strong>${num(v1_c, 1)} L</strong> de gas a una temperatura de <strong>${t1_c} °C</strong>. Si calentamos el gas a presión constante hasta que ocupe un volumen de <strong>${num(v2_c, 1)} L</strong>, ¿a qué temperatura (en °C) se encontrará?`;
        document.getElementById('act-gas-4').innerHTML = en4;
        problemasActuales.push({ 
            enunciado: en4, 
            solucion: `Es la Ley de Charles (P constante): \\(\\frac{V_1}{T_1} = \\frac{V_2}{T_2}\\)<br>
            1º Pasamos T1 a Kelvin: \\(T_1 = ${t1_c} + 273 = ${t1_k} \\text{ K}\\)<br>
            2º Despejamos \\(T_2\\): \\(T_2 = \\frac{V_2 \\cdot T_1}{V_1}\\)<br>
            3º Calculamos \\(T_2\\): \\(T_2 = \\frac{${num(v2_c,1)} \\cdot ${t1_k}}{${num(v1_c,1)}} = ${num(t2_k, 1)} \\text{ K}\\)<br>
            4º Pasamos a °C: \\(t_2 = ${num(t2_k, 1)} - 273 = \\mathbf{${num(t2_c, 0)} °C}\\)` 
        });

        // --- BLOQUE 5: Ley General (con cambio de unidad de presión) ---
        let p1_g = random(1, 3, 1);
        let p1_g_mmhg = p1_g * 760; // Damos P1 en mmHg
        let v1_g = random(5, 15, 1);
        let t1_g = random(273, 350);
        let p2_g = random(1, 3, 1);
        let t2_g = random(350, 450);
        let v2_g = (p1_g * v1_g * t2_g) / (t1_g * p2_g);
        
        let en5 = `Un gas se encuentra a <strong>${num(p1_g_mmhg, 0)} mmHg</strong> y <strong>${num(v1_g,1)} L</strong> a una temperatura de <strong>${t1_g} K</strong>. Si cambiamos las condiciones a <strong>${num(p2_g,1)} atm</strong> y <strong>${t2_g} K</strong>, ¿qué volumen ocupará?`;
        document.getElementById('act-gas-5').innerHTML = en5;
        problemasActuales.push({ 
            enunciado: en5, 
            solucion: `Es la Ley General de los Gases: \\(\\frac{P_1 \\cdot V_1}{T_1} = \\frac{P_2 \\cdot V_2}{T_2}\\)<br>
            1º Pasamos P1 de mmHg a atm: \\(P_1 = \\frac{${num(p1_g_mmhg, 0)}}{760} = ${num(p1_g, 2)} \\text{ atm}\\)<br>
            2º Despejamos \\(V_2\\): \\(V_2 = \\frac{P_1 \\cdot V_1 \\cdot T_2}{T_1 \\cdot P_2}\\)<br>
            3º Sustituimos: \\(V_2 = \\frac{${num(p1_g,2)} \\cdot ${num(v1_g,1)} \\cdot ${t2_g}}{${t1_g} \\cdot ${num(p2_g,1)}} = \\mathbf{${num(v2_g, 2)} \\text{ L}}\\)` 
        });

        // Ocultar soluciones si estaban abiertas y reiniciar el candado
        var contentDiv = document.getElementById('protectedSolutions');
        var authContainer = document.getElementById('solAuthContainer');
        var lockIcon = document.getElementById('lockIcon');
        if (contentDiv) { contentDiv.style.display = 'none'; contentDiv.innerHTML = ''; }
        if (authContainer) authContainer.style.display = 'flex';
        if (lockIcon) lockIcon.className = 'fa-solid fa-user-lock';
    };
