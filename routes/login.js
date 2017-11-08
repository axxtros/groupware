"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//var app = require('../app');
var express = require("express");
var router = express.Router();
var app = express();
app.post('/login', function (req, res) {
});
exports.login = function (req, res, next) {
    console.log('LOGIN_PAGE!');
    res.render('index.ejs', {});
};
exports.default = router;
//# sourceMappingURL=login.js.map