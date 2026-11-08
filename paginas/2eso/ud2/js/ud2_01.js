document.addEventListener('gs-ready', function () {
    
    // --- TABLA DE MATERIALES EN EL SI ---
    // Usamos las densidades exactas (en kg/m3) y su equivalente en g/cm3 para los cálculos
    const materiales = [
        { nombre: "Corcho", d_si: 250, d_cm3: 0.25 },
        { nombre: "Madera", d_si: 500, d_cm3: 0.5 },
        { nombre: "Vidrio", d_si: 2500, d_cm3: 2.5 },
        { nombre: "Aluminio", d_si: 2700, d_cm3: 2.7 },
        { nombre: "Titanio", d_si: 4500, d_cm3: 4.5 },
        { nombre: "Hierro", d_si: 7800, d_cm3: 7.8 },
        { nombre: "Cobre", d_si: 8900, d_cm3: 8.9 },
        { nombre: "Plata", d_si: 10500, d_cm3: 10.5 },
        { nombre: "Plomo", d_si: 11300, d_cm3: 11.3 }
    ];

    function random(min, max, dec = 0) {
        let num = Math.random() * (max - min) + min;
        return parseFloat(num.toFixed(dec));
    }

    function elegirAlAzar(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    // --- FUNCIÓN PRINCIPAL QUE GENERA LOS ENUNCIADOS ---
    window.generarNuevasActividades = function() {
        if (!document.getElementById('act-densidad-1')) return;

        // --- BLOQUE 1: Cálculo directo ---
        let mat1 = elegirAlAzar(materiales);
        // Generamos un volumen "bonito" (múltiplo de 5)
        let v1_cm3 = Math.round(random(10, 100) / 5) * 5; 
        // Calculamos la masa real y la redondeamos a 1 decimal (como una balanza)
        let m1_g = parseFloat((mat1.d_cm3 * v1_cm3).toFixed(1)); 
        
        document.getElementById('act-densidad-1').innerHTML = `
            Un bloque metálico tiene una masa de <strong>${m1_g} g</strong> y ocupa un volumen de <strong>${v1_cm3} cm³</strong>. 
            Calcula su densidad en unidades del SI y consulta la tabla de densidades de la teoría para decir de qué material se trata.
        `;

        // --- BLOQUE 2: Cálculo de la masa ---
        let mat2 = elegirAlAzar(materiales);
        let v2_cm3 = Math.round(random(20, 150) / 5) * 5; 
        let m2_g = parseFloat((mat2.d_cm3 * v2_cm3).toFixed(1));
        let m2_kg = parseFloat((m2_g / 1000).toFixed(3)); // Damos el dato en kg

        document.getElementById('act-densidad-2').innerHTML = `
            Un objeto tiene un volumen de <strong>${v2_cm3} cm³</strong> y está hecho de un material con una densidad de <strong>${mat2.d_si} kg/m³</strong>. 
            ¿Cuál será su masa en kilogramos?
        `;

        // --- BLOQUE 3: Cálculo del volumen ---
        let mat3 = elegirAlAzar(materiales);
        let m3_kg = random(1, 10, 2); 
        // Calculamos el volumen exacto en m3 y lo pasamos a cm3 y a litros
        let v3_cm3 = parseFloat(((m3_kg * 1000) / mat3.d_cm3).toFixed(1));
        let v3_L = parseFloat((v3_cm3 / 1000).toFixed(3));

        document.getElementById('act-densidad-3').innerHTML = `
            Una pieza metálica tiene una masa de <strong>${m3_kg} kg</strong> y sabemos que su densidad es de <strong>${mat3.d_si} kg/m³</strong>. 
            ¿Qué volumen ocupa en litros?
        `;

        // --- BLOQUE 4: Geometría + Densidad (Ortoedro) ---
        // Generamos dimensiones en cm (números enteros para que el volumen sea exacto)
        let a = random(5, 20); 
        let b = random(5, 20);
        let c = random(5, 20);
        let v4_cm3 = a * b * c;
        
        // Calculamos la masa que tendría esa caja si fuera de un material al azar
        let mat4 = elegirAlAzar(materiales);
        let m4_g = parseFloat((mat4.d_cm3 * v4_cm3).toFixed(1)); 
        // Si pesa más de 1000g, lo damos en kg para que sea realista
        let m4_texto = m4_g >= 1000 ? `${parseFloat((m4_g/1000).toFixed(2))} kg` : `${m4_g} g`; 

        document.getElementById('act-densidad-4').innerHTML = `
            Tenemos una caja metálica de <strong>${a} cm de largo, ${b} cm de ancho y ${c} cm de alto</strong>. Su masa es de <strong>${m4_texto}</strong>.<br>
            Calcula su volumen, calcula su densidad en kg/m³ y consulta la tabla para decir de qué material se trata.
        `;

        // --- BLOQUE 5: Geometría + Densidad (Cilindro) ---
        let r = random(2, 10); 
        let h = random(5, 20); 
        let v5_cm3 = parseFloat((Math.PI * r * r * h).toFixed(1));
        
        let mat5 = elegirAlAzar(materiales);
        let m5_g = parseFloat((mat5.d_cm3 * v5_cm3).toFixed(1));
        let m5_texto = m5_g >= 1000 ? `${parseFloat((m5_g/1000).toFixed(2))} kg` : `${m5_g} g`;

        document.getElementById('act-densidad-5').innerHTML = `
            Un cilindro metálico tiene un radio de <strong>${r} cm</strong> y una altura de <strong>${h} cm</strong>. Su masa es de <strong>${m5_texto}</strong>.<br>
            Calcula su volumen usando la fórmula (toma \(\pi = 3,14\)), calcula su densidad en kg/m³ y di de qué material se trata.
        `;
    };

    // Ejecutar al cargar la página por primera vez
    window.generarNuevasActividades();
});
