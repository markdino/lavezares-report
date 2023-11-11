export const extractFields = (obj, fields) => {
  if (typeof obj !== "object" || obj === null) {
    throw new Error("The first parameter must be an object.");
  }

  const fieldArray = fields.split(" ");
  const newObj = {};

  fieldArray.forEach((field) => {
    if (obj.hasOwnProperty(field)) {
      newObj[field] = obj[field];
    }
  });

  return newObj;
};
