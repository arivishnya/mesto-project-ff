import "../../pages/index.css";
import { getUser, getCards, changeUserInfo, addCard } from "./api";
import { enableValidation, clearValidation } from "./validation";
import { openPopup, closePopup, closePopupWithOverlay } from "./modal";
import { createCard, deleteCardControl, toggleLikeCard } from "./card";

const page = document.querySelector(".page");
const placesList = page.querySelector(".places__list");

const popupTypeEdit = page.querySelector(".popup_type_edit");
const popupTypeNewCard = page.querySelector(".popup_type_new-card");
const popupTypeImage = page.querySelector(".popup_type_image");
const popupImage = page.querySelector(".popup__image");
const popupCaption = page.querySelector(".popup__caption");

const formEditProfile = document.forms["edit-profile"];
const nameInput = formEditProfile.name;
const jobInput = formEditProfile.description;
const profileTitle = page.querySelector(".profile__title");
const profileDescription = page.querySelector(".profile__description");
const profileImage = page.querySelector(".profile__image");

const formNewPlace = document.forms["new-place"];
const placeNameInput = formNewPlace["place-name"];
const linkInput = formNewPlace.link;

function updateUserInfo({ name, about, avatar }) {
  profileTitle.textContent = name;
  profileDescription.textContent = about;

  if (avatar) profileImage.src = avatar;
}

page.addEventListener("click", function (event) {
  const popupElement = page.querySelector(".popup_is-opened");

  if (event.target.classList.contains("popup")) {
    closePopupWithOverlay(popupElement);
  } else if (event.target.classList.contains("popup__close")) {
    closePopup(popupElement);
  } else if (event.target.classList.contains("profile__edit-button")) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(formEditProfile, false);
    openPopup(popupTypeEdit);
  } else if (event.target.classList.contains("profile__add-button")) {
    resetForm(formNewPlace);
    clearValidation(formNewPlace);
    openPopup(popupTypeNewCard);
  }
});

function openPopupImage(event) {
  const card = event.target.parentElement;
  popupImage.src = event.target.src;

  captionText = card.querySelector(".card__title").textContent;
  popupCaption.textContent = captionText;
  popupCaption.alt = captionText;
  openPopup(popupTypeImage);
}

formEditProfile.addEventListener("submit", handleFormEditProfileSubmit);
formNewPlace.addEventListener("submit", handleFormNewPlaceSubmit);

function resetForm(form) {
  form.reset();
}

function handleFormEditProfileSubmit(event) {
  event.preventDefault();

  changeUserInfo({
    name: nameInput.value,
    about: jobInput.value,
  }).then((user) => {
    updateUserInfo(user);
    closePopup(popupTypeEdit);
  });
}

function handleFormNewPlaceSubmit(event) {
  event.preventDefault();

  addCard({
    name: placeNameInput.value,
    link: linkInput.value,
  }).then((newCard) => {
    placesList.prepend(createCard(newCard, deleteCardControl));
    closePopup(popupTypeNewCard);
  });
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__form-error_visible",
});

Promise.all([getUser(), getCards()]).then(([user, cards]) => {
  updateUserInfo(user);
  cards.forEach((card) => {
    placesList.append(
      createCard(card, deleteCardControl, openPopupImage, toggleLikeCard)
    );
  });
});
