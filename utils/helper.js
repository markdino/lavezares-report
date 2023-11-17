export const extractFields = (obj, fields) => {
  if (obj && typeof obj.toObject === "function") {
    obj = obj.toObject();
  } else if (typeof obj !== "object" || obj === null) {
    throw new Error("Invalid object provided.");
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

export const removeEmptyProperties = (obj) => {
  const newObj = {};

  for (let key in obj) {
    if (obj[key] !== "" && obj[key] !== null && obj[key] !== undefined) {
      newObj[key] = obj[key];
    }
  }

  return newObj;
};
