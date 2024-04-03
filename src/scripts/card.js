const cardTemplate = document.querySelector("#card-template").content;

function createCard(
  card,
  deletedCardFunction,
  openPopupImageFunction,
  toggleLikeCard
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__title").textContent = card.name;

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", openPopupImageFunction);

  const cardDeleteElement = cardElement.querySelector(".card__delete-button");
  cardDeleteElement.addEventListener("click", (event) =>
    deletedCardFunction(event.target.parentElement)
  );

  const cardLikeButtonElement = cardElement.querySelector(".card__like-button");
  cardLikeButtonElement.addEventListener("click", toggleLikeCard);

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function toggleLikeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, toggleLikeCard };
