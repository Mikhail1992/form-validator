module.exports = {
  email: function (v) {
    const regex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(v);
  },

  equalTo: function (v, r) {
    const elem = this.form.querySelector(`[name="${r}"]`);

    if (elem) {
      if (v === elem.value) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },

  digits: function (v) {
    const regex = /^[0-9]*$/;
    return regex.test(v);
  },

  required: function (v, r) {
    if (v && r) {
      return true;
    }

    return false;
  },

  minLength: function (v, r) {
    if (r >= 1 && v.length >= r) {
      return true;
    }

    return false;
  },

  maxLength: function (v, r) {
    if (r >= 1 && v.length <= r) {
      return true;
    }

    return false;
  },
};
