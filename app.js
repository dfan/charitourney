/**
 * Module dependencies.
 */
var express = require('express');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var lusca = require('lusca');
var methodOverride = require('method-override');

var _ = require('lodash');
var Sequelize = require('sequelize');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var flash = require('express-flash');
var path = require('path');
var passport = require('passport');
var expressValidator = require('express-validator');
var connectAssets = require('connect-assets');

/**
 * Models
 */
 var models = require('./models');

/**
 * Controllers (route handlers).
 */
var homeController = require('./controllers/home');
var userController = require('./controllers/user');
var battleController = require('./controllers/battle');
var tournamentController = require('./controllers/tournament');
var contactController = require('./controllers/contact');
var paymentsController = require('./controllers/payment');

/**
 * API keys and Passport configuration.
 */
var secrets = require('./config/secrets');
var passportConf = require('./config/passport');

/**
 * Create Express server.
 */
var app = express();

/**
 * Connect to Postgres.
 */
var sequelizeStore = new SequelizeStore({ db: models.sequelize });
sequelizeStore.sync();

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(connectAssets({
  paths: [path.join(__dirname, 'public/css'), path.join(__dirname, 'public/js')]
}));
app.use(logger('dev'));
app.use(favicon(path.join(__dirname, 'public/favicon.png')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secrets.sessionSecret,
  store: sequelizeStore
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca({
  //csrf: true,
  xframe: 'SAMEORIGIN',
  xssProtection: true
}));
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});
app.use(function(req, res, next) {
  if (/api/i.test(req.path)) req.session.returnTo = req.path;
  next();
});
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

/**
 * Primary app routes.
 */
app.get('/', homeController.index);
app.get('/battle', battleController.get_battle);
app.post('/battle', battleController.post_battle);

// TOURNAMENT
app.get('/tournament/', tournamentController.getIndex);
app.get('/tournament/join', tournamentController.getTournamentJoin);
app.post('/tournament/join', tournamentController.postTournamentJoin);

// PAYMENT TEST
app.get('/payments_test', paymentsController.getPaymentsTest);
app.get('/client_token', paymentsController.getClientToken);
app.post('/payment_methods', paymentsController.postPaymentMethods);

app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/contact', contactController.getContact);
app.post('/contact', contactController.postContact);
app.get('/account', passportConf.isAuthenticated, userController.getAccount);
app.post('/account/profile', passportConf.isAuthenticated, userController.postUpdateProfile);
app.post('/account/delete', passportConf.isAuthenticated, userController.postDeleteAccount);
app.get('/account/unlink/:provider', passportConf.isAuthenticated, userController.getOauthUnlink);

app.get('/api', function (req, res) {
  res.redirect('/tournament');
});


/* Twilio Stuff ***/

/*
var accountSid = 'PN36f2dcde70462cdac4d93f75bb19cc8c';
var authToken = "{{ auth_token }}";
var client = require('twilio')(accountSid, authToken);
 
client.messages.create({
    body: "Jenny please?! I love you <3",
    to: "+19083920562",
    from: "+17323054562’",
    mediaUrl: "http://www.example.com/hearts.png"
}, function(err, message) {
    process.stdout.write(message.sid);
});
*/


/*
//require the Twilio module and create a REST client
var ACCOUNT_SID = 'AC1ea0cf6b6d08448a23c18b65c2fd0283';
var AUTH_TOKEN = "756b3c09c006af28e75a4af448046f73";
var client = require('twilio')('AC1ea0cf6b6d08448a23c18b65c2fd0283', '756b3c09c006af28e75a4af448046f73');


//Send an SMS text message
      client.sendMessage({

          to:'+19083920562', // Any number Twilio can deliver to
          from: '+17323054562', // A number you bought from Twilio and can use for outbound communication
          body: 'word to your mother.' // body of the SMS message

      }, function(err, responseData) { //this function is executed when a response is received from Twilio

          if (!err) { // "err" is an error received during the request, if any

              // "responseData" is a JavaScript object containing data received from Twilio.
              // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
              // http://www.twilio.com/docs/api/rest/sending-sms#example-1

              console.log(responseData.from); // outputs "+14506667788"
              console.log(responseData.body); // outputs "word to your mother."

          }
      });
/*



/**
 * OAuth authentication routes. (Sign in)
 */
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});

/**
 * Error Handler.
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;



