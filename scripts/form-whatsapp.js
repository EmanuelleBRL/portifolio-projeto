// scripts/form-whatsapp.js

function handleWhatsAppForm() {
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const messageInput = document.getElementById('form-message');

  if (form) {
    form.addEventListener('submit', function (event) {
      // Impede o envio padrão do formulário
      event.preventDefault();

      // Seu número de telefone no formato internacional (código do país + DDD + número)
      // Exemplo: 5598912345678
      const phoneNumber = '5598985899182'; // <-- SUBSTITUA PELO SEU NÚMERO

      // Pega os valores dos campos
      const name = nameInput.value;
      const email = emailInput.value;
      const message = messageInput.value;

      // Monta a mensagem
      const fullMessage = `Olá! Meu nome é ${name} (${email}).\n\n${message}`;

      // Codifica a mensagem para a URL
      const encodedMessage = encodeURIComponent(fullMessage);

      // Cria o link do WhatsApp
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

      // Abre o link em uma nova aba
      window.open(whatsappURL, '_blank');
    });
  }
}

// Garante que o script rode após o carregamento da página
document.addEventListener('DOMContentLoaded', handleWhatsAppForm);