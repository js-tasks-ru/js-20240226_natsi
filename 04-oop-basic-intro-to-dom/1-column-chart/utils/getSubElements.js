export function selectSubElements(element) {
  const elements = element.querySelectorAll('[data-element]');
  let subElements = [];
  for (const element of elements) {
    subElements[element.dataset.element] = element;
  }
  return subElements;
}