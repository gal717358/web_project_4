import { Popup } from "./Popup.js";

export default class PopupWithImage extends Popup {

    open = (evt) => {

        super.open();
        const cardImage = evt.target;

        this._popupElement.querySelector(".modal__img").src = cardImage.src;

        this._popupElement.querySelector(".modal__title").textContent = cardImage.alt;
    };
}
