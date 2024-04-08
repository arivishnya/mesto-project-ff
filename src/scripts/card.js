import { userId, deleteCard } from "./api";
import { openPopup, closePopup } from "./modal";

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
  if (userId && card.owner && userId != card.owner._id) {
    cardDeleteElement.style = "display: none";
  } else {
    cardDeleteElement.addEventListener("click", (event) =>
      deletedCardFunction(card._id, event.target.parentElement)
    );
  }

  if (card.likes && card.likes.length) {
    const cardLikeTextElement = cardElement.querySelector(".card__like-text");
    cardLikeTextElement.textContent = card.likes.length;
  }

  const cardLikeButtonElement = cardElement.querySelector(".card__like-button");
  cardLikeButtonElement.addEventListener("click", toggleLikeCard);

  return cardElement;
}

function deleteCardControl(cardId, cardElement) {
  const popupTypeDeleteCard = document.querySelector(".popup_type_delete-card");
  const formDeleteCard = document.forms["delete-card"];
  openPopup(popupTypeDeleteCard);
  formDeleteCard.addEventListener("submit", (event) => {
    event.preventDefault();
    deleteCard(cardId).then(() => {
      cardElement.remove();
      closePopup(popupTypeDeleteCard);
    });
  });
}

function toggleLikeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCardControl, toggleLikeCard };
