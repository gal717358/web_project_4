export class Card {
  constructor({
    data,
    cardSelector,
    handleCardClick,
    handleDeleteCard,
    userId,
    handleLikeIcon,
  }) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeIcon = handleLikeIcon;
    this._userId = userId;
    this._ownerId = data.owner._id;
  }

  _getTemplate() {
    const templateElement = document
      .querySelector("#element-template")
      .content.querySelector(".element")
      .cloneNode(true);

    return templateElement;
  }
  getId() {
    return this._id;
  }
  removeCard() {
    this._element.remove();
    this._element = null;
  }

  likeCard(newLikes) {
    if (newLikes) {
      this._likes = newLikes;
      if (this._likes.some((person) => person._id === this._userId)) {
        this._element
          .querySelector(".element__like-btn")
          .classList.add("element__like-btn_active");
      } else {
        this._element
          .querySelector(".element__like-btn")
          .classList.remove("element__like-btn_active");
      }
      
      this._element.querySelector(".element__likes-count").textContent =
        this._likes.length;
    }
  }

  unLikeCard() {
    this._element
      .querySelector(".element__like-btn")
      .classList.remove("element__like-btn_active");
  }

  isLiked() {
    return this._likes.some((person) => person._id === this._userId);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const elementImage = this._element.querySelector(".element__image");
    elementImage.src = this._link;
    elementImage.alt = `Photo of ${this._name}`;
    this._element.querySelector(".element__title").textContent = this._name;

    if (this._ownerId !== this._userId) {
      this._element.querySelector(".element__delete").style.display = "none";
    }

    this.likeCard(this._likes);

    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => this._handleDeleteCard(this._id));

    this._element
      .querySelector(".element__image")
      .addEventListener("click", this._handleCardClick);

    this._element
      .querySelector(".element__like-btn")
      .addEventListener("click", () => this._handleLikeIcon());
  }
}
