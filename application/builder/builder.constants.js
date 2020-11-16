import { Link, Script } from '../controls/ui.js';

export const MODULE_NEW_TEMPLATE = `import {Control} from '../application/controls/controls_collection.js';
import {Template} from '../application/controls/template.js';

export class $()Template extends Template
{
    indexAction(){
    }

    listAction(){
    }

    viewAction(){
    }
}`;

export const MODULE_NEW_LAYOUT = `import {Control} from '../application/controls/controls_collection.js';
import {Layout} from '../application/controls/layout.js';

export class $()Layout extends Layout
{
    RenderHead(){
        return super.RenderHead()
    }

    RenderBody(){
        // Render templates
        this.Body.Controls.Add(this.RenderTemplates());
        return super.RenderBody()
    }
}`;

export const MODULE_NEW_BLOCK = `import {Control} from '../../application/controls/controls_collection.js';
import {Block} from '../../application/controls/block.js';
import {$()Style} from './$(_).style.js'

export class $()Block extends Block
{
    indexAction(){
    }

    listAction(){
    }

    viewAction(){
    }
}`;

export const MODULE_NEW_BLOCK_STYLE = `export const $()Style = \`
\``

export const MODULE_NEW_BLOCK_TEST = `import {Unittest} from '../../application/controls/testing.js';
import {$()} from '../$(_).js'
export class $()Test extends Unittest
{
}`

export const MODULE_NEW_CONSTANTS = `export const $() = '';
`

export const MODULE_NEW_CONTROL = `import {Control} from '../application/controls/controls_collection.js';

export class $() extends Control
{
    constructor(){
        super("div")
    }

    Render(){
        return super.Render()
    }
}
`

export const MODULE_NEW_CONTROL_STYLE = `

`

export const MODULE_NEW_CONTROL_TEST = `

`

export const MODULE = {
    SECTIONS : 'sections',
    BLOCKS : 'blocks',
    LAYOUTS : 'layouts',
    PUBLIC : 'controls',
    TEMPLATES : 'templates',
    RESOURCES : 'resources',
    LOCALE : 'locale',
}

export const LIBRARIES = [
    new Script("application/library/tinymce/tinymce.js"),
    new Link("codemirror", "application/library/codemirror/lib/codemirror.css"),
    new Script("application/library/codemirror/lib/codemirror.js"),
    new Script("application/library/codemirror/mode/xml/xml.js"),
    new Script("application/library/codemirror/mode/javascript/javascript.js"),
    new Script("application/library/codemirror/mode/css/css.js"),
    new Script("application/library/codemirror/mode/htmlmixed/htmlmixed.js"),
    new Script("application/library/codemirror/addon/edit/matchbrackets.js"),
    new Script("application/library/codemirror/addon/display/autorefresh.js"),
    new Link("jsgrid", "application/library/jsgrid/css/jsgrid.css"),
    new Link("jsgrid", "application/library/jsgrid/css/theme.css"),
    new Script("application/library/jsgrid/external/jquery/jquery-1.8.3.js"),
    new Script("application/library/jsgrid/src/jsgrid.core.js"),
    new Script("application/library/jsgrid/src/jsgrid.load-indicator.js"),
    new Script("application/library/jsgrid/src/jsgrid.load-strategies.js"),
    new Script("application/library/jsgrid/src/jsgrid.sort-strategies.js"),
    new Script("application/library/jsgrid/src/jsgrid.field.js"),
    new Script("application/library/jsgrid/src/fields/jsgrid.field.text.js"),
    new Script("application/library/jsgrid/src/fields/jsgrid.field.number.js"),
    new Script("application/library/jsgrid/src/fields/jsgrid.field.select.js"),
    new Script("application/library/jsgrid/src/fields/jsgrid.field.checkbox.js"),
    new Script("application/library/jsgrid/src/fields/jsgrid.field.control.js")
]