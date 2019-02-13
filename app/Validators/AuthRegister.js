'use strict'

const { formatters } = use('Validator');

class AuthRegister {
  get formatter () {
    return formatters.JsonApi;
  }

  get validateAll () {
    return true;
  }

  get rules () {
    return {
      username             : 'required|string|min:3|max:15|regex:^[a-zA-Z0-9_]*$|unique:users',
      email                : 'required|email|max:254|unique:users',
      password             : 'required|string|min:6|max:60',
      password_confirmation: 'required_if:password|same:password',
    };
  }

  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages);
  }
}

module.exports = AuthRegister;
