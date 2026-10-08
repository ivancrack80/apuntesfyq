/* ==========================================================================
   GS-CORE.JS — Sistema unificado de JavaScript para apuntes de Física y Química
   Prefijo de clases: gs-
   Incluye: Font Awesome, Google Fonts, MathJax 3, JSXGraph, accesibilidad,
   solucionario GAS, generador de PDF, evento gs-ready.
   
   Uso en cada HTML:
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ivancrack80/apuntesfyq@main/css/gs-styles.css">
   <script src="https://cdn.jsdelivr.net/gh/ivancrack80/apuntesfyq@main/js/gs-core.js"></script>
   
   El HTML debe incluir un <div class="gs-container"> con el contenido.
   Si la página tiene solucionario, usar <div class="sol-lock-box" data-unit="4eso_ud1_2">.
   ========================================================================== */

(function () {
    'use strict';

    // ======================================================================
    // CONFIGURACIÓN GLOBAL
    // ======================================================================
    var GS_CONFIG = {
        gasUrl: "https://script.google.com/macros/s/AKfycbwL3akk3R8Fp2IIgczae9t1nCDuKpLGCibGJ5gNRATL1AIccTX1fqLFZ6OmlctGoX-y/exec",
        cdnBase: "https://cdn.jsdelivr.net/gh/ivancrack80/apuntesfyq@main",
        fontsUrl: "https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@600;700&family=Inter:wght@400;500;600;700&family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&display=swap",
        fontAwesomeUrl: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
        mathjaxUrl: "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js",
        jsxgraphCore: "https://cdn.jsdelivr.net/npm/jsxgraph/distrib/jsxgraphcore.js",
        jsxgraphCss: "https://cdn.jsdelivr.net/npm/jsxgraph/distrib/jsxgraph.css"
    };

    // ======================================================================
    // 1. CARGA DINÁMICA DE RECURSOS EXTERNOS
    // ======================================================================
    function loadCSS(url) {
        return new Promise(function (resolve) {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            link.onload = resolve;
            link.onerror = resolve; // No bloqueamos si falla
            document.head.appendChild(link);
        });
    }

    function loadScript(url, attributes) {
        return new Promise(function (resolve) {
            var script = document.createElement('script');
            script.src = url;
            if (attributes) {
                Object.keys(attributes).forEach(function (key) {
                    script.setAttribute(key, attributes[key]);
                });
            }
            script.onload = resolve;
            script.onerror = resolve; // No bloqueamos si falla
            document.head.appendChild(script);
        });
    }

    // ======================================================================
    // 2. CONFIGURACIÓN DE MATHJAX (antes de cargarlo)
    // ======================================================================
    window.MathJax = {
        loader: {
            load: ['[tex]/cancel', '[tex]/color', '[tex]/html', '[tex]/mathtools', '[tex]/mhchem', '[tex]/physics', '[tex]/textmacros']
        },
        tex: {
            packages: { '[+]': ['cancel', 'color', 'html', 'mathtools', 'mhchem', 'physics', 'textmacros'] },
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']],
            processEscapes: true,
            processEnvironments: true
        },
        svg: {
            fontCache: 'local'
        },
        options: {
            skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
        },
        startup: {
            typeset: true // No renderiza automáticamente; esperamos a gs-ready
        }
    };

    // ======================================================================
    // 3. CARGA ORDENADA Y DISPARO DEL EVENTO gs-ready
    // ======================================================================
    var readyDispatched = false;

    function dispatchReady() {
        if (readyDispatched) return;
        readyDispatched = true;
        document.dispatchEvent(new CustomEvent('gs-ready'));
        console.log('[gs-core] Evento gs-ready disparado.');
    }

    function loadAllResources() {
        Promise.all([
            // CSS
            loadCSS(GS_CONFIG.fontsUrl),
            loadCSS(GS_CONFIG.fontAwesomeUrl),
            loadCSS(GS_CONFIG.jsxgraphCss),
            // Scripts
            loadScript(GS_CONFIG.jsxgraphCore),
            loadScript(GS_CONFIG.mathjaxUrl)
        ]).then(function () {
            // Cuando MathJax termina de cargar, esperamos a que esté listo
            // (MathJax.startup.promise nos lo confirma)
            if (window.MathJax && window.MathJax.startup && window.MathJax.startup.promise) {
                window.MathJax.startup.promise.then(function () {
                    dispatchReady();
                }).catch(function () {
                    dispatchReady();
                });
            } else {
                // Si no hay startup.promise (porque MathJax no cargó), disparamos igual
                setTimeout(dispatchReady, 100);
            }
        });
    }

    // ======================================================================
    // 4. ACCESIBILIDAD
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
    // 5. GENERADOR DE PDF SIN SOLUCIONARIO
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

        // Copiar el cache global de MathJax si existe (necesario si fontCache es 'global')
        var mjxCache = document.getElementById('MJX-SVG-global-cache');
        var mjxCacheHTML = mjxCache ? mjxCache.outerHTML : '';

        var printWindow = window.open('', '_blank');
        if (!printWindow) {
            alert('El navegador ha bloqueado la ventana emergente. Permite las ventanas emergentes.');
            return;
        }

        printWindow.document.write(
            '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">' +
            '<title>Apuntes - PDF</title>' + styles + '</head>' +
            '<body style="background: #ffffff; padding: 20px;">' +
            mjxCacheHTML +
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
    // 6. SOLUCIONARIO PROTEGIDO CON GAS
    // ======================================================================
    function getCurrentUnitId() {
        var solBox = document.querySelector('.sol-lock-box');
        if (solBox && solBox.dataset.unit) return solBox.dataset.unit;
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

                // Renderizar fórmulas MathJax si está disponible
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
    // 7. AUTO-INICIALIZACIÓN
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

    
    // ======================================================================
// 8. HELPERS GLOBALES
// ======================================================================
window.GS = {

    // ------------------------------------------------------------------
    // 8.1. Helpers de formateo (para applets JSXGraph)
    // ------------------------------------------------------------------
    setPanel: function (id, valor) {
        var el = document.getElementById(id);
        if (el) el.textContent = valor;
    },
    num: function (v, dec) {
        return v.toFixed(dec === undefined ? 2 : dec);
    },
    punto: function (x, y, dec) {
        var d = dec === undefined ? 2 : dec;
        return '(' + x.toFixed(d) + ', ' + y.toFixed(d) + ')';
    },
    vector: function (x, y, dec) {
        var d = dec === undefined ? 2 : dec;
        return x.toFixed(d) + 'i ' + (y >= 0 ? '+ ' : '- ') + Math.abs(y).toFixed(d) + 'j';
    },

    // ------------------------------------------------------------------
    // 8.2. Aleatoriedad (para generación de actividades)
    // ------------------------------------------------------------------
    aleatorio: {

        // Entero aleatorio entre min y max (ambos incluidos)
        entero: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        // Decimal aleatorio con N decimales
        decimal: function (min, max, decimales) {
            var d = decimales === undefined ? 2 : decimales;
            var valor = Math.random() * (max - min) + min;
            return parseFloat(valor.toFixed(d));
        },

        // Elemento aleatorio de un array
        elemento: function (array) {
            return array[Math.floor(Math.random() * array.length)];
        },

        // n elementos distintos aleatorios de un array
        variosDistintos: function (array, n) {
            var copia = array.slice();
            var resultado = [];
            for (var i = 0; i < n && copia.length > 0; i++) {
                var idx = Math.floor(Math.random() * copia.length);
                resultado.push(copia[idx]);
                copia.splice(idx, 1);
            }
            return resultado;
        },

        // Booleano 50/50
        booleano: function () {
            return Math.random() < 0.5;
        },

        // Signo aleatorio: +1 o -1
        signo: function () {
            return Math.random() < 0.5 ? 1 : -1;
        },

        // Potencia de 10 aleatoria entre min y max (ambos incluidos)
        potencia10: function (min, max) {
            return this.entero(min, max);
        },

        // Barajar array (Fisher-Yates)
        barajar: function (array) {
            var copia = array.slice();
            for (var i = copia.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = copia[i];
                copia[i] = copia[j];
                copia[j] = temp;
            }
            return copia;
        }
    },

    // ------------------------------------------------------------------
    // 8.3. Verificación de PIN sin pedir HTML (para actividades dinámicas)
    // ------------------------------------------------------------------
    verifyPinOnly: async function (pin) {
        try {
            var response = await fetch(
                GS_CONFIG.gasUrl + '?pin=' + encodeURIComponent(pin) + '&verify_only=true',
                { mode: 'cors' }
            );
            var data = await response.json();
            return data.success === true;
        } catch (err) {
            console.error('[GS] Error verificando PIN:', err);
            return false;
        }
    },

    // ------------------------------------------------------------------
    // 8.4. Constantes útiles (prefijos SI)
    // ------------------------------------------------------------------
    prefijosSI: [
        { prefijo: 'Peta',  simbolo: 'P',  factor: 15  },
        { prefijo: 'Tera',  simbolo: 'T',  factor: 12  },
        { prefijo: 'Giga',  simbolo: 'G',  factor: 9   },
        { prefijo: 'Mega',  simbolo: 'M',  factor: 6   },
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
    ],

    // ------------------------------------------------------------------
    // 8.5. Utilidades varias
    // ------------------------------------------------------------------

    // Formatea un número en notación científica (devuelve string tipo "3,45·10^8")
    aNotacionCientifica: function (valor, decimales) {
        if (valor === 0) return '0';
        var d = decimales === undefined ? 2 : decimales;
        var exponente = Math.floor(Math.log10(Math.abs(valor)));
        var coeficiente = valor / Math.pow(10, exponente);
        var coefStr = coeficiente.toFixed(d).replace('.', ',');
        return coefStr + '·10^' + exponente;
    },

    // Redondea a N cifras decimales devolviendo un número
    redondear: function (valor, decimales) {
        var d = decimales === undefined ? 2 : decimales;
        return parseFloat(valor.toFixed(d));
    }
};


    // Iniciar carga de recursos externos
    loadAllResources();

})();
