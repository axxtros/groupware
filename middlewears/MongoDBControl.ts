
var mongoClient = require('mongodb').MongoClient;

//var Db = require('mongodb').Db,
//    MongoClient = require('mongodb').MongoClient,
//    Server = require('mongodb').Server,
//    ReplSetServers = require('mongodb').ReplSetServers,
//    ObjectID = require('mongodb').ObjectID,
//    Binary = require('mongodb').Binary,
//    GridStore = require('mongodb').GridStore,
//    Grid = require('mongodb').Grid,
//    Code = require('mongodb').Code,
//    BSON = require('mongodb').pure().BSON,
//    assert = require('assert');

import * as constains from "../helpers/Constains";
import * as user from "../models/User";

type User = user.User;
type UserRole = user.Userrole;

const DB_USER_COLLECTION: string = "dat_user";

export class MongoDBControl {        

    private mongoDBUrl: string;
    //private db: object;

    constructor() {
        this.mongoDBUrl = constains.Constains.MONGOD_DB_URL;
        //this.db = new Db(new Server(constains.Constains.MONGOD_DB_URL));        
    }

    /**
     * Menti a belépések naplózását időbélyeggel.
     * @param _useremail
     * @param _password
     */
    public saveLogin(_useremail: string, _password: string) {
        mongoClient.connect(this.mongoDBUrl, function (err, db) {
            if (err) throw err;
            //console.log("Database created!");
            
            var loginuser = { useremail: _useremail, password: _password, logintimestamp: Date.now() };
            db.collection("log_userlogin").insertOne(loginuser, function (err, res) {
                if (err) throw err;
                //console.log("1 document inserted");
            });            
            db.close();
        });
    }

    /**
     * Új felhasználó felvétele.
     * @param savedUser
     */
    public saveNewUser(savedUser: User, callback) {
        console.log('@2');
        if (user !== null) {
            mongoClient.connect(this.mongoDBUrl, function (err, db) {
                if (err) {
                    //throw err;
                    console.log(err);
                    //return false;
                }
                //var newUser = { useremail: savedUser.email, password: savedUser.password, role: savedUser.role.role, createdate: Date.now() };
                db.collection(DB_USER_COLLECTION).insertOne(savedUser, function (err, res) {
                    if (err) {
                        //throw err;
                        console.log(err);
                        return false;
                    }
                    console.log('@3');
                    db.close();                                                    
                });                                
            });
        }        
        console.log('@3_1');
        callback();
        //return true;
    }

    _users: Array<User>;

    public get users(): Array<User> {
        return this._users;
    }

    public getAllUser(callback) {
        console.log('@4');
        var resultList = new Array<User>();
        mongoClient.connect(this.mongoDBUrl, function (err, db) {
            if (err) {
                throw err;                
            }
            db.collection(DB_USER_COLLECTION).find({}).toArray(function (err, result) {
                if (err) throw err;
                //this._users = new Array<User>();                                
                for (var i = 0; i < result.length; i++) {
                    var dbUser = new user.User();
                    dbUser = result[i];
                    resultList.push(dbUser);
                    //this._users.push(dbUser);
                    console.log('@6');
                    //console.log('user email: ' + dbUser.email + ' password: ' + dbUser.password + ' role: ' + dbUser.role.role);
                }   
                console.log('@5');
                db.close();                
            });
        });
        console.log('@6');
        callback();
        //return resultList;                                    
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