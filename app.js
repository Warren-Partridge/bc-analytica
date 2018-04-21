const express = require('express');
const app = express();
const path = require('path');


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
