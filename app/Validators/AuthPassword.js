'use strict'

const { formatters } = use('Validator');

class AuthPassword {
  get formatter () {
    return formatters.JsonApi;
  }

  get validateAll () {
    return true;
  }

  get rules () {
    return {
      old_password         : 'required',
      password             : 'required|string|min:6|max:60',
      password_confirmation: 'required_if:password|same:password'
    };
  }

  // async fails (errorMessages) {
  //   return this.ctx.response.send(errorMessages);
  // }
}

module.exports = AuthPassword;
