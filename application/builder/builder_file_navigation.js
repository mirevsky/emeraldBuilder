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

import {BuilderFileNavigationStyle} from './builder.style.js';
import {BuilderModules} from './builder_modules.js';
import {BuilderSections} from './builder_sections.js';
import {BuilderRightMenu} from './builder_right_menu.js';

export class BuilderFileNavigation extends Control
{
    constructor(id = null, item = null, source = null){
        super("div")
        this.id = id;
        this.item = item;
        this.parent_node = null;
        this.source = source;
        this.current_node = this.source.nodes;
        this.AssignCSSClass(BuilderFileNavigationStyle);
    }

    static RecursiveFileTree(path){
        const fs = require('fs');

        let result = {};
        if (fs.lstatSync(path).isDirectory()) {
            let directory = path.split("/");
            result.file_name = directory[directory.length-2];
            result.file_path = path;
            result.nodes = [];
            fs.readdir(path, (err, files) => {
                for(let i in files){
                    var append = '';
                    if(files[i].indexOf('.') < 0){
                        append='/';
                    }
                    result.nodes.push(BuilderFileNavigation.RecursiveFileTree(path+files[i]+append));
                }
            });
        }else{
            let directory = path.split("/");
            result.file_name = directory[directory.length-1];
            result.file_path = path;
        }
        return result;
    }

    GoToParentNode(){
        if(this.item == this.source.file_name){
            let module = 'resources';
            Control.select('.button_new').setAttribute('module', module);

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

        let builder_file_navigation = new BuilderFileNavigation('BuilderFileNavigation', this.item, this.source);
        builder_file_navigation.item = this.parent_node.file_name;
        builder_file_navigation.current_node = this.parent_node.nodes;
        let parent = this.innerRef.parent.parentElement;
        parent.innerHTML = '';
        parent.append(builder_file_navigation.Render());
    }

    GoToChildNode(){
        let builder_file_navigation = new BuilderFileNavigation('BuilderFileNavigation', this.item, this.source);
        builder_file_navigation.parent = this.current_node;
        builder_file_navigation.current_node = this.current_node.nodes;
        let parent = this.innerRef.parentElement.parentElement;
        parent.innerHTML = '';
        parent.append(builder_file_navigation.Render());
    }

    ViewFileSource(){
        let image_ext = ['.png','.gif','.svg','.jpg','.jpeg'];
        let code_ext = ['.html','.js','.css'];
        var re = /(?:\.([^.]+))?$/;
        let ext = re.exec(this.current_node.file_name)[1];
        if(ext && image_ext.indexOf(ext)){
            let message_box = new MessageBox("Resources", this.current_node.file_name);
            let preview = new Control('div');
            preview.Style('height', '480px');
            preview.Style('width', '640px');
            preview.Style('background', 'url('+this.current_node.file_path+') no-repeat');
            preview.Style('backgroundSize', '100% auto');
            message_box.Controls.Add(preview);
            document.body.appendChild(message_box.Render());
        }else if(ext && code_ext.indexOf(ext)){
            console.log('file');
            //@todo this needs to be done
        }

        console.log(this.current_node.file_name);
        console.log(this.current_node.file_path);
    }

    Render(){
        let backButton = new Hyperlink("...","#");
        backButton.item = this.item;
        backButton.parent_node = this.source;
        backButton.source = this.source;
        backButton.onclick = this.GoToParentNode;
        this.Controls.Add(backButton);

        let node = this;
        var waitforNode = setInterval(function(){
            if (node.current_node) {
                for (let index in node.current_node) {
                    let item = node.current_node[index];
                    let link = new Hyperlink(item.file_name,"#");
                    link.Style('background' , (node.current_node[index].file_path) ? 'url('+node.current_node[index].file_path+') no-repeat 50% 50%' : 'none');
                    link.Style('backgroundSize', '100% auto');
                    link.parent_node = node.source;
                    link.source = node.source;
                    link.item = item.file_name;
                    link.current_node = node.current_node[index];
                    link.onclick = (item.nodes) ? node.GoToChildNode : node.ViewFileSource;
                    node.innerRef.append(link.Render());
                }
                clearInterval(waitforNode);
            }
        });

        return super.Render()
    }
}