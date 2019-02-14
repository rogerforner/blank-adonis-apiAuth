'use strict'

const Persona = use("Persona");

class LoginController {
  async authenticate ({ request, auth, response }) {
    const payload = request.only(['password', 'uid']);

    const user   = await Persona.verify(payload);
    const tokens = await auth.generate(user);

    return response.ok({
      tokens,
      status: 200,
      message: 'Logged in successfully'
    });
  }
}

module.exports = LoginController;
