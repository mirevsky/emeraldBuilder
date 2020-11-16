import {Control} from '../../controls_collection.js';
import {Select, Hyperlink, Input} from '../../ui.js';
import {SelectAndAddStyle} from './select_and_add.style.js';


export class SelectAndAdd extends Control
{
    constructor(Name='', OptionSet=[]){
        super('div');
        this.Name = Name;
        this.OptionSet = OptionSet;
        this.Selected = null;
        this.OptGroup = [];
        this.Multiple = false;
        this.AssignCSSClass(SelectAndAddStyle);
    }

    onSave(){
        console.log('on Save');
    }

    onNew(){
        let input = new Input('input_'+this.Name);
        input.onblur = this.onSave;
        input.AfterRender = () => {
            setTimeout(function(){
                input.innerRef.focus();
            });
        }
        this.innerRef.parent.append(input.Render());
    }

    Render(){
        let select = new Select(this.Name, this.OptionSet);
        select.OptGroup = this.OptGroup;
        select.Multiple = this.Multiple;
        select.Selected = this.Selected;
        this.Controls.Add(select);

        let add = new Hyperlink("+", "#");
        add.Name = this.Name;
        add.onSave = this.onSave;
        add.onclick = this.onNew;
        this.Controls.Add(add);

        return super.Render();
    }
}