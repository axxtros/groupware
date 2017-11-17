import express = require('express');
import async = require('async');
const adminUserPage = express.Router();
var parser = require('body-parser');

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());         // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


import * as constans from '../../helpers/Constains';
import * as templateJSONRenderCtrl from '../../helpers/TemplateRenderControl';
import * as mongoDbControl from '../../middlewears/MongoDBControl';
import * as _user from "../../models/User";

type User = _user.User;
type UserRole = _user.Userrole;

var userSaveMsg: string = "";
var mongoDbCtrl = new mongoDbControl.MongoDBControl();

var testText: string;

adminUserPage.post('/saveUserForm', function (req, res) {

    var savedUser = new _user.User(req.body.useremail, req.body.userpassword, null);        

    if (savedUser.email === "" || typeof savedUser.email == 'undefined' || savedUser.password === "" || typeof savedUser.password == 'undefined') {
        userSaveMsg = constans.Constains.ADMIN_USER_SAVE_ERROR_1;
        res.redirect('/useradmin');
    } else {
        //felhasználó mentése db-be
        //var mongoDbCtrl = new mongoDbControl.MongoDBControl();

        //jó async tutorial
        //https://codeforgeek.com/2016/04/asynchronous-programming-in-node-js/
        //ES6-os megoldás
        //http://www.sebastianseilund.com/nodejs-async-in-practice
        //jó async tutorial
        //http://stackexpert.com/2015/05/02/node-async/

        //csak az oldal részének frissítése ejs sablonnal
        //https://stackoverflow.com/questions/43523576/update-part-of-html-page-using-node-js-and-ejs
        //ajax példa
        //https://stackoverflow.com/questions/41665948/passing-variable-from-jquery-ajax-to-nodejs
                
        async.series(
            [                
                callback => mongoDbCtrl.getSelectedUserRole(req.body.userrole, callback),
                callback => mongoDbCtrl.saveNewUser(savedUser, callback)
            ], function () {                
                res.redirect('/useradmin');
        });        
    }    
});

//TESZT: rész oldal refresh ajax-al, működik (Ne töröld ki!)
//https://stackoverflow.com/questions/43523576/update-part-of-html-page-using-node-js-and-ejs
adminUserPage.post('/ajaxUpdateTest', function (req, res) {    

    var tsID = req.body;
    console.log("stsID " + tsID.str);

    res.json({
        testText: 'Fel lett ajaxozva, ez a szerver oldalról jön!'
    });
});

adminUserPage.get('/', (req: express.Request, res: express.Response) => {    
    async.series(
        [            
            callback => mongoDbCtrl.getAllUserRole(callback),
            callback => mongoDbCtrl.getAllRegistratedUser(callback)
        ], function () {            
            var webPageJSONElements = {
                create_new_user_form_title: 'Administration - Users',
                user_save_msg: userSaveMsg,
                userRoleList: typeof mongoDbCtrl.userRoles == 'undefined' ? mongoDbCtrl.userRoles = new Array<UserRole>() : mongoDbCtrl.userRoles,
                userList: typeof mongoDbCtrl.registratedUserList == 'undefined' ? mongoDbCtrl.registratedUserList = new Array<User>() : mongoDbCtrl.registratedUserList,                
                test_text: typeof testText == 'undefined' ? 'Kezdő szöveg.' : testText
            };

            res.render('pages/admin/users.ejs', templateJSONRenderCtrl.TemplateRenderControl.ADD_TEMPLATE_JSON_PARTS(webPageJSONElements));

    });    
});

export default adminUserPage;