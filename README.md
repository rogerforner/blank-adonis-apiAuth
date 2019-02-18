> **blank-adonis-apiAuth**, licencia [MIT](https://github.com/rogerforner/blank-adonis-apiAuth/blob/master/LICENCE.md).

# Info

> API realizada con el framework de _Node.js_ Adonis.

La intención de este repositorio es la de ahorrarnos tiempo cada vez que queramos iniciar un proyecto **API** que requiera de autenticación de usuarios.

# Enlaces

**Principales**:

- [Adonis](https://adonisjs.com/)
- [Adonis, Documentación](https://adonisjs.com/docs/4.1/installation)

**Consultados**:

- [Iniciando com AdonisJS: Autenticação JWT e API REST](https://blog.rocketseat.com.br/adonis-auth-jwt-api-rest/)
- [Adonis Tutorial - JWT Authentication](https://www.techiediaries.com/adonis-jwt-authentication/)
- [Lausanne-eSports/api.els.team](https://github.com/Lausanne-eSports/api.els.team)
- [How to prevent default html reponse on api only project errors?](https://github.com/adonisjs/adonis-framework/issues/919)
  - Para visualizar las respuestas en JSON y no html hay que modificar la variable `NODE_ENV=development` a `NODE_ENV=production`.

# Instalación

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

## Configuración

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

## Migraciones

Ejecutar el siguente comando para llevar adelante las migraciones.

```bash
> adonis migration:run
```

# Servidor de desarrollo

```bash
> adonis serve --dev
```

# Routes

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

> Es necesario el token del usuario para llevar adelante las peticiones http.