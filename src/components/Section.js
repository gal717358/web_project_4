export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this.renderer = renderer;
  }

  addItem(element) {
    this._container.append(element);
  }

  prependItem(element) {
    this._container.prepend(element);
  }

  renderItems(data) {
    if (data) {
      data.forEach((item) => {
        this._renderer(item);
      });
    } else {
      this._items.forEach((item) => {
        this._renderer(item);
      });
    }
  }
}
