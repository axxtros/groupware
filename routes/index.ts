import express = require('express');
import async = require('async');
const router = express.Router();

import * as constans from '../helpers/Constains';
import * as templateJSONRenderCtrl from '../helpers/TemplateRenderControl';
import * as mongoDbControl from '../middlewears/MongoDBControl';

var loginMsg: string;

router.post('/login', function (req, res) {
    var loginuser = {
        email: req.body.loginemail,
        password: req.body.loginpassword
    }    

    if (loginuser.email.trim() === "" || typeof loginuser.email.trim() === 'undefined' || loginuser.password.trim() === "" || typeof loginuser.password.trim() === 'undefined') {
        loginMsg = constans.Constains.LOGIN_ERROR_1;
        res.redirect('/');     
    } else {        
        var mongoDbCtrl = new mongoDbControl.MongoDBControl();
        mongoDbCtrl.saveLogin(loginuser.email, loginuser.password);
        loginMsg = "";
        res.redirect('/useradmin');
    }
});

router.get('/', (req: express.Request, res: express.Response) => {
    
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