import fetchJson from './utils/fetch-json.js';
import SortableTableV2 from '../../06-events-practice/1-sortable-table-v2/index.js';
const BACKEND_URL = 'https://course-js.javascript.ru/';

export default class superSortableTable3 extends SortableTableV2 {
  sortedData = [];
  limit = 30;
  offset = 0;
  padding = 1;
  constructor(headersConfig, {
    url = '',
    isSortLocally = false,
    data = [],
    sorted = {}
  } = {}) {
    super(headersConfig, { data, sorted, isSortLocally });

    this.isSortLocally = isSortLocally;
    this.url = new URL(BACKEND_URL + url);

    this.render();
  }
  
  sort(sortField, sortOrder) {
    super.sort(sortField, sortOrder);
    this.resetOffset();
  }

  async sortOnServer(sortField, sortOrder) {
    if (this.url) {
      this.setParams(sortField, sortOrder);

      this.setLoading();
      this.sortedData = await fetchJson(this.url);
      this.resetLoading();

      super.updateTemplate(this.sortedData, sortField, sortOrder);
    }
  }

  async render() {
    if (!this.url) return;

    this.setParams(this.field, this.order);

    this.setLoading();
    const response = await fetchJson(this.url);
    this.resetLoading();

    this.sortedData = [
      ...this.sortedData,
      ...response
    ];

    if (this.isSortLocally) {
      super.update(this.sortedData);
      super.render();
    } else {
      super.updateTemplate(this.sortedData, this.field, this.order);
    }
  }

  setParams(sortField, sortOrder) {
    this.url.searchParams.set('_sort', sortField);
    this.url.searchParams.set('_order', sortOrder);
    this.url.searchParams.set('_start', this.offset);
    this.url.searchParams.set('_end', this.offset + this.limit);
  }

  resetOffset() {
    this.offset = 0;
  }

  setLoading() {
    this.subElements['sortableTable'].classList.add('sortable-table_loading');
  }

  resetLoading() {
    this.subElements['sortableTable'].classList.remove('sortable-table_loading');
  }

  createEventListeners() {
    super.createEventListeners();
    document.addEventListener('scroll', this.documentScrollHandler.bind(this));
  }

  removeEventListeners() {
    super.removeEventListeners();
    document.removeEventListener('scroll', this.documentScrollHandler.bind(this));
  }

  documentScrollHandler(event) {
    const windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
    if (windowRelativeBottom <= (document.documentElement.clientHeight + this.padding)) {
      this.offset += this.limit;
      this.render();
    }
  }
}
