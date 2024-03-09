export default class ColumnChart {
  element;
  chartHeight = 50;
  constructor({
    data = [],
    label = '',
    value = null,
    link = '',
    formatHeading = value => value,
  } = {}) {
    this.label = label;
    this.link = link;
    this.value = value;
    this.data = data;
    this.formatHeading = formatHeading;

    this.element = this.createElement();
  }

  update(newData) {
    this.data = newData;
    document.querySelector('.column-chart__chart').innerHTML = this.createColumTemplate();
  }

  getColumnProps() {
    const maxValue = Math.max(...this.data);
    const scale = 50 / maxValue;
  
    return this.data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }

  createElement() {
    const element = document.createElement('div');
    element.innerHTML = this.createTemplate();
    return element.firstElementChild;
  }

  createTemplate() {
    return `<div class="${this.createChartClass()}" style="--chart-height: ${this.chartHeight}">
      <div class="column-chart__title">
        ${this.label}
        ${this.createLinkTemplate()}
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">${this.formatHeading(this.value)}</div>
        <div data-element="body" class="column-chart__chart">
          ${this.createColumTemplate()}
        </div>
      </div>
    </div>`;
  }

  createLinkTemplate() {
    if (this.link) {
      return `<a href="${this.link}" class="column-chart__link">View all</a>`;
    }
    return '';
  }

  createColumTemplate() {
    return this.getColumnProps().map(item => `<div style="--value: ${item.value}" data-tooltip="${item.percent}"></div>`).join('');
  }

  createChartClass() {
    return this.data.length > 0 ? 'column-chart' : 'column-chart column-chart_loading';
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
