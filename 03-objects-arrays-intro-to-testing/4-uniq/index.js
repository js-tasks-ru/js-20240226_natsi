/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export function uniq(arr) {
    let newArray = [];
    if (Array.isArray(arr)) {
        for (const item of arr) {
            if (!newArray.includes(item)) {
                newArray.push(item);
            }
        }
    }
    return newArray;
}