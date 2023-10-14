export const titleValidator = function (value) {
  let error = "";

  if (!value) {
    error = "Can't be empty";
  } else {
    error = "";
  }

  return error;
};

export const detailValidator = function (value) {
  let error = "";

  if (!value) {
    error = "Can't be empty";
  } else if (value.length > 250) {
    error = "Can't be more than 250 characters";
  } else {
    error = "";
  }

  return error;
};
