import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
    constructor(popupSelector, submitHandler){
        super(popupSelector)
        this._submitHandler = submitHandler
        this._form = this._popupElement.querySelector(".form")

    }
    getInputValues() {
        const inputs = [...this._form.querySelectorAll(".form__text-input")]
        const inputValues = {}

        inputs.forEach(input => {
            inputValues[input.name] = input.value
        })

        return inputValues;
    }
    setInputValues(userInfo) {
        const inputs = [...this._form.querySelectorAll(".form__text-input")];

        inputs.forEach((input) => {
            input.value = userInfo[input.name];
        })

    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt)=>{
            evt.preventDefault();
            this._submitHandler();
        });
      }
      
    close(){
        super.close()
        this._form.reset()
    }
}