'use strict'

const Persona = use("Persona");

class RegisterController {
  async store ({ request, response }) {
    const payload = request.only([
      'username', 'email', 'password', 'password_confirmation']
    );

    const user = await Persona.register(payload);

    return response.ok({
      user,
      status: 200,
      message: 'Account created successfully',
    });
  }
}

module.exports = RegisterController;
