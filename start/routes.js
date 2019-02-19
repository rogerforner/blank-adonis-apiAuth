'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Env   = use('Env');
const Route = use('Route');

Route.get('/', () => {
  return {
    this  : Env.get('APP_NAME'),
    uptime: process.uptime()
  };
});

// AUTENTICACIÓN
// ---------------------------------------------------------------------------------------------------------------------
Route.group(() => {
  Route.post('register', 'RegisterController.store').validator('AuthRegister');
  Route.post('verify-email/:token', 'RegisterVerifyEmailController.validate');
  Route.post('login', 'LoginController.authenticate').validator('AuthLogin');
  Route.post('psw-forgot', 'PasswordController.forgotPassword');
  Route.put('psw-update/:token', 'PasswordController.updatePasswordByToken').validator('AuthPasswordByToken');
}).prefix('auth').namespace('Auth');

Route.group(() => {
  Route.post('register-unverified', 'RegisterController.unverified');
}).prefix('auth').namespace('Auth').middleware(['auth']);

Route.group(() => {
  Route.delete('logout', 'LogoutController.deauthenticate');
  Route.get('profile', 'ProfileController.currentData');
  Route.put('profile-update', 'ProfileController.update').validator('AuthProfile');
  Route.put('psw-update', 'PasswordController.updatePassword').validator('AuthPassword');
}).prefix('auth').namespace('Auth').middleware(['auth', 'verified']);