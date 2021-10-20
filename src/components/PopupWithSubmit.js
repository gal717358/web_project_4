import { Popup } from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  setAction(action) {
    // this._submitHandler = action;
  }

  open(func){
    super.open();
    this._popupElement.addEventListener("click", func);
  }
  setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      evt.preventDefault();
      // this._submitHandler();
    });
    super.setEventListeners();
  }
}
