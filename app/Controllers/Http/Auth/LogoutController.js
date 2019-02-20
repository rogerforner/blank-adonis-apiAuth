'use strict'

const Antl = use('Antl');

class LogoutController {
  async deauthenticate ({ response, auth }) {
    const headerToken = auth.getAuthHeader();

    await auth.revokeTokens([headerToken], true);

    return response.status(200).json({
      status: Antl.formatMessage('controllers.authLogout')
    });
  }
}

module.exports = LogoutController;
