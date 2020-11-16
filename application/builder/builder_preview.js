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

import {BuilderPreviewStyle} from './builder.style.js';

export class BuilderPreview extends Control
{
    constructor(){
        super("div")
        this.AssignCSSClass(BuilderPreviewStyle);
    }

    static SplitView(){
        document.body.style.width = "calc(50% - 80px - 48px)";
        Control.select('#BuilderCodeEditor').style.left = "50%";
        Control.select('#BuilderCodeEditor').style.width = "50%";
        Control.select('#BuilderCodeEditor').style.display = 'block';
    }

    static SourceView(){
        Control.select('#BuilderCodeEditor').style.left = "0";
        Control.select('#BuilderCodeEditor').style.width = "100%";
        Control.select('#BuilderCodeEditor').style.display = 'block';
    }

    static DesignView(){
        document.body.style.width = "calc(100% - 80px - 48px)";
        Control.select('#BuilderCodeEditor').style.display = 'none';
    }

    Render(){
        let tabs = ["design", "split", "source"];
        for(let index in tabs){
            let li = new Control("li");
            li.Attribute('class', tabs[index]);
            let hyperlink = new Hyperlink(tabs[index], "#view-"+tabs[index]);
            hyperlink.onclick = function(){
                switch(tabs[index]) {
                    case 'split':
                        BuilderPreview.SplitView();
                        break;
                    case 'source':
                        BuilderPreview.SourceView();
                        break;
                    default:
                        BuilderPreview.DesignView();
                        break;
                }
            }
            li.Controls.Add(hyperlink)
            this.Controls.Add(li);
        }


        return super.Render()
    }
}