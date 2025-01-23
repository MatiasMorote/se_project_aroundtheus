import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
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
/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditModalCloseButton = profileEditModal.querySelector(
  "#profile-edit-modal-close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector("#modal-form");
const cardListEl = document.querySelector(".gallery__cards");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const profileAddEditButton = document.querySelector("#profile-add-button");
const profileAddEditModal = document.querySelector("#add-card-modal");
const profileAddEditModalCloseButton = profileAddEditModal.querySelector(
  "#add-card-modal-close-button"
);
const addCardForm = profileAddEditModal.querySelector("#add-card-form");
const addCardSubmitButton = document.querySelector("#add-card-submit-button");
const cardTitleInput = addCardForm.querySelector("#card-title-input");
const cardUrlInput = addCardForm.querySelector("#card-url-input");

const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageModalCloseButton = previewImageModal.querySelector(
  "#image-modal-close-button"
);
const modalImage = previewImageModal.querySelector("#modal-image");
const modalCaption = previewImageModal.querySelector("#modal-caption");
const modals = document.querySelectorAll(".modal");

const cardSelector = "#card-template";

function handleImagePreview({ name, link }) {
  console.log("preview data", { name, link });
  modalImage.src = link;
  modalImage.alt = name;
  modalCaption.textContent = name;
  openPopUp(previewImageModal);
}

function renderCard(cardData) {
  const card = new Card(cardData, cardSelector, handleImagePreview);
  const cardElement = card.getView();
  console.log("rendering card", { cardData, cardElement });
  cardListEl.prepend(cardElement);
}

function toggleSubmitButtonState() {
  if (cardTitleInput.value !== "" && cardUrlInput.value !== "") {
    addCardSubmitButton.disabled = false;
    addCardSubmitButton.classList.remove("modal__button_disabled");
  } else {
    addCardSubmitButton.disabled = true;
    addCardSubmitButton.classList.add("modal__button_disabled");
  }
}

cardTitleInput.addEventListener("input", toggleSubmitButtonState);
cardUrlInput.addEventListener("input", toggleSubmitButtonState);

addCardForm.addEventListener("submit", (e) => {
  e.preventDefault();

  closePopUp(profileAddEditModal);
  toggleSubmitButtonState();
});

/* -------------------------------------------------------------------------- */
/*                                 validation                                 */
/* -------------------------------------------------------------------------- */
const validationSettings = {
  inputSelector: ".form__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormElement = profileEditModal.querySelector(".modal__form");
const addFormElement = profileAddEditModal.querySelector(".modal__form");

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

  console.log("Card title input element:", cardTitleInput);
  console.log("Card URL input element:", cardUrlInput);
  console.log("Card title input value:", cardTitleInput.value);
  console.log("Card URL input value:", cardUrlInput.value);

  const name = cardTitleInput.value;
  const link = cardUrlInput.value;

  if (name && link) {
    renderCard({ name, link });

    closePopUp(profileAddEditModal);
    addCardForm.reset();
    toggleSubmitButtonState();
  } else {
    console.error("Card title and image URL are required.");
  }
}
/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopUp(profileEditModal);
});
profileEditModalCloseButton.addEventListener("click", () =>
  closePopUp(profileEditModal)
);

profileAddEditButton.addEventListener("click", () =>
  openPopUp(profileAddEditModal)
);
profileAddEditModalCloseButton.addEventListener("click", () =>
  closePopUp(profileAddEditModal)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

previewImageModalCloseButton.addEventListener("click", () =>
  closePopUp(previewImageModal)
);

cardTitleInput.addEventListener("input", () => {
  console.log("Updated card Title value", cardTitleInput.value);
});

cardUrlInput.addEventListener("input", () => {
  console.log("Updated card URL value", cardUrlInput.value);
});
// initialCards.forEach((cardData) => {
//   const cardElement = getCardElement(cardData);
//   cardListEl.append(cardElement);
// });

//initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
initialCards.forEach(renderCard);
