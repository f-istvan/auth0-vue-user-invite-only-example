let express = require('express');
let users = express();

try {
    var config = require('../config/global.conf.js');
} catch (e) {
    console.log("PLEASE CREATE YOUR './global.conf.js' based on 'example.conf.js'")
    console.error(e)
    return false;
}

const requiresAuthentication = require('../utils/Authenticator').getAuthenticator(config);
const ManagementClient = require('auth0').ManagementClient;
const generatePassword = require('../utils/PasswordGenerator').generatePassword;

let managementClient = new ManagementClient({
    domain: config.domain,
    clientId: config.clientId,
    clientSecret: config.clientSecret
});

let createUserData = function (payload) {
    return {
        "connection": config.connection,
        "email": payload.email,
        "password": generatePassword(),
        "email_verified": true,
        "app_metadata": payload.appMetadata 
    }
}

users.post('/', requiresAuthentication, function (req, res) {

    const payload = req['body']
    let userData = createUserData(payload)
    console.log('userData', userData)
  
    managementClient.createUser(userData, function (err) {
        if (err) {
            res.status(400);
            res.send({ "error": err });
            console.error("message", err.message)
            return
        }
        let userCreated = { 
            "email": userData.email,
            "app_metadata": userData.app_metadata 
        };
        console.log('User created: ', userCreated);
        res.send(userCreated);
        return
    });
  })

module.exports = users
