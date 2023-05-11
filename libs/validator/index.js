const rulesMapper = require('./rules');
const messagesMapper = require('./default-messages');

const validator = function (form, schema) {
  const state = {
    errors: {},
  };

  const handler = function (fieldName, node, cb) {
    const nodeRules = schema.rules[fieldName] || {};
    return function (e) {
      const value = e.target.value;

      const errors = Object.keys(nodeRules)
        .map((rule) => {
          const fn = rulesMapper[rule];

          if (!fn) return false;

          const rules = nodeRules[rule];
          const isValid = fn.call(this, v, rules);

          if (isValid) return false;

          const showMessage = messagesMapper[rule];
          if (typeof showMessage === 'function') {
            return showMessage(rules);
          } else if (typeof rules === 'object') {
            return rules.message;
          }

          return showMessage;
        })
        .filter((x) => x);

      state.errors[fieldName] = errors;

      cb({ errors, value, node });
    };
  };

  const register = function (fieldName, cb) {
    const node = form.querySelector(`input[name="${fieldName}"]`);

    node.addEventListener('blur', handler(fieldName, node, cb));
  };

  const handleSubmit = function (fn) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      fn(state.errors, new FormData(form));
    });
  };

  return { handleSubmit, register, errors: state.errors };
};

module.exports = validator;
