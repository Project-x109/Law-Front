export const validateForm = (values) => {
  const errors = {};
  // Username validation
  if (!values.username) {
    errors.username = 'Username is required.';
  } else if (!/^[a-zA-Z0-9_@.]{3,45}$/.test(values.username)) {
    errors.username = 'Username must be 3-20 characters and can only contain letters, numbers, and underscores.';
  }

  // Password validation
  if (!values.password) {
    errors.password = 'Password is required.';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }

  // Confirm Password validation
  if (!values.ConfirmPassword) {
    errors.ConfirmPassword = 'Confirm Password is required.';
  } else if (values.password !== values.ConfirmPassword) {
    errors.ConfirmPassword = 'Password and Confirm Password do not match.';
  }

  // First Name validation
  if (!values.firstName) {
    errors.firstName = 'First Name is required.';
  }

  // Last Name validation
  if (!values.lastName) {
    errors.lastName = 'Last Name is required.';
  }

  // Date of Birth validation
  if (!values.dateOfBirth) {
    errors.dateOfBirth = 'Date of Birth is required.';
  }

  // Phone Number validation
  if (!values.phoneNo) {
    errors.phoneNo = 'Phone Number is required.';
  } else if (!/^\+?\d{1,15}$/.test(values.phoneNo)) {
    errors.phoneNo = 'Invalid phone number format.';
  }

  return errors;
};
