import SortableTableV1 from "../../05-dom-document-loading/2-sortable-table-v1/index.js";

export default class SortableTableV2 extends SortableTableV1 {
  field;
  order;
  constructor(headersConfig, {
    data = [],
    sorted = {},
    isSortLocally = true
  } = {}) {
    super(headersConfig, data);

    this.isSortLocally = isSortLocally;
    this.sorted = sorted;
    this.field = this.sorted?.id ?? 'title';
    this.order = this.sorted?.order ?? 'asc';
    
    this.render();
    this.createEventListeners();
  }

  createEventListeners() {
    this.subElements.header.addEventListener('pointerdown', this.headerPointerdownHandler.bind(this));
  }

  removeEventListeners() {
    this.subElements.header.removeEventListener('pointerdown', this.headerPointerdownHandler.bind(this));
  }

  headerPointerdownHandler(event) {
    const columnElement = event.target.closest('[data-sortable="true"]');

    if (!columnElement) {
      return;
    }

    this.field = columnElement.dataset.id;
    this.order = columnElement.dataset.order === "asc" ? "desc" : "asc";

    this.sort(this.field, this.order);
  }

  sort(sortField, sortOrder) {
    if (this.isSortLocally) {
      this.sortOnClient(sortField, sortOrder);
    } else {
      this.sortOnServer(sortField, sortOrder);
    }
  }

  sortOnClient(sortField, sortOrder) {
    super.sort(sortField, sortOrder);
  }

  sortOnServer(sortField, sortOrder) {
    // sort on server    
  }

  render() {
    this.sort(this.field, this.order);
  }

  destroy() {
    super.destroy();
    this.removeEventListeners();
  }
}