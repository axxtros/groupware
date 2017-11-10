import express = require('express');
const adminUserPage = express.Router();

import * as constans from '../../helpers/Constains';
import * as templateJSONRenderCtrl from '../../helpers/TemplateRenderControl';

var userSaveMsg: string = "";

adminUserPage.post('/saveUserForm', function (req, res) {

    var user = {
        email: req.body.useremail,
        password: req.body.useremail,
        role: req.body.userrole
    };    

    if (user.email === "" || user.email === 'undefined' || user.password === "" || user.password === 'undefined') {
        userSaveMsg = constans.Constains.ADMIN_USER_SAVE_ERROR_1;
    } else {
        //felhasználó mentése db-be

    }   
    res.redirect('/useradmin');
});

adminUserPage.get('/', (req: express.Request, res: express.Response) => {

    var webPageJSONElements = {
        formTitle: 'Administration - Users',
        user_save_msg: userSaveMsg
    };

    res.render('pages/admin/users.ejs', templateJSONRenderCtrl.TemplateRenderControl.ADD_TEMPLATE_JSON_PARTS(webPageJSONElements));
});

export default adminUserPage;