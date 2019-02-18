> **blank-adonis-apiAuth**, licencia [MIT](https://github.com/rogerforner/blank-adonis-apiAuth/blob/master/LICENCE.md).

- [1. Info](#1-info)
- [2. Enlaces](#2-enlaces)
- [3. Instalación](#3-instalación)
  - [3.1. Configuración](#31-configuración)
  - [3.2. Migraciones](#32-migraciones)
- [4. Servidor de desarrollo](#4-servidor-de-desarrollo)
- [5. Routes](#5-routes)
- [6. Controllers](#5-controllers)

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

- *MAIL_FROM=* Insteraremos el email que queramos que aparezca como remitente. Por ejemplo no-reply@rogerforner.com.

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

┌───────────────────────────┬──────────┬───────────────────────────────────────────────┬────────────────────────┬──────────────────────┬────────┐
│ Route                     │ Verb(s)  │ Handler                                       │ Middleware             │ Name                 │ Domain │
├───────────────────────────┼──────────┼───────────────────────────────────────────────┼────────────────────────┼──────────────────────┼────────┤
│ /                         │ HEAD,GET │ Closure                                       │                        │ /                    │        │
├───────────────────────────┼──────────┼───────────────────────────────────────────────┼────────────────────────┼──────────────────────┼────────┤
│ /auth/register            │ POST     │ Auth/RegisterController.store                 │ av:AuthRegister        │ /register            │        │
├───────────────────────────┼──────────┼───────────────────────────────────────────────┼────────────────────────┼──────────────────────┼────────┤
│ /auth/verify-email/:token │ POST     │ Auth/RegisterVerifyEmailController.validate   │                        │ /verify-email/:token │        │
├───────────────────────────┼──────────┼───────────────────────────────────────────────┼────────────────────────┼──────────────────────┼────────┤
│ /auth/login               │ POST     │ Auth/LoginController.authenticate             │ av:AuthLogin           │ /login               │        │
├───────────────────────────┼──────────┼───────────────────────────────────────────────┼────────────────────────┼──────────────────────┼────────┤
│ /auth/psw-forgot          │ POST     │ Auth/PasswordController.forgotPassword        │                        │ /psw-forgot          │        │
├───────────────────────────┼──────────┼───────────────────────────────────────────────┼────────────────────────┼──────────────────────┼────────┤
│ /auth/psw-update/:token   │ PUT      │ Auth/PasswordController.updatePasswordByToken │ av:AuthPasswordByToken │ /psw-update/:token   │        │
├───────────────────────────┼──────────┼───────────────────────────────────────────────┼────────────────────────┼──────────────────────┼────────┤
│ /auth/logout              │ DELETE   │ Auth/LogoutController.deauthenticate          │ auth                   │ /logout              │        │
├───────────────────────────┼──────────┼───────────────────────────────────────────────┼────────────────────────┼──────────────────────┼────────┤
│ /auth/profile             │ HEAD,GET │ Auth/ProfileController.currentData            │ auth                   │ /profile             │        │
├───────────────────────────┼──────────┼───────────────────────────────────────────────┼────────────────────────┼──────────────────────┼────────┤
│ /auth/profile-update      │ PUT      │ Auth/ProfileController.update                 │ auth,av:AuthProfile    │ /profile-update      │        │
├───────────────────────────┼──────────┼───────────────────────────────────────────────┼────────────────────────┼──────────────────────┼────────┤
│ /auth/psw-update          │ PUT      │ Auth/PasswordController.updatePassword        │ auth,av:AuthPassword   │ /psw-update          │        │
└───────────────────────────┴──────────┴───────────────────────────────────────────────┴────────────────────────┴──────────────────────┴────────┘
```

Encabezado necesario para las peticiones a la API a través de una ruta protegida con el **middleware auth**:

- Authorization: Bearer tokenUsuario

> Es necesario el token del usuario para llevar adelante las peticiones HTTP.

# 6. Controllers

> _app/Controllers_

## 6.1. Auth

Controladores utilizados única y exclusivamente para llevar adelante la autenticación de usuarios así como, también, la obtención de los datos del usuario autentificado.

- **LoginController**: Gestionar la autenticación de los usuarios. Devuelve un token cuyo será utilizado para realizar las peticiones HTTP a través del _middleware auth_.
- **LogoutController**: Gestionar la desautenticación de los usuarios. El equivalente a cerrar la sesión iniciada através del _LoginController_.
- **PasswordController**: Gestionar todas las peticiones relacionadas con el password:
  - **Actualizar paswword** a través del método `updatePassword ({ request, auth, response }) {}`. Útil si el usuario está autentificado (panel de administración).
  - **Actualizar paswword (token)** a través del método `updatePasswordByToken ({ request, params, response }) {}`. Útil si el usuario necesita recuperar el password y no tiene acceso (no auth).
  - Solicitud de **Recuperar password** a través del método `forgotPassword ({ request }) {}`. Conseguiremos el token para el método _updatePasswordByToken()_.
- **ProfileController**: Gestionar todas las peticiones relacionas con el perfil del usuario (email, nombre de usuario, nombre...):
  - **Obtener datos usuario** a través del método `currentData ({ auth }) {}`.
  - **Actualizar datos usuario** a través del método `update ({ request, auth, response }) {}`.
- **RegisterController**: Gestionar el registro de un usuario.