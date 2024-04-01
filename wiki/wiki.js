// ---------------------------------------------

// Obtenha todas as tags
var tags = document.querySelectorAll('.conteudo-wiki-search-tagcloud a');

// Adicione um evento de clique a cada tag
tags.forEach(function(tag) {
  tag.addEventListener('click', function(e) {
    e.preventDefault();

    // Obtenha o valor da tag
    var tagValue = this.getAttribute('href').substring(1);

    // Obtenha todos os cards
    var cards = document.querySelectorAll('.conteudo-wiki-cards-card');

    // Percorra todos os cards
    cards.forEach(function(card) {
      // Verifique se o card contém a tag
      var cardTags = card.querySelectorAll('.conteudo-wiki-cards-card-tags a');
      var hasTag = Array.from(cardTags).some(function(cardTag) {
        return cardTag.getAttribute('href').substring(1) === tagValue;
      });

      // Se o card contiver a tag, mostre-o. Caso contrário, esconda-o.
      if (hasTag) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ---------------------------------------------