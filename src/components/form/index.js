const validator = require('../../../libs/validator');

const schema = {
  rules: {
    email: {
      email: true,
      required: true,
    },
    password: {
      minLength: 8,
      maxLength: 16,
      required: {
        message: 'Password is required',
      },
    },
  },
};

const form = function () {
  const useHandlers = function () {
    const form = document.querySelector('.form');

    const {
      handleSubmit,
      register,
      errors: allErrors,
    } = validator(form, schema);

    const handleChange = function ({ errors, node }) {
      const parent = node.parentNode;
      const messageNode = parent.querySelector('.form__helper-text');
      const button = form.querySelector('input[type="submit"]');

      if (errors.length) {
        messageNode.innerHTML = errors[0];
        node.setAttribute('aria-invalid', true);
      } else {
        messageNode.innerHTML = '';
        node.setAttribute('aria-invalid', false);
      }

      if (Object.values(allErrors).some((x) => x.length)) {
        button.setAttribute('aria-disabled', true);
        button.setAttribute('disabled', true);
      } else {
        button.setAttribute('aria-disabled', false);
        button.removeAttribute('disabled');
      }
    };

    const submit = async function (errors, data) {
      if (!errors.length) {
        await fetch('/test', {
          method: 'POST',
          body: data,
        });
      }
    };

    register('email', handleChange);
    register('password', handleChange);
    handleSubmit(submit);
  };

  const init = function () {
    useHandlers();
  };

  return { init };
};

module.exports = form;
