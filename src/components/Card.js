export class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    const elementImage = this._element.querySelector(".element__image");
    elementImage.src = this._link;
    elementImage.alt = `Photo of ${this._name}`;
    this._element.querySelector(".element__title").textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    const elementLikeBtn = this._element.querySelector(".element__like-btn");
    const elementDeleteBtn = this._element.querySelector(".element__delete");
    elementLikeBtn.addEventListener("click", () => {
      elementLikeBtn.classList.toggle("element__like-btn_active");
    });
    elementDeleteBtn.addEventListener("click", () => {
      this._element.remove(null);
    });
    this._element
      .querySelector(".element__image")
      .addEventListener("click", this._handleCardClick);
  }
}
