const isEmpty = val =>
  val == null ? true : val.length != undefined ? val.length == 0 : false;
const isNumber = val => typeof val === 'number';
const isString = val => typeof val === 'string';
const isArray = val => Array.isArray(val);
const isNonEmptyString = val => isString(val) && !isEmpty(val);
const isNonEmptyArray = val => isArray(val) && !isEmpty(val);

module.exports.isEmpty = isEmpty;
module.exports.isNumber = isNumber;
module.exports.isString = isString;
module.exports.isArray = isArray;
module.exports.isNonEmptyString = isNonEmptyString;
module.exports.isNonEmptyArray = isNonEmptyArray;
