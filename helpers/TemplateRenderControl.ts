
import * as constains from '../helpers/Constains';

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
    static ADD_TEMPLATE_JSON_PARTS(webPageJSON: object): object {
        for (var item in this.webPageTemplateJSON) {
            webPageJSON[item] = this.webPageTemplateJSON[item];            
        }
        return webPageJSON;
    }

}