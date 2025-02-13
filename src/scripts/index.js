import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import {
  initialCards,
  cardSelector,
  validationSettings,
} from "../utils/constants.js";
import Section from "../components/Section.js";

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, cardSelector, handleImagePreview);
      return card.getView();
    },
  },
  ".gallery__cards"
);

cardSection.renderItems();
/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector("#modal-form");
const cardListEl = document.querySelector(".gallery__cards");
const profileAddEditButton = document.querySelector("#profile-add-button");
const profileAddEditModal = document.querySelector("#add-card-modal");
const addCardForm = profileAddEditModal.querySelector("#add-card-form");
const cardTitleInput = addCardForm.querySelector("#card-title-input");
const cardUrlInput = addCardForm.querySelector("#card-url-input");

const previewImageModal = document.querySelector("#preview-image-modal");
const modalImage = previewImageModal.querySelector("#modal-image");
const modalCaption = previewImageModal.querySelector("#modal-caption");

function handleImagePreview({ name, link }) {
  console.log("preview data", { name, link });
  modalImage.src = link;
  modalImage.alt = name;
  modalCaption.textContent = name;
  openPopUp(previewImageModal);
}

//added after code review 1/24/25
// encapsulates logic of creating new card, can be used to append a new card.
function createCard(cardData) {
  const card = new Card(cardData, cardSelector, handleImagePreview);
  return card.getView();
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
}

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
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
function handleEscapeKey(e) {
  if (e.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    if (openModal) {
      closePopUp(openModal);
    }
  }
}

function handleOverlayClick(e) {
  if (e.target.classList.contains("modal_opened")) {
    closePopUp(e.target);
  }
}

function closePopUp(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("mousedown", handleOverlayClick);
  document.removeEventListener("keydown", handleEscapeKey);
}

function openPopUp(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("mousedown", handleOverlayClick);
  document.addEventListener("keydown", handleEscapeKey);
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp(profileEditModal);
}
function handleAddCardSubmit(e) {
  e.preventDefault();

  // const cardTitleInput = document.querySelector("#card-title-input");
  // const cardUrlInput = document.querySelector("#card-url-input");

  const name = cardTitleInput.value;
  const link = cardUrlInput.value;

  if (name && link) {
    renderCard({ name, link });

    closePopUp(profileAddEditModal);
    addCardForm.reset();
    //code review fix 1/24/25
    addFormValidator.disableButton();
  } else {
    console.error("Card title and image URL are required.");
  }
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
  openPopUp(profileEditModal);
});

profileAddEditButton.addEventListener("click", () =>
  openPopUp(profileAddEditModal)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);
