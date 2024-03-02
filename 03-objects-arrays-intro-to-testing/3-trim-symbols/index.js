/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
    if (typeof size !== 'undefined') {
        let counter = 0;
        let str = '';

        for (let i = 0; i < string.length; i++) {
            if (string[i - 1] === string[i]) {
                counter++;
            } else {
                counter = 1;
            }
            if (counter <= size) {
                str += string[i];
            }
        }
        return str;
    }
    return string;
}
