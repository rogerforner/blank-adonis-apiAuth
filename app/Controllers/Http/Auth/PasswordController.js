'use strict'

const Antl       = use('Antl');
const Encryption = use('Encryption');
const Persona    = use("Persona");

class PasswordController {
  // ACTUALIZAR PASSWORD
  // -------------------------------------------------------------------------------------------------------------------
  async updatePassword ({ request, auth, response }) {
    const payload = request.only([
      'old_password',
      'password',
      'password_confirmation'
    ]);

    const user = auth.user;

    await Persona.updatePassword(user, payload);

    return response.status(200).json({
      status: Antl.formatMessage('controllers.authPassword')
    });
  }

  // ACTUALIZAR PASSWORD con un TOKEN
  // -------------------------------------------------------------------------------------------------------------------
  async updatePasswordByToken ({ request, params, response }) {
    const token   = Encryption.base64Decode(params.token);
    const payload = request.only([
      'password',
      'password_confirmation'
    ]);
  
    await Persona.updatePasswordByToken(token, payload);

    return response.status(200).json({
      status: Antl.formatMessage('controllers.authPassword')
    });
  }

  // RECUPERAR PASSWORD
  // -------------------------------------------------------------------------------------------------------------------
  async forgotPassword ({ request }) {
    await Persona.forgotPassword(request.input('uid'));
  }
}

module.exports = PasswordController;
