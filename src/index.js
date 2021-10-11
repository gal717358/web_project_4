import { Card } from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import { initialElements } from "../scripts/constants.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import Section from "./Section.js";
import { UserInfo } from "./UserInfo.js";

const settings = {
    formSelector: ".form",
    inputSelector: ".form__text-input",
    submitButtonSelector: ".form__submit-btn",
    inactiveButtonClass: "form__submit-btn_disabled",
    inputErrorClass: "form__text-input_theme_error",
    errorClass: "form__input-error",
};

const editForm = document.querySelector(".modal_type_profile");
const addCardForm = document.querySelector(".modal_type_add-element");

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

//modals
const modalAddElement = document.querySelector(".modal_type_add-element");
const closeAddBtn = modalAddElement.querySelector(".modal__close-btn");
const submitAddCard = modalAddElement.querySelector(".form__submit-btn");
const addCardBtn = document.querySelector(".profile__add-btn");

//create cards
const templateElement = document.querySelector("#element-template").content.querySelector(".element");
const elementsBlock = document.querySelector(".elements");
const element = templateElement.cloneNode(true);

//pop up
const modalPopup = document.querySelector(".modal_type_pop-up");
const closePopupBtn = document.querySelector(".modal__close-popup");
const largeImage = document.querySelector(".modal__img");
const popupTitle = document.querySelector(".modal__title");
const elementImage = document.querySelector(".element__image");
const url = document.querySelector(".form__text-input_type_img-element");
const title = document.querySelector(".form__text-input_type_name-element");


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

//section class
const cardSection = new Section(
    {
        items: initialElements,
        renderer: (data) => {
            let cardHolder = new Card(data, settings);
            cardHolder = cardHolder.generateCard();
            cardSection.setItem(cardHolder);
            imageModal.open(data.name,data.link);
        },
    },
    ".elements"
);
cardSection.renderItems();

const cardRenderer = (newCard) => {
  const cardElement = new Card(newCard, templateElement, (evt) => {
  });
  const renderedCard = cardElement.generateCard();
  return renderedCard;
};

//Add card modal
const addPopup = new PopupWithForm(".modal_type_add-element", () => {
  let newCard = addPopup.getInputValues();
  newCard = cardRenderer(newCard);
  cardSection.addItem(newCard);
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

closeAddBtn.addEventListener("click", () => addPopup.close());
closeButton.addEventListener("click", () => editModal.close());
closePopupBtn.addEventListener("click", () => imageModal.close());

