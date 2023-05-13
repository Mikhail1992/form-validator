const fs = require('fs');
const path = require('path');
const formComponent = require('../src/components/form');
const messagesMapper = require('../libs/validator/default-messages');

const getFixturePath = (filename) => path.join(__dirname, '..', filename);
const readFile = (filename) =>
  fs.readFileSync(getFixturePath(filename), 'utf-8');

beforeEach(() => {
  document.body.innerHTML = readFile('index.html');
});

describe('form', () => {
  test('Should be exists', () => {
    expect(formComponent).not.toBe(undefined);
  });

  test('Should validate data - success', () => {
    // arrange
    const form = document.querySelector('form');
    const email = form.querySelector('input[name="email"]');
    const emailHelperText = email.nextSibling.nextSibling;
    const password = form.querySelector('input[name="password"]');
    const passwordHelperText = password.nextSibling.nextSibling;
    const button = form.querySelector('input[type="submit"]');

    const formInst = formComponent();
    formInst.init();

    // act
    email.focus();
    email.setAttribute('value', 'validemail@test.com');
    email.blur();
    password.focus();
    password.setAttribute('value', '12345678');
    password.blur();

    // assert
    expect(button.disabled).toBe(false);
    expect(emailHelperText.innerHTML).toBe('');
    expect(passwordHelperText.innerHTML).toBe('');
  });

  test('Should validate data - fail', () => {
    // arrange
    const form = document.querySelector('form');
    const email = form.querySelector('input[name="email"]');
    const emailHelperText = email.nextSibling.nextSibling;
    const password = form.querySelector('input[name="password"]');
    const passwordHelperText = password.nextSibling.nextSibling;
    const button = form.querySelector('input[type="submit"]');

    const formInst = formComponent();
    formInst.init();

    // act
    email.focus();
    email.setAttribute('value', 'validemail');
    email.blur();

    // assert
    expect(button.disabled).toBe(true);
    expect(emailHelperText.innerHTML).toBe(messagesMapper.email);
    expect(passwordHelperText.innerHTML).toBe('');
  });
});
