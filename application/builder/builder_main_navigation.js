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

import {BuilderMainNavigationStyle} from './builder.style.js';
import {BuilderPreview} from './builder_preview.js';
import {BuilderModules} from './builder_modules.js';

export class BuilderMainNavigation extends Control
{
    constructor(){
        super("div")
        this.AssignCSSClass(BuilderMainNavigationStyle);
    }

    static CloseTab(){
        let module = this.innerRef.parentElement.getAttribute('module');
        let item = this.innerRef.parentElement.firstChild.getAttribute('item');

        if(window.localStorage.getItem('tabs')) {
            let object = JSON.parse(window.localStorage.getItem('tabs'));
            for (let index in object){
                let item_tab = object[index];
                for (let inner in item_tab.module){
                    let inner_tab = item_tab.module[inner];
                    if (inner_tab.module == module && inner_tab.tab == item) {
                        object.splice(index, 1);
                        this.innerRef.parentElement.remove();
                    }
                }
            }
            window.localStorage.setItem('tabs', JSON.stringify(object));
        }

        let object = JSON.parse(window.localStorage.getItem('tabs'));
        if (object.length === 0) {
            BuilderPreview.DesignView();
            Control.select('#BuilderCodeEditor').innerHTML = '';
            window.localStorage.setItem('current_tab' , '');
        } else {
            let item = object.length - 1;
            let module = object[item].module[0];
            window.localStorage.setItem('current_tab' , module.module+'-'+module.tab);
            BuilderPreview.SplitView();
            eval('BuilderModules._'+module.module+'("'+module.tab+'");');
        }

    }

    Render(){
            let navi = new Control("span");
            navi.Attribute("class", "navi");

            let label = new Image("next", "application/theme/default/next.svg");

            var tooltip = new Tooltip('tooltip', "Current section", 'TooltipTop');
            tooltip.Controls.Add(new Hyperlink(Application.request.SectionCode,"?SectionCode="+Application.request.SectionCode));
            navi.Controls.Add(tooltip);

            navi.Controls.Add(label);

            var tooltip = new Tooltip('tooltip', "Section layout", 'TooltipTop');
            tooltip.Controls.Add(new Hyperlink("IndexLayout","#"));
            navi.Controls.Add(tooltip);

            navi.Controls.Add(label);

            var tooltip = new Tooltip('tooltip', "Section templates", 'TooltipTop');
            tooltip.Controls.Add(new Hyperlink("IndexTemplate","#"));
            navi.Controls.Add(tooltip);

            navi.Controls.Add(label);

            var tooltip = new Tooltip('tooltip', "Template actions", 'TooltipTop');
            tooltip.Controls.Add(new Hyperlink(Application.request.Action+"Action","?SectionCode="+Application.request.SectionCode+"&Action="+Application.request.Action));
            navi.Controls.Add(tooltip);
            this.Controls.Add(navi);

            let clear = new Control("div");
            clear.Style("clear","both");
            this.Controls.Add(clear);

        return super.Render()
    }
}