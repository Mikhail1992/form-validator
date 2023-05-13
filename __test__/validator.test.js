const fs = require('fs');
const path = require('path');
const validator = require('../libs/validator');
const messagesMapper = require('../libs/validator/default-messages');

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) =>
  fs.readFileSync(getFixturePath(filename), 'utf-8');

beforeEach(() => {
  document.body.innerHTML = readFile('form.html');
});

describe('validator', () => {
  test('Should be exists', () => {
    expect(validator).not.toBe(undefined);
  });

  test('Should validate email - fail', () => {
    // arrange
    const form = document.querySelector('form');
    const email = document.querySelector('input[name="email"]');
    const schema = {
      rules: {
        email: {
          email: true,
        },
      },
    };

    // act
    const { register, errors } = validator(form, schema);
    register('email');
    register('password');
    email.focus();
    email.setAttribute('value', 'invalid email');
    email.blur();

    // assert
    expect(errors.email).toEqual([messagesMapper.email]);
  });

  test('Should validate email - success', () => {
    // arrange
    const form = document.querySelector('form');
    const email = document.querySelector('input[name="email"]');
    const schema = {
      rules: {
        email: {
          email: true,
        },
      },
    };

    // act
    const { register, errors } = validator(form, schema);
    register('email');
    email.focus();
    email.setAttribute('value', 'validemail@test.com');
    email.blur();

    // assert
    expect(errors.email).toEqual([]);
  });

  test('Should return custom error message', () => {
    // arrange
    const form = document.querySelector('form');
    const password = document.querySelector('input[name="password"]');
    const customErrorMessage = "Value doesn't exists";
    const schema = {
      rules: {
        password: {
          required: {
            message: customErrorMessage,
          },
        },
      },
    };

    // act
    const { register, errors } = validator(form, schema);
    register('password');
    password.focus();
    password.blur();

    // assert
    expect(errors.password).toEqual([customErrorMessage]);
  });
});
