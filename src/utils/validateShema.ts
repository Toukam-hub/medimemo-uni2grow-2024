function isNotEmpty(value) {
  return value ? "" : "This field is required";
}

const validateShema = {
  email: isNotEmpty,
  password: isNotEmpty,
};

export function validateForm(values) {
  let errors = {};
  Object.keys(validateShema).forEach((fieldName) => {
    const error = validateShema[fieldName](values[fieldName]);
    if (error) errors[fieldName] = error;
  });

  return errors;
}

export function validateField(name, value) {
  return validateShema[name](value);
}
