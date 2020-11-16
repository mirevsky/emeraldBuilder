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

import {
    MODULE_NEW_LAYOUT,
    MODULE_NEW_TEMPLATE,
    MODULE_NEW_BLOCK,
    MODULE_NEW_BLOCK_STYLE,
    MODULE_NEW_BLOCK_TEST,
    MODULE_NEW_CONTROL,
    MODULE_NEW_CONTROL_STYLE,
    MODULE_NEW_CONTROL_TEST,
    MODULE_NEW_CONSTANTS
} from './builder.constants.js'

import {BuilderCodeEditor} from './builder_code_editor.js';
import {BuilderCodeEditorTabsStyle} from './builder.style.js';

export class BuilderCodeEditorTabs extends Control
{
    constructor(Id='', TabSet=["Constants", "Styles", "Tests"]){
        super("div");
        this.Attribute('class','Tabs');
        this.module = null;
        this.item = null;
        this.input = null;
        this.json = null;
        this.id = Id;
        this.TabSet = TabSet;
        for(let tab in TabSet){
            let key = StringHandler.camelCaseFirstUpperCase(TabSet[tab]);
            this[key] = function(){ return new Control('div');}
        }

        this.AssignCSSClass(BuilderCodeEditorTabsStyle);
    }

    Render(){
        this.Constants = function(){
            let content = (this.json['constants'][0] && this.json['constants'][0].content) ? this.json['constants'][0].content : null;
            let text = (this.input) ? MODULE_NEW_CONSTANTS.split('$()').join(StringHandler.camelCaseFirstUpperCase(this.input)) : content;
            let editor = new BuilderCodeEditor("Constants", text);
                editor.item_extension = '.constants.js';
                editor.cssClassName = "BuilderCodeMirrorEditorTabsStyle";
                return editor;
        }
        this.Styles = function(){
            let content = (this.json['styles'][0] && this.json['styles'][0].content) ? this.json['styles'][0].content : null;
            let text = (this.input) ? MODULE_NEW_BLOCK_STYLE.split('$()').join(StringHandler.camelCaseFirstUpperCase(this.input)) : content;
            let editor = new BuilderCodeEditor("Styles", text);
                editor.item_extension = '.style.js';
                editor.cssClassName = "BuilderCodeMirrorEditorTabsStyle";
                return editor;
        }
        this.Tests = function(){
            let content = (this.json['tests'][0] && this.json['tests'][0].content) ? this.json['tests'][0].content : null;
            let text = (this.input) ? MODULE_NEW_BLOCK_TEST.split('$()').join(StringHandler.camelCaseFirstUpperCase(this.input)).split('$(_)').join(StringHandler.snakeCase(this.input)) : content;
            let editor = new BuilderCodeEditor("Tests", text);
                editor.item_extension = '.tests.js';
                editor.cssClassName = "BuilderCodeMirrorEditorTabsStyle";
                return editor;
        }

        let ul = new Control('ul');
        let ol = new Control('ol');
        for(let label in this.TabSet){
            let li = new Control('li');
            let tmp = StringHandler.snakeCase(this.TabSet[label]);
            let hyperlink = new Hyperlink(this.TabSet[label],"#"+tmp);
            hyperlink.onclick = function(){
                let tabContentId = this.href.substr(this.href.indexOf("#"), this.href.length);
                let tabs = document.querySelectorAll('.TabsContent > div').forEach(function(item, index){
                    item.style.display = 'none';
                });
                document.querySelector('div'+tabContentId).style.display = 'block';
            };
            li.Controls.Add(hyperlink);
            ol.Controls.Add(li);
        }
        ul.Controls.Add(ol)
        this.Controls.Add(ul);

        let div = new Control('div');
        div.Attribute('class','TabsContent');
        for(let label in this.TabSet){
            let tab = new Control('div');
            tab.id = StringHandler.snakeCase(this.TabSet[label]);
            tab.Controls.Add(this[StringHandler.camelCaseFirstUpperCase(this.TabSet[label])]());
            div.Controls.Add(tab)
        }
        this.Controls.Add(div)

        return super.Render()
    }
}