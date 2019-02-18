'use strict'

const Event = use('Event');

Event.on('user::created', 'Auth/SendEmailVerifyEmail.method');
Event.on('forgot::password', 'Auth/SendEmailForgotPassword.method');