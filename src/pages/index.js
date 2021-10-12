import "./index.css";
import { Card } from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialElements } from "../components/initialElements.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";

const settings = {
  formSelector: ".form",
  inputSelector: ".form__text-input",
  submitButtonSelector: ".form__submit-btn",
  inactiveButtonClass: "form__submit-btn_disabled",
  inputErrorClass: "form__text-input_theme_error",
  errorClass: "form__input-error",
};

//edit profile
const profileModal = document.querySelector(".modal_type_profile");
const editForm = document.querySelector(".modal_type_profile");
const profileEditBtn = document.querySelector(".profile__edit-btn");
const closeButton = profileModal.querySelector(".modal__close-btn");

//modals
const addCardForm = document.querySelector(".modal_type_add-element");
const closeAddButton = addCardForm.querySelector(".modal__close-btn");
const addCardBtn = document.querySelector(".profile__add-btn");

//create cards
const templateElement = document
  .querySelector("#element-template")
  .content.querySelector(".element");
const elementsBlock = document.querySelector(".elements");
const element = templateElement.cloneNode(true);

//pop up
const closePopupBtn = document.querySelector(".modal__close-popup");

// validation
const editFormValidator = new FormValidator(settings, editForm);
const addCardFormValidator = new FormValidator(settings, addCardForm);
editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

const imageModal = new PopupWithImage(".modal_type_pop-up");
imageModal.setEventListeners();

// UserInfo
const userInfoHolder = new UserInfo(".profile__title", ".profile__job");
userInfoHolder.setUserInfo({ name: "Jacques Cousteau", job: "explorer" });

// card render
const cardRenderer = (newCard) => {
  const cardElement = new Card(newCard, templateElement, (evt) => {
    imageModal.open(evt);
  });

  const renderedCard = cardElement.generateCard();
  return renderedCard;
};

//section class
const cardSection = new Section(
  {
    items: initialElements,
    renderer: (data) => {
      cardSection.addItem(cardRenderer(data));
    },
  },
  ".elements"
);
cardSection.renderItems();

//Add card modal
const addPopup = new PopupWithForm(".modal_type_add-element", () => {
  const newCard = addPopup.getInputValues();
  newCard = cardRenderer(newCard);
  elementsBlock.addItem(newCard);
  addPopup.close();
});
addPopup.setEventListeners();

// edit profile modal
const editModal = new PopupWithForm(".modal_type_profile", (data) => {
  userInfoHolder.setUserInfo(editModal.getInputValues());
  editModal.close();
});
editModal.setEventListeners();

profileEditBtn.addEventListener("click", () => {
  editModal.setInputValues(userInfoHolder.getUserInfo());
  editFormValidator.resetValidation();
  editModal.open();
});
//set EventListeners
addCardBtn.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  addPopup.open();
});
closeAddButton.addEventListener("click", () => addPopup.close());
closeButton.addEventListener("click", () => editModal.close());
closePopupBtn.addEventListener("click", () => imageModal.close());
