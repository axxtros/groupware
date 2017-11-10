import express = require('express');
const adminUserPage = express.Router();

import * as constans from '../../helpers/Constains';
import * as templateJSONRenderCtrl from '../../helpers/TemplateRenderControl';

adminUserPage.post('/saveUserForm', function (req, res) {

    console.log('Test: ' + req.body.testinput);

    res.redirect('/useradmin');
});

adminUserPage.get('/', (req: express.Request, res: express.Response) => {

    var webPageJSONElements = {
        formTitle: 'Administration - Users'        
    };

    res.render('pages/admin/users.ejs', templateJSONRenderCtrl.TemplateRenderControl.ADD_TEMPLATE_JSON_PARTS(webPageJSONElements));
});

export default adminUserPage;