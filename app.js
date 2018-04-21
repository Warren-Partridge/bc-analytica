const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req, res) => res.send("social-media.js"));


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


app.get('/', (req, res) => {
    res.send(ip.address());
    var agent = useragent.parse(req.headers['user-agent']);
    // console.log(agent.toJSON());
    console.log("Welcome, " + agent.toJSON().family + " user");

    si.osInfo()
        .then(data => console.log(data))
        .catch(error => console.error(error)); // TODO: hostname: 'warrens-air.bc.edu' ... we may be able to get first name from apple users by looking at hostname
});

app.get('/test', (req, res) => {
  const apples = ({
    data: "this is the data"
  });
  res.render('testing', {apples: apples});
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
