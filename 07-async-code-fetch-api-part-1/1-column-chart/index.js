import fetchJson from './utils/fetch-json.js';
import ColumnChartV1 from '../../04-oop-basic-intro-to-dom/1-column-chart/index.js';

const BACKEND_URL = 'https://course-js.javascript.ru/';

export default class ColumnChartV2 extends ColumnChartV1 {
  constructor ({
    url = '',
    range = {},
    label = '',
    link = '',
    formatHeading = value => value
  } = {}) {
    super({
      label, 
      link,
      formatHeading
    });
    
    this.from = range?.from;
    this.to = range?.to;
    this.url = new URL(BACKEND_URL + url);
    
    this.update(this.from, this.to);
  }

  async update(from, to) {
    this.element.classList.add('column-chart_loading');
    const data = await this.fetchRequest(from, to);
    super.update(Object.values(data));
    this.element.classList.remove('column-chart_loading');
    return data;
  }

  async fetchRequest(from, to) {
    this.url.searchParams.set('from', from);
    this.url.searchParams.set('to', to);
    const response = await fetchJson(this.url);
    return response;
  }
} 
