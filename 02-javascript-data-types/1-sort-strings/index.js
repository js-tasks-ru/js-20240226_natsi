/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const resArr = [...arr];
  if (param === 'desc') {
    return resArr.sort((word1, word2) => word2.localeCompare(word1, ['ru', 'en'], { caseFirst: "upper" }));
  }
  return resArr.sort((word1, word2) => word1.localeCompare(word2, ['ru', 'en'], { caseFirst: "upper" }));
}
