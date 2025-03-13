import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import {
  initialCards,
  cardSelector,
  validationSettings,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const previewImagePopup = new PopupWithImage("#preview-image-modal");
previewImagePopup.setEventListeners();

function handleImagePreview({ name, link }) {
  previewImagePopup.open({ name, link });
}

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  (formData) => {
    userInfo.setUserInfo({
      name: formData["profile__title"],
      job: formData["profile__description"],
    });

    // console.log("User data to set", userData);

    profileEditPopup.close();
  }
);

// const addCardPopup = new PopupWithForm("#add-card-modal", (formData) => {
//   // const newCard = new Card(
//   //   { name: formData.title, link: formData.url },
//   //   cardSelector,
//   //   handleImagePreview
//   // );
//   // cardSection.addItem(newCard.getView());
//   // addCardPopup.close();
// });

const addCardPopup = new PopupWithForm("#add-card-modal", (formData) => {
  const cardData = {
    name: formData.title,
    link: formData.url,
  };
  const newCardElement = createCard(cardData);
  cardSection.addItem(newCardElement);
  addCardPopup.close();
});

function createCard(data) {
  const newCard = new Card(data, cardSelector, handleImagePreview);
  return newCard.getView();
}

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditPopup.form;
const cardListEl = document.querySelector(".gallery__cards");
const profileAddEditButton = document.querySelector("#profile-add-button");
const addCardForm = addCardPopup.form;
// const cardTitleInput = addCardForm.querySelector("#card-title-input");
// const cardUrlInput = addCardForm.querySelector("#card-url-input");

// const modalImage = previewImagePopup._popup.querySelector("#modal-image");
// const modalCaption = previewImagePopup._popup.querySelector("#modal-caption");

/* -------------------------------------------------------------------------- */
/*                                 validation                                 */
/* -------------------------------------------------------------------------- */

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// const editFormElement = profileEditForm;
// const addFormElement = addCardForm;

// const editFormValidator = new FormValidator(
//   validationSettings,
//   editFormElement
// );

// const addFormValidator = new FormValidator(validationSettings, addFormElement);
// editFormValidator.enableValidation();
// addFormValidator.enableValidation();

// card section
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".gallery__cards"
);

cardSection.renderItems();

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.job;
  editFormValidator.resetValidation();
  profileEditPopup.open();
});

profileAddEditButton.addEventListener("click", () => {
  addCardPopup.open();
});

// profileEditForm.addEventListener("submit", handleProfileEditSubmit);
profileEditPopup.setEventListeners();
addCardPopup.setEventListeners();
