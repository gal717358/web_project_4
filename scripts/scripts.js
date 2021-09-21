
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

class Card{
    constructor(data, cardSelector,image){
        this._name= data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const templateElement = document.querySelector("#element-template").content     
        .querySelector(".element")
        .cloneNode(true);

        return templateElement;
      }
      generateCard() {
        this._element = this._getTemplate();
        this._setEventListieners();
        
        this._element.querySelector(".element__image").src = this._link;
        this._element.querySelector(".element__image").setAttribute = `alt(${this._link})`;
        this._element.querySelector(".element__title").textContent = this._name;


        return this._element;
         }    

        _setEventListieners(){
            const elementLikebtn = this._element.querySelector(".element__like-btn");
            const elementDeletebtn = this._element.querySelector(".element__delete");
            const elementImage = this._element.querySelector(".element__image");
            elementLikebtn.addEventListener("click", () => {
                elementLikebtn.classList.toggle("element__like-btn_active");
            });
            elementDeletebtn.addEventListener("click", () => {
                this._element.remove();
            });
            elementImage.addEventListener("click", () => {
                openPopUp(modalPopup);
                popupTitle.textContent = this._name;
                popupTitle.setAttribute("alt",  `alt(${this._link})`);
                largeImage.setAttribute("src", this._link);
            });
        }           
}

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
