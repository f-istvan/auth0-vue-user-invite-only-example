# Vue Auth0 User invite-only example app

## Application setup

### Auth0 account and tenant creation
1) Go to `Auth0.com`, create an account and log in
2) In auth0 create a new tenant. It is `vue-invite-only-tenant` in my case

### Create an application for the backend
In auth0 create a new application for the backend:

1) Choose `Machine 2 Machine App` application type.
2) Give it a name. In my case it is: `m2m-vue-invite-only-app-backend`
3) In case you are prompted for API select the `Auth0 Management API`
4) Select all the scopes
5) Open `Settings` and add the followings
    1) Allowed Web Origins: `http://localhost:8080`

### Create an application for the frontend
In auth0 create a new application for the frontend:
1) Choose `Single Page Application` application type.
2) Name in my case: `spa-vue-invite-only-app-frontend`
3) Open `Settings` and add the followings
    1) Allowed Callback URLs: `http://localhost:8080/login-callback`
    2) Allowed Web Origins: `http://localhost:8080`
    3) Allowed Logout URLs: `http://localhost:8080/login` (yes, it is `/login`)

### Create a new connection
In auth0 create a new connection:
1) Type `Database`
2) Name in my case: `vue-invite-only-app-db-connection`
3) In `Settings` tab:
    1) Check `Disable Sign Ups`
    3) In `Applications` tab check `m2m-vue-invite-only-app-backend` and `spa-vue-invite-only-app-frontend`
4) Now reopen the settings of the `spa-vue-invite-only-app-frontend` application. Go to `Connections` tab and 
    1) enable `vue-invite-only-app-db-connection` database
    2) disable `Username-Password-Authentication` database 
    3) disable all social authentication like `google-oauth2`

### Create a Rule
In auth0 open `Rules` and create one:
1) Type `empty rule`
2) Name in my case: `vue-invite-only-app-namespacing-rule`
3) Copy and paste the following content and save:
```js
function (user, context, callback) {
  const namespace = 'http://prod.vue-invite-only-app/roles';
  if (typeof user.app_metadata !== 'undefined') {
    context.idToken[namespace] = user.app_metadata.roles;
  }
  callback(null, user, context);
}
```

### Email Setup
For testing purposes the default auth0 email settings should be ok. The only problem I had is that I received the emails in my spam folder.

### Create app config files

#### Backend
1) In `./user-service-backend/src/config` create a `global.conf.js` file and copy the content of `example.conf.js` into it.
2) Open `global.conf.js` and fill out the `'<>'` placeholders. In auth0 open `m2m-vue-invite-only-app-backend` app settings. Copy and paste the values (Domain, Client ID, Client Secret) from there into the config (auth0Connection is the name of the connection: `vue-invite-only-app-db-connection`).

It should look something like this:
```js
const domain = 'vue-invite-only-tenant.auth0.com';
const clientId = 'vmBr0NnhaN71vpyjcPcbNa9IjweYCDoi';
const clientSecret = '***';
const auth0Connection = 'vue-invite-only-app-db-connection';
```

#### Frontend
1) In `./front-end/app-config` create a `global.conf.js` file and copy the content of `example.conf.js` into it.
2) Open `global.conf.js` and fill out the `'"<>"'` placeholders.

Values:
1) For `AUTH0.DOMAIN` and `AUTH0.FRONT_END_CLIENT_ID` open  `spa-vue-invite-only-app-frontend` application setting in auth0.
2) `AUTH0.CONNECTION` is `"vue-invite-only-app-db-connection"`
3) `AUTH0.WEB_AUTH_CLIENT_ID` is the client ID of `m2m-vue-invite-only-app-backend`
4) `USER_SERVICE.BACKEND_HOST` is `"http://localhost:2000"`
5) `AUTH0.OIDC_CLAIM_CUSTOM_NAMESPACE` is `"http://prod.vue-invite-only-app"` (see `vue-invite-only-app-namespacing-rule` rule)

NOTE: In this config you have to keep the double quotes for the values. E.g.: `'"http://localhost:2000"'`

Example config:

```js
'use strict'

module.exports = {
  AUTH0: {
    DOMAIN: '"vue-invite-only-tenant.auth0.com"',
    FRONT_END_CLIENT_ID: '"IehWeLbRSiVVIAlkCjvrla3r5hThCNwj"',

    WEB_AUTH_CLIENT_ID: '"vmBr0NnhaN71vpyjcPcbNa9IjweYCDoi"',
    CONNECTION: '"vue-invite-only-app-db-connection"',

    OIDC_CLAIM_CUSTOM_NAMESPACE: '"http://prod.vue-invite-only-app"'
  },

  USER_SERVICE: {
    BACKEND_HOST: '"http://localhost:2000"'
  }
}
```

## Running the Application

### Create the first user
Since this is an invite-only app you need to create your first (admin) user manually.
1) Go to auth0 and create a user. The `Connection` is `vue-invite-only-app-db-connection`.
2) In `User Details` go to `app_metadata` and paste the following json than save:
```json
{
  "roles": [
    "admin"
  ]
}
```

### Start the application on your localhost
In project root run:

```bash
docker-compose up --build
```

Open your browser on `localhost:8080` and log in with your admin user.
