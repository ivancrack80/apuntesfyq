// Esperar a que el sistema global esté listo (buena práctica de tu GUIA.md.)
document.addEventListener('gs-ready', () => {
    // Inicializar cualquier componente si fuera necesario
});

// Función para mostrar/ocultar la solución de la tabla (llamada desde el HTML)
function toggleSolucion() {
    var tabla = document.getElementById('tabla-ejercicio');
    var btn = document.getElementById('btn-solucion');
    
    if (tabla && btn) {
        tabla.classList.toggle('mostrar-solucion');
        
        if (tabla.classList.contains('mostrar-solucion')) {
            btn.innerHTML = '🙈 Ocultar solución';
        } else {
            btn.innerHTML = '👁️ Ver solución';
        }
    }
}

// Exponer la función al ámbito global por si el HTML la necesita (aunque al estar en un archivo externo ya es global)
window.toggleSolucion = toggleSolucion;