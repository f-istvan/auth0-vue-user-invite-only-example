const getAuthenticator = function (config) {
    
    const jwksClient = require('jwks-rsa');
    const jwt = require('jsonwebtoken');
    const rsaClient = jwksClient({
      jwksUri: config.jwksUri
    });
    
    const getKey = function (header, callback) {
        console.log('1 getKey')
        rsaClient.getSigningKey(header.kid, function(err, key) {
          if (err) {
            console.log('error', err);
          }
          var signingKey = key.publicKey || key.rsaPublicKey;
          callback(err, signingKey);
        });
      }
    
    var requiresAuthentication = function(req, res, next) {
    
        //console.log(req)
      
        const token = req['headers']['authorization']
      
        const options = {};
        jwt.verify(token, getKey, options, function(err) {
          if (err) {
            console.log('error', err);
            res.status(400);
            res.send({ 'error': err });
            return
          }
          next();
        });
        
    };

    return requiresAuthentication;
}

module.exports = {
    getAuthenticator: getAuthenticator
}