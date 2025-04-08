class Card {
  constructor(
    data,
    cardSelector,
    handleImagePreview,
    handleDeleteClick,
    handleToggleLike,
    currentUserId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._cardSelector = cardSelector;
    this._handleImagePreview = handleImagePreview;
    this._handleDeleteClick = handleDeleteClick;
    this._handleToggleLike = handleToggleLike;
    this._currentUserId = currentUserId;
    this._isLiked = data.isLiked;
  }

  // Private method to handle liking a card
  _handleLikeButton() {
    this._handleToggleLike(this);
  }

  // Private method to handle deleting a card
  _handleTrashButton() {
    if (this._handleDeleteClick) {
      this._handleDeleteClick(this._id, this._cardElement);
    }
  }

  // Private method to set up event listeners for the card
  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._trashButton = this._cardElement.querySelector(".card__trash-button");

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

  isLiked() {
    return this._likeButton.classList.contains("card__like-button_active");
  }

  updateLikeButton(isLikedFromServer) {
    if (isLikedFromServer) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  // Public method to return the fully initialized card element
  getView() {
    console.log("card image source", this._link);
    this._cardElement = this._getTemplate();
    this._imageElement = this._cardElement.querySelector(".card__image");
    this._titleElement = this._cardElement.querySelector(".card__title");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    }

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
