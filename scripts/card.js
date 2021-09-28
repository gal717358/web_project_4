import {largeImage,popupTitle,modalPopup,openPopUp} from "./scripts.js";
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

class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const templateElement = document.querySelector("#element-template")
        .content.querySelector(".element").cloneNode(true);

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

    _setEventListieners() {
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
            popupTitle.setAttribute("alt", `alt(${this._link})`);
            largeImage.setAttribute("src", this._link);
        });
    }
}
initialElements.forEach((ele) => {
	const card = new Card(ele);
	const templateElement = card.generateCard();

 document.querySelector(".elements").prepend(templateElement);
});
export { Card, initialElements };
