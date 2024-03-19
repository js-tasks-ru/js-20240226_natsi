import SortableTableV1 from "../../05-dom-document-loading/2-sortable-table-v1/index.js";

export default class SortableTableV2 extends SortableTableV1 {
  isSortLocally = true;
  constructor(headersConfig, {
    data = [],
    sorted = {}
  } = {}) {
    super(headersConfig, data);
    this.sorted = sorted;
    this.sort(this.sorted?.id, this.sorted?.order);

    this.createEventListeners();
  }

  createEventListeners() {
    this.subElements.header.addEventListener('pointerdown', this.headerPointerdownHandler);
  }

  removeEventListeners() {
    this.subElements.header.removeEventListener('pointerdown', this.headerPointerdownHandler);
  }

  headerPointerdownHandler = (event) => {
    const columnElement = event.target.closest('[data-sortable="true"]');

    if (!columnElement) {
      return;
    }

    const sortField = columnElement.dataset.id;
    const sortOrder = columnElement.dataset.order === "asc" ? "desc" : "asc";

    this.sort(sortField, sortOrder);

  }

  sort(sortField, sortOrder) {
    if (this.isSortLocally) {
      this.sortOnClient(sortField, sortOrder);
    } else {
      this.sortOnServer();
    }
  }

  sortOnClient(sortField, sortOrder) {
    super.sort(sortField, sortOrder);
  }
  
  sortOnServer() {
    // TODO
  }

  destroy() {
    super.destroy();
    this.removeEventListeners();
  }
}