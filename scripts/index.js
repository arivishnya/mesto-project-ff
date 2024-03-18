const page = document.querySelector(".page");

// @todo: Темплейт карточки
const cardTemplate = page.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = page.querySelector(".places__list");

// @todo: Функция создания карточки
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

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  placesList.append(createCard(card, deleteCard));
});
