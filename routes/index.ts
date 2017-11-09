import express = require('express');
const router = express.Router();

import * as constans from '../helpers/Constains';
import * as mongoDbControl from '../middlewears/MongoDBControl';

var loginMsg: string;

router.post('/login', function (req, res) {
    var loginuser = {
        email: req.body.loginemail,
        password: req.body.loginpassword
    }
    console.log('Loginuser email: ' + loginuser.email + ' password: ' + loginuser.password);    

    if (loginuser.email === "" || loginuser.email === 'undefined') {
        loginMsg = constans.Constains.LOGIN_ERROR_WRONG_EMAIL_OR_PASSWORD;
    } else {
        loginMsg = "";
    }

    var mongoDbCtrl = new mongoDbControl.MongoDBControl();
    mongoDbCtrl.saveLogin(loginuser.email, loginuser.password);
    
    res.redirect('/');
});

router.get('/', (req: express.Request, res: express.Response) => {
    res.render('index', {
        title: constans.Constains.PROGRAM_TITLE,
        program_title_and_version: constans.Constains.PROGRAM_TITLE_AND_VERSION,
        login_msg: loginMsg
    });
});

export default router;