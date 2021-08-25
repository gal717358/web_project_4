
let modal = document.querySelector(".modal");
let modalClose = document.querySelector(".modal_closed");
let modalContainer = document.querySelector(".modal__container");
let profileEditBtn = document.querySelector(".profile__edit-btn");
let closeButton = document.querySelector(".modal__close-btn");
let formElement = document.querySelector(".form");
let profileName = document.querySelector(".profile__title");
let profileJob = document.querySelector(".profile__job");
let inputName = document.querySelector(".form__text-input_type_name");
let inputJob = document.querySelector(".form__text-input_type_job");
let submitBtn = document.querySelector(".form__submit-btn");
let addCardbtn = document.querySelector(".profile__add-btn");
let modalAddelement = document.querySelector(".modal_type_add-element");
let closeAddBtn = modalAddelement.querySelector(".modal__close-btn");
let submitAddCard = modalAddelement.querySelector(".form__submit-btn");

const elementsBlock = document.querySelector(".elements");
const elementContainer = document.querySelector(".element");
const deleteElement = document.querySelector(".element__delete");
const elementDescription = document.querySelector(".element__description");
const elementTitle = document.querySelector(".element__title");
const elementLikebtn = document.querySelector(".element__like-btn");
const elementLikeActive = document.querySelector(".element__like-btn_active");

const modalPopup = document.querySelector(".modal_type_pop-up");
const elementImage = document.querySelector(".element__image_btn");
const closePopupBtn = document.querySelector(".modal__close-btn");
const modalpopupContainer = document.querySelector(".modal__container");

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

closePopupBtn.addEventListener("click", () => {
    modalpopupContainer.classList.add("modal_closed");
});

function profileEditor() {
    if (modal.classList.toggle("modal_closed")) {
    } else {
        inputName.value = profileName.textContent;
        inputJob.value = profileJob.textContent;
    }
}

profileEditBtn.addEventListener("click", profileEditor);
closeButton.addEventListener("click", profileEditor);

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = `${inputName.value}`;
    profileJob.textContent = `${inputJob.value}`;
    modal.classList.add("modal_closed");
}

formElement.addEventListener("submit", handleFormSubmit);

function addCardBtn() {
    if (modalAddelement.classList.toggle("modal_closed")) {
    }
}
addCardbtn.addEventListener("click", addCardBtn);
closeAddBtn.addEventListener("click", addCardBtn);

const removeEl = (evt) => {
    evt.target.closest(".element").remove();
};

const LikeElement = (evt) => {
    evt.target.classList.toggle("element__like-btn_active");
};

function addElement(url, title) {
    const elementTemplate = document.querySelector("#element-template").content;
    const element = elementTemplate.querySelector(".element").cloneNode(true);
    element.querySelector(".element__image").src = url;
    element.querySelector(".element__image").alt = title;
    element.querySelector(".element__title").textContent = title;
    elementsBlock.prepend(element);
    document.querySelector(".element__delete").addEventListener("click", removeEl);
    document.querySelector(".element__like-btn").addEventListener("click", LikeElement);
    
}

submitAddCard.addEventListener("click", function (e) {
    e.preventDefault();

    const url = document.querySelector(".form__text-input_type_img-element");
    const title = document.querySelector(".form__text-input_type_name-element");
    addElement(url.value, title.value);
    modalAddelement.classList.add("modal_closed");
});

initialElements.forEach((el) => {
    elementsBlock.append(addElement(el.link, el.name));
});


