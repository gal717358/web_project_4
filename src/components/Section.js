export default class Section {
    constructor({ items, renderer }, containerSelector) {
      this._renderedItems = items;
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
      this.renderer = renderer;
    }
  
    setItem(element) {
        this._container.append(element);
      }
  
      prependItem(element) {
        this._container.prepend(element);
      }
  
    renderItems() {
      
      this._renderedItems.forEach((item) => {
        this._renderer(item)
      })
    }

  }