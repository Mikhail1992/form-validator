module.exports = {
  email: 'Email is invalid',
  equalTo(v) {
    return 'Value should be equls to the field - ' + v;
  },
  digits: 'Digit is invalid',
  required: 'Field is required',
  minLength(v) {
    return 'Length should be at least ' + v + ' chars';
  },
  maxLength(v) {
    return 'Length should be shorter then ' + v + ' chars';
  },
};
