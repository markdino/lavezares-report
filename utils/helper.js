export const extractFields = (obj, fields) => {
  if (!obj || typeof obj.toObject !== 'function') {
    throw new Error('Invalid object provided.');
  }

  const fieldArray = fields.split(' ');
  const newObj = {};

  fieldArray.forEach(field => {
    if (obj.toObject().hasOwnProperty(field)) {
      newObj[field] = obj[field];
    }
  });

  return newObj;
};
