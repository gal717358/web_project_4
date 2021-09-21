import {Card, initialElements} from "./card.js"

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
let modalClosed = document.querySelector(".modal_closed");

//modals
const modalAddelement = document.querySelector(".modal_type_add-element");
const closeAddBtn = modalAddelement.querySelector(".modal__close-btn");
const submitAddCard = modalAddelement.querySelector(".form__submit-btn");
const addCardbtn = document.querySelector(".profile__add-btn");

//create cards
const templateElement = document.querySelector("#element-template").content.querySelector(".element");
const elementsBlock = document.querySelector(".elements");
const element = templateElement.cloneNode(true);

//pop up
const modalPopup = document.querySelector(".modal_type_pop-up");
const closePopupBtn = document.querySelector(".modal__close-popup");
const modalpopupContainer = document.querySelector("modal__container_type_popup");
const largeImage = document.querySelector(".modal__img");
const popupTitle = document.querySelector(".modal__title");
const elementLikeActive = document.querySelector(".element__like-btn_active");
const url = document.querySelector(".form__text-input_type_img-element");
const title = document.querySelector(".form__text-input_type_name-element");


initialElements.forEach((ele) => {
	const card = new Card(ele);
	const templateElement = card.generateCard();

 document.querySelector(".elements").prepend(templateElement);
});


function closeWithKeyHandler(evt) {
    if (evt.key === "Escape") {
        closePopup(modalClosed);
    }
}

function closeWithOverleyHandler(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(modalClosed);
    }
}

const openPopUp = (popup) => {
    popup.classList.remove("modal_closed");
    document.addEventListener("keydown", closeWithKeyHandler);
    popup.addEventListener("click", closeWithOverleyHandler);
    modalClosed = popup;
};

const closePopup = (popup) => {
    popup.classList.add("modal_closed");
    document.removeEventListener("keydown", closeWithKeyHandler);
    popup.removeEventListener("click", closeWithOverleyHandler);
};

profileEditBtn.addEventListener("click", () => {
    openPopUp(modal);
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
});

closeButton.addEventListener("click", () => {
    closePopup(modal);
});

closePopupBtn.addEventListener("click", () => {
    closePopup(modalPopup);
});

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = `${inputName.value}`;
    profileJob.textContent = `${inputJob.value}`;
    closePopup(modal);
}
formElement.addEventListener("submit", handleFormSubmit);
addCardbtn.addEventListener("click", () => {
    openPopUp(modalAddelement);
});

closeAddBtn.addEventListener("click", () => {
    closePopup(modalAddelement);
});
submitAddCard.addEventListener("click", function (e) {
    e.preventDefault();
    const link = url.value;
    const name = title.value;
    const cardInstance = new Card({ link, name }, templateElement);
    elementsBlock.prepend(cardInstance.generateCard({ name, link }));
    closePopup(modalAddelement);
    title.value = "";
    url.value = "";
});
