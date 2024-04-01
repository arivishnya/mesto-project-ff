const page = document.querySelector(".page");

function openPopup(elem, closePopupWithEsc) {
  elem.classList.add("popup_is-opened");
  page.addEventListener("keydown", closePopupWithEsc);
}

function closePopup(elem, closePopupWithEsc) {
  elem.classList.remove("popup_is-opened");
  page.removeEventListener("keydown", closePopupWithEsc);
}

export { openPopup, closePopup };
