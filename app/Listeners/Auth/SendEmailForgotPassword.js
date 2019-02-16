'use strict'

const Encryption = use('Encryption');
const Env        = use('Env');
const Mail       = use('Mail');

const SendEmailForgotPassword = exports = module.exports = {}

SendEmailForgotPassword.method = async ({ user, token }) => {
  Mail.send('emails.auth.forgot-password', {
    user,
    token: Encryption.base64Encode(token),
    url  : Env.get('APP_URL')
  },
  (message) => {
    message.to(user.email).from(Env.get('MAIL_FROM')).subject(Env.get('APP_NAME') + ' | Restore password');
  });
}
