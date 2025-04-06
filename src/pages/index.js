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
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "7a692b53-7b17-4dd3-8aff-9a8ed2b48c88",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

let currentUserId;
let cardSection;

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
    });
    userInfo.setUserAvatar(userData.avatar);
    currentUserId = userData._id;

    return api.getInitialCards();
  })
  .then((cards) => {
    cardSection = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          const cardElement = createCard(cardData);
          cardSection.addItem(cardElement);
        },
      },
      ".gallery__cards"
    );

    cardSection.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

const previewImagePopup = new PopupWithImage("#preview-image-modal");
previewImagePopup.setEventListeners();

function handleImagePreview({ name, link }) {
  previewImagePopup.open({ name, link });
}

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  (formData) => {
    profileEditPopup.renderLoading(true);
    api
      .updateUserInfo({
        name: formData["profile__title"],
        about: formData["profile__description"],
      })
      .then((updatedData) => {
        userInfo.setUserInfo({
          name: updatedData.name,
          job: updatedData.about,
        });
        profileEditPopup.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        profileEditPopup.renderLoading(false);
      });

    // console.log("User data to set", userData);
  }
);

const addCardPopup = new PopupWithForm("#add-card-modal", (formData) => {
  console.log("formdata submitted", formData);
  addCardPopup.renderLoading(true);
  api
    .addCard({
      name: formData.title,
      link: formData.url,
    })
    .then((addedCard) => {
      const cardElement = createCard(addedCard);
      cardSection.addItem(cardElement);
      addCardPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      addCardPopup.renderLoading(false);
    });
});

const editAvatarPopup = new PopupWithForm("#avatar-edit-modal", (formData) => {
  console.log("avatar url", formData.url);
  editAvatarPopup.renderLoading(true);
  api
    .updateAvatar({
      url: formData.url,
    })
    .then((updatedData) => {
      userInfo.setUserAvatar(updatedData.avatar);
      editAvatarPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editAvatarPopup.renderLoading(false);
    });
});

editAvatarPopup.setEventListeners();
const avatarEditForm = document.querySelector("#avatar-edit-form");
const avatarFormValidator = new FormValidator(
  validationSettings,
  avatarEditForm
);
avatarFormValidator.enableValidation();
editAvatarPopup.setValidator(avatarFormValidator);

const avatarImageContainer = document.querySelector(
  ".profile__image-container"
);
avatarImageContainer.addEventListener("click", () => {
  editAvatarPopup.resetForm();
  editAvatarPopup.open();
});

const deleteConfirmPopup = new PopupWithConfirm("#delete-card-modal");
deleteConfirmPopup.setEventListeners();

function handleDeleteClick(cardId, cardElement) {
  console.log("opening delete confirm modal for card id", cardId);
  deleteConfirmPopup.open(() => {
    console.log("Confirmed delete for ID:", cardId);
    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        deleteConfirmPopup.close();
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

function handleToggleLike(cardInstance) {
  const isLiked = cardInstance.isLiked();
  const apiCall = isLiked
    ? api.unlikeCard(cardInstance._id)
    : api.likeCard(cardInstance._id);

  apiCall
    .then((updatedCard) => {
      cardInstance.updateLikeButton(updatedCard.isLiked);
    })
    .catch((err) => {
      console.error(err);
    });
}

function createCard(data) {
  const newCard = new Card(
    data,
    cardSelector,
    handleImagePreview,
    handleDeleteClick,
    handleToggleLike,
    currentUserId
  );
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

profileEditPopup.setValidator(editFormValidator);
addCardPopup.setValidator(addFormValidator);

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
  addCardPopup.resetForm();
  addCardPopup.open();
});

// profileEditForm.addEventListener("submit", handleProfileEditSubmit);
profileEditPopup.setEventListeners();
addCardPopup.setEventListeners();
