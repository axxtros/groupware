"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var adminPage = express.Router();
adminPage.post('/admintestformaction', function (req, res) {
    console.log('Test: ' + req.body.testbox);
    res.redirect('/admin');
});
adminPage.get('/', function (req, res) {
    res.render('pages/admin/users.ejs', {
        title: 'Admin title'
    });
});
exports.default = adminPage;
//# sourceMappingURL=admin.js.map