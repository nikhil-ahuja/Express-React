var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var passport = require('passport');
var ora = require('ora');
var config = require('./server/config/config');
var models = require('./server/models');
var routes = require('./server/routes');
var errorHandler = require('./server/responseHandlers/errorHandler');
var passportStrategy = require('./server/services/passportService');

var port = process.env.PORT || 3000;

var app = express();


var compiler = webpack(webpackConfig);

var spinner = ora({
  interval: 100
});

function failAndExit(err) {
  spinner.fail();
  console.error(err.stack);
  process.exit(1);
}

app.use(morgan('combined'));



app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use('/css', express.static(__dirname + '/client/css'));

app.use('/apidoc', express.static(__dirname + '/client/apidoc'));


app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description, Authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {

    res.status(200).send();

  } else {

    // Pass to next layer of middleware
    next();

  }
});

app.use('/', routes);

passport.use(passportStrategy.bearerStrategy());

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/html/index.html'));
});


// errors
app.use(errorHandler);

app.on('error', failAndExit);


app.listen(port, function () {
  console.log("listening on port: "+ port);
});
