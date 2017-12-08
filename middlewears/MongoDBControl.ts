
var mongoClient = require('mongodb').MongoClient;

var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    BSON = require('mongodb').BSON,
    assert = require('assert');

import async = require('async');

import * as constains from "../helpers/Constains";
import * as user from "../models/User";
import * as userrole from "../models/Userrole";

type User = user.User;
type UserRole = userrole.Userrole;

const DB_USER_COLLECTION: string = "dat_user";
const DB_USERROLE_COLLECTION: string = "prd_userrole";
const DB_USERLOGIN_COLLECTION: string = "log_userlogin";

export class MongoDBControl {        

    private mongoDBUrl: string;
    private db: any;    

    private _isCheckedLoginUser: boolean;
    private _registratedUserList: Array<User>;
    private _userRoles: Array<UserRole>;
    private _selectedUserRoleId: any;
    
    public loginUser: user.User;                    //a bejelentkezett felhasználó

    constructor() {
        this.mongoDBUrl = constains.Constains.MONGOD_DB_URL;
        this.db = new Db(constains.Constains.MONGO_DB_NAME, new Server(constains.Constains.MONGO_DB_HOST, constains.Constains.MONGO_DB_PORT));        

        //generate mongodb _id, müködik
        //var o_id = new ObjectID();
        //console.log(o_id);
    }  

    /**
     * Leellenőrzi, hogy az adatbázisban létezik-e a user, a bejelentkezés során a megadott adatokkal.
     * @param email
     * @param password
     * @param callback
     */
    public checkLoginUser(_email: string, _password: string, callback) {
        var thisObject = this;
        thisObject.db.open(function (err) {
            if (err) throw err;

            var collection = thisObject.db.collection(DB_USER_COLLECTION);
            collection.find({ email: _email, password: _password }).toArray(function (err, resultList) {
                if (err) throw err;

                thisObject.db.close();
                if (resultList.length > 0) {
                    thisObject._isCheckedLoginUser = true;
                    callback(resultList[0]._id);
                } else {
                    thisObject._isCheckedLoginUser = false;
                    callback();
                }                                                
            });
        });
    }

    /**
     * Új felhasználó felvétele.
     * @param savedUser
     */
    public saveNewUser(savedUser: User, callback) {
        var thisObject = this;
        if (user !== null) {            
            thisObject.db.open(function (err) {
                if (err) throw err;

                var collection = thisObject.db.collection(DB_USER_COLLECTION);
                collection.insertOne({ 'email': savedUser.email, 'password': savedUser.password, 'role_id': thisObject._selectedUserRoleId });
                thisObject.db.close();                

                callback();
                //setTimeout(function () {
                //    console.log('waiting after saved...');
                //    callback();
                //}, 1000);
            });            
        }
    }    

    /**
     * Visszaadja a roleValue alapján a hozzátartozó role _id-t. (_selectedUserRoleId)
     * @param callback
     * @param roleValue
     */
    public getSelectedUserRole(roleValue: number, callback) {
        var thisObject = this;
        for (let role of thisObject._userRoles) {
            if (role.value == roleValue) {
                thisObject._selectedUserRoleId = role._id;
                break;
            }
        }
        callback();
    }

    /**
     * Lekérdezi és visszaadja az összes regisztrált felhasználót.
     * @param callback
     */
    public getAllRegistratedUser(callback) {                
        async.series(
            [
                callback => this.getRegUsers(callback),
                callback => this.mergeUsersWithRole(callback)
            ], function () {
                callback();
            });                     
    }

    /**
     * Lekérdezi az adatbázisban tárolt felhasználókat.
     * @param callback
     */
    private getRegUsers(callback) {        
        var thisObject = this;
        thisObject._registratedUserList = new Array<User>();

        thisObject.db.open(function (err) {
            var collection = thisObject.db.collection(DB_USER_COLLECTION);
            collection.find({}).toArray(function (err, resultList) {
                if (err) throw err;
                for (var i = 0; i < resultList.length; i++) {
                    var dbUser = new user.User();
                    dbUser = resultList[i];                    
                    thisObject._registratedUserList.push(dbUser);
                }
                thisObject.db.close();
                callback();
            });
        });
    }

    /**
     * Össze merge-li az egyes felhasználókat a saját role objektumukkal, így megfelel az OOP typescript követelményeknek az objektum struktúra.
     * @param callback
     */
    private mergeUsersWithRole(callback) {        
        var thisObject = this;
        for (var i = 0; i < thisObject._registratedUserList.length; i++) {
            var dbUser = thisObject._registratedUserList[i];
            for (var j = 0; j < thisObject._userRoles.length; j++) {
                var dbRole = thisObject._userRoles[j];
                if (dbUser.role_id.equals(dbRole._id)) {                    
                    dbUser.role = dbRole;
                    break;
                }
            }
        }
        callback();
    }
    
    /**
     * Lekérdezi az összes tárolt felhasználói szerepkört.
     * @param callback
     */
    public getAllUserRole(callback) {
        var thisObject = this;
        thisObject._userRoles = new Array<UserRole>();  
        thisObject.db.open(function (err) {
            var collection = thisObject.db.collection(DB_USERROLE_COLLECTION);  
            collection.find({}).toArray(function (err, resultList) {
                if (err) throw err;

                for (var i = 0; i < resultList.length; i++) {
                    thisObject._userRoles.push(resultList[i]);                
                }

                thisObject.db.close();
                callback();
            });
        });
    }

    /**
     * Menti a belépések naplózását időbélyeggel.
     * @param _useremail
     * @param _password
     */
    public saveLogin(_useremail: string, _password: string) {
        mongoClient.connect(this.mongoDBUrl, function (err, db) {
            if (err) throw err;
            var loginuser = { useremail: _useremail, password: _password, logintimestamp: Date.now() };
            db.collection("log_userlogin").insertOne(loginuser, function (err, res) {
                if (err) throw err;
            });
            db.close();
        });
    }

    /**
     * Visszakeres egy adott felhasználót az _id-ja alapján.
     * @param userID
     * @param callback
     */
    public getLoginUserSessionDatas(userID: any, callback) {
        var resultUser = new user.User();
        async.series(
            [
                callback => this.getLoginUser(userID, callback),                
            ], function (returnCallback) {
                callback(returnCallback);
        });        
    }

    private getLoginUser(userID, callback) {
        var thisObject = this;
        var resultUser = new user.User();
        thisObject.db.open(function (err) {
            //1. felhasználó lekérdezése
            var collection = thisObject.db.collection(DB_USER_COLLECTION);
            var uid = ObjectID(userID);

            collection.findOne({ "_id": uid }, function (err, userResult) {            
                if (err) throw err;
                resultUser = userResult;

                //2. felhasználó role lekérdezése
                var resultRole = new userrole.Userrole();
                var collection = thisObject.db.collection(DB_USERROLE_COLLECTION);
                var rid = ObjectID(resultUser.role_id);
                collection.findOne({ "_id": rid }, function (err, roleResult) {                
                    if (err) throw err;

                    resultUser.role = roleResult;

                    thisObject.db.close();                    
                    thisObject.loginUser = resultUser;
                    callback();
                });
            });
        });
    }

    //getters/setters ---------------------------------------------------------
    public get isCheckedLoginUser(): boolean {
        return this._isCheckedLoginUser;
    }

    public set isCheckedLoginUser(isCheckedLoginUser: boolean) {
        this._isCheckedLoginUser = isCheckedLoginUser;
    }

    public get registratedUserList(): Array<User> {
        return this._registratedUserList;
    }

    public set registratedUserList(registratedUserList: Array<User>) {
        this._registratedUserList = registratedUserList;
    }

    public get userRoles(): Array<UserRole> {
        return this._userRoles;
    }

    public set userRoles(userRoles: Array<UserRole>) {
        this._userRoles = userRoles;
    }

    //mongoDB parancsok, hivatalos oldalon
    //https://docs.mongodb.com/manual/introduction/
    //find id alapján
    //https://reformatcode.com/code/javascript/nodejs--mongodb--how-to-query-ref-fields
    //ezeket nézd át a mongodb használatára vontakozóan
    //https://www.w3schools.com/nodejs/nodejs_mongodb.asp
    //insert multiple document
    //https://www.w3schools.com/nodejs/nodejs_mongodb_insert.asp
    //mongoDB belső függvények kiküszöbölése
    //https://mongodb.github.io/node-mongodb-native/api-generated/collection.html
    //mongoDB manual referencia használata
    //https://docs.mongodb.com/manual/reference/database-references/#dbref-explanation

}

//Ezeket a script-eket kell megfutatni a mongoDB-be, első indítás elött, üers adatbázisra.
/*

admin_role_id = ObjectId();

db.prd_userrole.insertMany( [
    { role: "Guest", value: 1 },
    { role: "Developer", value: 2 },
    { role: "Leader", value: 3 },
    { _id: admin_role_id, role: "Superuser", value: 4 }
] );

db.dat_user.insert( { email: "admin", password: "admin", role_id: admin_role_id } );

*/