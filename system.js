const image = document.getElementById("conteudo-pi");

// Função para animar a imagem
image.addEventListener("click", function () {
  image.classList.add("shake-once");
  image.style.animationPlayState = "running";

  // Remova a classe "shake-once" após um determinado período de tempo
  setTimeout(function () {
    image.classList.remove("shake-once");
  }, 700);
});

// Função para pesquisar produtos
const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".conteudo-loja-card");
searchInput.addEventListener("input", function () {
  const termoDePesquisa = searchInput.value.toLowerCase();
  cards.forEach((card) => {
    const titulo = card
      .querySelector(".conteudo-loja-card-title")
      .innerText.toLowerCase();
    const descricao = card
      .querySelector(".conteudo-loja-card-description")
      .innerText.toLowerCase();
    if (
      titulo.includes(termoDePesquisa) ||
      descricao.includes(termoDePesquisa)
    ) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
});

// Cria objetos de produtos para facilitar o uso dos dados
const products = {
  1: {
    alcance: "15M",
    effect: "Dano do projétil + 5",
    comp: "3",
    ammo: ".45 ACP",
  },
  2: {
    effect: "2D8",
    comp: "3",
  },
  3: {
    effect: "-50% Stress.",
    comp: "Desconhecido",
  },
  4: {
    alcance: "10M",
    effect: "Dano do projétil + 7",
    comp: "3",
  },
  5: {
    effect: "2D8",
    comp: "3",
  },
  6: {
    comp: "Desconhecido",
  },
  7: {
    alcance: "7M",
    effect: "Dano do projétil + 15 + [Radiação] 2 turnos",
    comp: "7",
    ammo: "Célula de Energia",
  },
  8: {
    effect: "1D20",
    comp: "7",
  },
  9: {
    effect: "Visão do futuro | +10 de Stress",
    comp: "Desconhecido",
  },
  10: {
    effect: "Visão do futuro | +5 de Força | +5 de Destreza | +5 de Presença | +5 de Inteligência | +5 de Foco | +50 de Stress",
    comp: "Desconhecido",
  }
  // Adicionar mais objetos de produtos conforme necessário
};

// Criar elementos do popup
function createPopupElements(product) {
  const popupElements = [];

  if (product.alcance) {
    const popupAlcance = document.createElement("p");
    popupAlcance.classList.add("popup-alcance");
    popupAlcance.innerHTML = `<span style="font-weight: bold;">Alcance:</span> ${product.alcance}`;
    popupElements.push(popupAlcance);
  }

  if (product.ammo) {
    const popupAmmo = document.createElement("p");
    popupAmmo.classList.add("popup-ammo");
    popupAmmo.innerHTML = `<span style="font-weight: bold;">Munição:</span> ${product.ammo}`;
    popupElements.push(popupAmmo);
  }

  if (product.effect) {
    const popupEffect = document.createElement("p");
    popupEffect.classList.add("popup-effect");
    popupEffect.innerHTML = `<span style="font-weight: bold;">Efeito:</span> ${product.effect}`;
    popupElements.push(popupEffect);
  }

  if (product.comp) {
    const popupComp = document.createElement("p");
    popupComp.classList.add("popup-comp");
    popupComp.innerHTML = `<span style="font-weight: bold;">Complexidade:</span> ${product.comp}`;
    popupElements.push(popupComp);
  }

  return popupElements;
}

// Declarando variáveis globais para o popup e os eventos de mouse
const popup = document.getElementById("popup");
const popupContent = popup.querySelector(".popup-content");
const popupClose = popup.querySelector("#close-button");
const html = document.querySelector("html");
const popupOverlay = document.querySelector(".popup-overlay");
const cardButtons = document.querySelectorAll(".conteudo-loja-card-button");

// Função para abrir o popup
function openPopup(event) {
  // Declarando as variáveis necessárias do produto clicado
  const card = event.currentTarget.closest(".conteudo-loja-card");
  const cardId = parseInt(card.getAttribute("data-id"));
  const cardImage = card.querySelector(".conteudo-loja-card-img");
  const cardTitle = card.querySelector(".conteudo-loja-card-title");
  const cardDescription = card.querySelector(".conteudo-loja-card-description");

  // Declarando as variáveis das unidades do produto clicado
  const cardUnitsText = card.querySelector(".conteudo-loja-card-units").textContent;
  const cardUnitsNumber = cardUnitsText.replace("Unidades:", "").trim();

  const cardAlcance = products[cardId].alcance;
  const cardEffect = products[cardId].effect;
  const cardComp = products[cardId].comp;
  const cardAmmo = products[cardId].ammo;
  const cardPrice = card.querySelector(".conteudo-loja-card-price");

  popupOverlay.classList.add("show");
  html.classList.add("disable-scroll");

  // Adicionar a imagem
  const popupImage = document.createElement("img");
  popupImage.classList.add("popup-image");
  popupImage.src = cardImage.src;
  popupImage.alt = "Imagem do produto";
  popupContent.appendChild(popupImage);

  // Adicionar o título
  const popupTitle = document.createElement("h2");
  popupTitle.classList.add("popup-title");
  popupTitle.textContent = cardTitle.textContent;
  popupContent.appendChild(popupTitle);

  // Adicionar a descrição
  const popupDescription = document.createElement("p");
  popupDescription.classList.add("popup-description");
  popupDescription.textContent = cardDescription.textContent;
  popupContent.appendChild(popupDescription);

  // Adicionar os elementos gerados pelo javascript
  const popupElements = createPopupElements(products[cardId]);
  popupElements.forEach((element) => popupContent.appendChild(element));

  // Adicionar as unidades
  const popupUnits = document.createElement("p");
  popupUnits.classList.add("popup-units");
  popupUnits.innerHTML = `<strong>Unidades:</strong> ${cardUnitsNumber}`;
  popupContent.appendChild(popupUnits);

  // Adicionar o preço
  const popupPrice = document.createElement("p");
  popupPrice.classList.add("popup-price");
  popupPrice.innerHTML = `<span style="font-weight: bold;">Preço:</span> ${cardPrice.textContent}`;
  popupContent.appendChild(popupPrice);

  popup.style.display = "flex";
}

// Função para fechar o popup
function closePopup() {
  const popupElements = popupContent.querySelectorAll(
    ".popup-ammo, .popup-comp, .popup-image, .popup-title, .popup-description, .popup-units, .popup-effect, .popup-price, .popup-alcance"
  );
  popupElements.forEach((element) => {
    element.remove();
  });
  popup.style.display = "none";

  const popupOverlay = document.querySelector(".popup-overlay");
  popupOverlay.classList.remove("show");

  html.classList.remove("disable-scroll");
}

// Adicionar evento de clique nos botoes do popup
cardButtons.forEach((cardButton) => {
  cardButton.addEventListener("click", openPopup);
});

// Adicionar evento de clique no botão de fechar o popup
popupClose.addEventListener("click", closePopup);

// Adicionar evento de clique no overlay para encerrar o popup quando clicado fora da área do popup
popupOverlay.addEventListener("click", () => {
  popupOverlay.classList.remove("show");
  closePopup();
});
