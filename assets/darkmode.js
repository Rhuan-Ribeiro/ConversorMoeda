// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", () => {
  // Seletores de elementos importantes
  const toggleButton = document.getElementById("toggle-theme");
  const body = document.body;
  const card = document.querySelector(".card");
  const h1 = document.querySelector("h1");
  const label = document.querySelector("label");
  const realLabel = document.querySelector("#real");
  const footer = document.querySelector("footer");

  // Verifica se há um tema salvo no localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    applyDarkMode(); // Aplica o tema escuro se estiver salvo
  }

  // Evento de clique no botão de alternar tema
  toggleButton.addEventListener("click", () => {
    if (body.classList.contains("bg-dark")) {
      applyLightMode(); // Se já está escuro, muda para claro
    } else {
      applyDarkMode(); // Se está claro, muda para escuro
    }
  });

  // Função para aplicar o modo escuro
  function applyDarkMode() {
    // Altera as cores principais da página
    body.classList.replace("bg-body-secondary", "bg-dark");
    body.classList.replace("text-dark", "text-white");

    // Altera o fundo do card
    card.classList.replace("bg-white", "bg-dark-alternative");

    // Ajusta cores do título e rótulos
    h1.classList.replace("text-dark", "text-white");
    label.classList.replace("text-dark", "text-white");
    realLabel.classList.replace("text-dark", "text-white");

    // Altera o rodapé
    footer.classList.replace("bg-dark", "bg-light");
    footer.classList.replace("text-white", "text-dark");

    // Estiliza o botão de tema
    toggleButton.classList.replace("btn-outline-secondary", "btn-outline-light");
    toggleButton.textContent = "☀️ Tema Claro";

    // Salva o tema no armazenamento local
    localStorage.setItem("theme", "dark");

    // Altera os campos de entrada (inputs)
    document.querySelectorAll("input.form-control").forEach(input => {
      input.classList.add("bg-dark", "text-white", "border-secondary");
    });

    // Altera os elementos que exibem "R$" e "$"
    document.querySelectorAll(".input-group-text").forEach(span => {
      span.classList.add("bg-dark", "text-white", "border-secondary");
    });
  }

  // Função para aplicar o modo claro
  function applyLightMode() {
    // Restaura as cores originais do corpo
    body.classList.replace("bg-dark", "bg-body-secondary");
    body.classList.replace("text-white", "text-dark");

    // Restaura o fundo do card
    card.classList.replace("bg-dark-alternative", "bg-white");

    // Ajusta cores do título e rótulos
    h1.classList.replace("text-white", "text-dark");
    label.classList.replace("text-white", "text-dark");
    realLabel.classList.replace("text-white", "text-dark");

    // Altera o rodapé para escuro novamente
    footer.classList.replace("bg-light", "bg-dark");
    footer.classList.replace("text-dark", "text-white");

    // Estiliza o botão de tema
    toggleButton.classList.replace("btn-outline-light", "btn-outline-secondary");
    toggleButton.textContent = "🌙 Tema Escuro";

    // Salva o tema claro no localStorage
    localStorage.setItem("theme", "light");

    // Remove estilos escuros dos inputs
    document.querySelectorAll("input.form-control").forEach(input => {
      input.classList.remove("bg-dark", "text-white", "border-secondary");
    });

    // Remove estilos escuros dos elementos de texto do input
    document.querySelectorAll(".input-group-text").forEach(span => {
      span.classList.remove("bg-dark", "text-white", "border-secondary");
    });
  }
});
