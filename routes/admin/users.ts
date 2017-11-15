import express = require('express');
import async = require('async');
const adminUserPage = express.Router();

import * as constans from '../../helpers/Constains';
import * as templateJSONRenderCtrl from '../../helpers/TemplateRenderControl';
import * as mongoDbControl from '../../middlewears/MongoDBControl';
import * as _user from "../../models/User";

type User = _user.User;
type UserRole = _user.Userrole;

var userSaveMsg: string = "";
var mongoDbCtrl = new mongoDbControl.MongoDBControl();

adminUserPage.post('/saveUserForm', function (req, res) {

    var savedUser = new _user.User(req.body.useremail, req.body.userpassword, new _user.Userrole(req.body.userrole));        

    if (savedUser.email === "" || savedUser.email === 'undefined' || savedUser.password === "" || savedUser.password === 'undefined') {
        userSaveMsg = constans.Constains.ADMIN_USER_SAVE_ERROR_1;
    } else {
        //felhasználó mentése db-be
        //var mongoDbCtrl = new mongoDbControl.MongoDBControl();

        //jó async tutorial
        //https://codeforgeek.com/2016/04/asynchronous-programming-in-node-js/
        //ES6-os megoldás
        //http://www.sebastianseilund.com/nodejs-async-in-practice
        //jó async tutorial
        //http://stackexpert.com/2015/05/02/node-async/
        
        //console.log('@1');
        async.series(
            [
                callback => mongoDbCtrl.saveNewUser(savedUser, callback),
                callback => mongoDbCtrl.getAllUser(callback)
            ], function () {
                console.log('Done!');
                res.redirect('/useradmin');
        });
        //console.log('@8');        
    }    
    //res.redirect('/useradmin');
});

adminUserPage.get('/', (req: express.Request, res: express.Response) => {    

    async.series(
        [
            callback => mongoDbCtrl.getAllUser(callback)
        ], function () {

            var webPageJSONElements = {
                create_new_user_form_title: 'Administration - Users',
                user_save_msg: userSaveMsg,
                userList: typeof mongoDbCtrl._users == 'undefined' ? mongoDbCtrl._users = new Array<User>() : mongoDbCtrl._users
            };

            res.render('pages/admin/users.ejs', templateJSONRenderCtrl.TemplateRenderControl.ADD_TEMPLATE_JSON_PARTS(webPageJSONElements));

    });
    
});

export default adminUserPage;