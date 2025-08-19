document.addEventListener('DOMContentLoaded', () => {
    // Referências para a navbar e o header
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('#header'); 

    if (!navbar || !header) {
        return; 
    }
    
    // Obtém a sombra e a borda inicial do CSS
    const initialBoxShadow = getComputedStyle(navbar).boxShadow;
    const initialBorder = getComputedStyle(navbar).border;

    // Variáveis de estado e animação
    let isNavbarActive = false; // Começa desativada
    let mouseX = 0;
    let mouseY = 0;
    
    // Valores de animação
    const distanceThresholdRem = 55; 
    const remToPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const distanceThreshold = distanceThresholdRem * remToPx;
    const lerpFactor = 0.3;
    const movementMultiplier = 0.1; 
    const dynamicShadowOpacity = 0.15;
    const dynamicShadowBlur = 0.8;

    let shadowCurrentX = 0;
    let shadowCurrentY = 0;
    
    function update() {
        if (isNavbarActive) {
            const navbarRect = navbar.getBoundingClientRect();
            const navbarCenterX = navbarRect.left + navbarRect.width / 2;
            const navbarCenterY = navbarRect.top + navbarRect.height / 2;
            
            const distanceX = mouseX - navbarCenterX;
            const distanceY = mouseY - navbarCenterY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            let shadowTargetX = 0;
            let shadowTargetY = 0;

            if (distance <= distanceThreshold) {
                const normalizedDistance = Math.min(distance, distanceThreshold) / distanceThreshold;
                const glowFactor = 1 - normalizedDistance;
                
                shadowTargetX = -distanceX * (glowFactor * movementMultiplier);
                shadowTargetY = -distanceY * (glowFactor * movementMultiplier);

                const borderOpacity = 0.2 + 0.4 * glowFactor;
                navbar.style.border = `0.1rem solid rgba(8, 212, 248, ${borderOpacity})`;
            } else {
                navbar.style.border = initialBorder;
            }

            shadowCurrentX += (shadowTargetX - shadowCurrentX) * lerpFactor;
            shadowCurrentY += (shadowTargetY - shadowCurrentY) * lerpFactor;

            const dynamicShadow = `${shadowCurrentX}px ${shadowCurrentY}px ${dynamicShadowBlur}rem rgba(8, 212, 248, ${dynamicShadowOpacity})`;
            navbar.style.boxShadow = `${dynamicShadow}, ${initialBoxShadow}`;
        } else {
            // Se o efeito estiver desativado, reseta os estilos
            navbar.style.boxShadow = initialBoxShadow;
            navbar.style.border = initialBorder;
            shadowCurrentX = 0;
            shadowCurrentY = 0;
        }
        requestAnimationFrame(update);
    }

    // Configuração do Intersection Observer. threshold: 0 para detectar assim que a barra entrar/sair
    const observerOptions = {
        root: null,
        rootMargin: '0px', 
        threshold: 0
    };

    // O observador que define se a navbar deve estar ativa
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // AQUI ESTÁ A CORREÇÃO:
            // A animação deve estar ativa se o elemento (#header) ESTIVER visível
            isNavbarActive = entry.isIntersecting;
        });
    }, observerOptions);

    // Começa a observar a seção do header
    headerObserver.observe(header);
    
    // Eventos de mouse para atualizar as coordenadas
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
        mouseX = -9999;
        mouseY = -9999;
    });

    // Inicia o loop de animação
    update();
});