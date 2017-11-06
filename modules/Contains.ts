
export class Constains {

    private _PROGRAM_TITLE = "Groupware";
    private _PROGRAM_VERSION = "0.1";
    private _PROGRAM_BUILD_NUMBER = "0001";

    constructor() {
        
    }

    // getters/setters --------------------------------------------------------

    get PROGRAM_TITLE(): string {
        return this._PROGRAM_TITLE;            
    }

    get PROGRAM_VERSION(): string {
        return "v." + this._PROGRAM_VERSION;
    }

    get PROGRAM_BUILD_NUMBER(): string {
        return "." + this._PROGRAM_BUILD_NUMBER;
    }

    get PROGRAM_TITLE_AND_VERSION(): string {
        return this.PROGRAM_TITLE + " " + this.PROGRAM_VERSION + this.PROGRAM_BUILD_NUMBER;
    }

}