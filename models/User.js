"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Userrole = (function () {
    function Userrole(role) {
        this._role = role;
    }
    Object.defineProperty(Userrole.prototype, "role", {
        get: function () {
            return this._role;
        },
        set: function (role) {
            this._role = role;
        },
        enumerable: true,
        configurable: true
    });
    return Userrole;
}());
exports.Userrole = Userrole;
var User = (function () {
    function User(email, password, role) {
        this._email = email;
        this._password = password;
        this._role = role;
    }
    Object.defineProperty(User.prototype, "email", {
        get: function () {
            return this._email;
        },
        set: function (email) {
            this._email = email;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "password", {
        get: function () {
            return this._password;
        },
        set: function (password) {
            this._password = password;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "role", {
        get: function () {
            return this._role;
        },
        set: function (role) {
            this._role = role;
        },
        enumerable: true,
        configurable: true
    });
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map