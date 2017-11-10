
var mongoClient = require('mongodb').MongoClient;

import * as constains from "../helpers/Constains";

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

}