// import Popup from "./Popup.js";

// class PopupWithForm extends Popup {
//   constructor(popupSelector, handleFormSubmit) {
//     super(popupSelector);
//     this._handleFormSubmit = handleFormSubmit;
//     this._form = this._popup.querySelector(".modal__form");
//     this._inputList = this._form.querySelectorAll(".form__input");
//   }

//   _getInputValues() {
//     const inputValues = {};
//     this._inputList.forEach((input) => {
//       inputValues[input.name] = input.value;
//     });
//     return inputValues;
//   }

//   setEventListeners() {
//     super.setEventListeners();
//     this._form.addEventListener("submit", (event) => {
//       event.preventDefault();
//       this._handleFormSubmit(this._getInputValues());
//       this.close();
//     });
//   }

//   close() {
//     super.close();
//     this._form.reset();
//   }
// }

// export default PopupWithForm;
