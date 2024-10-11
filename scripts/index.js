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
const cardTitleInput = addCardForm.querySelector("#card-title-input");
const cardUrlInput = addCardForm.querySelector("#card-url-input");

const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageModalCloseButton = previewImageModal.querySelector(
  "#image-modal-close-button"
);
const modalImage = previewImageModal.querySelector("#modal-image");
const modalCaption = previewImageModal.querySelector("#modal-caption");
const modals = document.querySelectorAll(".modal");
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

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const trashButton = cardElement.querySelector(".card__trash-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  trashButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    modalImage.src = cardData.link;
    modalImage.alt = cardData.name;
    modalCaption.textContent = cardData.name;
    openPopUp(previewImageModal);
  });

  cardImageEl.setAttribute("src", cardData.link);
  cardImageEl.setAttribute("alt", cardData.name);
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
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
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closePopUp(profileAddEditModal);
  addCardForm.reset();
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

// initialCards.forEach((cardData) => {
//   const cardElement = getCardElement(cardData);
//   cardListEl.append(cardElement);
// });

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
