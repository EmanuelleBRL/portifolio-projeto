const imageContainer = document.querySelector('.about__right');
const image = document.querySelector('.about__right .about__image .emanuelle');

// Verificamos se os elementos existem para evitar erros
if (imageContainer && image) {
    const activationRadius = 1000;
    const intensity = 20;

    // --- INÍCIO DAS MUDANÇAS ---

    let scrollTimeout;
    let isScrolling = false;

    // 1. Adicionamos um listener para o evento de scroll
    window.addEventListener('scroll', () => {
        // Avisa ao script que o scroll está ativo
        isScrolling = true;

        // Limpa o timeout anterior para reiniciar a contagem
        clearTimeout(scrollTimeout);

        // Define um timeout. Se o usuário não rolar a página por 150ms,
        // consideramos que o scroll terminou.
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 150);
    });


    window.addEventListener('mousemove', (e) => {
        // 2. Se a página estiver rolando, o script para aqui e não faz nada.
        // O parallax só será calculado quando isScrolling for 'false'.
        if (isScrolling) {
            return;
        }

        const rect = imageContainer.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const deltaX = mouseX - centerX;
        const deltaY = mouseY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance < activationRadius) {
            const moveX = (deltaX / activationRadius) * intensity;
            const moveY = (deltaY / activationRadius) * intensity;

            // 3. Aumentamos o tempo da transição para suavizar a "entrada"
            image.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            image.style.transform = `translateX(${moveX}px) translateY(${moveY}px) scale(1.15)`;
        } else {
            image.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            image.style.transform = 'translateX(0px) translateY(0px) scale(1.15)';
        }
    });

    // --- FIM DAS MUDANÇAS ---
}