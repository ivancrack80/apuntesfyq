(function () {
    'use strict';

    // --- TABLA DE MATERIALES (Densidad en el SI) ---
    const materiales = [
        { nombre: "Corcho", d: 250 },
        { nombre: "Madera", d: 500 },
        { nombre: "Vidrio", d: 2500 },
        { nombre: "Aluminio", d: 2700 },
        { nombre: "Titanio", d: 4500 },
        { nombre: "Hierro", d: 7800 },
        { nombre: "Cobre", d: 8900 },
        { nombre: "Plata", d: 10500 },
        { nombre: "Plomo", d: 11300 }
    ];

    let problemasActuales = []; // Aquí guardaremos los datos y soluciones

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

        // Genera el HTML del solucionario paso a paso
    function generarHTMLSoluciones() {
        // --- BOTÓN DE IMPRESIÓN DOCENTE ---
        let html = `
        <div class="no-print" style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 15px; margin-bottom: 22px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
            <div>
                <strong style="color: #166534; font-size: 0.98rem; display: block;">
                    <i class="fa-solid fa-print"></i> Panel de Impresión Docente
                </strong>
                <span style="font-size: 0.85rem; color: #15803d;">
                    Genera un PDF maquetado como libro de texto (sin solucionario).
                </span>
            </div>
            <button onclick="window.generarPDFSinSolucionario()" style="background-color: #16a34a; color: white; border: none; padding: 10px 18px; border-radius: 6px; font-weight: 700; font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                <i class="fa-solid fa-file-pdf"></i> Imprimir / Guardar PDF
            </button>
        </div>
        `;

        // --- SOLUCIONES PASO A PASO ---
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
        if (!document.getElementById('act-densidad-1')) return;
        
        problemasActuales = []; // Vaciamos los problemas anteriores

        // --- BLOQUE 1: Cálculo directo ---
        let mat1 = elegirAlAzar(materiales);
        let v1_cm3 = Math.round(random(10, 100) / 5) * 5; 
        let m1_g = parseFloat((mat1.d / 1000 * v1_cm3).toFixed(1)); 
        
        let m1_kg = m1_g / 1000;
        let v1_m3 = v1_cm3 / 1000000;
        let d1 = mat1.d;

        let en1 = `Un bloque metálico tiene una masa de <strong>${m1_g} g</strong> y ocupa un volumen de <strong>${v1_cm3} cm³</strong>. Calcula su densidad en unidades del SI y consulta la tabla para decir de qué material se trata.`;
        document.getElementById('act-densidad-1').innerHTML = en1;

        let sol1 = `
            1º Convertimos al SI:<br>
            • Masa: \\(${m1_g} \\text{ g} \\cdot \\frac{1 \\text{ kg}}{1000 \\text{ g}} = ${num(m1_kg, 3)} \\text{ kg}\\)<br>
            • Volumen: \\(${v1_cm3} \\text{ cm}^3 \\cdot \\frac{1 \\text{ m}^3}{1\\,000\\,000 \\text{ cm}^3} = ${num(v1_m3, 6)} \\text{ m}^3\\)<br>
            2º Calculamos la densidad: \\(d = \\frac{${num(m1_kg, 3)}}{${num(v1_m3, 6)}} = \\mathbf{${num(d1, 0)} \\text{ kg/m}^3}\\)<br>
            3º Buscamos en la tabla: Corresponde al <strong>${mat1.nombre}</strong>.
        `;
        problemasActuales.push({ enunciado: en1, solucion: sol1 });

        // --- BLOQUE 2: Cálculo de la masa ---
        let mat2 = elegirAlAzar(materiales);
        let v2_cm3 = Math.round(random(20, 150) / 5) * 5; 
        let m2_g = parseFloat((mat2.d / 1000 * v2_cm3).toFixed(1));
        let m2_kg = m2_g / 1000;
        let v2_m3 = v2_cm3 / 1000000;

        let en2 = `Un objeto tiene un volumen de <strong>${v2_cm3} cm³</strong> y está hecho de un material con una densidad de <strong>${mat2.d} kg/m³</strong>. ¿Cuál será su masa en kilogramos?`;
        document.getElementById('act-densidad-2').innerHTML = en2;

        let sol2 = `
            1º Convertimos el volumen al SI:<br>
            \\(${v2_cm3} \\text{ cm}^3 \\cdot \\frac{1 \\text{ m}^3}{1\\,000\\,000 \\text{ cm}^3} = ${num(v2_m3, 6)} \\text{ m}^3\\)<br>
            2º Despejamos y calculamos la masa:<br>
            \\(m = d \\cdot V = ${mat2.d} \\cdot ${num(v2_m3, 6)} = \\mathbf{${num(m2_kg, 3)} \\text{ kg}}\\)<br>
            <em>(Equivale a ${m2_g} g)</em>
        `;
        problemasActuales.push({ enunciado: en2, solucion: sol2 });

                // --- BLOQUE 3: Cálculo del volumen ---
        let mat3 = elegirAlAzar(materiales);
        // Generamos la masa directamente en kg (ej. 3.5 kg)
        let m3_kg = random(1, 10, 2);
        // Calculamos su equivalente en gramos para mostrarlo en el enunciado
        let m3_g = m3_kg * 1000;
        
        // Cálculo del volumen: m3_m3 = kg / (kg/m3) -> m3
        let v3_m3 = m3_kg / mat3.d;
        // Cálculo en litros
        let v3_L = v3_m3 * 1000;

        let en3 = `Una pieza metálica tiene una masa de <strong>${num(m3_g, 0)} g</strong> y sabemos que su densidad es de <strong>${mat3.d} kg/m³</strong>. ¿Qué volumen ocupa en litros?`;
        document.getElementById('act-densidad-3').innerHTML = en3;

        let sol3 = `
            1º Pasamos la masa al SI (kilogramos):<br>
            \\(m = ${num(m3_g, 0)} \\text{ g} \\cdot \\frac{1 \\text{ kg}}{1000 \\text{ g}} = ${num(m3_kg, 2)} \\text{ kg}\\)<br>
            2º Despejamos y calculamos el volumen en el SI:<br>
            \\(V = \\frac{m}{d} = \\frac{${num(m3_kg, 2)} \\text{ kg}}{${mat3.d} \\text{ kg/m}^3} = ${num(v3_m3, 5)} \\text{ m}^3\\)<br>
            3º Pasamos a litros:<br>
            \\(${num(v3_m3, 5)} \\text{ m}^3 \\cdot \\frac{1000 \\text{ L}}{1 \\text{ m}^3} = \\mathbf{${num(v3_L, 2)} \\text{ L}}\\)
        `;
        problemasActuales.push({ enunciado: en3, solucion: sol3 });

        // --- BLOQUE 4: Ortoedro ---
        let a = random(5, 20); 
        let b = random(5, 20);
        let c = random(5, 20);
        let v4_cm3 = a * b * c;
        let mat4 = elegirAlAzar(materiales);
        let m4_g = parseFloat((mat4.d / 1000 * v4_cm3).toFixed(1)); 
        let m4_texto = m4_g >= 5000 ? `${num(m4_g/1000, 2)} kg` : `${m4_g} g`; 
        let v4_m3 = v4_cm3 / 1000000;
        let m4_kg = m4_g / 1000;

        let en4 = `Tenemos una caja metálica de <strong>${a} cm de largo, ${b} cm de ancho y ${c} cm de alto</strong>. Su masa es de <strong>${m4_texto}</strong>. Calcula su volumen, su densidad en kg/m³ y di de qué material se trata.`;
        document.getElementById('act-densidad-4').innerHTML = en4;

        let sol4 = `
            1º Volumen geométrico: \\(V = ${a} \\cdot ${b} \\cdot ${c} = ${v4_cm3} \\text{ cm}^3\\)<br>
            2º Pasamos al SI: \\(V = ${v4_cm3} \\cdot 10^{-6} = ${num(v4_m3, 6)} \\text{ m}^3\\)<br>
            3º Masa en kg: \\(m = ${m4_texto} = ${num(m4_kg, 3)} \\text{ kg}\\)<br>
            4º Densidad: \\(d = \\frac{${num(m4_kg, 3)}}{${num(v4_m3, 6)}} = \\mathbf{${mat4.d} \\text{ kg/m}^3}\\)<br>
            5º Es <strong>${mat4.nombre}</strong>.
        `;
        problemasActuales.push({ enunciado: en4, solucion: sol4 });

        // --- BLOQUE 5: Cilindro ---
        let r = random(2, 10); 
        let h = random(5, 20); 
        let v5_cm3 = Math.PI * r * r * h;
        let mat5 = elegirAlAzar(materiales);
        let m5_g = parseFloat((mat5.d / 1000 * v5_cm3).toFixed(1));
        let m5_texto = m5_g >= 5000 ? `${num(m5_g/1000, 2)} kg` : `${m5_g} g`;
        let v5_m3 = v5_cm3 / 1000000;
        let m5_kg = m5_g / 1000;

        let en5 = `Un cilindro metálico tiene un radio de <strong>${r} cm</strong> y una altura de <strong>${h} cm</strong>. Su masa es de <strong>${m5_texto}</strong>. ¿Determina el material del que está hecho el cilindro.`;
        document.getElementById('act-densidad-5').innerHTML = en5;

        let sol5 = `
            1º Volumen geométrico: \\(V = 3,14 \\cdot (${r})^2 \\cdot ${h} = ${num(v5_cm3, 1)} \\text{ cm}^3\\)<br>
            2º Pasamos al SI: \\(V = ${num(v5_cm3, 1)} \\cdot 10^{-6} = ${num(v5_m3, 6)} \\text{ m}^3\\)<br>
            3º Masa en kg: \\(m = ${m5_texto} = ${num(m5_kg, 3)} \\text{ kg}\\)<br>
            4º Densidad: \\(d = \\frac{${num(m5_kg, 3)}}{${num(v5_m3, 6)}} = \\mathbf{${mat5.d} \\text{ kg/m}^3}\\)<br>
            5º Es <strong>${mat5.nombre}</strong>.
        `;
        problemasActuales.push({ enunciado: en5, solucion: sol5 });

        // Ocultar soluciones si estaban abiertas y reiniciar el candado
        var contentDiv = document.getElementById('protectedSolutions');
        var authContainer = document.getElementById('solAuthContainer');
        var lockIcon = document.getElementById('lockIcon');
        if (contentDiv) { contentDiv.style.display = 'none'; contentDiv.innerHTML = ''; }
        if (authContainer) authContainer.style.display = 'flex';
        if (lockIcon) lockIcon.className = 'fa-solid fa-user-lock';
    };

    // --- VERIFICAR PIN ---
    window.verificarPin = async function() {
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

        if (errorMsg) { errorMsg.innerText = 'Verificando código...'; errorMsg.style.color = '#1e3a8a'; errorMsg.style.display = 'block'; }
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
    };

    // Ejecutar al cargar
    document.addEventListener('gs-ready', window.generarNuevasActividades);
    
    // Ejecutar si ya está listo (por si acaso)
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(window.generarNuevasActividades, 100);
    }

})();
