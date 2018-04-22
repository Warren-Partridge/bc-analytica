const express = require('express');
const app = express();
const path = require('path');
const remoteip = require('remoteip');


// For getting ip info
const ip = require('ip');
const iploc = require('iplocation');

// For getting browser info
const useragent = require('useragent');
const si = require('systeminformation');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;

// view engine setup
var hbs = require('express-handlebars')({
    extname: '.hbs',
});
app.engine('hbs', hbs);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));


passport.use(new Strategy({
    clientID: "359392861234682",
    clientSecret: "7f1e095cf413e5ad62993edaa57e83c7",
    callbackURL: "http://localhost:3000/login/facebook/return"
  },
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());

app.get('/login/facebook',
  passport.authenticate('facebook'));

app.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/', (req, res) => {
  var ipAddress = remoteip.get(req);
  console.log(ipAddress);
    res.render('index');
});

// Get the IP address for the user.





app.listen(8080, () => console.log('Example app listening on port 8080!'));
