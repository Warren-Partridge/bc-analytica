const express = require('express');
const app = express();
const path = require('path');


// For getting ip info
const ip = require('ip');
const iploc = require('iplocation');

// For getting browser info
const useragent = require('useragent');
const si = require('systeminformation');

// view engine setup
var hbs = require('express-handlebars')({
    extname: '.hbs',
});
app.engine('hbs', hbs);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
