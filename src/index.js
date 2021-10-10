import {Card,} from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import { initialElements } from "../scripts/constants.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { Popup } from "../src/Popup.js";
import  Section from "./Section.js";
import {UserInfo} from "./UserInfo.js";

const settings = {
  formSelector: ".form",
  inputSelector: ".form__text-input",
  submitButtonSelector: ".form__submit-btn",
  inactiveButtonClass: "form__submit-btn_disabled",
  inputErrorClass: "form__text-input_theme_error",
  errorClass: "form__input-error",
};

const imageModal = new PopupWithImage(".modal_type_pop-up")



const editModal = new PopupWithForm(".modal_type_profile", (data) => {

})
editModal.setEventListeners();

const addCardModal = new PopupWithForm(".modal_type_add-element", (data) => {

})

const editForm = document.querySelector(".modal_type_profile");
const addCardForm = document.querySelector(".modal_type_add-element");

const editFormValidator = new FormValidator(settings, editForm);
const addCardFormValidator = new FormValidator(settings, addCardForm);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();


//edit profile
const modal = document.querySelector(".modal");
const profileModal = document.querySelector(".modal_type_profile");
const profileEditBtn = document.querySelector(".profile__edit-btn");
const closeButton = profileModal.querySelector(".modal__close-btn");
const formElement = profileModal.querySelector(".form");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__job");
const inputName = document.querySelector(".form__text-input_type_name");
const inputJob = document.querySelector(".form__text-input_type_job");
let openedModal;

//modals
const modalAddElement = document.querySelector(".modal_type_add-element");
const closeAddBtn = modalAddElement.querySelector(".modal__close-btn");
const submitAddCard = modalAddElement.querySelector(".form__submit-btn");
const addCardBtn = document.querySelector(".profile__add-btn");

//create cards
const templateElement = document
  .querySelector("#element-template")
  .content.querySelector(".element");
const elementsBlock = document.querySelector(".elements");
const element = templateElement.cloneNode(true);

//pop up
const modalPopup = document.querySelector(".modal_type_pop-up");
const closePopupBtn = document.querySelector(".modal__close-popup");
const largeImage = document.querySelector(".modal__img");
const popupTitle = document.querySelector(".modal__title");
const url = document.querySelector(".form__text-input_type_img-element");
const title = document.querySelector(".form__text-input_type_name-element");
console.log("Hello, World!");

initialElements.forEach((element) => {
  const card = new Card(element);
  const cardElement = card.generateCard();

  elementsBlock.prepend(cardElement);
});

const renderCard = (data, wrap) => {
  const card = new card (data, cardSelector, (name,link) => {
    imageModal.open(name,link)
  })
  wrap.prepend(card.gwtView());
}
function closeWithKeyHandler(evt) {
  if (evt.key === "Escape") {
    closePopup(openedModal);
  }
}

function closeWithOverlayHandler(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(openedModal);
  }
}

const openPopUp = (popup) => {
  popup.classList.remove("modal_closed");
  document.addEventListener("keydown", closeWithKeyHandler);
  popup.addEventListener("click", closeWithOverlayHandler);
  openedModal = popup;
};

const closePopup = (popup) => {
  popup.classList.add("modal_closed");
  document.removeEventListener("keydown", closeWithKeyHandler);
  popup.removeEventListener("click", closeWithOverlayHandler);
};

profileEditBtn.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
editModal.open()
});

closeButton.addEventListener("click", () => {
  closePopup(modal);
});

closePopupBtn.addEventListener("click", () => {
  closePopup(modalPopup);
});

function handleSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(modal);
}

formElement.addEventListener("submit", handleSubmit);
addCardBtn.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  openPopUp(modalAddElement);
});

closeAddBtn.addEventListener("click", () => {
  closePopup(modalAddElement);
});
submitAddCard.addEventListener("click", function (e) {
  e.preventDefault();
  const link = url.value;
  const name = title.value;
  const cardInstance = new Card({ link, name }, templateElement);
  elementsBlock.prepend(cardInstance.generateCard());
  closePopup(modalAddElement);
  title.value = "";
  url.value = "";
});

export { largeImage, popupTitle, modalPopup, openPopUp};