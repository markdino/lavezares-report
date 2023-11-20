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

export const sortArrayOfObjects = (arr, sortBy, sortOrder = "asc") => {
  let error;
  if (!Array.isArray(arr) || arr.length === 0 || typeof sortBy !== "string") {
    error = "Invalid input";
    console.error("sortArrayOfObjects: ", error);
    return;
  }

  if (!arr.every((obj) => obj.hasOwnProperty(sortBy))) {
    error = `Objects in the array do not have the key "${sortBy}"`;
    console.error("sortArrayOfObjects: ", error);
    return;
  }

  const sortOrderFactor = sortOrder === "desc" ? -1 : 1;

  arr.sort((a, b) => {
    const valA = a[sortBy];
    const valB = b[sortBy];

    if (valA < valB) {
      return -1 * sortOrderFactor;
    }
    if (valA > valB) {
      return 1 * sortOrderFactor;
    }
    return 0;
  });

  return arr;
};
