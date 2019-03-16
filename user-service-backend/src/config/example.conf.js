const domain = '<>';
const clientId = '<>';
const clientSecret = '<>';
const auth0Connection = '<>';

/**
  Auth0 exposes a JWKS endpoint for each tenant, which is found at
  https://YOUR_DOMAIN/.well-known/jwks.json. 
  This endpoint will contain the JWK used to sign 
  all Auth0-issued JWTs for this tenant.
**/
const jwksUri = 'https://' + domain + '/.well-known/jwks.json'

module.exports = {
	jwksUri: jwksUri,
	domain: domain,
	clientId: clientId,
	clientSecret: clientSecret,
	connection: auth0Connection
};
