import {Application} from '../application.js'
import {Control} from '../controls/controls_collection.js';
import {Request} from '../controls/request.js';
import {Section} from '../controls/section.js';
import {XMLHttpRequestHandler, StringHandler} from '../controls/handlers.js';
import {
    Button,
    Checkbox,
    Form, Fieldset,
    Hyperlink,
    Input, Image, ImageLink,
    MessageBox,
    Label, Link,
    PageWindow,
    Select,
    Tabs, Tooltip, Textarea
} from '../controls/ui.js';

import {BuilderRightMenuStyle} from './builder.style.js';
import {BuilderModules} from './builder_modules.js';
import {BuilderPreview} from './builder_preview.js';
import {BuilderSections} from './builder_sections.js';
import {BuilderMainNavigation} from './builder_main_navigation.js';

export class BuilderRightMenu extends Control
{
    constructor(){
        super("div")
        this.AssignCSSClass(BuilderRightMenuStyle);
    }

    static RightMenuCreateModule(){
        let module = this.getAttribute('module');
        if (module === 'sections') {
            BuilderSections.EditNewSection();
            return false;
        }
        eval('BuilderModules._'+module+'();');
    }

    static RenderModuleSource(module, item){
        if (module === 'sections') {
            BuilderSections.EditNewSection(item);
            return false;
        }

        if (module === 'locale') {
            eval('BuilderModules._'+module+'("'+item+'");');
            return false;
        }

        if (module === 'resources') {
            eval('BuilderModules._'+module+'("'+item+'");');
            return false;
        }

        if (!window.localStorage.getItem('tabs')) {
            window.localStorage.setItem('tabs', JSON.stringify([]));
        }

        window.localStorage.setItem('current_tab' , module+'-'+item);

        if(window.localStorage.getItem('tabs')) {
            let object = JSON.parse(window.localStorage.getItem('tabs'));
            let flag = false;
            for (let index in object){
                let item_tab = object[index];
                for (let inner in item_tab.module){
                    let inner_tab = item_tab.module[inner];
                    if (inner_tab.tab == item) {
                        flag = true;
                    }
                }
            }
            if (!flag){
                object.push({module: [{'tab':item, 'module':module}]});
                window.localStorage.setItem('tabs', JSON.stringify(object));

                let li = new Control("li");
                li.Attribute('module', module);
                let hyperlink = new Hyperlink(item, "#");
                hyperlink.module = module;
                hyperlink.Attribute('item', item);
                hyperlink.onclick = BuilderRightMenu.RightMenuOpenModule;
                li.Controls.Add(hyperlink);
                let close = new ImageLink("Close","#","application/theme/default/close.svg");
                close.Style("float", "right");
                close.onclick = BuilderMainNavigation.CloseTab
                li.Controls.Add(close);
                Control.getById('navigation_tabs').append(li.Render());
            }
            Control.select('.BuilderPreviewStyle').style.display = 'block';
        }


        Control.select('#BuilderCodeEditor').innerHTML = '';
        BuilderPreview.SplitView();
        eval('BuilderModules._'+module+'("'+item+'");');
    }

    static RightMenuOpenModule(){
        let module = this.parentElement.getAttribute('module');
        let item = this.getAttribute('item');
        BuilderRightMenu.RenderModuleSource(module, item);
    }

    static RenderSectionTree(item){
        let child_sections = Section.getSectionByParent(item.Code);

        let div = new Control('div');
        div.Attribute('class', 'sub_section_div');
        div.Attribute('module', 'sections');

        let hyperlink = new Hyperlink(item.Code, '#sections-'+item.Code);
        hyperlink.Attribute('item', item.Code);
        hyperlink.onclick = BuilderRightMenu.RightMenuOpenModule;
        if(child_sections.length){
            let sub_section_icon = new Image('Sub','/application/theme/default/plus.png');
            sub_section_icon.Style('width', '16px');
            sub_section_icon.Style('height', '16px');
            sub_section_icon.onclick = (e) => {
                let element = sub_section_icon.innerRef.parentElement.parentElement.children[1];
                element.style.display = (element.style.display == 'none') ? 'block' : 'none';
                e.preventDefault();
                e.stopPropagation();
                return false;
            };
            hyperlink.Controls.Add(sub_section_icon);
        }
        div.Controls.Add(hyperlink);

        let sub_section = new Control('div');
        sub_section.Attribute('class', 'sub_section');
        sub_section.Attribute('module', 'sections');
        for(let section in child_sections){
            sub_section.Controls.Add(BuilderRightMenu.RenderSectionTree(child_sections[section]));
        }
        div.Controls.Add(sub_section);

        return div;
    }

    static RenderRightMenuNavigation(module, items){
        var div = new Control('div');
        div.Attribute('class', module);
        div.Attribute('module', module);
        for(let index in items){
            let item = items[index];
            var hyperlink = new Hyperlink(item.name, "#"+module+'-'+item.name);
                hyperlink.Attribute('item', item.name);
                hyperlink.onclick = BuilderRightMenu.RightMenuOpenModule;
            if(item.Code) {
                hyperlink = BuilderRightMenu.RenderSectionTree(item);
            }
            div.Controls.Add(hyperlink);
        }
        return div;
    }

    ListRightMenuModules(){
        const module = this.hash.replace("#",'');
        Control.select('.button_new').setAttribute('module', module);

        if(module == "sections"){
            let sections = Section.getSectionByParent(null);
            let rightMenuNavigation = document.querySelector('.RightMenuNavigation');
            rightMenuNavigation.innerHTML = '';
            rightMenuNavigation.append(BuilderRightMenu.RenderRightMenuNavigation('sections', sections).Render());
            rightMenuNavigation.parentElement.style.width = 'auto';
            return false;
        }

        const fs = require('fs');
        let dir = (module=='controls') ? './public_controls/' : './'+module+'/';

        fs.readdir(dir, (err, files) => {
            if(err) {
                console.log(err);
            }
            let result = [];
            for(let i in files){
                let file = files[i];
                let ext = file.substr(-3);
                let tmp = {};
                tmp.name = file;
                if(ext == '.js'){
                    tmp.name = file.replace(ext, '');
                }
                tmp.ext = ext;
                result.push(tmp);
            }
            let rightMenuNavigation = document.querySelector('.RightMenuNavigation');
            rightMenuNavigation.innerHTML = '';
            rightMenuNavigation.append(BuilderRightMenu.RenderRightMenuNavigation(module, result).Render());
            rightMenuNavigation.parentElement.style.width = 'auto';
        });
        return false;
    }

    Render(){
        let modules = ["sections", "layouts", "templates", "blocks", "controls", "resources", "locale"];
        let ul = new Control("ul");
        var li = new Control("li");
        li.Attribute('class', 'right_menu_tabs');
        for(let item in modules){
            let div = new Control("div");
            let hyperlink = new Hyperlink(new Label(modules[item]),"#"+modules[item]);
            hyperlink.Controls.Add(new Image(modules[item], "application/theme/default/"+modules[item]+".svg"));
            hyperlink.onclick = this.ListRightMenuModules;
            div.Controls.Add(hyperlink);
            li.Controls.Add(div);
        }
        ul.Controls.Add(li);

        var li = new Control("li");
        let button_new = new ImageLink("New", "#new", "application/theme/default/add.svg")
        button_new.Attribute("class", "button_new");
        button_new.Attribute("module", "sections");
        button_new.onclick = BuilderRightMenu.RightMenuCreateModule;
        li.Controls.Add(button_new);

        let div = new Control('div');
        div.Attribute('class', 'RightMenuNavigation');
        let sections = Section.getSectionByParent(null);
        div.Controls.Add(BuilderRightMenu.RenderRightMenuNavigation('sections', sections));
        li.Controls.Add(div);
        ul.Controls.Add(li);
        this.Controls.Add(ul);


        return super.Render()
    }
}