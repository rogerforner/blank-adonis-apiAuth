'use strict'

const Encryption = use('Encryption');
const Env        = use('Env');
const Mail       = use('Mail');

const SendEmailAuthRegisterVerification = exports = module.exports = {}

SendEmailAuthRegisterVerification.method = async (user, token) => {
  Mail.send('emails.auth-register-verification', {
    user,
    token: Encryption.base64Encode(token),
    url  : Env.get('APP_URL')
  },
  (message) => {
    message.to(user.email).from(Env.get('MAIL_FROM')).subject(Env.get('APP_NAME') + ' | Email verification');
  });
}
