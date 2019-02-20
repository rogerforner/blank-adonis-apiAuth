> **blank-adonis-apiAuth**, licencia [MIT](https://github.com/rogerforner/blank-adonis-apiAuth/blob/master/LICENCE.md).

---

- [1. Info](#1-info)
- [2. Enlaces](#2-enlaces)
- [3. Instalación](#3-instalación)
  - [3.1. Configuración](#31-configuración)
  - [3.2. Migraciones](#32-migraciones)
- [4. Servidor de desarrollo](#4-servidor-de-desarrollo)
- [5. Routes](#5-routes)
- [6. Controllers](#5-controllers)
  - [6.1. Auth](#61-auth)
- [7. Listeners](#7-listeners)
  - [7.1. Auth](#71-auth)
- [8. Middleware](#8-middleware)
- [9. Validators](#9-validators)

# 1. Info

> API realizada con el framework de _Node.js_ **Adonis.js**.

```bash
> adonis new nombreProyecto --api-only
```

La intención de este repositorio es la de ahorrarnos tiempo cada vez que queramos iniciar un proyecto **API** que requiera de autenticación de usuarios.

# 2. Enlaces

**Principales**:

- [Adonis](https://adonisjs.com/)
- [Adonis, Documentación](https://adonisjs.com/docs/4.1/installation)

**Consultados**:

- [Iniciando com AdonisJS: Autenticação JWT e API REST](https://blog.rocketseat.com.br/adonis-auth-jwt-api-rest/)
- [Adonis Tutorial - JWT Authentication](https://www.techiediaries.com/adonis-jwt-authentication/)
- [Lausanne-eSports/api.els.team](https://github.com/Lausanne-eSports/api.els.team)
- [How to prevent default html reponse on api only project errors?](https://github.com/adonisjs/adonis-framework/issues/919)
  - Para visualizar las respuestas en JSON y no html hay que modificar la variable `NODE_ENV=development` a `NODE_ENV=production`.
- [Anexo:Códigos de estado HTTP](https://es.wikipedia.org/wiki/Anexo:C%C3%B3digos_de_estado_HTTP)

# 3. Instalación

Descargamos el repositorio con [git](https://git-scm.com/).

```bash
> git clone https://github.com/rogerforner/blank-adonis-apiAuth.git nombreProyecto

> cd nombreProyecto
```

Instalamos las dependencias con [npm](https://www.npmjs.com/).

```bash
> npm install
```

**Dependencias** (_package.json_):

```bash
"dependencies": {
  "@adonisjs/ace": "^5.0.8",
  "@adonisjs/auth": "^3.0.7",
  "@adonisjs/bodyparser": "^2.0.5",
  "@adonisjs/cors": "^1.0.7",
  "@adonisjs/fold": "^4.0.9",
  "@adonisjs/framework": "^5.0.9",
  "@adonisjs/ignitor": "^2.0.8",
  "@adonisjs/lucid": "^6.1.3",
  "@adonisjs/mail": "^3.0.9",
  "@adonisjs/persona": "^1.0.5",
  "@adonisjs/validator": "^5.0.6",
  "sqlite3": "^4.0.6"
},
```

> "sqlite3" cambiará dependiendo del tipo de gestor [de base de datos que se vaya a utilizar](https://adonisjs.com/docs/4.1/database).

## 3.1. Configuración

Copiamos el archivo _.env.example_ a _.env_ e insertamos todos los datos necesarios.

```bash
> cp .env.example .env
```

Generamos la APP_KEY.

```bash
> adonis key:generate
```

**Variables propias**:

- `APP_LOCALE=` Insertaremos el código de idioma [ISO639](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) tal y como se explica en la [documentación de Adonis (Internationalization)](https://adonisjs.com/docs/4.1/internationalization). El directorio en el que generar más idiomas/traducciones es _resources/locales_.
- `MAIL_FROM=` Insteraremos el email que queramos que aparezca como remitente. Por ejemplo `MAIL_FROM=no-reply@rogerforner.com`.

## 3.2. Migraciones

Ejecutar el siguente comando para llevar adelante las migraciones.

```bash
> adonis migration:run
```

# 4. Servidor de desarrollo

```bash
> adonis serve --dev
```

# 5. Routes

> _start/routes.js_

```bash
> adonis route:list

┌───────────────────────────┬──────────┬───────────────────────────────────────────────┬───────────────────────────────┬──────────────────────┬────────┐
│ Route                     │ Verb(s)  │ Handler                                       │ Middleware                    │ Name                 │ Domain │
├───────────────────────────┼──────────┼───────────────────────────────────────────────┼───────────────────────────────┼──────────────────────┼────────┤
│ /                         │ HEAD,GET │ Closure                                       │                               │ /                    │        │
├───────────────────────────┼──────────┼───────────────────────────────────────────────┼───────────────────────────────┼──────────────────────┼────────┤
│ /auth/register            │ POST     │ Auth/RegisterController.store                 │ av:AuthRegister               │ /register            │        │
├───────────────────────────┼──────────┼───────────────────────────────────────────────┼───────────────────────────────┼──────────────────────┼────────┤
│ /auth/verify-email/:token │ POST     │ Auth/RegisterVerifyEmailController.validate   │                               │ /verify-email/:token │        │
├───────────────────────────┼──────────┼───────────────────────────────────────────────┼───────────────────────────────┼──────────────────────┼────────┤
│ /auth/login               │ POST     │ Auth/LoginController.authenticate             │ av:AuthLogin                  │ /login               │        │
├───────────────────────────┼──────────┼───────────────────────────────────────────────┼───────────────────────────────┼──────────────────────┼────────┤
│ /auth/psw-forgot          │ POST     │ Auth/PasswordController.forgotPassword        │                               │ /psw-forgot          │        │
├───────────────────────────┼──────────┼───────────────────────────────────────────────┼───────────────────────────────┼──────────────────────┼────────┤
│ /auth/psw-update/:token   │ PUT      │ Auth/PasswordController.updatePasswordByToken │ av:AuthPasswordByToken        │ /psw-update/:token   │        │
├───────────────────────────┼──────────┼───────────────────────────────────────────────┼───────────────────────────────┼──────────────────────┼────────┤
│ /auth/register-unverified │ POST     │ Auth/RegisterController.unverified            │ auth                          │ /register-unverified │        │
├───────────────────────────┼──────────┼───────────────────────────────────────────────┼───────────────────────────────┼──────────────────────┼────────┤
│ /auth/logout              │ DELETE   │ Auth/LogoutController.deauthenticate          │ auth,verified                 │ /logout              │        │
├───────────────────────────┼──────────┼───────────────────────────────────────────────┼───────────────────────────────┼──────────────────────┼────────┤
│ /auth/profile             │ HEAD,GET │ Auth/ProfileController.currentData            │ auth,verified                 │ /profile             │        │
├───────────────────────────┼──────────┼───────────────────────────────────────────────┼───────────────────────────────┼──────────────────────┼────────┤
│ /auth/profile-update      │ PUT      │ Auth/ProfileController.update                 │ auth,verified,av:AuthProfile  │ /profile-update      │        │
├───────────────────────────┼──────────┼───────────────────────────────────────────────┼───────────────────────────────┼──────────────────────┼────────┤
│ /auth/psw-update          │ PUT      │ Auth/PasswordController.updatePassword        │ auth,verified,av:AuthPassword │ /psw-update          │        │
└───────────────────────────┴──────────┴───────────────────────────────────────────────┴───────────────────────────────┴──────────────────────┴────────┘
```

Encabezado necesario para las peticiones a la API a través de una ruta protegida con el **middleware auth**:

- Authorization: Bearer tokenUsuario

> Es necesario el token del usuario para llevar adelante las peticiones HTTP.

# 6. Controllers

> _app/Controllers/Http_

## 6.1. Auth

Controladores utilizados única y exclusivamente para llevar adelante la autenticación de usuarios así como, también, la obtención de los datos del usuario autentificado.

- **LoginController**: Gestionar la autenticación de los usuarios. Devuelve un token cuyo será utilizado para realizar las peticiones HTTP a través del _middleware auth_.
- **LogoutController**: Gestionar la desautenticación de los usuarios. El equivalente a cerrar la sesión iniciada através del _LoginController_.
- **PasswordController**: Gestionar todas las peticiones relacionadas con el password:
  - **Actualizar password** a través del método `updatePassword ({ request, auth, response }) {}`. Útil si el usuario está autentificado (panel de administración).
  - **Actualizar password (token)** a través del método `updatePasswordByToken ({ request, params, response }) {}`. Útil si el usuario necesita recuperar el password y no tiene acceso (no auth).
  - Solicitud de **Recuperar password** a través del método `forgotPassword ({ request }) {}`. Conseguiremos el token para el método _updatePasswordByToken()_.
- **ProfileController**: Gestionar todas las peticiones relacionas con el perfil del usuario (email, nombre de usuario, nombre...):
  - **Obtener datos usuario** a través del método `currentData ({ auth }) {}`.
  - **Actualizar datos usuario** a través del método `update ({ request, auth, response }) {}`.
- **RegisterController**: Gestionar el registro de un usuario.
  - **Registrar/Crear el usuario** a través del método `store ({ request, auth, response }) {}`.
  - **Reenviar email de verificación** a través del método `unverified ({ auth }) {}`.
- **RegisterVerifyEmailController**: Gestionar si un usuario ha verificado su cuenta haciendo clic en el enlace enviado a través de correo electrónico.

# 7. Listeners

> _app/Listeners_

Los "listeners" son llamados a través de los eventos, cuyos se encuentran en _start/events.js_. Mirar la documentación de [Persona](https://github.com/adonisjs/adonis-persona#events-emitted), además de la propia de [Adonis (Events)](https://adonisjs.com/docs/4.1/events).

```js
// start/events.js

Event.on('user::created', 'Auth/SendEmailVerifyEmail.method');
Event.on('forgot::password', 'Auth/SendEmailForgotPassword.method');
```

## 7.1. Auth

- **SendEmailForgotPassword**: Enviar un correo electrónico de recuperación de contraseña.
- **SendEmailVerifyEmail**: Enviar un correo electrónico cuando se registra un usuario con la intención de verificar la cuenta.

# 8. Middleware

> _app/Middleware_

- **EmailVerified**: Controlar el estado de verificación del email del usuario.
- **ForceJson**: Forzar las respuestas en JSON. Por ejemplo, evitar las respuestas de errores en HTML.

# 9. Validators

> _app/Validators_

- **AuthLogin**: Validar los datos necesarios para efectuar el login/autenticación del usuario.
- **AuthPassword**: Validar los datos necesarios para actualizar el password del usuario (auth - panel de administración).
- **AuthPasswordByToken**: Validar los datos necesarios para actualizar el password del usuario (no auth - recuperar password).
- **AuthProfile**: Validar los datos que forman el perfil del usuario (sin tener en cuenta sus uids).
- **AuthRegister**: Validar los datos necesarios para efectuar el registro de un usuario.