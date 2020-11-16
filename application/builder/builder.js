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
    Select, Script,
    Tabs, Tooltip, Textarea
} from '../controls/ui.js';

import {BuilderCodeEditor} from './builder_code_editor.js';
import {BuilderRightMenu} from './builder_right_menu.js';
import {BuilderMainNavigation} from './builder_main_navigation.js';
import {BuilderPreview} from './builder_preview.js';

export class Builder extends Control
{
    constructor(){
        super("div");
        this.Controls.Add(new BuilderCodeEditor('BuilderCodeEditor', null, false));
        this.Controls.Add(new BuilderMainNavigation());
        this.Controls.Add(new BuilderRightMenu());
        this.Controls.Add(new BuilderPreview());
    }

    DisableContextMenu(){
        window.addEventListener('contextmenu', function (e) {
            // @todo global contextmenu
          e.preventDefault();
        }, false);
    }

    Render(){

        return super.Render();
    }
}

