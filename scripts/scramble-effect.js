// // Espera a página carregar inteira antes de rodar o código
// document.addEventListener('DOMContentLoaded', () => {
//     // Registra os plugins necessários para o GSAP
//     gsap.registerPlugin(SplitText, ScrambleTextPlugin);

//     // Seleciona e divide APENAS os parágrafos da seção "Sobre mim"
//     const st = SplitText.create(".about__left p", { type: "chars", charsClass: "char" });

//     // Armazena o conteúdo original de cada caractere
//     st.chars.forEach((char) => {
//         gsap.set(char, { attr: { "data-content": char.innerHTML } });
//     });

//     // Define a área onde o mouse ativa o efeito
//     const textBlock = document.querySelector(".about__left");

//     // Função que roda quando o mouse se move
//     textBlock.onpointermove = (e) => {
//         st.chars.forEach((char) => {
//             const rect = char.getBoundingClientRect();
//             const cx = rect.left + rect.width / 2;
//             const cy = rect.top + rect.height / 2;
//             const dx = e.clientX - cx;
//             const dy = e.clientY - cy;
//             const dist = Math.sqrt(dx * dx * dy * dy);

//             if (dist < 100) {
//                 gsap.to(char, {
//                     overwrite: true,
//                     duration: 1.2 - dist / 100,
//                     scrambleText: {
//                         text: char.dataset.content,
//                         chars: ".:",
//                         speed: 0.5,
//                     },
//                     ease: 'none'
//                 });
//             }
//         });
//     };
// });
