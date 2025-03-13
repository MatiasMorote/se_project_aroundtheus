import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this.form = this._popup.querySelector(".modal__form");
    this._inputList = this.form.querySelectorAll(".form__input");
    this._submitButton = this.form.querySelector(".modal__button");
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      if (this._validator) {
        this._validator.disableButton();
      }
      this.close();
    });
  }

  setValidator(validatorInstance) {
    this.formValidator = validatorInstance;
  }

  open() {
    super.open();

    if (this._submitButton) {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove("modal__button_disabled");
    }
  }

  close() {
    super.close();
  }
}
