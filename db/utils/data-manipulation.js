// extract any functions you are using to manipulate your data, into this file

exports.convertToUTC = (array) => {
  return array.map((item) => {
    const newObj = { ...item };
    newObj.created_at = new Date(newObj.created_at);
    return newObj;
  });
};

exports.createRef = (array, key, value) => {
  let newObj = {};
  array.forEach((item) => {
    const newKey = item[key];
    newObj[newKey] = item[value];
  });
  return newObj;
};

exports.formatItems = (
  array,
  obj,
  keytoChange,
  newKey,
  keyToAmend,
  amendedKey
) => {
  return array.map((item) => {
    const newItem = { ...item };
    newItem[newKey] = obj[newItem[keytoChange]];
    newItem[amendedKey] = newItem[keyToAmend];
    delete newItem[keyToAmend];
    delete newItem[keytoChange];
    return newItem;
  });
};
