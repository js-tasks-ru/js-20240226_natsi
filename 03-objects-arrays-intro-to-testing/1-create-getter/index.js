/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
    return (obj) => {
        let propValue = obj;
        if (path.length > 0) {
            const props = path.split('.');
            for (let i = 0; i < props.length; i++) {
                if (typeof propValue !== 'undefined') {
                    propValue = propValue[props[i]];
                }
            }
        }
        return propValue;
    }
}