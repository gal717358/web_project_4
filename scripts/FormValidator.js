class FormValidator {
    constructor(settings, formElement) {
        this.settings = settings;
        this.formElement = formElement;
    }
    _showError = (input, errorMessage) => {
        const { inputErrorClass, errorClass } = this.settings;
        const errorElement = this.formElement.querySelector(`#${input.id}-error`);
        input.classList.add(inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(errorClass);
    };

    _hideError = (input) => {
        const { inputErrorClass, errorClass } = this.settings;

        const errorElement = this.formElement.querySelector(`#${input.id}-error`);
        errorElement.textContent = "";
        errorElement.classList.remove(errorClass);
        input.classList.remove(inputErrorClass);
    };

    _checkValidity = (input) => {
        if (input.validity.valid) {
            this._hideError(input);
        } else {
            this._showError(input, input.validationMessage);
        }
        return this.formElement;
    };

    _setEventListeners = () => {
        const { inputSelector } = this.settings;
        this.inputs = Array.from(this.formElement.querySelectorAll(inputSelector));

        this.inputs.forEach((input) => {
            input.addEventListener("input", () => {
                this._checkValidity(input);
                this._toggleButtonState();
            });
        });
        return this.formElement;
    };
    _ifFormValid = () => this.inputs.every((input) => input.validity.valid);

    _toggleButtonState = () => {
        const { inactiveButtonClass, submitButtonSelector } = this.settings;
        const buttonElement = this.formElement.querySelector(submitButtonSelector);

        if (this._ifFormValid()) {
            buttonElement.disabled = false;
            buttonElement.classList.remove(inactiveButtonClass);
        } else {
            buttonElement.disabled = "disabled";
            buttonElement.classList.add(inactiveButtonClass);
        }
    };

    resetValidation() {
        this.inputs.forEach((input) => {
            this._hideError(input);
        });
    }
    enableValidation() {
        this._setEventListeners();
    }
}
export default FormValidator;
