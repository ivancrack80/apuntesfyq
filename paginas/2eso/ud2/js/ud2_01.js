document.addEventListener('gs-ready', function () {
    if (!document.getElementById('act-densidad-1')) return;

    // --- TABLA DE MATERIALES EN EL SI ---
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

    function random(min, max, dec = 0) {
        let num = Math.random() * (max - min) + min;
        return parseFloat(num.toFixed(dec));
    }

    function elegirAlAzar(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function redondear(num, dec = 2) {
        return parseFloat(num.toFixed(dec));
    }

    // --- BLOQUE 1: Cálculo directo (Te dan g y cm3, piden kg/m3) ---
    let m1_g = random(50, 800); 
    let v1_cm3 = random(10, 100); 
    
    // Conversiones al SI
    let m1_kg = redondear(m1_g / 1000, 3);
    let v1_m3 = redondear(v1_cm3 / 1000000, 8); // 1 m3 = 1.000.000 cm3
    
    // Cálculo final
    let d1 = redondear(m1_kg / v1_m3, 0);
    let mat1 = materiales.find(m => Math.abs(m.d - d1) < (m.d * 0.05)); // Buscamos el material (margen 5%)
    let mat1_nombre = mat1 ? mat1.nombre : "Desconocido";

    document.getElementById('act-densidad-1').innerHTML = `
        Un bloque metálico tiene una masa de <strong>${m1_g} g</strong> y ocupa un volumen de <strong>${v1_cm3} cm³</strong>. 
        Calcula su densidad en el SI y consulta la tabla para decir de qué material se trata.
    `;
    document.getElementById('sol-densidad-1').innerHTML = `
        <strong>1º Pasamos las unidades al SI:</strong><br>
        • Masa: \(${m1_g} \\text{ g} \\cdot \\frac{1 \\text{ kg}}{1000 \\text{ g}} = ${m1_kg} \\text{ kg}\)<br>
        • Volumen: \(${v1_cm3} \\text{ cm}^3 \\cdot \\frac{1 \\text{ m}^3}{1\\,000\\,000 \\text{ cm}^3} = ${v1_m3} \\text{ m}^3\)<br><br>
        <strong>2º Calculamos la densidad:</strong><br>
        \(d = \\frac{m}{V} = \\frac{${m1_kg} \\text{ kg}}{${v1_m3} \\text{ m}^3} = \\mathbf{${d1} \\text{ kg/m}^3}\)<br><br>
        <strong>3º Buscamos en la tabla:</strong> El valor ${d1} kg/m³ corresponde al <strong>${mat1_nombre}</strong>.
    `;

    // --- BLOQUE 2: Cálculo de la masa (Te dan kg/m3 y cm3, piden kg) ---
    let mat2 = elegirAlAzar(materiales);
    let v2_cm3 = random(20, 150); 
    let v2_m3 = redondear(v2_cm3 / 1000000, 8);
    let m2_kg = redondear(mat2.d * v2_m3, 3); // m = d * V
    
    document.getElementById('act-densidad-2').innerHTML = `
        Un objeto tiene un volumen de <strong>${v2_cm3} cm³</strong> y está hecho de un material con una densidad de <strong>${mat2.d} kg/m³</strong>. 
        ¿Cuál será su masa en kilogramos?
    `;
    document.getElementById('sol-densidad-2').innerHTML = `
        <strong>1º Pasamos el volumen al SI:</strong><br>
        \(${v2_cm3} \\text{ cm}^3 \\cdot \\frac{1 \\text{ m}^3}{1\\,000\\,000 \\text{ cm}^3} = ${v2_m3} \\text{ m}^3\)<br><br>
        <strong>2º Despejamos y calculamos la masa:</strong><br>
        \(m = d \\cdot V = ${mat2.d} \\text{ kg/m}^3 \\cdot ${v2_m3} \\text{ m}^3 = \\mathbf{${m2_kg} \\text{ kg}}\)
    `;

    // --- BLOQUE 3: Cálculo del volumen (Te dan kg y kg/m3, piden L) ---
    let mat3 = elegirAlAzar(materiales);
    let m3_kg = random(1, 10, 2); 
    let v3_m3 = redondear(m3_kg / mat3.d, 5); // V = m / d
    let v3_L = redondear(v3_m3 * 1000, 2); // 1 m3 = 1000 L
    
    document.getElementById('act-densidad-3').innerHTML = `
        Una pieza de un metal tiene una masa de <strong>${m3_kg} kg</strong> y sabemos que su densidad es de <strong>${mat3.d} kg/m³</strong>. 
        ¿Qué volumen ocupa en litros?
    `;
    document.getElementById('sol-densidad-3').innerHTML = `
        <strong>1º Despejamos el volumen en el SI:</strong><br>
        \(V = \\frac{m}{d} = \\frac{${m3_kg} \\text{ kg}}{${mat3.d} \\text{ kg/m}^3} = ${v3_m3} \\text{ m}^3\)<br><br>
        <strong>2º Pasamos el volumen a litros:</strong><br>
        \(${v3_m3} \\text{ m}^3 \\cdot \\frac{1000 \\text{ L}}{1 \\text{ m}^3} = \\mathbf{${v3_L} \\text{ L}}\)<br><br>
        <em>Nota: también puedes pasar la masa a gramos y usar la densidad en g/cm³, pero hacerlo todo en el SI es más riguroso.</em>
    `;

    // --- BLOQUE 4: Geometría + Densidad (Ortoedro) ---
    let a = random(5, 20); 
    let b = random(5, 20);
    let c = random(5, 20);
    let v4_cm3 = a * b * c;
    let v4_m3 = redondear(v4_cm3 / 1000000, 8);
    let mat4 = elegirAlAzar(materiales);
    let m4_kg = redondear(mat4.d * v4_m3, 2); 
    let m4_texto = m4_kg >= 1 ? `${m4_kg} kg` : `${redondear(m4_kg * 1000, 0)} g`; // Si es muy ligero, en gramos

    document.getElementById('act-densidad-4').innerHTML = `
        Tenemos una caja metálica de <strong>${a} cm de largo, ${b} cm de ancho y ${c} cm de alto</strong>. Su masa es de <strong>${m4_texto}</strong>.<br>
        Calcula su densidad en kg/m³ y di de qué material se trata.
    `;
    document.getElementById('sol-densidad-4').innerHTML = `
        <strong>1º Calculamos el volumen geométrico:</strong><br>
        \(V = ${a} \\cdot ${b} \\cdot ${c} = ${v4_cm3} \\text{ cm}^3\)<br><br>
        <strong>2º Pasamos volumen y masa al SI:</strong><br>
        • \(V = ${v4_cm3} \\cdot 10^{-6} = ${v4_m3} \\text{ m}^3\)<br>
        • \(m = ${m4_texto} = ${m4_kg} \\text{ kg}\)<br><br>
        <strong>3º Calculamos la densidad y buscamos:</strong><br>
        \(d = \\frac{${m4_kg}}{${v4_m3}} = \\mathbf{${mat4.d} \\text{ kg/m}^3}\)<br>
        Según la tabla, es <strong>${mat4.nombre}</strong>.
    `;

    // --- BLOQUE 5: Geometría + Densidad (Cilindro) ---
    let r = random(2, 10, 1); 
    let h = random(5, 20, 1); 
    let v5_cm3 = redondear(Math.PI * r * r * h, 1);
    let v5_m3 = redondear(v5_cm3 / 1000000, 8);
    let mat5 = elegirAlAzar(materiales);
    let m5_kg = redondear(mat5.d * v5_m3, 2);
    let m5_texto = m5_kg >= 1 ? `${m5_kg} kg` : `${redondear(m5_kg * 1000, 0)} g`;

    document.getElementById('act-densidad-5').innerHTML = `
        Un cilindro metálico tiene un radio de <strong>${r} cm</strong> y una altura de <strong>${h} cm</strong>. Su masa es de <strong>${m5_texto}</strong>.<br>
        Calcula su densidad en kg/m³ y di de qué material se trata.
    `;
    document.getElementById('sol-densidad-5').innerHTML = `
        <strong>1º Calculamos el volumen geométrico:</strong><br>
        \(V = 3,14 \\cdot (${r})^2 \\cdot ${h} = ${v5_cm3} \\text{ cm}^3\)<br><br>
        <strong>2º Pasamos volumen y masa al SI:</strong><br>
        • \(V = ${v5_cm3} \\cdot 10^{-6} = ${v5_m3} \\text{ m}^3\)<br>
        • \(m = ${m5_texto} = ${m5_kg} \\text{ kg}\)<br><br>
        <strong>3º Calculamos la densidad y buscamos:</strong><br>
        \(d = \\frac{${m5_kg}}{${v5_m3}} = \\mathbf{${mat5.d} \\text{ kg/m}^3}\)<br>
        Según la tabla, es <strong>${mat5.nombre}</strong>.
    `;
});
