'use strict';
import express = require('express');
import debug = require('debug');
import path = require('path');
import mongodb = require('mongodb');
var parser = require('body-parser');
var session = require('express-session');

import routes from './routes/index';
import useradmin from './routes/admin/users';

//var adminPage = require('./routes/admin');

var app = express();
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

//http://tanmaysarkar.com/html-form-with-ejs-template-in-nodejs/
app.use('/', routes);
app.use('/useradmin', useradmin);
//app.use('/admin', adminPage.admin);

// catch 404 and forward to error handler
app.use(function (req, res, next) {    
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'production') {
    app.use((err: any, req, res, next) => {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
