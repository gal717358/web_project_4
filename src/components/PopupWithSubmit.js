import { Popup } from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  open(func) {
    super.open();
    this._popupElement.addEventListener("click", func);
  }
  setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      evt.preventDefault();
    });
    super.setEventListeners();
  }
}
