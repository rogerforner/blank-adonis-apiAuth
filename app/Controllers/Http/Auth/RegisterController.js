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
    // const user        = await Persona.register(payload);
    // const accessToken = await auth.generate(user);

    return response.status(201).json({
      status: 'Account created successfully'
    });
  }
}

module.exports = RegisterController;
