// scripts/zoom-fix.js

// Usamos window.onload para garantir que TUDO (imagens, css) esteja carregado
window.onload = () => {
    const referenceElement = document.querySelector('body');
    const particleContainers = document.querySelectorAll('.particles-container');

    if (!referenceElement || particleContainers.length === 0) {
        console.log('Elementos para o zoom-fix não encontrados.');
        return;
    }

    // Usamos a largura do body como referência inicial
    let initialWidth = referenceElement.clientWidth;

    function handleZoom() {
        let currentWidth = referenceElement.clientWidth;

        // Evita divisão por zero se a largura não for detectada
        if (currentWidth === 0) return;

        let scaleFactor = initialWidth / currentWidth;
        
        particleContainers.forEach(container => {
            // Limita a escala para evitar que as partículas fiquem gigantes
            const effectiveScale = Math.min(Math.max(scaleFactor, 0.5), 4);
            
            container.style.transform = `scale(${effectiveScale})`;
            container.style.transformOrigin = 'center center';
        });

        // Log para depuração. Pressione F12 no navegador para ver o console.
        // console.log(`Fator de escala aplicado: ${scaleFactor}`);
    }

    handleZoom(); // Executa ao carregar
    window.addEventListener('resize', handleZoom); // Executa ao dar zoom/redimensionar
};