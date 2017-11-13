"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var adminUserPage = express.Router();
var constans = require("../../helpers/Constains");
var templateJSONRenderCtrl = require("../../helpers/TemplateRenderControl");
var mongoDbControl = require("../../middlewears/MongoDBControl");
var _user = require("../../models/User");
var userSaveMsg = "";
adminUserPage.post('/saveUserForm', function (req, res) {
    //var user = {
    //    email: req.body.useremail,
    //    password: req.body.userpassword,
    //    role: req.body.userrole
    //};    
    var savedUser = new _user.User(req.body.useremail, req.body.userpassword, new _user.Userrole(req.body.userrole));
    if (savedUser.email === "" || savedUser.email === 'undefined' || savedUser.password === "" || savedUser.password === 'undefined') {
        userSaveMsg = constans.Constains.ADMIN_USER_SAVE_ERROR_1;
    }
    else {
        //felhasználó mentése db-be
        var mongoDbCtrl = new mongoDbControl.MongoDBControl();
        mongoDbCtrl.saveNewUser(savedUser);
    }
    res.redirect('/useradmin');
});
adminUserPage.get('/', function (req, res) {
    var webPageJSONElements = {
        formTitle: 'Administration - Users',
        user_save_msg: userSaveMsg
    };
    res.render('pages/admin/users.ejs', templateJSONRenderCtrl.TemplateRenderControl.ADD_TEMPLATE_JSON_PARTS(webPageJSONElements));
});
exports.default = adminUserPage;
//# sourceMappingURL=users.js.map