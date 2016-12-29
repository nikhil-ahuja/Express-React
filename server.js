var stormpath = require('express-stormpath');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var User = require('./models/user');
var ora = require('ora');
var mongoose = require('mongoose');
var config = require('./config');
var routes = require('./routes');
var errorHandler = require('./responseHandlers/errorHandler');

var port = process.env.PORT || 3000;

var app = express();

mongoose.connect(config.database.url);
mongoose.connection.on('error', function () {
  console.log('mongodb connection error');
});

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

app.use('/css', express.static(__dirname + '/src/css'));

app.use('/apidoc', express.static(__dirname + '/src/apidoc'));

app.use(stormpath.init(app, {
  // Disable logging until startup, so that we can catch errors
  // and display them nicely.
  debug: 'none',
  web: {
    produces: ['application/json'],
    me: {
      expand: {
        customData: true
      }
    },
    register: {
      form: {
        fields: {
          color: {
            enabled: true,
            label: 'Color',
            placeholder: 'E.g. blue',
            type: 'text'
          }
        }
      }
    }
  },
  postRegistrationHandler: function (account, req, res, next) {

    function writeError(message) {
      res.status(400);
      res.json({ message: message, status: 400 });
      res.end();
    }
    console.log('user: '+ account.email);
    var user = new User({ firstName: req.body.givenName, lastName: req.body.surname, email: req.body.email, password: req.body.password});
    user.save(function (err) {
      if (err) return writeError(err);
      else{
        next();
      }
    });


  }
}));

app.use('/', routes);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'src/html/index.html'));
});



spinner.text = 'Starting Dev Sever on port ' + port;
spinner.start();

// errors
app.use(errorHandler);

app.on('error', failAndExit);
app.on('stormpath.error', failAndExit);

app.listen(port, function () {
  spinner.succeed();
  spinner.text = 'Initializing Stormpath';
  spinner.start();
  app.on('stormpath.ready', function () {
    spinner.succeed();
    console.log('\nListening at http://localhost:' + port);
    // Now bring back error logging.
    app.get('stormpathLogger').transports.console.level = 'error';
  });
});