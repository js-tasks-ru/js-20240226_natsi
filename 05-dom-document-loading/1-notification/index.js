export default class NotificationMessage {
  static lastInstance;

  constructor(
    message = '',
    {
      duration = 0,
      type = 'success',
    } = {}
  ) {
    this.message = message;
    this.duration = duration;
    this.type = type;

    this.element = this.createElement();
  }

  createElement() {
    const element = document.createElement('div');
    element.innerHTML = this.createTemplate();
    return element.firstElementChild;
  }

  createTemplate() {
    return `
      <div class="notification ${this.type}" style="--value:20s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header"> ${this.type} </div>
          <div class="notification-body">
            ${this.message}
          </div>
        </div>
      </div>
    `;
  }

  show(container = document.body) {
    this.setLastInstance();

    container.appendChild(this.element);

    this.setTimeout();
  }

  setLastInstance() {
    if (NotificationMessage.lastInstance) {
      NotificationMessage.lastInstance.destroy();
    }
    NotificationMessage.lastInstance = this;
  }

  setTimeout() {
    this.timerId = setTimeout(() => {
      this.destroy();
    }, this.duration);
  }

  destroy() {
    this.remove();
    clearTimeout(this.timerId);
  }
  
  remove() {
    this.element.remove();
  }
}
