"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constains = require("../helpers/Constains");
var TemplateRenderControl = (function () {
    function TemplateRenderControl() {
        //NOP                            
    }
    //hozzáadja az adott oldalról bejövő JSON elemekhez a template oldalak JSON elemeit
    TemplateRenderControl.ADD_TEMPLATE_JSON_PARTS = function (webPageJSON) {
        for (var item in this.webPageTemplateJSON) {
            webPageJSON[item] = this.webPageTemplateJSON[item];
        }
        return webPageJSON;
    };
    return TemplateRenderControl;
}());
//azoknak az elemeknek a JSON (ejs) gyűjteménye, amelyek a sablon oldalakon vannak, ezek minden egyes render-nél lejönnek
//itt kell bővíteni a template oldalra berakott elemeket
TemplateRenderControl.webPageTemplateJSON = {
    title: constains.Constains.PROGRAM_TITLE,
    program_title_and_version: constains.Constains.PROGRAM_TITLE_AND_VERSION
};
exports.TemplateRenderControl = TemplateRenderControl;
//# sourceMappingURL=TemplateRenderControl.js.map