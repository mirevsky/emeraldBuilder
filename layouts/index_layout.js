import {Control} from '../application/controls/controls_collection.js';
import {Layout} from '../application/controls/layout.js';
import {Link, Image, Hyperlink} from '../../application/controls/ui.js';

import {Header} from '../public_controls/header/header.js';

export class IndexLayout extends Layout
{
    RenderHead(){
        this.Head.Controls.Add(new Link("default", "resources/css/default.css"));
        return super.RenderHead()
    }

    RenderBody(){
      
      	this.Body.Controls.Add(this.RenderTemplates());

      	return super.RenderBody();
    }
}