document.addEventListener('gs-ready', function() {
    // --- ESTADO ---
    const state = {
        agua: 0,
        maxAgua: 100,
        objetoActual: null,
        objPosicion: 'inicio',
        estaMojado: false,
        masa: 0,
        volumen: 0,
        datos: {
            moneda: { masa: 7.5, vol: 1.0, tipo: 'moneda' },
            piedra: { masa: 24.0, vol: 8.0, tipo: 'piedra' }
        }
    };

    // --- DOM ---
    const elAgua = document.getElementById('agua-rect');
    const elPesoDisplay = document.getElementById('peso-display');
    const objMoneda = document.getElementById('obj-moneda');
    const objPiedra = document.getElementById('obj-piedra');
    const btnPesar = document.getElementById('btn-pesar');
    const btnMedir = document.getElementById('btn-medir');
    const btnSecar = document.getElementById('btn-secar');
    const btnReset = document.getElementById('btn-reset');
    const btnWater = document.getElementById('btn-water');
    const inputMasa = document.getElementById('inp-masa');
    const inputVol = document.getElementById('inp-vol');
    const inputDens = document.getElementById('inp-dens');
    const btnCheck = document.getElementById('btn-check');
    const msgFeedback = document.getElementById('msg-feedback');

    // --- AGUA ---
    let waterInterval;
    function startWater() {
        if (state.objPosicion === 'probeta') return;
        if (waterInterval) clearInterval(waterInterval);
        waterInterval = setInterval(() => {
            if (state.agua >= state.maxAgua) {
                clearInterval(waterInterval);
                msgFeedback.textContent = "¡Has derramado el agua! Reinicia.";
                msgFeedback.className = "msg-error";
                btnWater.disabled = true;
                return;
            }
            state.agua += 2;
            updateAguaVisual();
        }, 100);
    }
    function stopWater() { clearInterval(waterInterval); }

    function updateAguaVisual() {
        const rangoPixeles = 700;
        const alturaPx = (state.agua / state.maxAgua) * rangoPixeles;
        const yPos = 850 - alturaPx;
        elAgua.setAttribute('y', yPos);
        elAgua.setAttribute('height', alturaPx);
    }

    // --- OBJETO ---
    function setObjeto(tipo) {
        state.objetoActual = tipo;
        state.objPosicion = 'inicio';
        state.estaMojado = false;
        objMoneda.style.display = tipo === 'moneda' ? 'block' : 'none';
        objPiedra.style.display = tipo === 'piedra' ? 'block' : 'none';
        [objMoneda, objPiedra].forEach(el => el.classList.remove('pos-balanza', 'pos-probeta'));
        btnPesar.disabled = false;
        btnMedir.disabled = false;
        btnSecar.disabled = true;
        inputMasa.value = '';
        inputVol.value = '';
        inputDens.value = '';
        inputMasa.disabled = true;
        inputVol.disabled = true;
        inputDens.disabled = true;
        btnCheck.disabled = true;
        msgFeedback.textContent = '';
        elPesoDisplay.textContent = "0.000 g";
    }

    setObjeto('moneda');

    objMoneda.addEventListener('click', function() { if (state.objPosicion === 'inicio') setObjeto('moneda'); });
    objPiedra.addEventListener('click', function() { if (state.objPosicion === 'inicio') setObjeto('piedra'); });

    // --- ACCIONES ---
    btnPesar.addEventListener('click', function() {
        if (state.objPosicion !== 'inicio') return;
        const d = state.datos[state.objetoActual];
        let pesoReal = d.masa;
        if (state.estaMojado) pesoReal += 1.5;
        const elActivo = state.objetoActual === 'moneda' ? objMoneda : objPiedra;
        elActivo.classList.add('pos-balanza');
        state.objPosicion = 'balanza';
        state.masa = pesoReal;
        elPesoDisplay.textContent = `${pesoReal.toFixed(3)} g`;
        inputMasa.value = pesoReal.toFixed(2);
        inputMasa.disabled = false;
        inputMasa.dispatchEvent(new Event('input'));
        btnPesar.disabled = true;
        btnMedir.disabled = false;
        btnSecar.disabled = !state.estaMojado;
    });

    btnMedir.addEventListener('click', function() {
        if (state.objPosicion === 'probeta') return;
        if (state.agua === 0) {
            msgFeedback.textContent = "¡Añade agua a la probeta primero!";
            msgFeedback.className = "msg-error";
            return;
        }
        const elActivo = state.objetoActual === 'moneda' ? objMoneda : objPiedra;
        elActivo.classList.remove('pos-balanza');
        elActivo.classList.add('pos-probeta');
        state.objPosicion = 'probeta';
        state.estaMojado = true;
        state.volumen = state.datos[state.objetoActual].vol;
        state.agua += state.volumen;
        updateAguaVisual();
        inputVol.value = state.volumen.toFixed(2);
        inputVol.disabled = false;
        inputVol.dispatchEvent(new Event('input'));
        btnMedir.disabled = true;
        btnPesar.disabled = true;
        btnSecar.disabled = false;
        if (state.masa > 0) btnCheck.disabled = false;
        elPesoDisplay.textContent = "0.000 g";
    });

    btnSecar.addEventListener('click', function() {
        if (!state.estaMojado) return;
        state.estaMojado = false;
        btnSecar.disabled = true;
        btnPesar.disabled = false;
        if (state.objPosicion === 'probeta') {
            const elActivo = state.objetoActual === 'moneda' ? objMoneda : objPiedra;
            elActivo.classList.remove('pos-probeta');
            elActivo.classList.add('pos-balanza');
            state.objPosicion = 'balanza';
        }
        const d = state.datos[state.objetoActual];
        state.masa = d.masa;
        elPesoDisplay.textContent = `${d.masa.toFixed(3)} g`;
        inputMasa.value = d.masa.toFixed(2);
        inputMasa.dispatchEvent(new Event('input'));
        msgFeedback.textContent = "¡Objeto seco! Ahora puedes pesarlo correctamente.";
        msgFeedback.className = "msg-ok";
        setTimeout(() => { if (msgFeedback.textContent.includes("seco")) msgFeedback.textContent = ""; }, 3000);
    });

    btnCheck.addEventListener('click', function() {
        if (!inputMasa.value || !inputVol.value) return;
        const d = state.datos[state.objetoActual];
        const userMasa = parseFloat(inputMasa.value);
        const userVol = parseFloat(inputVol.value);
        const userDens = userMasa / userVol;
        if (Math.abs(userMasa - d.masa) < 0.1 && Math.abs(userVol - d.vol) < 0.1) {
            msgFeedback.innerHTML = `¡Correcto! Densidad = ${userDens.toFixed(2)} g/cm³.<br><small>La densidad de ${d.tipo === 'moneda' ? 'la moneda' : 'la piedra'} es ${(d.masa/d.vol).toFixed(2)} g/cm³.</small>`;
            msgFeedback.className = "msg-ok";
        } else {
            msgFeedback.textContent = "Revisa los datos: ¿has medido bien la masa y el volumen?";
            msgFeedback.className = "msg-error";
        }
    });

    function updateDensity() {
        const m = parseFloat(inputMasa.value);
        const v = parseFloat(inputVol.value);
        if (m > 0 && v > 0) {
            inputDens.value = (m/v).toFixed(2);
            btnCheck.disabled = false;
        } else {
            inputDens.value = '';
            btnCheck.disabled = true;
        }
    }
    inputMasa.addEventListener('input', updateDensity);
    inputVol.addEventListener('input', updateDensity);

    btnReset.addEventListener('click', function() {
        state.agua = 0;
        state.objPosicion = 'inicio';
        state.estaMojado = false;
        state.masa = 0;
        state.volumen = 0;
        updateAguaVisual();
        setObjeto('moneda');
        elPesoDisplay.textContent = "0.000 g";
        inputMasa.value = '';
        inputVol.value = '';
        inputDens.value = '';
        inputMasa.disabled = true;
        inputVol.disabled = true;
        inputDens.disabled = true;
        btnCheck.disabled = true;
        msgFeedback.textContent = '';
        btnWater.disabled = false;
        btnPesar.disabled = false;
        btnMedir.disabled = false;
        btnSecar.disabled = true;
        [objMoneda, objPiedra].forEach(el => el.classList.remove('pos-balanza', 'pos-probeta'));
    });

    btnWater.addEventListener('mousedown', startWater);
    btnWater.addEventListener('mouseup', stopWater);
    btnWater.addEventListener('mouseleave', stopWater);
    btnWater.addEventListener('touchstart', function(e) { e.preventDefault(); startWater(); }, {passive: false});
    btnWater.addEventListener('touchend', stopWater);
    btnWater.addEventListener('touchcancel', stopWater);

    updateAguaVisual();
});
