class Tooltip {
  static instance;
  offset = 10;
  element;
  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }
    Tooltip.instance = this;
  }

  createElement() {
    const element = document.createElement('div');
    element.classList.add('tooltip');
    return element;
  }

  render(text = '') {
    this.element.textContent = text;
    document.body.append(this.element);
  }

  initialize () {
    this.element = this.createElement();
    this.setHandleListeners();
  }

  setHandleListeners() {
    document.addEventListener('pointerover', this.documentPointeroverHandler);
    document.addEventListener('pointerout', this.documentPointeroutHandler);
    document.addEventListener('pointermove', this.documentPointermoveHandler);

  }

  removeHandleListeners() {
    document.removeEventListener('pointerover', this.documentPointeroverHandler);
    document.removeEventListener('pointerout', this.documentPointeroutHandler);
    document.removeEventListener('pointermove', this.documentPointermoveHandler);

  }

  documentPointeroverHandler = (event) => {
    if (event.target.dataset.tooltip) {
      this.render(event.target.dataset.tooltip);
    }
  }

  documentPointermoveHandler = (event) => {
    if (event.target.dataset.tooltip) {
      this.element.style.left = event.pageX + this.offset + 'px';
      this.element.style.top = event.pageY + this.offset + 'px';
    }
  }

  documentPointeroutHandler = (event) => {
    if (event.target.dataset.tooltip) {
      this.remove();
    }
  }

  destroy() {
    this.remove();
    this.removeHandleListeners();
  }

  remove() {
    this.element.remove();
  }
}

export default Tooltip;