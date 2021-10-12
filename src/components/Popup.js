export class Popup {
    constructor(popupSelector) {
      this._popupElement = document.querySelector(popupSelector);
    }
  
    _handleEscClose = (e) => {
      if (e.key === "Escape") {
        this.close();
      }
    };
  
    open() {
      this._popupElement.classList.remove("modal_closed");
      document.addEventListener("keyup", this._handleEscClose);
    }
  
    close = () => {
      this._popupElement.classList.add("modal_closed");
      document.removeEventListener("keyup", this._handleEscClose);
    }
  
    setEventListeners() {
      this._popupElement
        .querySelector(".modal__close-btn")
        .addEventListener("click", this.close());
      this._popupElement.addEventListener("click", (evt) => {
        if (evt.target.classList.contains("modal")) {
          this.close();
        }
      });
    }
  }
  