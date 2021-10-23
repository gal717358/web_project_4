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
import { renderLoading } from "../utils/utils.js";

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
      about: userData.about,
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
const submitAvatarBtn = document.querySelector(".form__change-picture");

//modals
const addCardForm = document.querySelector(".modal_type_add-element");
const closeAddButton = addCardForm.querySelector(".modal__close-btn");
const addCardBtn = document.querySelector(".profile__add-btn");
const addCardSubmitBtn = addCardForm.querySelector(".form__submit-btn");
const editSubmitBtn = editForm.querySelector(".form__submit-btn");

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
  about: "",
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
        renderLoading( true, "deleting...", deleteSubmitHandler);
        api
          .deleteCard(cardElement.getId())
          .then((res) => console.log("Card has been deleted."))
          .catch((err) => console.log(`${err}`))
          .then((res) => {
            cardElement.removeCard();
            confirmModal.close();
          })
          .finally((res) => {
            renderLoading( false, "Yes", deleteSubmitHandler);
          });
      });
    },
    handleLikeIcon: () => {
      const isLikeActive = cardElement.isLiked();

      if (isLikeActive) {
        api.deleteLike(cardElement.getId()).then((res) => {
          cardElement
            .likeCard(res.likes)
            .catch((err) => console.log(`Error.....: ${err}`));
        });
      } else {
        api.likeCard(cardElement.getId()).then((res) => {
          cardElement
            .likeCard(res.likes)
            .catch((err) => console.log(`Error.....: ${err}`));
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
  renderLoading( true, "saving...", submitAvatarBtn);
  api
    .avatarImage(avatarPopup.getInputValues().link)
    .then((res) => userInfoHolder.setUserInfo(res))
    .catch((err) => console.log(`Error.....: ${err}`))
    .then((res) => {
      avatarPopup.close();
    })
    .finally((res) => {
      renderLoading( false, "Change", submitAvatarBtn);
    });
});
avatarPopup.setEventListeners();

const addPopup = new PopupWithForm(".modal_type_add-element", () => {
  const newCard = addPopup.getInputValues();
  renderLoading(true, "creating...", addCardSubmitBtn);
  api
    .createCard(newCard)
    .then((res) => {
      const newCardInput = cardRenderer(res);
      elementsBlock.prepend(newCardInput);
    })
    .catch((err) => console.log(`Error.....: ${err}`))
    .then((res) => {
      addPopup.close(res);
    })
    .finally((res) => {
      renderLoading( false, "Create", addCardSubmitBtn);
    });
});
addPopup.setEventListeners();

// edit profile modal
const editModal = new PopupWithForm(".modal_type_profile", () => {
  renderLoading(true, "saving...", editSubmitBtn);
  api
    .editProfile(editModal.getInputValues())
    .then((res) => {
      userInfoHolder.setUserInfo(res);
    })
    .catch((err) => console.log(`Error.....: ${err}`))
    .then((res) => {
      editModal.close();
    })
    .finally((res) => {
      renderLoading(false, "save", editSubmitBtn);
    });
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
