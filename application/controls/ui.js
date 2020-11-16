import {Application} from '../application.js'
import {Control} from './controls_collection.js';
import {StringHandler} from './handlers.js';

export class Input extends Control
{
    constructor(Name='', Value=''){
        super('input')
        this.Name = Name;
        this.Type = 'text';
        this.Value = Value;
    }

    Render(){
        this.Attribute('type', this.Type);
        this.Attribute('name', this.Name);
        this.Attribute('value', this.Value);

        return super.Render();
    }
}

export class Checkbox extends Input
{
    constructor(Name='', Value=0){
        super(Name);
        this.Type = 'checkbox';
        this.Checked = false;
        this.Value = Value;
    }

    Render(){
        if(this.Checked || this.Value){
            this.Checked = true;
            this.Value = 1;
            this.Attribute('checked','true');
            this.Attribute('value', this.Value);
        }

        this.onclick = () => {
            if(!this.Checked){
                this.Checked = true;
                this.Value = 1;
                this.innerRef.setAttribute('checked','true');
                this.innerRef.setAttribute('value', this.Value);
            }else{
                this.Checked = false;
                this.Value = 0;
                this.innerRef.setAttribute('checked','false');
                this.innerRef.setAttribute('value', this.Value);
            }
        };

        return super.Render();
    }
}

export class Radio extends Input
{
    constructor(Name=''){
        super(Name);
        this.Type = 'radio';
    }
}

export class Password extends Input
{
    constructor(Name=''){
        super(Name);
        this.Type = 'password';
    }
}

export class Label extends Control
{
    constructor(Name='', For=''){
        super('label')
        this.Name = Name;
        this.Attribute('for', For);
    }

    Render(){
        var label = null
        try {
            label = eval('Application.locale.'+this.Name);
        }catch(err){
            label = this.Name;
        }
        this.innerHTML = (label != undefined) ? label : this.Name;
        return super.Render();
    }
}

export class Button extends Control
{
    constructor(Name=''){
        super('button')
        this.Name = Name;
    }

    Render(){
        this.innerHTML = this.Name;
        return super.Render();
    }
}

export class Textarea extends Control
{
    constructor(Name='', innerHTML=''){
        super('textarea')
        this.Name = Name;
        this.name = this.Name;
        this.innerHTML = innerHTML;
    }

    Render(){
        return super.Render();
    }
}

export class Select extends Control
{
    constructor(Name='', OptionSet=[]){
        super('select')
        this.Name = Name;
        this.OptionSet = OptionSet;
        this.Selected = null;
        this.OptGroup = [];
        this.Multiple = false;
        this.Attribute('name', Name);
    }

    Render(){
        if (this.Multiple) {
            this.Attribute('multiple', 'true');
        }

        if (this.OptGroup.length) {
            for (var index in this.OptGroup){
                var optgroup = new Control("optgroup");
                optgroup.Attribute('label', index);
                if(this.OptGroup[index]){
                    optgroup.Controls.Add(this.OptGroup[index]);
                }
                this.Controls.Add(optgroup);
            }
            return super.Render();
        }

        for (var index in this.OptionSet){
            var option = new Control("option");
            if((typeof this.Selected) == 'string') {
                if (index == this.Selected){
                    option.Attribute("selected","true");
                }
            }else if((typeof this.Selected) == 'object'){
                if (this.Selected && this.Selected.indexOf(index)){
                    option.Attribute("selected","true");
                }
            }
            option.Attribute('value', index);
            option.innerHTML = this.OptionSet[index];
            this.Controls.Add(option);
        }

        return super.Render();
    }
}

export class IFrame extends Control
{
    constructor(Name='', Src=''){
        super('iframe')
        this.Name = Name;
        this.id = Name;
        this.src = Src;
    }

    Render(){
        return super.Render();
    }
}

export class Link extends Control
{
    constructor(Name='', Href=''){
        super('link')
        this.Name = Name;
        this.href = Href;
        this.Rel = 'stylesheet';
    }

    Render(){
        this.Attribute('rel',this.Rel);
        return super.Render();
    }
}

export class Script extends Control
{
    constructor(Src=null, Type=null){
        super('script')
        this.src = Src;
        if(Type)
            this.type = Type;
    }

    Render(){
        return super.Render();
    }
}

export class Image extends Control
{
    constructor(Name='', Src=''){
        super('img')
        this.Name = Name;
        this.src = Src;
    }

    Render(){
        this.Attribute('alt',this.Name);
        return super.Render();
    }
}

export class Hyperlink extends Control
{
    constructor(Content, Url=''){
        super('a');

        if(Application.config.mod_rewrite) Url = Hyperlink.EncodeUrl(Url);
        this.Attribute('href',Url);

        if (Content instanceof Control){
            this.Controls.Add(Content);
        }else{
            this.innerHTML = Content;
        }
    }

    static EncodeUrl(Url){
        let Params = [];
        for (let UrlParams in Url.replace("?","").split("&")){
            let temp = UrlParams.split("=");
            Params[temp[0]]= temp[1];
        }
        let sUrl = "";
        let tmp = ["LanguageCode","SectionCode","Action","Id"];
        for(let t in temp)
        {
            if (Params[t]){
                sUrl += Params[t]+"/"
                Params.splice (Params.indexOf(t), 1);
            }
        }
        let cnt = 0
        Params.forEach(function(index, item){
            sUrl += (cnt) ? "&" : "?";
            sUrl += index+"="+item;
            cnt++;
        });

        return sUrl;
    }

    Render(){

        return super.Render();
    }
}


export class ImageLink extends Hyperlink
{
    constructor(Name='',Url='', Src=''){
        super(new Image(Name, Src), Url);
    }
}

export class Table extends Control
{
    constructor(Name=''){
        super('table')
        this.Name = Name;
        this.id = Name;
        this.Rows = new ControlsCollection();
    }

    Render(){
        return super.Render();
    }
}

export class TableRow extends Control
{
    constructor(){
        super('tr');
        this.Cells = new ControlsCollection();
    }

    Render(){
        return super.Render();
    }
}

export class TableCell extends Control
{
    constructor(){
        super('td')
    }

    Render(){
        return super.Render();
    }
}

export class Form extends Control
{
    constructor(Name='', Action=null, Method=null , Target=null){
        super('form')
        this.Name = Name;
        this.id = Name;
        if(Action) this.Attribute('action', Action);
        if(Method) this.Attribute('method', Method);
        if(Target) this.Attribute('target', Target);
    }

    Render(){
        return super.Render();
    }
}

export class Fieldset extends Control
{
    constructor(Name='', Description=null){
        super('fieldset')
        this.Name = Name;
        this.id = Name;

        if (Description) {
            let legend = new Control('legend');
            legend.innerHTML = Description;
            this.Controls.Add(legend);
        }
    }

    Render(){
        return super.Render();
    }
}

export class MessageBox extends Control
{
    constructor(Id , Title, Text){
        super('div')
        this.id = Id;
        this.title = Title;
        this.Attribute("class","MessageBox");
        this.Text = Text;
    }
    Confirm(){
        console.log("Override Confirm button.");
    }

    Close(){
        this.parent.parentElement.remove();
    }

    Render(){
        let controls_collection = this.Controls._arItems;
        this.Controls._arItems = [];

        var div = new Control('div');
        div.Attribute('class', 'MessageBoxMenu');
            var dot = new Control('div');
            dot.Attribute('class', 'PageWindowDot');
            dot.Style('background','#ED594A');
            dot.onclick = this.Close
            div.Controls.Add(dot);
            div.Controls.Add(new Label(this.title));
        this.Controls.Add(div);

        var div = new Control('div');
        div.Attribute('class', 'MessageBoxContent');
        if (!controls_collection.length){
            if (typeof(this.Text) == "object"){
                div.Controls.Add(this.Text);
            } else {
                div.Controls.Add(new Label(this.Text));
            }
        }

        controls_collection.forEach(function(item, index){
            div.Controls.Add(item)
        });

        if (!controls_collection.length){
            var button = new Button("Ok");
            button.onclick=this.Confirm;
            div.Controls.Add(button);
            var button = new Button("Cancel");
            button.onclick=this.Close;
            div.Controls.Add(button);
        }

        this.Controls.Add(div);

        this.AfterRender=()=>{
            let element = this.innerRef;
            let body = document.body;
            element.style.top = "calc(50% - 50))";
            element.style.left = "calc(50% - 50)";
            PageWindow.Element = this.innerRef;
            this.innerRef.firstChild.onmousedown = PageWindow.DragMouseDown
        }

        return super.Render();
    }
}

export class AlertBox extends Control
{
    constructor(Id , Text){
        super('div')
        this.id = Id;
        this.Attribute("class","AlertBox");
        this.Text = Text;
    }
    Confirm(){
        console.log("Override Confirm button.");
    }

    Render(){
        if (!this.Controls._arItems.length){

            this.Controls.Add(new Label(this.Text));

            var button = new Button("Ok");
            button.onclick=this.Confirm;
            this.Controls.Add(button);
        }
        return super.Render();
    }
}

export class Tabs extends Control
{
    constructor(Id='', TabSet=[]){
        super('div');
        this.Attribute('class','Tabs');
        this.id = Id;
        this.TabSet = TabSet;
        for(let tab in TabSet){
            let key = StringHandler.camelCaseFirstUpperCase(TabSet[tab]);
            this[key] = function(){ return new Control('div');}
        }
    }

    Render(){
        let ul = new Control('ul');
        let ol = new Control('ol');
        for(let label in this.TabSet){
            let li = new Control('li');
            let tmp = StringHandler.snakeCase(this.TabSet[label]);
            let hyperlink = new Hyperlink(this.TabSet[label],"#"+tmp);
            hyperlink.onclick = function(){
                let tabContentId = this.href.substr(this.href.indexOf("#"), this.href.length);
                let tabs = document.querySelectorAll('.TabsContent > div').forEach(function(item, index){
                    item.style.display = 'none';
                });
                document.querySelector('div'+tabContentId).style.display = 'block';
            };
            li.Controls.Add(hyperlink)
            ol.Controls.Add(li);
        }
        ul.Controls.Add(ol)
        this.Controls.Add(ul);

        let div = new Control('div');
        div.Attribute('class','TabsContent');
        for(let label in this.TabSet){
            let tab = new Control('div');
            tab.id = StringHandler.snakeCase(this.TabSet[label]);
            tab.Controls.Add(this[StringHandler.camelCaseFirstUpperCase(this.TabSet[label])]());
            div.Controls.Add(tab)
        }
        this.Controls.Add(div)

        return super.Render();
    }
}

export class Menu extends Control
{
    /***
    let menuTree = [
        {"Code": "Index", "ParentSection" : null, "Layout" : "Index", "Templates": ["Index"]},
        {"Code": "Index2", "ParentSection" : "Index", "Layout" : "Index", "Templates": ["Index"]},
        {"Code": "Index3", "ParentSection" : "Index2", "Layout" : "Index", "Templates": ["Index"]},
        {"Code": "Index4", "ParentSection" : null, "Layout" : "Index", "Templates": ["Index"]}
        ]

        this.Controls.Add(new Menu('m', "Code", ['ParentSection', null], menuTree));
    **/
    constructor(Id='', NodeValue='', Parent=["ParentSection", null], MenuTree=[]){
        super('div');
        this.id = Id;
        this.Attribute('class','Menu');
        this.MenuTree = MenuTree;
        this.Parent = Parent;
        this.NodeValue = NodeValue;
    }

    Event(){
        console.log(this);
    }

    RenderTree(ParentNode, ParentValue){
        var ul = new Control('ul');
        for (let menu in this.MenuTree){
            let tmp = this.MenuTree[menu];
            if(tmp[ParentNode] == ParentValue) {
                var node = new Control("li")
                node.id = tmp[this.NodeValue];
                let hyperlink = new Hyperlink(tmp[this.NodeValue],"#");
                hyperlink.onclick = this.Event;
                node.Controls.Add(hyperlink);
                node.Controls.Add(this.RenderTree(ParentNode, tmp[this.NodeValue]))
                ul.Controls.Add(node);
            }
        }
        if(!ul.Controls.GetCount()){
            ul = new Control("div");
        }
        return ul;
    }

    Render(){
        this.Controls.Add(this.RenderTree(this.Parent[0], this.Parent[1]));
        return super.Render();
    }
}

export class Tooltip extends Control
{
    constructor(Id='', Text='', Position='TooltipTop'){
        super('div');
        this.Attribute('class', 'Tooltip');
        this.id = Id;
        this.Text = Text;
        this.Position = Position;
    }

    Render(){
        let span = new Control("span");
        span.Attribute('class', 'Tooltiptext '+this.Position);
        span.innerHTML = this.Text;
        this.Controls.Add(span);

        return super.Render();
    }
}

export class PageWindow extends Control
{
    constructor(Id='', Title=''){
        super('div');
        this.Attribute('class', 'PageWindow');
        this.id = Id;
        this.title = Title;
        PageWindow.pos1 = 0;
        PageWindow.pos2 = 0;
        PageWindow.pos3 = 0;
        PageWindow.pos4 = 0;
        PageWindow.Element = null;
    }

    Close(){
        this.parent.parentElement.remove();
    }

    Maximize(){

    }

    Minimize(){

    }

    static DragElement(elmnt) {
        if (document.getElementById(elmnt.id)) {
            document.getElementById(elmnt.id).onmousedown = PageWindow.DragMouseDown;
        } else {
            elmnt.onmousedown = PageWindow.DragMouseDown;
        }
        PageWindow.Element = elmnt;
    }

    static DragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        PageWindow.pos3 = e.clientX;
        PageWindow.pos4 = e.clientY;
        document.onmouseup = PageWindow.CloseDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = PageWindow.ElementDrag;
    }

    static ElementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        PageWindow.pos1 = PageWindow.pos3 - e.clientX;
        PageWindow.pos2 = PageWindow.pos4 - e.clientY;
        PageWindow.pos3 = e.clientX;
        PageWindow.pos4 = e.clientY;
        // set the element's new position:
        PageWindow.Element.style.top = (PageWindow.Element.offsetTop - PageWindow.pos2) + "px";
        PageWindow.Element.style.left = (PageWindow.Element.offsetLeft - PageWindow.pos1) + "px";
    }

    static CloseDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }

    Render(){
        let controls_collection = this.Controls._arItems;
        this.Controls._arItems = [];

        var div = new Control('div');
        div.Attribute('class', 'PageWindowMenu');
            var dot = new Control('div');
            dot.Attribute('class', 'PageWindowDot');
            dot.Style('background','#ED594A');
            dot.onclick = this.Close
            div.Controls.Add(dot);
            var dot = new Control('div');
            dot.Attribute('class', 'PageWindowDot');
            dot.Style('background','#FDD800');
            dot.onclick = this.Minimize
            div.Controls.Add(dot);
            var dot = new Control('div');
            dot.Attribute('class', 'PageWindowDot');
            dot.Style('background','#5AC05A');
            dot.onclick = this.Maximize
            div.Controls.Add(dot);
            div.Controls.Add(new Label(this.title));
        this.Controls.Add(div);

        var div = new Control('div');
        div.Attribute('class', 'PageWindowContent');
        controls_collection.forEach(function(item, index){
            div.Controls.Add(item)
        });
        this.Controls.Add(div);
        return super.Render();
    }
}

export class TreeView extends Control
{
    /***
    let menuTree = [
        {"Code": "Index", "ParentSection" : null, "Layout" : "Index", "Templates": ["Index"]},
        {"Code": "Index2", "ParentSection" : "Index", "Layout" : "Index", "Templates": ["Index"]},
        {"Code": "Index3", "ParentSection" : "Index2", "Layout" : "Index", "Templates": ["Index"]},
        {"Code": "Index4", "ParentSection" : null, "Layout" : "Index", "Templates": ["Index"]}
        ]

        this.Controls.Add(new Menu('m', "Code", ['ParentSection', null], menuTree));
    **/
    constructor(Id='', NodeValue='', Parent=["ParentSection", null], MenuTree=[]){
        super('div');
        this.id = Id;
        this.Attribute('class','TreeView');
        this.MenuTree = MenuTree;
        this.Parent = Parent;
        this.NodeValue = NodeValue;
    }

    Event(){
        console.log(this);
    }

    RenderTree(ParentNode, ParentValue){
        var ul = new Control('ul');
        for (let menu in this.MenuTree){
            let tmp = this.MenuTree[menu];
            if(tmp[ParentNode] == ParentValue) {
                var node = new Control("li")
                node.id = tmp[this.NodeValue];
                let hyperlink = new Hyperlink(tmp[this.NodeValue],"#");
                hyperlink.onclick = this.Event;
                node.Controls.Add(hyperlink);
                node.Controls.Add(this.RenderTree(ParentNode, tmp[this.NodeValue]))
                ul.Controls.Add(node);
            }
        }
        if(!ul.Controls.GetCount()){
            ul = new Control("div");
        }
        return ul;
    }

    Render(){
        this.Controls.Add(this.RenderTree(this.Parent[0], this.Parent[1]));
        return super.Render();
    }
}

export class PageLoader extends Control
{
    constructor(id=''){
        super('div');
        this._id = id;
        this.id = this._id;
    }

    async sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    async Run(element, count=0){
        element.style.width = count+'%';
        if(count <= 100) {
            await this.sleep(10);
            this.Run(element, ++count)
        }else{
            element.style.display = 'none';
        }
    }

    Render(){
        this.onload = function(){
            let pageloader = new PageLoader();
            let loading = document.getElementById('loading');
            loading.style.height = '3px';
            pageloader.Run(loading,0);
        }
        return super.Render()
    }
}

