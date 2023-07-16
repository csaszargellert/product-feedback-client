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
  } else {
    error = "";
  }

  return error;
};
