import express = require('express');
const router = express.Router();

import * as constans from '../modules/Contains';

router.post('/login', function (req, res) {
    var loginuser = {
        email: req.body.loginemail,
        password: req.body.loginpassword
    }
    console.log('Loginuser email: ' + loginuser.email + ' password: ' + loginuser.password);    

    res.redirect('/');
});

router.get('/', (req: express.Request, res: express.Response) => {
    res.render('index', {
        title: constans.Constains.PROGRAM_TITLE,
        program_title_and_version: constans.Constains.PROGRAM_TITLE_AND_VERSION
    });
});

export default router;