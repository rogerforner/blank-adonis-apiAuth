'use strict'

const Antl    = use('Antl');
const Persona = use('Persona');

class LoginController {
  async authenticate ({ request, auth, response }) {
    const payload = request.only(['password', 'uid']);

    const user   = await Persona.verify(payload);
    const tokens = await auth.generate(user);

    return response.status(200).json({
      status: Antl.formatMessage('controllers.authLogin'),
      tokens
    });
  }
}

module.exports = LoginController;
