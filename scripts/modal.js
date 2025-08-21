// scripts/modal.js
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (reducedMotion.matches) {
    document.body.classList.add('reduced-motion');
}

document.addEventListener('DOMContentLoaded', () => {
    // Seleciona elementos globais
    const detailsButtons = document.querySelectorAll('.details-btn');
    const modalOverlay = document.getElementById('project-modal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    const body = document.querySelector('body');

    // Elementos do conteúdo do modal
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    
    // --- LÓGICA DO CARROSSEL ---
    const carouselImagesContainer = document.querySelector('.carousel-images');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    let currentImages = [];
    let currentImageIndex = 0;

    function showImage(index) {
        const images = carouselImagesContainer.querySelectorAll('img');
        images.forEach((img, i) => {
            img.classList.remove('active');
            if (i === index) {
                img.classList.add('active');
            }
        });
    }

    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : currentImages.length - 1;
        showImage(currentImageIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex < currentImages.length - 1) ? currentImageIndex + 1 : 0;
        showImage(currentImageIndex);
    });
    // --- FIM DA LÓGICA DO CARROSSEL ---


    // Função para abrir o modal
    const openModal = (imgs, title, desc) => {
        // Limpa imagens de projetos anteriores
        carouselImagesContainer.innerHTML = '';
        
        // Pega as URLs das imagens e as cria no HTML
        currentImages = imgs.split(',');
        currentImages.forEach(imgSrc => {
            const img = document.createElement('img');
            img.src = imgSrc.trim(); // .trim() remove espaços em branco
            carouselImagesContainer.appendChild(img);
        });

        // Mostra a primeira imagem
        currentImageIndex = 0;
        showImage(currentImageIndex);

        // Preenche o título e a descrição
        modalTitle.textContent = title;
        modalDesc.textContent = desc;

        // Ativa o modal e impede o scroll do fundo
        modalOverlay.classList.add('active');
        body.classList.add('modal-active');
    };

    // Função para fechar o modal
    const closeModal = () => {
        modalOverlay.classList.remove('active');
        body.classList.remove('modal-active');
    };

    // Adiciona o evento de clique para cada botão "Detalhes"
    detailsButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            
            const imgs = button.dataset.imgs;
            const title = button.dataset.title;
            const desc = button.dataset.desc;

            openModal(imgs, title, desc);
        });
    });

    // Eventos para fechar o modal
    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
    });
});