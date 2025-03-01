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
const currentUserInfo = userInfo.getUserInfo();
console.log(currentUserInfo);

userInfo.setUserInfo("New Name", "New Job");

const previewImagePopup = new PopupWithImage("#preview-image-modal");
previewImagePopup.setEventListeners();

function handleImagePreview({ name, link }) {
  previewImagePopup.open({ name, link });
}

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  (formData) => {
    console.log("Profile Edit Form Submitted:", formData);
    profileTitle.textContent = formData["profile-title"];
    profileDescription.textContent = formData["profile-description"];
  }
);

const addCardPopup = new PopupWithForm("#add-card-modal", (formData) => {
  const { title, url } = formData;
  if (!title || !url) {
    console.error("🚨 Card title and image URL are required.");
    return;
  }

  const newCard = new Card(
    { name: title, link: url },
    cardSelector,
    handleImagePreview
  );
  cardSection.addItem(newCard.getView());

  addCardPopup.close();
});
addCardPopup.setEventListeners(); // Only call once

profileEditPopup.setEventListeners();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, cardSelector, handleImagePreview);
      const cardElement = card.getView();
      cardSection.addItem(cardElement); // Append to DOM
    },
  },
  ".gallery__cards"
);

cardSection.renderItems(); //Render all initial cards properly

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
const profileEditForm = profileEditPopup._form;
const cardListEl = document.querySelector(".gallery__cards");
const profileAddEditButton = document.querySelector("#profile-add-button");
const addCardForm = addCardPopup._form;
const cardTitleInput = addCardForm.querySelector("#card-title-input");
const cardUrlInput = addCardForm.querySelector("#card-url-input");

const modalImage = previewImagePopup._popup.querySelector("#modal-image");
const modalCaption = previewImagePopup._popup.querySelector("#modal-caption");

/* -------------------------------------------------------------------------- */
/*                                 validation                                 */
/* -------------------------------------------------------------------------- */

const editFormElement = profileEditForm;
const addFormElement = addCardForm;

const editFormValidator = new FormValidator(
  validationSettings,
  editFormElement
);

const addFormValidator = new FormValidator(validationSettings, addFormElement);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  profileEditPopup.close();
}

// added feature after code review 1/24/25 - "Could be Improved" not "Needs Correcting"
const closeButtons = document.querySelectorAll(".modal__close");

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopUp(popup));
});
/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditPopup.open();
});

profileAddEditButton.addEventListener("click", () => addCardPopup.open());

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
