
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

import * as constains from "../helpers/Constains";
import * as user from "../models/User";

type User = user.User;
type UserRole = user.Userrole;

const DB_USER_COLLECTION: string = "dat_user";

const DB_USERROLE_COLLECTION: string = "prd_userrole";

export class MongoDBControl {        

    private mongoDBUrl: string;
    private db: any;  

    private _users: Array<User>;
    private _userRoles: Array<UserRole>;
    private _selectedUserRole: UserRole;

    constructor() {
        this.mongoDBUrl = constains.Constains.MONGOD_DB_URL;
        this.db = new Db(constains.Constains.MONGO_DB_NAME, new Server(constains.Constains.MONGO_DB_HOST, constains.Constains.MONGO_DB_PORT));

        //generate mongodb _id, müködik
        //var o_id = new ObjectID();
        //console.log(o_id);
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
     * Új felhasználó felvétele.
     * @param savedUser
     */
    public saveNewUser(savedUser: User, selectedUserRole: UserRole, callback) {
        //console.log('@2');
        var thisObject = this;
        if (user !== null) {
            savedUser.role = selectedUserRole;
            thisObject.db.open(function (err) {
                if (err) throw err;

                var collection = thisObject.db.collection(DB_USER_COLLECTION);
                collection.insertOne({ 'email': savedUser.email, 'password': savedUser.password, 'role': savedUser.role });
                //console.log('@3');
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
     * Lekérdezi az összes tárolt felhasználót.
     * @param callback
     */
    public getAllUser(callback) {
        //console.log('@4');
        var resultList = new Array<User>();
        var thisObject = this;
        thisObject._users = new Array<User>();        
                
        thisObject.db.open(function (err) {
            var collection = thisObject.db.collection(DB_USER_COLLECTION);
            collection.find({}).toArray(function (err, resultList) {
                if (err) throw err;

                for (var i = 0; i < resultList.length; i++) {
                    var dbUser = new user.User();
                    dbUser = resultList[i];
                    thisObject._users.push(resultList[i]);
                    //console.log('@6 ' + dbUser.email);
                }

                //console.log('@7');
                thisObject.db.close();
                callback();
                //setTimeout(function () {
                //    console.log('waiting after getAllUser...');
                //    thisObject.db.close();                    
                //    callback();
                //}, 5000);
            });
                                    
        });                                           
    }

    /**
     * Lekérdezi az összes tárolt lehetséges felhasználói szerepkört.
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
     * Visszaadja a roleValue alapján a hozzátartozó teljes UserRole objektumot.
     * @param callback
     * @param roleValue
     */
    public getSelectedUserRole(roleValue: number, callback) {
        var thisObject = this;
        for (let role of thisObject._userRoles) {
            if (role.value == roleValue) {
                thisObject._selectedUserRole = role;                
                break;
            }
        }
        callback();
    }

    //getters/setters
    public get users(): Array<User> {
        return this._users;
    }

    public set users(users: Array<User>) {
        this._users = users;
    }

    public get userRoles(): Array<UserRole> {
        return this._userRoles;
    }

    public set userRoles(userRoles: Array<UserRole>) {
        this._userRoles = userRoles;
    }

    public get selectedUserRole() {
        return this._selectedUserRole;
    }

    public set selectedUserRole(selectedUserRole: UserRole) {
        this._selectedUserRole = selectedUserRole;
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

}

/*

db.prd_userrole.insertMany( [
    { role: "Guest", value: 1 },
    { role: "Developer", value: 2 },
    { role: "Leader", value: 3 },
    { role: "Superuser", value: 4 }
] );

*/