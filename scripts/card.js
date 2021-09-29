import { largeImage, popupTitle, modalPopup, openPopUp} from "./index.js";

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const templateElement = document
      .querySelector("#element-template")
      .content.querySelector(".element")
      .cloneNode(true);

    return templateElement;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(
      ".element__image"
    ).alt = `Photo of ${this._name}`;
    this._element.querySelector(".element__title").textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    const elementLikeBtn = this._element.querySelector(".element__like-btn");
    const elementDeleteBtn = this._element.querySelector(".element__delete");
    const elementImage = this._element.querySelector(".element__image");

    elementLikeBtn.addEventListener("click", () => {
      elementLikeBtn.classList.toggle("element__like-btn_active");
    });
    elementDeleteBtn.addEventListener("click", () => {
      this._element.remove();
    });
    elementImage.addEventListener("click", () => {
      openPopUp(modalPopup);
      popupTitle.textContent = this._name;
      popupTitle.setAttribute("alt", `Photo of ${this._name}`);
      largeImage.setAttribute("src", this._link);
    });
  }
}

export { Card};
