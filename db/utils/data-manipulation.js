// extract any functions you are using to manipulate your data, into this file

exports.convertToUTC = (array) => {
  return array.map((item) => {
    const newObj = { ...item };
    newObj.created_at = new Date(newObj.created_at);
    return newObj;
  });
};
