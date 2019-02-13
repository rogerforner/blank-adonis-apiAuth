'use strict'

const Encryption = use('Encryption');
const Persona    = use('Persona');

class RegisterVerifyEmailController {
  async verify ({ request, response }) {
    const token = Encryption.base64Decode(request.input('token'));
    
    await Persona.verifyEmail(token);

    return response.ok({
      status: 200,
      message: 'Account validated successfully',
    });
  }
}

module.exports = RegisterVerifyEmailController;
