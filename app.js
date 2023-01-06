var fs = require('fs');
var https = require('https');
var express = require('express');
var app = express();
var stringReplace = require('string-replace-middleware');
var port = 8001;
const bodyparser = require('body-parser');
app.use(bodyparser());

var KC_URL = process.env.KC_URL || "https://kcsso.qriar.lab:8443/auth";

app.use(stringReplace({
   'KC_URL': KC_URL
}));
app.use(express.static('.'))

app.get('/', function(req, res) {
    res.render('index.html');
});

var options = {
    key: fs.readFileSync('./ssl/wildcard.key'),
    cert: fs.readFileSync('./ssl/wildcard.crt'),
};

var server = https.createServer(options, app).listen(port, '0.0.0.0', function(){
    console.log("Express server listening on port " + port);
  });
