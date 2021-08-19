let modal = document.querySelector(".modal");
let modalClose = document.querySelector(".modal_closed");
let modalContainer = document.querySelector(".modal__container");
let profileEditBtn = document.querySelector(".profile__edit-btn");
let closeButton = document.querySelector(".modal__close-btn");
let formElement = document.querySelector(".form");
let profileName = document.querySelector(".profile__title");
let profileJob = document.querySelector(".profile__job");
let inputName = document.querySelector(".form__text-input_type_name");
let inputJob = document.querySelector(".form__text-input_type_job");
let submitBtn = document.querySelector(".form__submit-btn");

function profileEditor() {
    if (modal.classList.toggle("modal_closed")){}
    else {inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;}   
}

profileEditBtn.addEventListener("click", profileEditor);
closeButton.addEventListener("click", profileEditor);

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = `${inputName.value}`;
    profileJob.textContent = `${inputJob.value}`;
    modal.classList.add("modal_closed");
}

formElement.addEventListener("submit", handleFormSubmit);
