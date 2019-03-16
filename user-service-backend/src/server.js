let express = require('express');
let bodyParser = require('body-parser');
let app = express();
const port = 2000;
const hostIp = process.env.HOST || "localhost"
const users = require('./services/users');

let preflightRequest = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, authorization");
    next();
}

app.use(bodyParser());
app.use(preflightRequest);
app.use('/users', users);

app.listen(port, hostIp, function() {
  console.log('Server listening on port:', hostIp + ":" + port);
});
