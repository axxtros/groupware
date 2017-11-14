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

adminUserPage.post('/saveUserForm', function (req, res) {

    //var user = {
    //    email: req.body.useremail,
    //    password: req.body.userpassword,
    //    role: req.body.userrole
    //};    

    var savedUser = new _user.User(req.body.useremail, req.body.userpassword, new _user.Userrole(req.body.userrole));

    if (savedUser.email === "" || savedUser.email === 'undefined' || savedUser.password === "" || savedUser.password === 'undefined') {
        userSaveMsg = constans.Constains.ADMIN_USER_SAVE_ERROR_1;
    } else {
        //felhasználó mentése db-be
        var mongoDbCtrl = new mongoDbControl.MongoDBControl();
        //mongoDbCtrl.saveNewUser(savedUser);
        //mongoDbCtrl.getAllUser();

        //jó async tutorial
        //https://codeforgeek.com/2016/04/asynchronous-programming-in-node-js/
        //ES6-os megoldás
        //http://www.sebastianseilund.com/nodejs-async-in-practice

        console.log('@1');
        async.series([
            function (callback) {
                mongoDbCtrl.saveNewUser(savedUser);
                callback();
            },
            function (callback) {
                mongoDbCtrl.getAllUser();
                callback();
            }
        ], function (err) {
            console.log('done!');
        });

        //async.series(
        //    [
        //        callback => mongoDbCtrl.saveNewUser(savedUser),
        //        callback => mongoDbCtrl.getAllUser()
        //    ], err => {
        //        if (err) throw err;
        //    }
        //);
        console.log('@8');
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