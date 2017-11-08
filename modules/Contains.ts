
export class Constains {

    private static _PROGRAM_TITLE = "Groupware";
    private static _PROGRAM_VERSION = "0.1";
    private static _PROGRAM_BUILD_NUMBER = "0001";

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

}