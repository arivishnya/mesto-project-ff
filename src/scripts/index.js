import "../../pages/index.css";
import {
  getUser,
  getCards,
  changeUserInfo,
  addCard,
  changeUserAvatar,
} from "./api";
import { enableValidation, clearValidation } from "./validation";
import { openPopup, closePopup, closePopupWithOverlay } from "./modal";
import { createCard, deleteCardControl, toggleLikeCard } from "./card";

const page = document.querySelector(".page");
const placesList = page.querySelector(".places__list");

const popups = {
  edit: page.querySelector(".popup_type_edit"),
  editAvatar: page.querySelector(".popup_type_edit-avatar-profile"),
  newCard: page.querySelector(".popup_type_new-card"),
  image: page.querySelector(".popup_type_image"),
};

const popupImage = {
  image: popups.image.querySelector(".popup__image"),
  caption: popups.image.querySelector(".popup__caption"),
};

const profile = {
  title: page.querySelector(".profile__title"),
  description: page.querySelector(".profile__description"),
  image: page.querySelector(".profile__image"),
};

const formEditProfile = document.forms["edit-profile"];
const { name: nameInput, description: jobInput } = formEditProfile;

const formEditAvatarProfile = document.forms["edit-avatar-profile"];
const { "edit-avatar-input": avatarInput } = formEditAvatarProfile;

const formNewPlace = document.forms["new-place"];
const { "place-name": placeNameInput, link: linkInput } = formNewPlace;

function updateProfile({ name, about, avatar }) {
  if (name) profile.title.textContent = name;
  if (about) profile.description.textContent = about;
  if (avatar) profile.image.src = avatar;
}

page.addEventListener("click", function (event) {
  const popupElement = page.querySelector(".popup_is-opened");

  if (event.target.classList.contains("popup")) {
    closePopupWithOverlay(popupElement);
  } else if (event.target.classList.contains("popup__close")) {
    closePopup(popupElement);
  } else if (event.target.classList.contains("profile__edit-button")) {
    nameInput.value = profile.title.textContent;
    jobInput.value = profile.description.textContent;
    clearValidation(formEditProfile, false);
    openPopup(popups.edit);
  } else if (
    event.target.classList.contains("profile__image-button") ||
    event.target.parentElement.classList.contains("profile__image-button")
  ) {
    resetForm(formEditAvatarProfile);
    clearValidation(formEditAvatarProfile);
    openPopup(popups.editAvatar);
  } else if (event.target.classList.contains("profile__add-button")) {
    resetForm(formNewPlace);
    clearValidation(formNewPlace);
    openPopup(popups.newCard);
  }
});

function openPopupImage(event) {
  const card = event.target.parentElement;
  popupImage.image.src = event.target.src;
  popupImage.image.alt = captionText;
  popupImage.caption.textContent =
    card.querySelector(".card__title").textContent;
  openPopup(popups.image);
}

formEditProfile.addEventListener("submit", handleFormEditProfileSubmit);
formEditAvatarProfile.addEventListener(
  "submit",
  handleFormEditAvatarProfileSubmit
);
formNewPlace.addEventListener("submit", handleFormNewPlaceSubmit);

function resetForm(form) {
  form.reset();
}

function handleFormEditProfileSubmit(event) {
  event.preventDefault();

  const popupButton = popups.edit.querySelector(".popup__button");
  const text = popupButton.textContent;
  changeTextFormButton(popupButton);

  changeUserInfo({
    name: nameInput.value,
    about: jobInput.value,
  }).then((user) => {
    updateProfile(user);
    changeTextFormButton(popupButton, text);
    closePopup(popups.edit);
  });
}

function handleFormEditAvatarProfileSubmit(event) {
  event.preventDefault();

  const popupButton = popups.editAvatar.querySelector(".popup__button");
  const text = popupButton.textContent;
  changeTextFormButton(popupButton);

  changeUserAvatar({
    avatar: avatarInput.value,
  }).then((user) => {
    updateProfile(user);
    changeTextFormButton(popupButton, text);
    closePopup(popups.editAvatar);
  });
}

function handleFormNewPlaceSubmit(event) {
  event.preventDefault();

  const popupButton = popups.newCard.querySelector(".popup__button");
  const text = popupButton.textContent;
  changeTextFormButton(popupButton);

  addCard({
    name: placeNameInput.value,
    link: linkInput.value,
  }).then((newCard) => {
    placesList.prepend(createCard(newCard, deleteCardControl));
    changeTextFormButton(popupButton, text);
    closePopup(popups.newCard);
  });
}

function changeTextFormButton(popupButton, defaultText) {
  popupButton.textContent = defaultText || "Сохранение...";
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__form-error_visible",
});

Promise.all([getUser(), getCards()]).then(([user, cards]) => {
  updateProfile(user);
  cards.forEach((card) => {
    placesList.append(
      createCard(card, deleteCardControl, openPopupImage, toggleLikeCard)
    );
  });
});
