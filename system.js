// ------------ Início do Loader ----------------

document.addEventListener('DOMContentLoaded', () => {
  const htmlElement = document.documentElement;
  const loader = document.getElementById('loader');

  // Adiciona a classe 'disable-scroll' ao elemento html
  htmlElement.classList.add('disable-scroll');

  setTimeout(() => {
    // Remove a classe 'disable-scroll' do elemento html
    htmlElement.classList.remove('disable-scroll');
    // Esconde o loader
    loader.style.display = 'none';
  }, 500); // 500 milissegundos = 0.5 segundos
});

// ------------ Fim do Loader ----------------

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

// ---------------------------

// Função para filtrar por tag
var tagSelect = document.getElementById('tagSelect');
const cards = document.querySelectorAll(".conteudo-loja-card");

function filterByTag() {
  var selectedTag = tagSelect.value;

  // Filtrar por Tag
  var filteredCards = Array.from(cards).filter(function(card) {
    var cardTags = card.getAttribute('data-tag').split(',');
    // Verifica se o card deve ou não ser exibido
    return selectedTag === '' || cardTags.includes(selectedTag);
  });

  // Atualize o DOM
  cards.forEach(function(card) {
    card.style.display = 'none';
  });
  filteredCards.forEach(function(card) {
    card.style.display = '';
  });

  // Atualize o contador de produtos
  var productCounter = document.getElementById('product-counter');
  productCounter.textContent = filteredCards.length + ' Produtos';
}

// Atualize o contador de produtos ao selecionar uma nova tag
tagSelect.addEventListener('change', filterByTag);

// Chame a função de filtragem de tags quando a página é carregada
filterByTag();

// ---------------------------

var searchInput = document.getElementById('searchInput');
searchInput.setAttribute('autocomplete', 'off');

// Função para pesquisar produtos
searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const selectedTag = tagSelect.value;

  cards.forEach((card) => {
    const title = card.querySelector(".conteudo-loja-card-title").innerText.toLowerCase();
    const description = card.querySelector(".conteudo-loja-card-description").innerText.toLowerCase();
    const units = card.querySelector(".conteudo-loja-card-units").innerText.toLowerCase();
    const effect = card.querySelector(".conteudo-loja-card-effect").innerText.toLowerCase();
    const price = card.querySelector(".conteudo-loja-card-price").innerText.toLowerCase();
    const cardTags = card.getAttribute('data-tag').split(',');

    if ((selectedTag === '' || cardTags.includes(selectedTag)) && (title.includes(query) || description.includes(query) || units.includes(query) || effect.includes(query) || price.includes(query))) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
});

var searchInput = document.getElementById('searchInput');
searchInput.setAttribute('autocomplete', 'off');

// ---------------------------

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
  },
  11: {
    effect: "[Cura Leve] - Cura 10% da Vida Máxima",
    comp: "9",
  }
  // Adicionar mais objetos de produtos conforme necessário
};

// ---------------------------

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

// ------------ Fim ----------------