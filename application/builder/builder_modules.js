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
    Radio,
    Select,
    Tabs, Tooltip, Textarea
} from '../controls/ui.js';

import { Grid } from '../controls/ui/grid/grid.js';

import {
    MODULE_NEW_LAYOUT,
    MODULE_NEW_TEMPLATE,
    MODULE_NEW_BLOCK,
    MODULE_NEW_BLOCK_STYLE,
    MODULE_NEW_BLOCK_TEST,
    MODULE_NEW_CONTROL,
    MODULE_NEW_CONTROL_STYLE,
    MODULE_NEW_CONTROL_TEST
} from './builder.constants.js'

import {BuilderCodeEditor} from './builder_code_editor.js';
import {BuilderCodeEditorTabs} from './builder_code_editor_tabs.js'
import {BuilderCodeMirrorEditorTabsStyle} from './builder.style.js';

import {BuilderPreview} from './builder_preview.js'
import {BuilderFileNavigation} from './builder_file_navigation.js'

export class BuilderModules
{
    static SaveModule(module, item, content, ext='.js'){
        module = (this.module) ? this.module : module;
        item = (this.item) ? this.item : item;
        content = (this.elementSelector) ? Control.select(this.elementSelector).value : content;
        ext = (this.ext) ? this.ext : ext;

        const params = {
            module: module,
            item: item,
            content: content,
            ext: ext,
        };
        let path = null
        switch(module){
            case 'layouts':
                path = './layouts/';
                break;
            case 'templates':
                path = './templates/';
                break;
            case 'blocks':
                path = './blocks/'+item+'/';
                break;
            case 'controls':
                path = './public_controls/'+item+'/';
                break;
            case 'resources':
                path = './resources/';
                break;
            case 'locale':
                path = './locale/';
                break;
        }

        if(path){
            const fs = require('fs');
            fs.writeFile(path+"/"+item+ext, content, (err) => {
              if (err) console.log(err);
            });
        }
    }

    static _blocks(item=null){
        if (item) {
            const fs = require('fs');
            fs.readdir("./blocks/"+item+"/", (err, files) => {
                let result = {};
                result.all_files = files;
                result.files=[];
                result.styles=[];
                result.tests=[];
                result.constants=[];

                for(let i in files){
                    let tmp = {};
                    tmp.file_name = files[i];
                    fs.readFile("./blocks/"+item+"/"+tmp.file_name, 'utf8' , (error, data) => {
                        tmp.content = data;
                    });

                    if(tmp.file_name.indexOf(".constants.js") > 1){
                        result.constants.push(tmp);
                    }else if(tmp.file_name.indexOf(".test.js") > 1){
                        result.tests.push(tmp);
                    }else if(tmp.file_name.indexOf(".style.js") > 1){
                        result.styles.push(tmp);
                    } else {
                        result.files.push(tmp);
                    }
                }
                let element = Control.select('#BuilderCodeEditor');
                element.innerHTML = '';
                setTimeout(function(){
                    let tabs = new BuilderCodeEditorTabs('block_elements', ["Block", "Constants", "Styles", "Tests"]);
                    tabs.model = 'blocks';
                    tabs.json = result;
                    tabs.Block = function(){
                        let content = (this.json.files[0] && this.json.files[0].content) ? this.json.files[0].content : null;
                        let editor = new BuilderCodeEditor("Blocks", content);
                        editor.cssClassName = "BuilderCodeMirrorEditorTabsStyle";
                        return editor;
                    }
                    element.append(tabs.Render());
                    BuilderPreview.SplitView();
                },100);
            });
            return false;
        }

        let span = new Control("span")
        span.Controls.Add(new Label("Block name:"));
        span.Controls.Add(new Input("Block"));
        span.Controls.Add(new Control("div"))

        let message_box = new MessageBox("BlocksMessageBox", "Create new block", span);
        message_box.Confirm = function(){
            let input = Control.select('input[name="Block"]').value;
            let object = JSON.parse(window.localStorage.getItem('tabs'));
            object.push({module: [{'tab':input, 'module':'blocks'}]});
            window.localStorage.setItem('tabs', JSON.stringify(object));
            let element = Control.select('#BuilderCodeEditor');
            element.innerHTML = '';
            let tabs = new BuilderCodeEditorTabs('block_elements', ["Block", "Constants", "Styles", "Tests"]);
            tabs.model = 'blocks';
            tabs.input = input;
            tabs.Block = function(){
                let editor = new BuilderCodeEditor("Blocks", MODULE_NEW_BLOCK.split('$()').join(StringHandler.camelCaseFirstUpperCase(input)).split('$(_)').join(StringHandler.snakeCase(input)));
                editor.cssClassName = "BuilderCodeMirrorEditorTabsStyle";
                return editor;
            }
            element.append(tabs.Render());
            message_box.innerRef.remove();
            BuilderPreview.SplitView();
        }
        document.body.appendChild(message_box.Render());
    }

    static _controls(item=null){
        if (item) {
            const fs = require('fs');
            fs.readdir("./public_controls/"+item+"/", (err, files) => {
                let result = {};
                result.all_files = files;
                result.files=[];
                result.styles=[];
                result.tests=[];
                result.constants=[];

                for(let i in files){
                    let tmp = {};
                    tmp.file_name = files[i];
                    fs.readFile("./public_controls/"+item+"/"+tmp.file_name, 'utf8' , (error, data) => {
                        tmp.content = data;
                    });

                    if(tmp.file_name.indexOf(".constants.js") > 1){
                        result.constants.push(tmp);
                    }else if(tmp.file_name.indexOf(".test.js") > 1){
                        result.tests.push(tmp);
                    }else if(tmp.file_name.indexOf(".style.js") > 1){
                        result.styles.push(tmp);
                    } else {
                        result.files.push(tmp);
                    }
                }
                let element = Control.select('#BuilderCodeEditor');
                element.innerHTML = '';
                setTimeout(function(){
                    let tabs = new BuilderCodeEditorTabs('controls_elements', ["Control", "Constants", "Styles", "Tests"]);
                    tabs.model = 'blocks';
                    tabs.json = result;
                    tabs.Control = function(){
                        let content = (this.json.files[0] && this.json.files[0].content) ? this.json.files[0].content : null;
                        let editor = new BuilderCodeEditor("Control", content);
                        editor.cssClassName = "BuilderCodeMirrorEditorTabsStyle";
                        return editor;
                    }
                    element.append(tabs.Render());
                    BuilderPreview.SplitView();
                },100);
            });
            return false;
        }

        let span = new Control("span")
        span.Controls.Add(new Label("Control name:"));
        span.Controls.Add(new Input("Control"));
        span.Controls.Add(new Control("div"))

        let message_box = new MessageBox("ControlsMessageBox", "Create new control", span);
        message_box.Confirm = function(){
            let input = Control.select('input[name="Control"]').value;
            let object = JSON.parse(window.localStorage.getItem('tabs'));
            object.push({module: [{'tab':input, 'module':'controls'}]});
            window.localStorage.setItem('tabs', JSON.stringify(object));

            let element = Control.select('#BuilderCodeEditor');
            element.innerHTML = '';
            let tabs = new BuilderCodeEditorTabs('control_elements', ["Control", "Constants", "Styles", "Tests"]);
            tabs.model = 'controls';
            tabs.input = input;
            tabs.Control = function(){
                let editor = new BuilderCodeEditor("Controls", MODULE_NEW_CONTROL.split('$()').join(StringHandler.camelCaseFirstUpperCase(input)).split('$(_)').join(StringHandler.snakeCase(input)));
                editor.cssClassName = "BuilderCodeMirrorEditorTabsStyle";
                return editor;
            }
            element.append(tabs.Render());
            message_box.innerRef.remove();
            BuilderPreview.SplitView();
        }
        document.body.appendChild(message_box.Render());
    }

    static _layouts(item=null){

        if(item) {
            const fs = require('fs');
            fs.readFile("./layouts/"+item+".js", 'utf8' , (error, data) => {
                let element = Control.select('#BuilderCodeEditor');
                element.innerHTML = '';
                let editor = new BuilderCodeEditor("Layouts", data);
                editor.cssClassName = "BuilderCodeMirrorEditorTabsStyle";
                element.append(editor.Render());
                BuilderPreview.SplitView();
            });
            return false;
        }

        let span = new Control("span")
        span.Controls.Add(new Label("Layout name:"));
        span.Controls.Add(new Input("Layout"));
        span.Controls.Add(new Control("div"))

        let message_box = new MessageBox("Layout", "Create new layout", span);
        message_box.Confirm = function(){
            let input = Control.select('input[name="Layout"]').value;
            let object = JSON.parse(window.localStorage.getItem('tabs'));
            object.push({module: [{'tab':input+'_layout', 'module':'layouts'}]});
            window.localStorage.setItem('tabs', JSON.stringify(object));

            let element = Control.select('#BuilderCodeEditor');
            element.innerHTML = '';
            let content = MODULE_NEW_LAYOUT.replace('$()', StringHandler.camelCaseFirstUpperCase(input));

            let editor = new BuilderCodeEditor("Layouts", content);
            editor.cssClassName = "BuilderCodeMirrorEditorTabsStyle";
            element.append(editor.Render());
            this.parent.parentElement.remove();
            BuilderPreview.SplitView();

            BuilderModules.SaveModule('layouts', input+'_layout', content);
        }
        document.body.appendChild(message_box.Render());
    }

    static _locale(item=null){
        item = (item) ? item : Application.config.default.language.code;

        if (item) {
            var locale = import('../../locale/'+item+'.js');
            locale.then(function(result){
                let tmp = [];
                for(let key in result.Locale){
                    tmp.push({key: key, code: result.Locale[key]})
                }
                let message_box = new MessageBox("Locale", "Manage locale");
                let grid = new Grid("locale_grid", tmp);
                grid.Fields = [
                    { name: "key", type: "text", width: 100 },
                    { name: "code", type: "text", width: 200 }
                ]
                message_box.Controls.Add(grid);
                document.body.appendChild(message_box.Render());
            });
            return false;
        }
    }

    static _resources(item=null){
        if (item) {
            let builder_file_navigation = new BuilderFileNavigation('BuilderFileNavigation', item, BuilderFileNavigation.RecursiveFileTree('./resources/'+item+'/'));
            Control.select('.RightMenuNavigation').innerHTML = '';
            Control.select('.RightMenuNavigation').append(builder_file_navigation.Render());
            return false;
        }

        let message_box = new MessageBox("Resources", "Choose resources action");
        message_box.Controls.Add(new Radio("Resources[]", "Directory"));
        message_box.Controls.Add(new Image("Directory", "application/theme/default/directory.svg"));
        message_box.Controls.Add(new Radio("Resources[]", "CSS"));
        message_box.Controls.Add(new Image("CSS", "application/theme/default/css.svg"));
        message_box.Controls.Add(new Radio("Resources[]", "Image"));
        message_box.Controls.Add(new Image("Image", "application/theme/default/images.svg"));
        message_box.Controls.Add(new Radio("Resources[]", "Font"));
        message_box.Controls.Add(new Image("Font", "application/theme/default/font.svg"));
        document.body.appendChild(message_box.Render());
        return false;
    }

    static _templates(item=null){
        if(item) {
            const fs = require('fs');
            fs.readFile("./templates/"+item+".js", 'utf8' , (error, data) => {
                let element = Control.select('#BuilderCodeEditor');
                element.innerHTML = '';
                let editor = new BuilderCodeEditor("Templates", data);
                editor.cssClassName = "BuilderCodeMirrorEditorTabsStyle";
                element.append(editor.Render());
                BuilderPreview.SplitView();
            });
            return false;
        }

        let span = new Control("span")
        span.Controls.Add(new Label("Template name:"));
        span.Controls.Add(new Input("Template"));
        span.Controls.Add(new Control("div"))

        let message_box = new MessageBox("Template", "Create new template", span);
        message_box.Confirm = function(){
            let input = Control.select('input[name="Template"]').value;
            let object = JSON.parse(window.localStorage.getItem('tabs'));
            object.push({module: [{'tab':input+'_template', 'module':'templates'}]});
            window.localStorage.setItem('tabs', JSON.stringify(object));

            let element = Control.select('#BuilderCodeEditor');
            element.innerHTML = '';
            let editor = new BuilderCodeEditor("Templates", MODULE_NEW_TEMPLATE.replace('$()', StringHandler.camelCaseFirstUpperCase(input)));
            editor.cssClassName = "BuilderCodeMirrorEditorTabsStyle";
            element.append(editor.Render());
            this.parent.parentElement.remove();
            BuilderPreview.SplitView();

            BuilderModules.SaveModule('templates', input+'_template', content);
        }
        document.body.appendChild(message_box.Render());
    }
}