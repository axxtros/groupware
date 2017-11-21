'use strict';
var express = require('express');
//var cookieParser = require('cookie-parser');
var session = require('express-session');
import async = require('async');
const router = express.Router();

import * as constans from '../helpers/Constains';
import * as templateJSONRenderCtrl from '../helpers/TemplateRenderControl';
import * as mongoDbControl from '../middlewears/MongoDBControl';

var app = express();

//session oldalak
//https://github.com/expressjs/session#readme
//https://www.tutorialspoint.com/expressjs/expressjs_sessions.htm
//app.set('trust proxy', 1) // trust first proxy
//app.use(cookieParser());
//app.use(session({
//    secret: 'keyboard cat',
//    resave: false,
//    saveUninitialized: true,
//    cookie: { secure: false }
//}));

var sess;
var loginMsg: string;

router.post('/login', function (req, res) {
    var loginuser = {
        email: req.body.loginemail,
        password: req.body.loginpassword
    }

    sess = req.session;    
    sess.uname = 'Gáborka AA';

    //ellenörizzük, hogy létezik-e az adatbázisban az adott felhasználó
    var mongoDbCtrl = new mongoDbControl.MongoDBControl();
    async.series(
        [
            callback => mongoDbCtrl.checkLoginUser(loginuser.email, loginuser.password, callback)
        ], function () {
            if (mongoDbCtrl.isCheckedLoginUser) {
                mongoDbCtrl.saveLogin(loginuser.email, loginuser.password);
                loginMsg = "";                                
                res.redirect('/useradmin');
            } else {
                loginMsg = constans.Constains.LOGIN_ERROR_1;
                res.redirect('/');     
            }
    });

    //if (loginuser.email.trim() === "" || typeof loginuser.email.trim() === 'undefined' || loginuser.password.trim() === "" || typeof loginuser.password.trim() === 'undefined') {
    //    loginMsg = constans.Constains.LOGIN_ERROR_1;
    //    res.redirect('/');     
    //} else {        
    //    var mongoDbCtrl = new mongoDbControl.MongoDBControl();
    //    mongoDbCtrl.saveLogin(loginuser.email, loginuser.password);
    //    loginMsg = "";
    //    res.redirect('/useradmin');
    //}
});

//router.get('/', (req: express.Request, res: express.Response) => {
router.get('/', (req, res) => {        

    var webPageJSONElements = {
        login_msg: loginMsg        
    };    

    res.render('index', templateJSONRenderCtrl.TemplateRenderControl.ADD_TEMPLATE_JSON_PARTS(webPageJSONElements));

    //res.render('index', {
    //    title: constans.Constains.PROGRAM_TITLE,
    //    program_title_and_version: constans.Constains.PROGRAM_TITLE_AND_VERSION,
    //    login_msg: loginMsg
    //});
});

export default router;