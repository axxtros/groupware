"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var async = require("async");
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
        //mongoDbCtrl.saveNewUser(savedUser);
        //mongoDbCtrl.getAllUser();
        //jó async tutorial
        //https://codeforgeek.com/2016/04/asynchronous-programming-in-node-js/
        //ES6-os megoldás
        //http://www.sebastianseilund.com/nodejs-async-in-practice
        //jó async tutorial
        //http://stackexpert.com/2015/05/02/node-async/
        var users;
        //console.log('@1');
        //async.parallel([
        //    function (callback) {
        //        console.log('@2');
        //        mongoDbCtrl.saveNewUser(savedUser);
        //        callback();
        //    },
        //    function (callback) {
        //        console.log('@11');
        //        users = mongoDbCtrl.getAllUser();                
        //        callback();
        //    }
        //], function (err) {
        //    console.log('done!');            
        //});
        //console.log('@1');
        //async.series(
        //    [
        //        callback => mongoDbCtrl.saveNewUser(savedUser, callback),
        //        callback => mongoDbCtrl.getAllUser(callback)
        //    ], err => {
        //        if (err) throw err;
        //    }
        //);
        //console.log('@7');
        //for (var i = 0; i < mongoDbCtrl.users.length; i++) {
        //    console.log('user: ' + mongoDbCtrl.users[i].email);
        //}
        console.log('@1');
        async.series([function (callback) { return mongoDbCtrl.saveNewUser(savedUser, callback); }, function (callback) { return mongoDbCtrl.getAllUser(callback); }], function () {
            console.log('Done!');
        });
        console.log('@7');
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