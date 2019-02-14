'use strict'

const Persona = use("Persona");

class RegisterController {
  async store ({ request, auth, response }) {
    const payload = request.only([
      'email',
      'password',
      'password_confirmation',
      'username'
    ]);

    const user = await Persona.register(payload);

    // await auth.login(user);

    return response.ok({
      user,
      status: 200,
      message: 'Account created successfully'
    });
  }
}

module.exports = RegisterController;
