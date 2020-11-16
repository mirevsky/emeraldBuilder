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
    SelectAndAdd
} from '../controls/ui/select_and_add/select_and_add.js'

import {BuilderModules} from './builder_modules.js';
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

import {BuilderSectionsStyle} from './builder.style.js';

export class BuilderSections extends PageWindow
{
    constructor(Code = null){
        super(Code, Code);
        this.Code = Code;
        this.AssignCSSClass(BuilderSectionsStyle);
    }

    static EditNewSection(Code=null){
        document.body.appendChild(new BuilderSections(Code).Render());
    }

    static initTinyMCE(elementSelector){
        tinymce.init({
          target: elementSelector,
          plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
          imagetools_cors_hosts: ['picsum.photos'],
          menubar: 'file edit view insert format tools table help',
          toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
          toolbar_sticky: true,
          autosave_ask_before_unload: true,
          autosave_interval: "30s",
          autosave_prefix: "{path}{query}-{id}-",
          autosave_restore_when_empty: false,
          autosave_retention: "2m",
          image_advtab: true,
          content_css: '/application/theme/default/codepen.min.css',
          link_list: [
            { title: 'My page 1', value: 'http://www.tinymce.com' },
            { title: 'My page 2', value: 'http://www.moxiecode.com' }
          ],
          image_list: [
            { title: 'My page 1', value: 'http://www.tinymce.com' },
            { title: 'My page 2', value: 'http://www.moxiecode.com' }
          ],
          image_class_list: [
            { title: 'None', value: '' },
            { title: 'Some class', value: 'class-name' }
          ],
          importcss_append: true,
          file_picker_callback: function (callback, value, meta) {
            /* Provide file and text for the link dialog */
            if (meta.filetype === 'file') {
              callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
            }

            /* Provide image and alt text for the image dialog */
            if (meta.filetype === 'image') {
              callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
            }

            /* Provide alternative source and posted for the media dialog */
            if (meta.filetype === 'media') {
              callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
            }
          },
          templates: [
                { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
            { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
            { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
          ],
          template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
          template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
          image_caption: true,
          height:350,
          width:800,
          quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
          noneditable_noneditable_class: "mceNonEditable",
          toolbar_mode: 'sliding',
          contextmenu: "link image imagetools table",
          setup: function(ed){
            ed.on('keyup', function(e){
                Control.select('#'+ed.id).innerHTML = tinyMCE.activeEditor.getContent();
            });
          }
         });
    }

    ParentSectionTree(sectionCode, tree=[]){
        let sections = Section.getSectionByParent(sectionCode);
        for (let index in sections) {
            let code = sections[index].Code.toString();
            tree[code] = code;
            tree = this.ParentSectionTree(code, tree);
        }
        return tree;
    }

    static SaveSection(params={}){
        const fs = require('fs');
        let section = {};
        section.Code = params.Code;
        section.ShowInPath = params.ShowInPath ? true : false;
        section.ShowInMap = params.ShowInMap ? true : false;
        section.ParentSection = params.ParentSection ? params.ParentSection : null;
        section.Layout = params.Layout.replace("_layout", "");
        section.Templates = [params.Templates.replace("_template", "")];

        console.log(params);

        fs.readFile("./application/config/project.json", 'utf8' , (error, data) => {
            let insertData = true;
            data = JSON.parse(data);
            for(let s in data.sections){
                if(data.sections[s].Code == section.Code) {
                    insertData = false;
                    data.sections[s] = section;
                }
            }
            if (insertData) {
                data.sections.pop(section);
            }
            fs.writeFile("./application/config/project.json", JSON.stringify(data), (err) => {
              if (err) console.log(err);
            });
        });

        var locale = import('../../locale/'+params.Locale+'.js');
        locale.then(function(result){
            let scode = '';
            for(let key in result){
                scode += 'export const '+key+' = ';
                if(key == 'section_'+section.Code) {
                    scode += '`'+params.Content+'`;\n';
                }else{
                    scode += ( (typeof result[key] == 'object') ? JSON.stringify(result[key])+';\n' : '`'+result[key]+'`;\n' );
                }
            }
            fs.writeFile('./locale/'+params.Locale+'.js', scode, (err) => {
              if (err) console.log(err);
            });
        });

    }

    Render(){
        let br = new Control("br")
        let currentSection = Section.getSectionByCode(this.Code);
        let language = (currentSection) ? eval('Application.locale.'+currentSection.Code) : '';
        if (!currentSection){
            currentSection = {"Code": "", "ShowInPath" : false, "ShowInMap" : false, "ParentSection" : null, "Layout" : "index", "Templates": ["index"]}
        }

        this.Style('top', '10%');
        this.Style('left', '10%');
        this.Style('width', '820px');
        let form = new Form('section_form')
        form.Style('position','relative');
        var fieldSet = new Fieldset("sectionInfo", "Information");
        fieldSet.Controls.Add(new Label("Name:"));
        fieldSet.Controls.Add(new Input("Name", language));
        fieldSet.Controls.Add(br);
        fieldSet.Controls.Add(new Label("Code:"));
        fieldSet.Controls.Add(new Input("Code", currentSection.Code));
        fieldSet.Controls.Add(br);
        fieldSet.Controls.Add(new Label("Locale:"));
        let locale = new Select("Locale");
        locale.AfterRender = function(){
            const fs = require('fs');
            fs.readdir("./locale/", (err, files) => {
                let result = [];
                for(let i in files){
                    let tmp = files[i].replace(".js","");
                    result[tmp] = tmp;
                }
                let element = new Select("Locale", result);
                this.innerRef.innerHTML = element.Render().innerHTML;
            });
        }
        fieldSet.Controls.Add(locale);
        fieldSet.Controls.Add(br);
        fieldSet.Controls.Add(new Label("Parent section:"));
        fieldSet.Controls.Add(new Select("Parent", this.ParentSectionTree(null, [''], 0)));
        fieldSet.Controls.Add(br);
        fieldSet.Controls.Add(new Label("Show in sitemap:"));
        fieldSet.Controls.Add(new Checkbox("ShowInMap", currentSection.ShowInMap));
        fieldSet.Controls.Add(br);
        fieldSet.Controls.Add(new Label("Show in path:"));
        fieldSet.Controls.Add(new Checkbox("ShowInPath", currentSection.ShowInPath));
        form.Controls.Add(fieldSet);
        var fieldSet = new Fieldset("sectionSettings", "Settings");
        fieldSet.Controls.Add(new Label("Layout:"));
        let layout = new Select("Layout");
        layout.Selected = currentSection.Layout;
        layout.AfterRender = function(){
            const fs = require('fs');
            fs.readdir("./layouts/", (err, files) => {
                let result = [];
                for(let i in files){
                    let tmp = files[i].replace(".js","");
                    result[tmp] = tmp;
                }
                let element = new Select("Layout", result);
                element.Selected = currentSection.Layout;
                this.innerRef.innerHTML = element.Render().innerHTML;
            });
        };
        fieldSet.Controls.Add(layout);
        fieldSet.Controls.Add(br);
        fieldSet.Controls.Add(new Label("Templates:"));
        let templates = new SelectAndAdd("Templates");
        templates.Selected = currentSection.Templates;
        templates.Multiple = true;
        templates.onSave = function(){
            if(this.value.length > 3){
                BuilderModules.SaveModule('templates', this.value+'_template', MODULE_NEW_TEMPLATE.replace('$()', StringHandler.camelCaseFirstUpperCase(this.value)));
                const fs = require('fs');
                fs.readdir("./templates/", (err, files) => {
                    let result = [];
                    for(let i in files){
                        let tmp = files[i].replace(".js","");
                        result[tmp] = tmp;
                    }
                    let element = new Select("Templates", result);
                    element.Selected = currentSection.Templates;
                    templates.innerRef.children[0].innerHTML = element.Render().innerHTML;
                    templates.innerRef.children[2].remove();
                });
            }
        }
        templates.AfterRender = function(){
            const fs = require('fs');
            fs.readdir("./templates/", (err, files) => {
                let result = [];
                for(let i in files){
                    let tmp = files[i].replace(".js","");
                    result[tmp] = tmp;
                }
                let element = new Select("Templates", result);
                element.Selected = currentSection.Templates;
                this.innerRef.children[0].innerHTML = element.Render().innerHTML;
            });
        };
        fieldSet.Controls.Add(templates);
        form.Controls.Add(fieldSet)
        let textarea = new Textarea("Content");
        textarea.id = "Content";
        form.Controls.Add(textarea);

        var button = new Button("Ok");
        button.onclick=function(event){
            event.preventDefault();
            event.stopPropagation();

            const formToJSON = elements => [].reduce.call(elements, (data, element) => {
              data[element.name] = element.value;
              return data;
            }, {});

            const params = formToJSON(this.parent.elements);

            BuilderSections.SaveSection(formToJSON(this.parent.elements));
            return false;
        };
        form.Controls.Add(button);
        var button = new Button("Cancel");
        button.onclick=function(){
            this.parent.parentElement.parentElement.remove();
        };
        form.Controls.Add(button);

        this.Controls.Add(form);
        this.AfterRender=()=>{
            this.innerRef.firstChild.onmousedown = PageWindow.DragMouseDown;
            PageWindow.Element = this.innerRef;

            BuilderSections.initTinyMCE(this.innerRef.querySelector('#Content'));
        };

        return super.Render()
    }
}