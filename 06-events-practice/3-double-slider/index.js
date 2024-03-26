export default class DoubleSlider {
  element;
  subElements = {};
  currentThumb;
  constructor({
    min = 0,
    max = 100,
    formatValue = value => value,
    selected = {}
  } = {}) {
    this.min = min;
    this.max = max;
    this.formatValue = formatValue;
    this.from = selected?.from ?? this.min;
    this.to = selected?.to ?? this.max;


    this.element = this.createElement();
    this.selectSubElements();
    this.setHandleListeners();
  }

  createElement() {
    const element = document.createElement('div');
    element.innerHTML = this.createTemplate();
    return element.firstElementChild;
  }

  createTemplate() {
    const leftValue = this.toPercent(this.from, 'from');
    const rightValue = this.toPercent(this.to, 'to');

    return `<div class="range-slider">
      <span data-element="from">${this.formatValue(this.from)}</span>
      <div data-element="sliderInner"  class="range-slider__inner">
        <span data-element="thumbProgress" class="range-slider__progress" style="left: ${leftValue}%; right: ${rightValue}%"></span>
        <span data-element="thumbLeft" class="range-slider__thumb-left" style="left: ${leftValue}%"></span>
        <span data-element="thumbRight" class="range-slider__thumb-right" style="right: ${rightValue}%"></span>
      </div>
      <span data-element="to">${this.formatValue(this.to)}</span>
    </div>`;
  }

  selectSubElements() {
    this.element.querySelectorAll('[data-element]').forEach(element => {
      this.subElements[element.dataset.element] = element;
    });
  }

  toPercent(val, direction) {
    const total = this.max - this.min;
    const value = direction === 'to' ? this.max - val : val - this.min;
    
    return Math.round(value / total * 100);
  }

  setHandleListeners() {
    this.subElements.thumbRight.addEventListener('pointerdown', this.thumbPointerdownHandler);
    this.subElements.thumbLeft.addEventListener('pointerdown', this.thumbPointerdownHandler);
  }

  removeHandleListeners() {
    this.subElements.thumbRight.removeEventListener('pointerdown', this.thumbPointerdownHandler);
    this.subElements.thumbLeft.removeEventListener('pointerdown', this.thumbPointerdownHandler);
  }

  thumbPointerdownHandler = (event) => {
    this.currentThumb = event.target.dataset.element;
    document.addEventListener('pointermove', this.documentPointermoveHandler);
    document.addEventListener('pointerup', this.documentPointerupHandler);
  }

  documentPointermoveHandler = (event) => {
    if (this.currentThumb === 'thumbLeft') {
      this.from = Math.min(this.getPointerMove(event), this.to);
      this.subElements.from.textContent = this.formatValue(this.from);
      this.subElements.thumbLeft.style.left = this.toPercent(this.from, 'from') + '%';
      this.subElements.thumbProgress.style.left = this.toPercent(this.from, 'from') + '%';
    } else if (this.currentThumb === 'thumbRight') {
      this.to = Math.max(this.getPointerMove(event), this.from);
      this.subElements.to.textContent = this.formatValue(this.to);
      this.subElements.thumbRight.style.right = this.toPercent(this.to, 'to') + '%';
      this.subElements.thumbProgress.style.right = this.toPercent(this.to, 'to') + '%';
    }
  }

  getPointerMove(event) {
    const { left, width } = this.subElements.sliderInner.getBoundingClientRect();

    const containerLeftX = left;
    const containerRightX = left + width;
    const pointerX = event.clientX;

    const normalizePointerX = Math.min(containerRightX, Math.max(containerLeftX, pointerX));

    const percentPointerX = Math.round((normalizePointerX - containerLeftX) / (containerRightX - containerLeftX) * 100);
    const value = this.min + (this.max - this.min) * percentPointerX / 100;

    return value;
  }

  documentPointerupHandler = (event) => {
    this.currentThumb = null;
    this.dispatchCustomEvent();
    document.removeEventListener('pointermove', this.documentPointermoveHandler);
    document.removeEventListener('pointerup', this.documentPointerupHandler);
  }

  dispatchCustomEvent() {
    const event = new CustomEvent('range-select', {
      detail: {
        from: this.from,
        to: this.to
      }
    });
    this.element.dispatchEvent(event);
  }

  destroy() {
    this.remove();
    this.removeHandleListeners();
  }

  remove() {
    this.element.remove();
  }
}
