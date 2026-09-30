/* ==========================================================================
   GS-CORE.JS — Sistema unificado de JavaScript para apuntes de Física y Química
   Uso: <script src="https://cdn.jsdelivr.net/gh/ivancrack80/apuntesfyq@main/js/gs-core.js"></script>
   
   El script detecta automáticamente qué elementos hay en la página y solo
   activa las funciones correspondientes. Si no hay solucionario, no hace nada.
   ========================================================================== */

(function () {
    'use strict';

    // ======================================================================
    // CONFIGURACIÓN GLOBAL
    // ======================================================================
    var GS_CONFIG = {
        gasUrl: "https://script.google.com/macros/s/AKfycbwL3akk3R8Fp2IIgczae9t1nCDuKpLGCibGJ5gNRATL1AIccTX1fqLFZ6OmlctGoX-y/exec",
        // El ID de unidad se lee desde el atributo data-unit del solucionario
        // o desde window.CURRENT_UNIT_ID si se define en el HTML
    };

    // ======================================================================
    // 1. ACCESIBILIDAD
    // ======================================================================
    function setFontSize(size) {
        document.body.classList.remove('font-small', 'font-large', 'font-xlarge');
        if (size !== 'normal') {
            document.body.classList.add('font-' + size);
        }
    }
    window.setFontSize = setFontSize;

    function toggleDyslexiaMode() {
        document.body.classList.toggle('dyslexia-mode');
        var btn = document.getElementById('dyslexiaToggleBtn');
        if (!btn) return;
        if (document.body.classList.contains('dyslexia-mode')) {
            btn.style.backgroundColor = '#1e3a8a';
            btn.style.color = '#ffffff';
            btn.innerHTML = '<i class="fa-solid fa-check"></i> Modo Lectura Fácil Activado';
        } else {
            btn.style.backgroundColor = '#f1f5f9';
            btn.style.color = '#1e293b';
            btn.innerHTML = '<i class="fa-solid fa-universal-access"></i> Lectura Fácil';
        }
    }
    window.toggleDyslexiaMode = toggleDyslexiaMode;

    // ======================================================================
    // 2. GENERADOR DE PDF SIN SOLUCIONARIO
    // ======================================================================
    function generarPDFSinSolucionario() {
        var container = document.querySelector('.gs-container');
        if (!container) {
            alert('No se encontró el contenedor principal.');
            return;
        }

        var contentClone = container.cloneNode(true);
        contentClone.querySelectorAll('.accessibility-bar, .sol-lock-box, .no-print').forEach(function (el) {
            el.remove();
        });

        var styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
            .map(function (node) { return node.outerHTML; })
            .join('\n');

        var printWindow = window.open('', '_blank');
        if (!printWindow) {
            alert('El navegador ha bloqueado la ventana emergente. Permite las ventanas emergentes.');
            return;
        }

        printWindow.document.write(
            '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">' +
            '<title>Apuntes - PDF</title>' + styles + '</head>' +
            '<body style="background: #ffffff; padding: 20px;">' +
            '<div class="gs-container" style="border: none; box-shadow: none; padding: 0; margin: 0 auto;">' +
            contentClone.innerHTML +
            '</div></body></html>'
        );
        printWindow.document.close();

        setTimeout(function () {
            printWindow.focus();
            printWindow.print();
        }, 500);
    }
    window.generarPDFSinSolucionario = generarPDFSinSolucionario;

    // ======================================================================
    // 3. SOLUCIONARIO PROTEGIDO CON GOOGLE APPS SCRIPT
    // ======================================================================
    function getCurrentUnitId() {
        // Prioridad 1: atributo data-unit en el contenedor del solucionario
        var solBox = document.querySelector('.sol-lock-box');
        if (solBox && solBox.dataset.unit) return solBox.dataset.unit;
        // Prioridad 2: variable global definida en el HTML
        if (window.CURRENT_UNIT_ID) return window.CURRENT_UNIT_ID;
        return null;
    }

    async function verifySolPin() {
        var pinInput = document.getElementById('solPinInput');
        var pin = pinInput ? pinInput.value : '';
        var errorMsg = document.getElementById('solErrorMsg');
        var contentDiv = document.getElementById('protectedSolutions');
        var lockIcon = document.getElementById('lockIcon');
        var btn = document.getElementById('btnUnlockSol');
        var unitId = getCurrentUnitId();

        if (!unitId) {
            if (errorMsg) {
                errorMsg.innerText = 'Error: no se ha definido el ID de la unidad.';
                errorMsg.style.color = '#dc2626';
                errorMsg.style.display = 'block';
            }
            return;
        }

        if (!pin || pin.length !== 6) {
            if (errorMsg) {
                errorMsg.innerText = 'Escribe el código completo de 6 dígitos.';
                errorMsg.style.color = '#dc2626';
                errorMsg.style.display = 'block';
            }
            return;
        }

        if (errorMsg) {
            errorMsg.innerText = 'Comprobando clave con el servidor...';
            errorMsg.style.color = '#1e3a8a';
            errorMsg.style.display = 'block';
        }
        if (btn) btn.disabled = true;

        try {
            var response = await fetch(
                GS_CONFIG.gasUrl + '?pin=' + encodeURIComponent(pin) + '&unit=' + encodeURIComponent(unitId),
                { mode: 'cors' }
            );
            var data = await response.json();

            if (data.success) {
                if (errorMsg) errorMsg.style.display = 'none';

                var teacherPrintControl =
                    '<div class="no-print" style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 15px; margin-bottom: 22px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">' +
                    '<div>' +
                    '<strong style="color: #166534; font-size: 0.98rem; display: block;">' +
                    '<i class="fa-solid fa-print"></i> Panel de Impresión Docente' +
                    '</strong>' +
                    '<span style="font-size: 0.85rem; color: #15803d;">' +
                    'Genera un PDF maquetado como libro de texto (sin solucionario).' +
                    '</span>' +
                    '</div>' +
                    '<button onclick="generarPDFSinSolucionario()" style="background-color: #16a34a; color: white; border: none; padding: 10px 18px; border-radius: 6px; font-weight: 700; font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; gap: 8px;">' +
                    '<i class="fa-solid fa-file-pdf"></i> Imprimir / Guardar PDF' +
                    '</button>' +
                    '</div>';

                contentDiv.innerHTML = teacherPrintControl + data.html;
                contentDiv.style.display = 'block';
                if (lockIcon) lockIcon.className = 'fa-solid fa-user-check';

                // Renderizar fórmulas MathJax si están disponibles
                if (window.MathJax && window.MathJax.typesetPromise) {
                    window.MathJax.typesetPromise([contentDiv]);
                }

                // Llamar al inicializador de boards JSXGraph si existe
                if (typeof window.initSolutionBoards === 'function') {
                    setTimeout(window.initSolutionBoards, 60);
                }

                contentDiv.scrollIntoView({ behavior: 'smooth' });
                var authContainer = document.getElementById('solAuthContainer');
                if (authContainer) authContainer.style.display = 'none';
            } else {
                if (errorMsg) {
                    errorMsg.innerText = 'Código incorrecto. Revisa los números e inténtalo de nuevo.';
                    errorMsg.style.color = '#dc2626';
                    errorMsg.style.display = 'block';
                }
                if (btn) btn.disabled = false;
            }
        } catch (err) {
            if (errorMsg) {
                errorMsg.innerText = 'Error de conexión. Inténtalo más tarde.';
                errorMsg.style.color = '#dc2626';
                errorMsg.style.display = 'block';
            }
            if (btn) btn.disabled = false;
        }
    }
    window.verifySolPin = verifySolPin;

    // ======================================================================
    // 4. AUTO-INICIALIZACIÓN
    // ======================================================================
    document.addEventListener('DOMContentLoaded', function () {
        // Enter en el input del PIN
        var pinInput = document.getElementById('solPinInput');
        if (pinInput) {
            pinInput.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') verifySolPin();
            });
        }
    });

})();
