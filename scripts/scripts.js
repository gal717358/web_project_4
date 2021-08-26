const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal_closed");
const modalContainer = document.querySelector(".modal__container");
const profileEditBtn = document.querySelector(".profile__edit-btn");
const closeButton = document.querySelector(".modal__close-btn");
const formElement = document.querySelector(".form");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__job");
const inputName = document.querySelector(".form__text-input_type_name");
const inputJob = document.querySelector(".form__text-input_type_job");
const submitBtn = document.querySelector(".form__submit-btn");

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
const closePopupBtn = document.querySelector(".modal__close_type_popup");
const modalpopupContainer = document.querySelector("modal__container_type_popup");
const largeImage = document.querySelector(".modal__pop-up_img");
const popupTitle = document.querySelector(".modal__pop-up_title");

const elementLikeActive = document.querySelector(".element__like-btn_active");
const url = document.querySelector(".form__text-input_type_img-element");
const title = document.querySelector(".form__text-input_type_name-element");

const initialElements = [
    {
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg",
    },
    {
        name: "Vanoise National Park",
        link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg",
    },
];

function addElement(el) {
    const element = templateElement.cloneNode(true);
    const elementTitle = element.querySelector(".element__title");
    const elementImage = element.querySelector(".element__image");
    const elementLikebtn = element.querySelector(".element__like-btn");
    const elementDeletebtn = element.querySelector(".element__delete");

    elementTitle.textContent = el.name;
    elementImage.setAttribute("src", el.link);
    elementImage.setAttribute("alt", el.name);

    elementLikebtn.addEventListener("click", () => {
        elementLikebtn.classList.toggle("element__like-btn_active");
    });
    elementDeletebtn.addEventListener("click", () => {
        element.remove();
    });
    elementImage.addEventListener("click", () => {
        modalPopup.classList.remove("modal_closed");
        popupTitle.textContent = el.name;
        popupTitle.setAttribute("alt", el.name);
        largeImage.setAttribute("src", el.link);
    });

    elementsBlock.prepend(element);
}

initialElements.forEach(addElement);

submitAddCard.addEventListener("click", function (e) {
    e.preventDefault();
    addElement({ name: title.value, link: url.value });
    modalAddelement.classList.add("modal_closed");
});

profileEditBtn.addEventListener("click", () => {
    modal.classList.remove("modal_closed");
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
});
closeButton.addEventListener("click", () => {
    modal.classList.add("modal_closed");
});
closePopupBtn.addEventListener("click", () => {
    modalPopup.classList.add("modal_closed");
});

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = `${inputName.value}`;
    profileJob.textContent = `${inputJob.value}`;
    modal.classList.add("modal_closed");
}
formElement.addEventListener("submit", handleFormSubmit);

addCardbtn.addEventListener("click", () => {
    modalAddelement.classList.remove("modal_closed");
});
closeAddBtn.addEventListener("click", () => {
    modalAddelement.classList.add("modal_closed");
});
