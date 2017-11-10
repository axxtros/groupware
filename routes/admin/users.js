"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var adminUserPage = express.Router();
var templateJSONRenderCtrl = require("../../helpers/TemplateRenderControl");
adminUserPage.post('/saveUserForm', function (req, res) {
    console.log('Test: ' + req.body.testinput);
    res.redirect('/useradmin');
});
adminUserPage.get('/', function (req, res) {
    var webPageJSONElements = {
        formTitle: 'Administration - Users'
    };
    res.render('pages/admin/users.ejs', templateJSONRenderCtrl.TemplateRenderControl.ADD_TEMPLATE_JSON_PARTS(webPageJSONElements));
});
exports.default = adminUserPage;
//# sourceMappingURL=users.js.map