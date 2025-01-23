// class Card {
//   constructor({ name, link }, _cardSelector) {
//     this._name = name;
//     this._link = link;
//     // this._handleImageClick = handleImageClick;
//     this._cardSelector = cardSelector;
//   }

//   _setEventListeners() {
//     //".card__like-button"
//     this._cardElement
//       .querySelector(".card__like-button")
//       .addEventListener("click", () => {
//         this._handleLikeIcon();
//       });
//     //".card__trash-button"
//     this._cardElement.querySelector(".card__trash-button");
//     this._cardElement
//       .querySelector(".card__trash-button")
//       .addEventListener("click", () => {
//         this._handleDeleteCard();
//       });
//   }

//   _handleDeleteCard() {
//     this._cardElement.remove();
//     this._cardElement = null;
//   }

//   _handleLikeIcon() {
//     this._cardElement
//       .querySelector(".card__like-button")
//       .classList.toggle("card__like-button_active");
//   }

//   getView() {
//     this._cardElement = document
//       .querySelector(this._cardSelector)
//       .content.querySelector(".card")
//       .cloneNode(true);
//     //get the card view
//     //set event listeners
//     this._setEventListeners();
//     //return the card
//   }
// }

class Card {
  constructor(data, cardSelector, handleImagePreview) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImagePreview = handleImagePreview;
  }

  // Private method to handle liking a card
  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  // Private method to handle deleting a card
  _handleTrashButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  // Private method to set up event listeners for the card
  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._trashButton = this._cardElement.querySelector(".card__trash-button");
    this._imageElement = this._cardElement.querySelector(".card__image");

    this._likeButton.addEventListener("click", () => this._handleLikeButton());
    this._trashButton.addEventListener("click", () =>
      this._handleTrashButton()
    );

    this._imageElement.addEventListener("click", () => {
      this._handleImagePreview({ name: this._name, link: this._link });
    });
  }

  // Private method to handle image click event
  _handleImageClick() {
    console.log("image clicked in Card");
    // This should open the image modal. The logic for opening the modal should be passed in.
    if (this._handleImagePreview) {
      this._handleImagePreview({
        name: this._name,
        link: this._link,
      });
    }
  }

  // Private method to get the template for the card
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  // Public method to return the fully initialized card element
  getView() {
    console.log("card image source", this._link);
    this._cardElement = this._getTemplate();
    this._imageElement = this._cardElement.querySelector(".card__image");
    this._titleElement = this._cardElement.querySelector(".card__title");

    // Assign data to the elements
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;

    // Set up event listeners
    this._setEventListeners();

    return this._cardElement;
  }
}

export default Card;
