// class Popup {
//   constructor(popupSelector) {
//     this._popup = document.querySelector(popupSelector);
//     this._handleEscClose = this._handleEscClose.bind(this);
//   }

//   open() {
//     this._popup.classList.add("modal_opened");
//     document.addEventListener("keydown", this._handleEscClose);
//   }

//   close() {
//     this._popup.classList.remove("modal_opened");
//     document.removeEventListener("keydown", this._handleEscClose);
//   }

//   _handleEscClose(event) {
//     if (event.key === "Escape") {
//       this.close();
//     }
//   }

//   setEventListeners() {
//     this._popup.addEventListener("mousedown", (event) => {
//       if (
//         event.target.classList.contains("modal_opened") ||
//         event.target.classList.contains("modal__close")
//       ) {
//         this.close();
//       }
//     });
//   }
// }

// export default Popup;
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {}
}

//  function handleEscapeKey(e) {
//   if (e.key === "Escape") {
//     const openModal = document.querySelector(".modal_opened");
//     if (openModal) {
//       closePopUp(openModal);
//     }
//   }
// }

// function handleOverlayClick(e) {
//   if (e.target.classList.contains("modal_opened")) {
//     closePopUp(e.target);
//   }
// }

// function closePopUp(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("mousedown", handleOverlayClick);
//   document.removeEventListener("keydown", handleEscapeKey);
// }

// function openPopUp(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("mousedown", handleOverlayClick);
//   document.addEventListener("keydown", handleEscapeKey);
// }
