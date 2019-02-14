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

    await Persona.register(payload);
    // const user = await Persona.register(payload);
    // await auth.generate(user);

    return response.ok({
      // user,
      status: 200,
      message: 'Account created successfully'
    });
  }
}

module.exports = RegisterController;
