'use strict'

const Persona = use("Persona");

class LoginController {
  async authenticate ({ request, auth, response }) {
    const payload = request.only(['password', 'uid']);

    const user        = await Persona.verify(payload);
    const accessToken = await auth.generate(user);

    return response.ok({
      accessToken,
      status: 200,
      message: 'Logged in successfully'
    });
  }
}

module.exports = LoginController;
