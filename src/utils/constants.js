export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// CSS Selectors
export const cardSelector = "#card-template";
export const profileEditButtonSelector = "#profile-edit-button";
export const profileEditModalSelector = "#profile-edit-modal";
export const profileTitleSelector = ".profile__title";
export const profileDescriptionSelector = ".profile__description";
export const profileTitleInputSelector = "#profile-title-input";
export const profileDescriptionInputSelector = "#profile-description-input";
export const profileEditFormSelector = "#modal-form";
export const cardListSelector = ".gallery__cards";
export const profileAddEditButtonSelector = "#profile-add-button";
export const profileAddEditModalSelector = "#add-card-modal";
export const addCardFormSelector = "#add-card-form";
export const addCardSubmitButtonSelector = "#add-card-submit-button";
export const cardTitleInputSelector = "#card-title-input";
export const cardUrlInputSelector = "#card-url-input";
export const previewImageModalSelector = "#preview-image-modal";
export const modalImageSelector = "#modal-image";
export const modalCaptionSelector = "#modal-caption";

// Validation Settings
export const validationSettings = {
  inputSelector: ".form__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "modal__error_visible",
};
