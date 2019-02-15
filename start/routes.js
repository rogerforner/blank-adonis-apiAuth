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

const Route = use('Route');

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
});

Route.group(() => {
  Route.post('register', 'RegisterController.store').validator('AuthRegister');
  Route.post('verify-email/:token', 'RegisterVerifyEmailController.validate');
  Route.post('login', 'LoginController.authenticate').validator('AuthLogin');
}).prefix('auth').namespace('Auth');

Route.group(() => {
  Route.delete('logout', 'LogoutController.deauthenticate');
  Route.put('profile', 'ProfileController.update').validator('AuthProfile');
}).prefix('auth').namespace('Auth').middleware(['auth']);