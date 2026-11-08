document.addEventListener('gs-ready', function () {
    
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

    // --- FUNCIÓN PRINCIPAL QUE GENERA LOS ENUNCIADOS ---
    window.generarNuevasActividades = function() {
        if (!document.getElementById('act-densidad-1')) return;

        // --- BLOQUE 1: Cálculo directo ---
        let m1_g = random(50, 500); 
        let v1_cm3 = random(10, 100); 
        
        document.getElementById('act-densidad-1').innerHTML = `
            Un bloque metálico tiene una masa de <strong>${m1_g} g</strong> y ocupa un volumen de <strong>${v1_cm3} cm³</strong>. 
            Calcula su densidad en unidades del SI y consulta la tabla de densidades de la teoría para decir de qué material se trata.
        `;

        // --- BLOQUE 2: Cálculo de la masa ---
        let mat2 = elegirAlAzar(materiales);
        let v2_cm3 = random(20, 150); 
        
        document.getElementById('act-densidad-2').innerHTML = `
            Un objeto tiene un volumen de <strong>${v2_cm3} cm³</strong> y está hecho de un material con una densidad de <strong>${mat2.d} kg/m³</strong>. 
            ¿Cuál será su masa en kilogramos?
        `;

        // --- BLOQUE 3: Cálculo del volumen ---
        let mat3 = elegirAlAzar(materiales);
        let m3_kg = random(1, 10, 2); 
        
        document.getElementById('act-densidad-3').innerHTML = `
            Una pieza metálica tiene una masa de <strong>${m3_kg} kg</strong> y sabemos que su densidad es de <strong>${mat3.d} kg/m³</strong>. 
            ¿Qué volumen ocupa en litros?
        `;

        // --- BLOQUE 4: Geometría + Densidad (Ortoedro) ---
        let a = random(5, 20); 
        let b = random(5, 20);
        let c = random(5, 20);
        let v4_cm3 = a * b * c;
        let v4_m3 = redondear(v4_cm3 / 1000000, 8);
        let mat4 = elegirAlAzar(materiales);
        let m4_kg = redondear(mat4.d * v4_m3, 2); 
        let m4_texto = m4_kg >= 1 ? `${m4_kg} kg` : `${redondear(m4_kg * 1000, 0)} g`; 

        document.getElementById('act-densidad-4').innerHTML = `
            Tenemos una caja metálica de <strong>${a} cm de largo, ${b} cm de ancho y ${c} cm de alto</strong>. Su masa es de <strong>${m4_texto}</strong>.<br>
            Calcula su volumen, calcula su densidad en kg/m³ y consulta la tabla para decir de qué material se trata.
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
            Calcula su volumen usando la fórmula, su densidad en kg/m³ y di de qué material se trata consultando la tabla.
        `;
    };

    // Ejecutar al cargar la página por primera vez
    window.generarNuevasActividades();
});
