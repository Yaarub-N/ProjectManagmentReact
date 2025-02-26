// Validation.js
export const validateProjectName = (name) => {
  if (name.length > 100) {
    return "Projektnamnet får inte vara längre än 100 tecken.";
  }
  return "";
};

export const validateTotalPrice = (price) => {
  if (isNaN(price)) {
    return "Totalpriset måste vara ett nummer.";
  }
  if (price.toString().length > 18) {
    return "Totalpriset får inte vara längre än 18 siffror.";
  }
  return "";
};
