function showError(input, settings) {
    const error = input.validationMessage;
    const errorElement = document.querySelector(`#${input.id}-error`);
    errorElement.textContent = error;
    input.classList.add(settings.inputErrorClass);
}
function hideError(input, settings) {
    const errorElement = document.querySelector(`#${input.id}-error`);
    errorElement.textContent = "";
    input.classList.remove(settings.inputErrorClass);
}

function checkValidity(input, settings) {
    if (input.validity.valid) {
        hideError(input, settings);
    } else {
        showError(input, settings);
    }
}

function toogleButtonState(inputs, button, settings) {
    const ifFormValid = inputs.every((input) => input.validity.valid);
    if (ifFormValid) {
        button.disabled = false;
        button.classList.remove(settings.inactiveButtonClass);
    } else {
        button.disabled = "disabled";
        button.classList.add(settings.inactiveButtonClass);
    }
}
function enableValidation(settings) {
    const forms = [...document.querySelectorAll(settings.formSelector)];

    forms.forEach((form) => {
        form.addEventListener("submit", (e) => e.preventDefault());

        const inputs = [...form.querySelectorAll(settings.inputSelector)];
        const button = form.querySelector(settings.submitButtonSelector);

        inputs.forEach((input) => {
            input.addEventListener("input", () => {
                checkValidity(input, settings);

                toogleButtonState(inputs, button, settings);
            });
        });
    });
}

const config = {
    formSelector: ".form",
    inputSelector: ".form__text-input",
    submitButtonSelector: ".form__submit-btn",
    inactiveButtonClass: "form__submit-btn_disabled",
    inputErrorClass: "form__text-input_theme_error",
    errorClass: "popup__error_visible",
};

enableValidation(config);
