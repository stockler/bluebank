'use strict';

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let helmet = require('helmet');
let compression = require('compression');
let session = require('express-session');


app.use(compression());
app.use(helmet());
app.set('trust proxy', 1) // trust first proxy
app.use( session({
   secret : 'GSW_ATM!!@.@',
   name : 'sessionId',
   proxy: true,
   resave: true,
   saveUninitialized: true
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(process.env.PORT || 8080);
console.log('Bluebank is running on 8080');