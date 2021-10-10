import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup{
    open(name,link){
        const imageElement = this._popupElement.querySelector(".modal__img")
        const caption = this._popupElement.querySelector(".modal__title")

        imageElement.src = link
        caption.textContent = name

        super.open()
    }
}
