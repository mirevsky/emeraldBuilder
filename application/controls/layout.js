import {Application} from '../application.js'
import {Control} from './controls_collection.js';
import {Section} from './section.js';
import {XMLHttpRequestHandler, StringHandler} from './handlers.js';
import {Builder} from '../builder/builder.js'
import {BuilderRightMenu} from '../builder/builder_right_menu.js';

export class Layout
{
    constructor(){
        this.Head = new Control('head');
        this.Body = new Control('body');
    }

    RenderTemplates(){
        let div = new Control('div');
        div.id = "templates";
        let section = Section.getSectionByCode(Application.request.SectionCode);
        for (let template in section.Templates){
            let templateClass = StringHandler.camelCaseFirstUpperCase(section.Templates[template]+'Template');
            let tmpdiv = new Control('div');
            tmpdiv.id = templateClass;
            div.Controls.Add(tmpdiv);
            var tmp = import('../../templates/'+section.Templates[template]+'_template.js');
            tmp.then(function(result){
                eval(`var t = new result.`+templateClass+`();
                document.getElementById('`+templateClass+`').append(t.Render());
                `);
            });
        }
        return div;
    }

    RenderHead(){
        this.Head.Controls._arItems.forEach(function(item, index){
            document.head.appendChild(item.Render(item))
        });
    }

    RenderBody(){
        for(var attr in this.Body._attributes){
            document.body.setAttribute(attr, this.Body._attributes[attr]);
        }

        for(var attr in this.Body._style){
            document.body.style[attr] = this.Body._style[attr];
        }

        this.Body.Controls._arItems.forEach(function(item, index){
            document.body.appendChild(item.Render(item))
        });
    }
}