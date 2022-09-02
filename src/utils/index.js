/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

/**
 * Create an object composed of only defined keys
 * @param {Object} object
 * @returns {Object}
 */
const removeUndefinedKeys = (requestObject) => {
  const newObj = {}
  for (keys in requestObject) {
    if (requestObject[keys]) {
      newObj[keys] = requestObject[keys]
    }
  }
  return newObj;
};

module.exports = { pick, removeUndefinedKeys };
