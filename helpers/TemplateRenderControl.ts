
import * as constains from '../helpers/Constains';
import * as user from '../models/User';

export class TemplateRenderControl {

    //azoknak az elemeknek a JSON (ejs) gyűjteménye, amelyek a sablon oldalakon vannak, ezek minden egyes render-nél lejönnek
    //itt kell bővíteni a template oldalra berakott elemeket
    private static webPageTemplateJSON = {

        title: constains.Constains.PROGRAM_TITLE,
        program_title_and_version: constains.Constains.PROGRAM_TITLE_AND_VERSION

    };

    constructor() {
        //NOP                            
    }

    //hozzáadja az adott oldalról bejövő JSON elemekhez a template oldalak JSON elemeit
    static ADD_TEMPLATE_JSON_PARTS(webPageJSON: object, loginUser?: user.User): object {        

        //static parts
        for (var item in this.webPageTemplateJSON) {
            webPageJSON[item] = this.webPageTemplateJSON[item];            
        }

        //loginuser parts        
        webPageJSON['login_user_email'] = loginUser != null ? loginUser.email : "";
        webPageJSON['login_user_role'] = loginUser != null ? loginUser.role.role : "";                

        return webPageJSON;
    }

}