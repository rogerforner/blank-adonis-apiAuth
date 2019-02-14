'use strict'

const { formatters } = use('Validator');

class AuthLogin {
  get formatter () {
    return formatters.JsonApi;
  }

  get validateAll () {
    return true;
  }

  get rules () {
    return {
      password: 'required',
      uid     : 'required',
    };
  }

  // async fails (errorMessages) {
  //   return this.ctx.response.send(errorMessages);
  // }
}

module.exports = AuthLogin;
