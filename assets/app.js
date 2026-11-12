document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Calculator State
    let selectedPropCost = 0;
    let selectedPropName = 'Casa / Condominio';

    const propButtons = document.querySelectorAll('.prop-btn');
    const cameraSlider = document.getElementById('camera-slider');
    const cameraCountLabel = document.getElementById('camera-count-label');
    const checkGate = document.getElementById('check-gate');
    const checkUps = document.getElementById('check-ups');
    const calcTotal = document.getElementById('calc-total');
    const btnQuoteWhatsapp = document.getElementById('btn-quote-whatsapp');

    function updateCalculator() {
        if (!cameraSlider || !calcTotal) return;
        const cameras = parseInt(cameraSlider.value, 10);
        cameraCountLabel.textContent = `${cameras} Cámaras`;

        const baseCameraCost = 350000;
        const extraPerTwoCameras = 100000;
        const cameraTotal = baseCameraCost + ((cameras - 2) / 2) * extraPerTwoCameras;

        const gateCost = checkGate && checkGate.checked ? 120000 : 0;
        const upsCost = checkUps && checkUps.checked ? 85000 : 0;

        const total = cameraTotal + selectedPropCost + gateCost + upsCost;
        calcTotal.textContent = '$' + total.toLocaleString('es-CL');

        const msg =
            `Hola AuraSeg! Estuve en su sitio web y coticé un sistema para mi propiedad:\n` +
            `• Tipo: ${selectedPropName}\n` +
            `• Cámaras: ${cameras} con IA\n` +
            `• Enlace Portón: ${checkGate && checkGate.checked ? 'Sí' : 'No'}\n` +
            `• Respaldo Batería: ${checkUps && checkUps.checked ? 'Sí' : 'No'}\n` +
            `• Estimado: $${total.toLocaleString('es-CL')} CLP\n\n` +
            `Me gustaría coordinar una visita técnica en terreno en la VI Región.`;

        if (btnQuoteWhatsapp) {
            btnQuoteWhatsapp.href = `https://wa.me/56912345678?text=${encodeURIComponent(msg)}`;
        }
    }

    propButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.propType;
            const cost = parseInt(btn.dataset.propCost || '0', 10);
            selectedPropCost = cost;
            selectedPropName = type === 'casa' ? 'Casa / Condominio' : 'Parcela (5.000m²)';

            propButtons.forEach((b) => {
                b.classList.remove('border-brand-cyan', 'bg-brand-cyan/15', 'text-white');
                b.classList.add('border-slate-700', 'bg-brand-surface', 'text-slate-300');
            });
            btn.classList.remove('border-slate-700', 'bg-brand-surface', 'text-slate-300');
            btn.classList.add('border-brand-cyan', 'bg-brand-cyan/15', 'text-white');

            updateCalculator();
        });
    });

    if (cameraSlider) cameraSlider.addEventListener('input', updateCalculator);
    if (checkGate) checkGate.addEventListener('change', updateCalculator);
    if (checkUps) checkUps.addEventListener('change', updateCalculator);

    // Demo Simulator Controls
    let sirenActive = false;
    const btnSiren = document.getElementById('btn-trigger-siren');
    const demoAlertBanner = document.getElementById('demo-alert-banner');
    if (btnSiren && demoAlertBanner) {
        btnSiren.addEventListener('click', () => {
            sirenActive = !sirenActive;
            demoAlertBanner.classList.toggle('hidden', !sirenActive);
        });
    }

    let gateOpen = false;
    const btnGate = document.getElementById('btn-trigger-gate');
    const gateStatusText = document.getElementById('gate-status-text');
    if (btnGate && gateStatusText) {
        btnGate.addEventListener('click', () => {
            gateOpen = !gateOpen;
            gateStatusText.textContent = gateOpen ? 'Cerrar Portón' : 'Abrir Portón';
        });
    }

    updateCalculator();
});
