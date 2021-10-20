import "./index.css";
import { Card } from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import initialElements from "../components/initialElements.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { api } from "../components/Api.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";

const settings = {
  formSelector: ".form",
  inputSelector: ".form__text-input",
  submitButtonSelector: ".form__submit-btn",
  inactiveButtonClass: "form__submit-btn_disabled",
  inputErrorClass: "form__text-input_theme_error",
  errorClass: "form__input-error",
};

let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()]).then(
  ([cardData, userData]) => {
    userId = userData._id;
    cardSection.renderItems(cardData);
    userInfoHolder.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });
  }
);

//edit profile
const profileModal = document.querySelector(".modal_type_profile");
const editForm = document.querySelector(".modal_type_profile");
const profileEditBtn = document.querySelector(".profile__edit-btn");
const closeButton = profileModal.querySelector(".modal__close-btn");
const avatarCloseBtn = document.querySelector(".modal__change-picture");
const userAvatarBtn = document.querySelector(".profile__change-avatar");

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

const confirmModal = new PopupWithSubmit(".modal_type_delete-card");
confirmModal.setEventListeners();

// UserInfo
const userInfoHolder = new UserInfo(
  ".profile__title",
  ".profile__job",
  ".profile__avatar"
);
userInfoHolder.setUserInfo({
  name: "",
  job: "",
  avatar: "",
});

// card render
const cardRenderer = (newCard) => {
  const cardElement = new Card({
    data: newCard,
    cardSelector: templateElement,
    handleCardClick: (evt) => {
      imageModal.open(evt);
    },
    handleDeleteCard: () => {
      confirmModal.open(() => {
        const deleteSubmitHandler = document.querySelector(
          ".form__submit-delete"
        );
        deleteSubmitHandler.textContent = "deleting...";
        deleteSubmitHandler.setAttribute("disabled", true);
        api
          .deleteCard(cardElement.getId())
          .then((res) => console.log("Card has been deleted."))
          .catch((res) => {})
          .then((res) => {
            cardElement.removeCard();
            deleteSubmitHandler.textContent = "yes";
            deleteSubmitHandler.removeAttribute("disabled", false);
          })
          .then(confirmModal.close());
      });
    },
    handleLikeIcon: () => {
      const isLikeActive = cardElement.isLiked();

      if (isLikeActive) {
        api.deleteLike(cardElement.getId()).then((res) => {
          cardElement.likeCard(res.likes);
          cardElement.unLikeCard();
        });
      } else {
        api.likeCard(cardElement.getId()).then((res) => {
          cardElement.likeCard(res.likes);
        });
      }
    },
    userId,
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

const avatarPopup = new PopupWithForm(".modal_type_change-picture", () => {
  api
    .avatarImage(avatarPopup.getInputValues().link)
    .then((res) => userInfoHolder.setUserInfo(res))
    .then(avatarPopup.close());
});
avatarPopup.setEventListeners();

const addPopup = new PopupWithForm(".modal_type_add-element", () => {
  let newCard = addPopup.getInputValues();
  api.createCard(newCard).then((res) => {
    newCard = cardRenderer(res);
    elementsBlock.prepend(newCard);
    addPopup.close(res);
  });
});
addPopup.setEventListeners();

// edit profile modal
const editModal = new PopupWithForm(".modal_type_profile", () => {
  userInfoHolder.setUserInfo(editModal.getInputValues());
  editModal.close();
});
editModal.setEventListeners();

profileEditBtn.addEventListener("click", () => {
  editModal.setInputValues(userInfoHolder.getUserInfo());
  editFormValidator.resetValidation();
  editModal.open();
});

userAvatarBtn.addEventListener("click", () => {
  avatarPopup.open();
});

//set EventListeners
addCardBtn.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  addPopup.open();
});

closeButton.addEventListener("click", () => editModal.close());
closePopupBtn.addEventListener("click", () => imageModal.close());
closeAddButton.addEventListener("click", () => addPopup.close());
avatarCloseBtn.addEventListener("click", () => avatarPopup.close());
