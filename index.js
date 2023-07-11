var express = require('express');
var path = require('path');
var PORT = process.env.PORT || 5000;
var pg = require('pg');
const cors = require("cors");
// var bodyParser = require('body-parser')

var sendEmails = require('./api/nodeEmails.js');
require("dotenv").config();
var request = require('./api/vonage/request.js');
var verify = require('./api/vonage/verify.js');
var cancel = require('./api/vonage/cancel.js');

// amazzon s3 storage config
var config = {
  host: 'ec2-54-225-107-174.compute-1.amazonaws.com',
  user: 'kdybyyzmkneukt',
  database: 'db1c9f93sqh3e3',
  password: '617bbd402bbebce800141115595154c915710ae84141f29ee8726f7f7c9e5a9e',
  port: 5432
};

var app = express();

app.use(cors());
// app.use(bodyParser.json())
app.use(express.json());

console.log(sendEmails);

app.post('/api/nodeEmails', sendEmails.sendAdminEmail, sendEmails.sendCustomerEmail);

app.get('/*', function (req, res, next) {
  // console.log("Comes in general application star get test if url requires image or")
  if (req.url.indexOf("/images/") === 0 || req.url.indexOf("/stylesheets/") === 0) {
    res.setHeader("Cache-Control", "public, max-age=2592000");
    res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
  }
  next();
});

app.post('/api/vonage/request', request.request);
app.post('/api/vonage/verify', verify.verify);
app.post('/api/vonage/cancel', cancel.cancel);
// app.post('/api/vonage/request', request);
// app.post('/api/vonage/verify', verify);
// app.post('/api/vonage/cancel', cancel);

app.use(express.static(__dirname + '/public', {
  maxAge: 86400000,
  setHeaders: function (res, path) {
    res.setHeader("Expires", new Date(Date.now() + 2592000000 * 30).toUTCString());
  }
}))

app.use(express.static(path.join(__dirname, 'public_html'))).listen(PORT, function () {
  return console.log('Listening on ' + PORT);
});

app.use('/awo_form', express.static(path.join(__dirname, 'awo_form/')))

app.get('/awo_form/', function (req, res) {
  console.log("Comes in get of form");
  res.sendFile(path.join(__dirname, 'awo_form/', 'index.html'));
});

// app.use(express.static(path.join(__dirname, 'public_html'))).set('view engine', 'ejs').get('/', function (req, res) {
//     return res.render('pages/index');
// }).listen(PORT, function () {
//     return console.log('Listening on ' + PORT);
// });