export const validateForm = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Username is required.';
  } else if (!/^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\.,;:\s@"]+\.)+[^<>()\[\]\.,;:\s@"]{2,})$/i.test(values.username)) {
    errors.username = 'Invalid Email';
  }
  if (!values.password) {
    errors.password = 'Password is required.';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }
  if (!values.ConfirmPassword) {
    errors.ConfirmPassword = 'Confirm Password is required.';
  } else if (values.password !== values.ConfirmPassword) {
    errors.ConfirmPassword = 'Password and Confirm Password do not match.';
  }
  if (!values.firstName) {
    errors.firstName = 'First Name is required.';
  }
  if (!values.lastName) {
    errors.lastName = 'Last Name is required.';
  }
  if (!values.dateOfBirth) {
    errors.dateOfBirth = 'Date of Birth is required.';
  }
  if (!values.phoneNo) {
    errors.phoneNo = 'Phone Number is required.';
  } else if (!/(\+\s*2\s*5\s*1\s*9\s*(([0-9]\s*){8}\s*))|(\+\s*2\s*5\s*1\s*9\s*(([0-9]\s*){8}\s*))|(0\s*9\s*(([0-9]\s*){8}))|(0\s*7\s*(([0-9]\s*){8}))/.test(values.phoneNo)) {
    errors.phoneNo = 'Invalid phone number format.';
  }
  return errors;
};
export const validateFormIssus = (values) => {
  const errors = {};

  // Basic Information
  if (!values.issueType) {
    errors.issueType = 'Issue Type is required.';
  }

  if (!values.issueRegion) {
    errors.issueRegion = 'Issue Raised Region is required.';
  }

  if (!values.requestingDepartment) {
    errors.requestingDepartment = 'Requesting Department is required.';
  }

  if (!values.issueRaisedPlace) {
    errors.issueRaisedPlace = 'Issue Raised Place is required.';
  }

  // Details
  if (!values.issueRaisingOffice) {
    errors.issueRaisingOffice = 'Issue Raising Office is required.';
  }
  if (!values.issueLevel) {
    errors.issueLevel = 'Issue Level is required.';
  }
  if (!values.legalMotions) {
    errors.legalMotions = "Please Insert the Legal Motion."
  }

  if (!values.issueRaisingOfficer) {
    errors.issueRaisingOfficer = 'Issue Raising Officer is required.';
  }

  if (!values.legalMotions) {
    errors.legalMotions = 'Legal Motions is required.';
  }

  // Dates
  if (!values.issueRequestDate) {
    errors.issueRequestDate = 'Issue Requested Date is required.';
  }

  if (!values.issueStartDate) {
    errors.issueStartDate = 'Issue Start Date is required.';
  }

  if (!values.issuedDate) {
    errors.issuedDate = 'Issued Date is required.';
  }

  if (!values.issueOpenDate) {
    errors.issueOpenDate = 'Issue Open Date is required.';
  }

  if (!values.issueDecisionDate) {
    errors.issueDecisionDate = 'Issue Decision Date is required.';
  }

  return errors;
};
