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

  setValidator(validatorInstance) {
    this._formValidator = validatorInstance;
  }

  resetForm() {
    console.log("Resetting form...");
    this.form.reset();
    if (this._formValidator) {
      this._formValidator.resetValidation();
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
}
