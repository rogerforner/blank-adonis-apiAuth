'use strict'

class LogoutController {
  async deauthenticate ({ response, auth }) {
    const headerToken = auth.getAuthHeader();

    await auth.revokeTokens([headerToken], true);

    return response.ok({
      status: 200,
      message: 'Logged out successfully'
    });
  }
}

module.exports = LogoutController;
