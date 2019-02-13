'use strict'

const Encryption = use('Encryption');
const Persona    = use('Persona');

class RegisterVerifyEmailController {
  async validate ({ request, response }) {
    const token = Encryption.decrypt(request.input('token'));
    
    await Persona.verifyEmail(token);

    return response.ok({
      status: 200,
      message: 'Account validated successfully',
    });
  }
}

module.exports = RegisterVerifyEmailController;
