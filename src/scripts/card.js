import { userId, deleteCard, addCardLike, deleteCardLike } from "./api";
import { openPopup, closePopup } from "./modal";

const cardTemplate = document.querySelector("#card-template").content;

function createCard(
  card,
  deletedCardFunction,
  openPopupImageFunction,
  toggleLikeCard
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const { link, name, owner, _id, likes } = card;

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = name;
  cardElement.querySelector(".card__title").textContent = name;

  const cardDeleteElement = cardElement.querySelector(".card__delete-button");
  if (userId != owner._id) {
    cardDeleteElement.style.display = "none";
  } else {
    cardDeleteElement.addEventListener("click", () =>
      deletedCardFunction(card._id, cardElement)
    );
  }

  cardElement.querySelector(".card__like-text").textContent = likes.length;

  const cardLikeButtonElement = cardElement.querySelector(".card__like-button");
  if (likes.some((user) => user._id == userId)) {
    cardLikeButtonElement.classList.add("card__like-button_is-active");
  }

  cardLikeButtonElement.addEventListener("click", (event) =>
    toggleLikeCard(event, _id, cardElement)
  );

  cardImage.addEventListener("click", openPopupImageFunction);

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

function toggleLikeCard(event, cardId, cardElement) {
  const likeButton = event.target;
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  const callback = (card) => {
    const likesCount = card.likes.length;
    cardElement.querySelector(".card__like-text").textContent = likesCount;
    likeButton.classList.toggle("card__like-button_is-active", !isLiked);
  };

  if (isLiked) {
    deleteCardLike(cardId).then((updatedCard) => callback(updatedCard));
  } else {
    addCardLike(cardId).then((updatedCard) => callback(updatedCard));
  }
}

export { createCard, deleteCardControl, toggleLikeCard };
