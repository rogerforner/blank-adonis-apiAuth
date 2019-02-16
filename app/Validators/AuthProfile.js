'use strict'

const { formatters } = use('Validator');

class AuthProfile {
  get formatter () {
    return formatters.JsonApi;
  }

  get validateAll () {
    return true;
  }

  get rules () {
    // ID del usuario. "auth" lo obtenemos de los parámetros del método update() del ProfileController. Utilizado para
    // ignorarlo en las reglas "unique".
    const userID = this.ctx.auth.user.id;

    return {
      email   : `required|email|max:254|unique:users,email,id,${userID}`,
      name    : 'string|min:3|max:50',
      username: `required|string|min:3|max:15|regex:^[A-Za-z0-9_]*$|unique:users,username,id,${userID}`,
    };
  }

  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages);
  }
}

module.exports = AuthProfile;
