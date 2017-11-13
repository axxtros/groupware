
var mongoClient = require('mongodb').MongoClient;

import * as constains from "../helpers/Constains";
import * as user from "../models/User";

type User = user.User;
type UserRole = user.Userrole;

export class MongoDBControl {    

    private mongoDBUrl: string;

    constructor() {
        this.mongoDBUrl = constains.Constains.MONGOD_DB_URL;
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
    public saveNewUser(savedUser: User): boolean {
        if (user !== null) {
            mongoClient.connect(this.mongoDBUrl, function (err, db) {
                if (err) {
                    //throw err;
                    console.log(err);
                    return false;
                }
                var newUser = { useremail: savedUser.email, password: savedUser.password, role: savedUser.role.role, createdate: Date.now() };
                db.collection("dat_user").insertOne(newUser, function (err, res) {
                    if (err) {
                        //throw err;
                        console.log(err);
                        return false;
                    }                                            
                });                
                db.close();
            });
        }
        return true;
    }

    //find id alapján
    //https://reformatcode.com/code/javascript/nodejs--mongodb--how-to-query-ref-fields
    //ezeket nézd át a mongodb használatára vontakozóan
    //https://www.w3schools.com/nodejs/nodejs_mongodb.asp
    //insert multiple document
    //https://www.w3schools.com/nodejs/nodejs_mongodb_insert.asp


}