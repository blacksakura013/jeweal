export const omitFields = (obj, fieldsToOmit) => {
  const result = { ...obj };
  fieldsToOmit.forEach(field => delete result[field]);
  return result;
};

export const replaceArrayItemAtIndex = (arr, index, newValue) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

export const removeArrayItemAtIndex = (arr, index) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};
