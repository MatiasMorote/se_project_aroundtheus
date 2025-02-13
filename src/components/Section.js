export default class Section {
  constructor({ items, renderer }, classSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(classSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      const cardElement = this._renderer(item); // ✅ Generate the card element
      this.addItem(cardElement); // ✅ Now we call addItem here!
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
