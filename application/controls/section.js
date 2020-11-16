import {Application} from '../application.js'
import {Control} from './controls_collection.js';
import {PageLoader} from './ui.js';
import {XMLHttpRequestHandler, StringHandler, ParamsHandler} from './handlers.js';

export class Section
{
    static getSectionByCode(Code=''){
        for (var section in Application._db.sections){
            if (Application._db.sections[section].Code == Code) {
                return Application._db.sections[section];
            }
        }
    }

    static getSectionByParent(Code=null){
        let result = []
        for (var section in Application._db.sections){
            if (Application._db.sections[section].ParentSection == Code) {
                result.push(Application._db.sections[section]);
            }
        }
        return result;
    }

    static getSectionText(Code='index', LanguageCode=Application.request.LanguageCode){
        let sCode = '';
        let p = new Control('p');
        p.AfterRender = function(){
            let tmp = this.innerRef;
            var locale = import('../../locale/'+LanguageCode+'.js');
            locale.then(function(result){
                sCode = eval('result.section_'+Code);
                tmp.innerHTML = sCode;
            });
        };
        return p;
    }

    async asyncExecute(){
        await this.Execute();
    }

    Execute(){
        XMLHttpRequestHandler.Get("application/config/project.json", (data)=>{
            Application._db = JSON.parse(data);

            let section = Section.getSectionByCode(Application.request.SectionCode);
            let layoutClass = StringHandler.camelCaseFirstUpperCase(section.Layout+'Layout');

            var script = new Control('script');
            script.Attribute('type', 'module');
            script.innerHTML = `
            import {`+layoutClass+`} from './layouts/`+section.Layout+`_layout.js';
            let layout = new `+layoutClass+`();
            layout.RenderHead();
            layout.RenderBody();
            `;
            document.head.appendChild(script.Render());
        });
    }

    Run(){
        let section = new Control("div");
        let loading = new PageLoader("loading");
        section.Controls.Add(loading);
        let exec = new Control("div");
        exec.onload = () => {
            this.asyncExecute();
        };
        section.Controls.Add(exec);

        return section.Render();
    }
}