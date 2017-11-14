
export class Userrole {
    private _role: string;

    constructor(role: string) {
        this._role = role;
    }

    get role(): string {
        return this._role;
    }

    set role(role: string) {
        this._role = role;
    }

}

export class User {
    private _email: string;
    private _password: string;
    private _role: Userrole;
    
    constructor(email?: string, password?: string, role?: Userrole) {
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

    get role(): Userrole {
        return this._role;
    }

    set role(role: Userrole) {
        this._role = role;
    }

}