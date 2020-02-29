const express = require('express')
const app = express()
require('dotenv').config();
const massive = require('massive')
const bodyParser = require('body-parser')
const path = require('path');
const logger = require('morgan');

const routes = require('./app/routes/index');
 massive({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
}).then(res =>{
app.set('db', res);

});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', routes);


app.use(function (req, res, next) {
    next();
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers


var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;
    console.log('Email test app listening at http://%s:%s', host, port);


});


app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;