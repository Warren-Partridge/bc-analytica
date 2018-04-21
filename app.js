const express = require('express');
const app = express();
const path = require('path');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;


// For getting ip info
const ip = require('ip');
const iploc = require('iplocation');

// For getting device and browser info
const useragent = require('useragent');
const si = require('systeminformation');

// view engine setup
var hbs = require('express-handlebars')({
  extname: '.hbs'
});
app.engine('hbs', hbs);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


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


app.get('/test', (req, res) => {
    si.osInfo()
        .then(data => console.log(data))
        .catch(error => console.error(error)); // TODO: hostname: 'warrens-air.bc.edu' ... we may be able to get first name from apple users by looking at hostname
});

app.get('/', (req, res) => {
    var agent = useragent.parse(req.headers['user-agent']);

    const userData = ({
        ipAddress: ip.address(),
        browserFamily: agent.toJSON().family,
        osInfo: "TODO: Get asynchonously"
    });
    res.render('index', {userData: userData});
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
