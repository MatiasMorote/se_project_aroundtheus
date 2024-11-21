class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    // this._handleImageClick = handleImageClick;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    //".card__like-button"
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });
    //".card__trash-button"
    const deleteButton = this._cardElement.querySelector(".card__trash-button");
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_is-active");
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    //get the card view
    //set event listeners
    this._setEventListeners();
    //retur the card
  }
}
export default Card;
