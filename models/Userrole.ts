export class Userrole {
    public _id: any;
    private _role: string;
    private _value: number;

    constructor(value?: number) {
        this._value = value;
    }

    get role(): string {
        return this._role;
    }

    set role(role: string) {
        this._role = role;
    }

    get value(): number {
        return this._value;
    }

    set value(value: number) {
        this._value = value;
    }
}