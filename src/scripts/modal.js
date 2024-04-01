function openPopup(elem) {
  elem.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupWithEsc);
}

function closePopup(elem) {
  elem.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupWithEsc);
}

function closePopupWithEsc(event) {
  const popupElement = document.querySelector(".popup_is-opened");

  if (event.key === "Escape" || event.key === "Esc") {
    closePopup(popupElement);
  }
}

function closePopupWithOverlay(elem) {
  closePopup(elem);
}

export { openPopup, closePopup, closePopupWithOverlay };
