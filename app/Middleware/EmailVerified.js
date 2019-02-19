'use strict'

class EmailVerified {
  async handle ({ request, auth, response }, next) {
    const userAccountStatus = auth.user.account_status;

    if (userAccountStatus == 'pending') {
      return response.status(403).json({
        status: 'The email has not been verified'
      });
    }

    await next();
  }
}

module.exports = EmailVerified;
