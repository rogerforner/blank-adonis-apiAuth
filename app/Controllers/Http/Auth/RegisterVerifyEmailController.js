'use strict'

const Encryption = use('Encryption');
const Persona    = use('Persona');

class RegisterVerifyEmailController {
  async validate ({ params, response }) {
    const token = Encryption.base64Decode(params.token);
    
    await Persona.verifyEmail(token);

    return response.ok({
      status: 200,
      message: 'Email verified successfully'
    });
  }
}

module.exports = RegisterVerifyEmailController;
