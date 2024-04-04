export default class SortableTable {
  element;
  subElements = {};
  sortField = '';
  sortOrder = '';
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;

    this.element = this.createElement();

    this.selectSubElements();
    this.subElements.header.innerHTML = this.createHeaderTemplate();
    this.subElements.body.innerHTML = this.createBodyTemplate(this.data);
  }

  createElement() {
    const element = document.createElement('div');
    element.innerHTML = this.createTableTemplate();
    return element.firstElementChild;
  }

  selectSubElements() {
    const elements = this.element.querySelectorAll('[data-element]');
    for (const element of elements) {
      this.subElements[element.dataset.element] = element;
    }
  }

  createTableTemplate() {
    return `<data-element="productsContainer" class="products-list__container">
      <div data-element="sortableTable"  class="sortable-table">
      <div data-element="header" class="sortable-table__header sortable-table__row">
      </div>
      <div data-element="body" class="sortable-table__body">
      </div>
      <div data-element="loading" class="loading-line sortable-table__loading-line"></div>

      <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
        <div>
          <p>No products satisfies your filter criteria</p>
          <button type="button" class="button-primary-outline">Reset all filters</button>
        </div>
      </div>
      </div>
    </div>`;
  }

  createHeaderTemplate() {
    return (this.headerConfig.map(header => 
      `<div class="sortable-table__cell" data-id="${header.id}" data-sortable="${header.sortable}" data-order="${this.sortOrder}">
        <span>${header.title}</span>
        ${this.createSortArrowTemplate(header.id)}
      </div>`
    )).join('');
  }

  createBodyTemplate (data) {
    return (data.map(dataRow =>
      `<a href="/products/${dataRow.id}" class="sortable-table__row">
        ${this.headerConfig.map(header => this.createBodyColumnTemplate(header, dataRow)).join('')}
      </a>
      `
    )).join('');
  }

  createBodyColumnTemplate(header, dataRow) {
    if ('template' in header) {
      return header.template(dataRow);
    }
    return `<div class="sortable-table__cell">${dataRow[header.id]}</div>`;
  }

  createSortArrowTemplate(headerId) {
    if (this.sortField === headerId) {
      return `<span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow">
        </span>
      </span>`;
    }
    return '';
  }

  sort(sortField, sortOrder) {
    this.sortField = sortField;
    this.sortOrder = sortOrder;
    
    const currentHeader = this.headerConfig.find(header => header.id === sortField);

    const sortedData = this.data.sort((firstRow, secondRow) => {
      const order = sortOrder === 'asc' ? 1 : -1;
      const firstValue = firstRow[sortField];
      const secondValue = secondRow[sortField];

      if (currentHeader.sortType === 'string') {
        return order * firstValue.localeCompare(secondValue, ['ru', 'en'], { caseFirst: "upper" });
      }
      return order * (firstValue - secondValue);
    }); 

    this.updateTemplate(sortedData, sortField, sortOrder);
  }

  update(newDate) {
    this.data = newDate;
  }

  updateTemplate(sortedData, sortField, sortOrder) {
    this.sortField = sortField;
    this.sortOrder = sortOrder;

    this.subElements.header.innerHTML = this.createHeaderTemplate();
    this.subElements.body.innerHTML = this.createBodyTemplate(sortedData);
  }

  destroy() {
    this.remove();
  }

  remove() {
    this.element.remove();
  }
}

