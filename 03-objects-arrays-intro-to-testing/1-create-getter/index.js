/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
    return (obj) => {
        const props = path.split('.');
        let newObject = obj;
        for (let i = 0; i < props.length; i++) {
            if (newObject !== null && typeof newObject === 'object' && !Object.hasOwn(newObject, props[i])) return;

            newObject = newObject?.[props[i]];
        }
        return newObject;
    }
}