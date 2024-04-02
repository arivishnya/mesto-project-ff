import "../../pages/index.css";
import { initialCards, createCard, deleteCard, toggleLikeCard } from "./cards";
import { openPopup, closePopup, closePopupWithOverlay } from "./modal";

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

const formNewPlace = document.forms["new-place"];
const placeNameInput = formNewPlace["place-name"];
const linkInput = formNewPlace.link;

initialCards.forEach((card) => {
  placesList.append(
    createCard(card, deleteCard, openPopupImage, toggleLikeCard)
  );
});

page.addEventListener("click", function (event) {
  const popupElement = page.querySelector(".popup_is-opened");

  if (event.target.classList.contains("popup")) {
    closePopupWithOverlay(popupElement);
  } else if (event.target.classList.contains("popup__close")) {
    closePopup(popupElement);
  } else if (event.target.classList.contains("profile__edit-button")) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupTypeEdit);
  } else if (event.target.classList.contains("profile__add-button")) {
    resetForm(formNewPlace);
    openPopup(popupTypeNewCard);
  }
});

function openPopupImage(event) {
  const card = event.target.parentElement;
  popupImage.src = event.target.src;
  popupCaption.textContent = popupImage.alt =
    card.querySelector(".card__title").textContent;
  openPopup(popupTypeImage);
}

formEditProfile.addEventListener("submit", handleFormEditProfileSubmit);
formNewPlace.addEventListener("submit", handleFormNewPlaceSubmit);

function resetForm(form) {
  form.reset();
}

function handleFormEditProfileSubmit(event) {
  event.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupTypeEdit);
}

function handleFormNewPlaceSubmit(event) {
  event.preventDefault();

  placesList.prepend(
    createCard(
      {
        name: placeNameInput.value,
        link: linkInput.value,
      },
      deleteCard
    )
  );

  closePopup(popupTypeNewCard);
}
