class FormValidator{
    constructor(settings, formElement){
        this.settings = settings;
        this.formElement = formElement;
    }
    _showError = (input, errorMessage) => {
        const {inputErrorClass, errorClass} = this.settings

        const errorElement = this.formElement.querySelector(`#${input.id}-error`);
        input.classList.add(inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(errorClass);     
    };

    _hideError = (input) => {
        const {inputErrorClass, errorClass} = this.settings

        const errorElement = this.formElement.querySelector(`#${input.id}-error`);
        errorElement.textContent = "";
        errorElement.classList.remove(errorClass);
        input.classList.remove(inputErrorClass);
    };

    _checkValidity = (input) => {
        if (input.validity.valid) {
            this._hideError(input, input.validationMessage);
        } else {
            this._showError(input);
        }
    };

    _setEventListiners = () => {
        const {inputSelector} = this.settings
        this.inputs = Array.from(this.formElement.querySelectorAll(inputSelector));
           
        this.inputs.forEach((input) => {
            input.addEventListener("input", () => {
                    this._checkValidity(input);
                    this._toogleButtonState();
                });
            });   
    };
    _ifFormValid = () => this.inputs.every(input => input.validity.valid)

    _toogleButtonState = () => {
        const {inactiveButtonClass} = this.settings
        const buttonElememnt = this.formElement.querySelector(submitButtonSelector);

        if (this._ifFormValid) {
            buttonElememnt.disabled = false;
            buttonElememnt.classList.remove(inactiveButtonClass);
        } else {
            buttonElememnt.disabled = "disabled";
            buttonElememnt.classList.add(inactiveButtonClass);
        }
    };

    restValidation(){
        this.inputs.forEach(input => {
            this._hideError(input)
        })

    }
    enableValidation() { 
    this._setEventListiners();s
    }
}
    export default FormValidator

    const settings = {
        formSelector: ".form",
        inputSelector: ".form__text-input",
        submitButtonSelector: ".form__submit-btn",
        inactiveButtonClass: "form__submit-btn_disabled",
        inputErrorClass: "form__text-input_theme_error",
        errorClass: "form__input-error",
    }
    
    const editForm =  document.querySelector(".modal_type_profile")
    const addCardForm = document.querySelector(".modal_type_add-element")
    
    const editFormValidator = new FormValidator (settings, editForm)
    const addCardFormValidator = new FormValidator (settings, addCardForm)