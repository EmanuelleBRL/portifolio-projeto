// Em scripts/parallax-effect.js

const imageContainer = document.querySelector('.about__right');
const image = document.querySelector('.about__right .about__image .emanuelle');

// Onde a mágica acontece: a distância em pixels a partir do centro da foto para ativar o efeito.
const activationRadius = 1000; 

// A intensidade do movimento.
const intensity = 17; 

window.addEventListener('mousemove', (e) => {
    // Se a imagem não estiver na tela, não faz nada para economizar performance.
    if (!imageContainer || !image) return;

    const rect = imageContainer.getBoundingClientRect();

    // Calcula a posição do centro do container da imagem na tela
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Pega a posição atual do mouse
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Calcula a distância do mouse até o centro da imagem
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // Se o mouse estiver dentro do raio de ativação, aplica o efeito
    if (distance < activationRadius) {
        // Calcula o movimento com base na proximidade do mouse
        const moveX = (deltaX / activationRadius) * intensity;
        const moveY = (deltaY / activationRadius) * intensity;

        // Aplica a transformação na imagem
        image.style.transition = 'transform 0.1s ease-out';
        image.style.transform = `translateX(${moveX}px) translateY(${moveY}px) scale(1.15)`;
    } else { 
        // Se o mouse estiver longe, reseta a imagem para a posição inicial
        image.style.transition = 'transform 0.4s ease-out';
        image.style.transform = 'translateX(0px) translateY(0px) scale(1.15)';
    }
});