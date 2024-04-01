import "../../pages/index.css";
import { initialCards, createCard, deleteCard, toggleLikeCard } from "./cards";
import { openPopup, closePopup } from "./popup";

const page = document.querySelector(".page");
const placesList = page.querySelector(".places__list");

let currentPopup;
const popupTypeEdit = page.querySelector(".popup_type_edit");
const popupTypeNewCard = page.querySelector(".popup_type_new-card");
const popupTypeImage = page.querySelector(".popup_type_image");
const popupImage = page.querySelector(".popup__image");
const popupCaption = page.querySelector(".popup__caption");

let currentForm;
const formEditProfile = document.forms["edit-profile"];
const nameInput = formEditProfile.name;
const jobInput = formEditProfile.description;
const profileTitle = page.querySelector(".profile__title");
const profileDescription = page.querySelector(".profile__description");
resetFormEditProfile();

const formNewPlace = document.forms["new-place"];
const placeNameInput = formNewPlace["place-name"];
const linkInput = formNewPlace.link;

initialCards.forEach((card) => {
  placesList.append(createCard(card, deleteCard));
});

page.addEventListener("click", function (event) {
  if (
    event.target.classList.contains("popup__close") ||
    event.target.classList.contains("popup")
  ) {
    resetPopup(currentPopup);
  } else if (event.target.classList.contains("profile__edit-button")) {
    currentPopup = popupTypeEdit;
    openPopup(currentPopup, closePopupWithEsc);
  } else if (event.target.classList.contains("profile__add-button")) {
    currentPopup = popupTypeNewCard;
    currentForm = formNewPlace;
    openPopup(currentPopup, closePopupWithEsc);
  } else if (event.target.classList.contains("card__image")) {
    const card = event.target.parentElement;
    currentPopup = popupTypeImage;
    popupImage.src = event.target.src;
    popupCaption.textContent = card.querySelector(".card__title").textContent;
    openPopup(currentPopup, closePopupWithEsc);
  } else if (event.target.classList.contains("card__like-button")) {
    toggleLikeCard(event.target);
  }
});

function resetPopup() {
  resetFormEditProfile();
  resetForm();
  closePopup(currentPopup, closePopupWithEsc);
  currentPopup = null;
  currentForm = null;
}

function closePopupWithEsc(event) {
  if (event.key === "Escape" || event.key === "Esc") {
    resetPopup();
  }
}

formEditProfile.addEventListener("submit", handleFormEditProfileSubmit);
formNewPlace.addEventListener("submit", handleFormNewPlaceSubmit);

function resetForm() {
  if (!currentForm) return;
  currentForm.reset();
}

function resetFormEditProfile() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function handleFormEditProfileSubmit(event) {
  event.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  currentPopup = popupTypeEdit;
  resetPopup();
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

  currentPopup = popupTypeNewCard;
  closePopup();
}
