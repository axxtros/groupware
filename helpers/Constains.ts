
export class Constains {

    //általános
    private static _PROGRAM_TITLE = "Groupware";
    private static _PROGRAM_VERSION = "0.1";
    private static _PROGRAM_BUILD_NUMBER = "0001";
    //adatbázis
    private static _MONGODB_URL_PREFIX: string = "mongodb://";
    private static _MONGODB_HOST: string = "localhost";
    private static _MONGODB_PORT: string = "27017";
    private static _MONGODB_DATABASE_NAME: string = "dev2";

    //felületen megjelenített szövegek
    private static _LOGIN_ERROR_1: string = "A megadott e-mail cím vagy jelszó hibás!";
    private static _ADMIN_USER_SAVE_ERROR_1: string = "A megadott e-mail cím vagy jelszó hiányzik!";

    constructor() {
        
    }

    // getters/setters --------------------------------------------------------

    static get PROGRAM_TITLE(): string {
        return this._PROGRAM_TITLE;            
    }

    static get PROGRAM_VERSION(): string {
        return "v." + this._PROGRAM_VERSION;
    }

    static get PROGRAM_BUILD_NUMBER(): string {
        return "." + this._PROGRAM_BUILD_NUMBER;
    }

    static get PROGRAM_TITLE_AND_VERSION(): string {
        return this.PROGRAM_TITLE + " " + this.PROGRAM_VERSION + this.PROGRAM_BUILD_NUMBER;
    }

    static get MONGO_DB_NAME(): string {
        return this._MONGODB_DATABASE_NAME;
    }

    static get MONGO_DB_HOST(): string {
        return this._MONGODB_HOST;
    }

    static get MONGO_DB_PORT(): string {
        return this._MONGODB_PORT;
    }

    static get MONGOD_DB_URL(): string {
        //"mongodb://localhost:27017/dev2";
        return this._MONGODB_URL_PREFIX + this._MONGODB_HOST + ":" + this._MONGODB_PORT + "/" + this._MONGODB_DATABASE_NAME;            
    }

    static get LOGIN_ERROR_WRONG_EMAIL_OR_PASSWORD(): string {
        return this._LOGIN_ERROR_1;
    }    

    static get ADMIN_USER_SAVE_ERROR_1(): string {
        return this._ADMIN_USER_SAVE_ERROR_1;
    }

}