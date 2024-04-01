const page = document.querySelector(".page");
const cardTemplate = page.querySelector("#card-template").content;

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function createCard(card, deletedCardFunction) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__title").textContent = card.name;

  const cardDeleteElement = cardElement.querySelector(".card__delete-button");
  cardDeleteElement.addEventListener("click", (event) =>
    deletedCardFunction(event.target.parentElement)
  );

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function toggleLikeCard(elem) {
  if (elem.classList.contains("card__like-button_is-active")) {
    removeLikeCard(elem);
  } else {
    addLikeCard(elem);
  }
}

function addLikeCard(elem) {
  elem.classList.add("card__like-button_is-active");
}

function removeLikeCard(elem) {
  elem.classList.remove("card__like-button_is-active");
}

export { initialCards, createCard, deleteCard, toggleLikeCard };
