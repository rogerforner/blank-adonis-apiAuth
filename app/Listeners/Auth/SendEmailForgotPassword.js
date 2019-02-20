'use strict'

const Encryption = use('Encryption');
const Env        = use('Env');
const Mail       = use('Mail');

const SendEmailForgotPassword = exports = module.exports = {}

SendEmailForgotPassword.method = async ({ user, token }) => {
  let appUrl;

  if (Env.get('APP_URL_VIEW')) {
    appUrl = Env.get('APP_URL_VIEW');
  } else {
    appUrl = Env.get('APP_URL');
  }

  Mail.send('emails.auth.forgot-password', {
    user,
    token: Encryption.base64Encode(token),
    url  : appUrl
  },
  (message) => {
    message.to(user.email).from(Env.get('MAIL_FROM')).subject(Env.get('APP_NAME') + ' | Restore password');
  });
}
