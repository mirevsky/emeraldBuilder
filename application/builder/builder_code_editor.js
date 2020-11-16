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

import {BuilderRightMenu} from './builder_right_menu.js';
import {BuilderMainNavigation} from './builder_main_navigation.js';
import {BuilderModules} from './builder_modules.js';

import {BuilderCodeEditorStyle} from './builder.style.js';

export class BuilderCodeEditor extends Control
{
    constructor(Name = null, Value = null , init_editor = true){
        super("div");
        this.module = null;
        this.item_extension = null;
        this.Name = Name;
        this.Value = Value;
        this.init_editor = init_editor
        this.Attribute('id', Name)
        this.AssignCSSClass(BuilderCodeEditorStyle);
    }

    static RenderCodemirror(elementSelector){
        var value = "// The bindings defined specifically in the Sublime Text mode\nvar bindings = {\n";
        var map = CodeMirror.keyMap.sublime;
        for (var key in map) {
        var val = map[key];
        if (key != "fallthrough" && val != "..." && (!/find/.test(val) || /findUnder/.test(val)))
          value += "  \"" + key + "\": \"" + val + "\",\n";
        }
        value += "}\n\n// The implementation of joinLines\n";
        value += CodeMirror.commands.joinLines.toString().replace(/^function\s*\(/, "function joinLines(").replace(/\n  /g, "\n") + "\n";

        var customKeyMap = {
            ArrowUp(cm) { return cm.moveV(-1, "line") },
            ArrowDown(cm) { return cm.moveV(1, "line") },
            ArrowLeft(cm) { return cm.moveH(-1, "char") },
            ArrowRight(cm) { return cm.moveH(1, "char") },
        }

        let cmInstance = CodeMirror.fromTextArea(elementSelector, {
            autoRefresh:true,
            value: value,
            lineNumbers: true,
            mode: "javascript",
            keyMap: "sublime",
            autoCloseBrackets: true,
            matchBrackets: true,
            showCursorWhenSelecting: true,
            tabSize: 2
        });
        cmInstance.focus();
        cmInstance.on('change', editor => {
            elementSelector.value = editor.getValue();
        });
        cmInstance.on("keyup", function (cm, event) {
            if (customKeyMap[event.code]){
                eval('customKeyMap.'+event.code+'(cm);');
            }
        });
        return cmInstance;
    }

    Render(){
        let module = null;
        let item = null;
        let tabs = new Control("ul");
        tabs.id = "navigation_tabs";
        if(window.localStorage.getItem('tabs')) {
            let object = JSON.parse(window.localStorage.getItem('tabs'));
            let current_tab = window.localStorage.getItem('current_tab');
            for (let index in object){
                let item_tab = object[index];
                for (let inner in item_tab.module){
                    let inner_tab = item_tab.module[inner];

                    let li = new Control("li");
                    if(current_tab == inner_tab.module+"-"+inner_tab.tab){
                        li.Attribute('class', 'active');
                        module = inner_tab.module;
                        item = inner_tab.tab;
                    }
                    li.Attribute('module', inner_tab.module);
                    let hyperlink = new Hyperlink(inner_tab.tab, "#");
                    hyperlink.module = inner_tab;
                    hyperlink.Attribute('item', inner_tab.tab);
                    hyperlink.onclick = BuilderRightMenu.RightMenuOpenModule;
                    li.Controls.Add(hyperlink);
                    let close = new ImageLink("Close","#","application/theme/default/close.svg");
                    close.Style("float", "right");
                    close.onclick = BuilderMainNavigation.CloseTab
                    li.Controls.Add(close);

                    tabs.Controls.Add(li);
                }
            }
        }
        this.Controls.Add(tabs);
        let menu = new Control("div");
        menu.Attribute("class" , "code_editor_menu");
        let button_new = new ImageLink("New", "#" , "application/theme/default/document-new.svg");
        button_new.Attribute("module", module);
        button_new.onclick = BuilderRightMenu.RightMenuCreateModule;
        menu.Controls.Add(button_new);
        let save_document = new ImageLink("Save", "#" , "application/theme/default/document-save.svg");
        save_document.onclick = BuilderModules.SaveModule;
        save_document.module = module;
        save_document.item = item;
        save_document.ext = this.item_extension;
        save_document.elementSelector = 'textarea[name="'+this.Name+'"]';
        menu.Controls.Add(save_document);
        menu.Controls.Add(new ImageLink("Print", "javascript:print()" , "application/theme/default/document-print.svg"));
        this.Controls.Add(menu);

        this.Controls.Add(new Textarea(this.Name, this.Value));

        if (this.init_editor) {
            this.AfterRender=()=>{
                BuilderCodeEditor.RenderCodemirror(this.innerRef.children[2]);
            }
        }

        return super.Render()
    }
}