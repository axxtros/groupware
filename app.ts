﻿'use strict';
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var i18n = require("i18n-express");

import mongodb = require('mongodb');
import debug = require('debug');
import path = require('path');

import routes from './routes/index';
import useradmin from './routes/admin/users';

var app = express();

//session-based authentication example
//https://www.codementor.io/emjay/how-to-build-a-simple-session-based-authentication-system-with-nodejs-from-scratch-6vn67mcy3
//session tutorials
//https://github.com/expressjs/session#readme
//https://www.tutorialspoint.com/expressjs/expressjs_sessions.htm

//session beállítások
//app.use(session({ secret: 'ssshhhhh' }));     //deprecated
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({                               //így kell a session konfigurációt elvégezni, ez már így nem deprecated, segítség az egyes opciókhoz: https://www.npmjs.com/package/express-session
    key: 'groupware_sid',
    secret: 'ssshhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));


//i18n tutorial
////https://www.npmjs.com/package/i18n-express

//i18n beállítások
app.use(i18n({
    translationsPath: path.join(__dirname, 'i18n'), // <--- use here. Specify translations files path.
    siteLangs: ["en", "hu"],
    textsVarName: 'translation'
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
