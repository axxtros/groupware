
import * as userrole from "../models/Userrole";

export class User {    
    public _id: any;
    private _email: string;
    private _password: string;
    private _role: userrole.Userrole;
    public role_id: any;

    constructor(email?: string, password?: string, role?: userrole.Userrole) {
        this._email = email || '';
        this._password = password || '';
        this._role = role || null;
    }

    get email(): string {
        return this._email;
    }

    set email(email: string) {
        this._email = email;
    }

    get password(): string {
        return this._password;
    }

    set password(password: string) {
        this._password = password;
    }

    get role(): userrole.Userrole {
        return this._role;
    }

    set role(role: userrole.Userrole) {
        this._role = role;
    }
}