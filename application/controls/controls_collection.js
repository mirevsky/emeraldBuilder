import {Application} from '../application.js'
import {ParamsHandler, StringHandler} from '../controls/handlers.js'

class ICollection {
    GetItem(index){}
    GetCount(){}
}

class ControlCollection extends ICollection {
    constructor(){
        super();
        this._arItems = [];
    }

    Add(item){
        this._arItems.push(item)
    }

    GetItem(index){
        if (index<0 || index > this._arItems.length)
            return
        else
            return this._arItems[index]
    }

    SetItem(index, item){
        if (index<0 || index > this._arItems.length)
            return
        else
            this._arItems[index] = item
    }

    GetCount(){
        return this._arItems.length
    }
}

export class Control{

    constructor(TagName, innerHTML=""){
        this._attributes = [];
        this._style = [];
        this._tagName = TagName;
        this.cssClassName = null;
        this.styleContentText = null;
        this.innerRef = null;
        this.parent = null;
        this.Controls = new ControlCollection();
    }

    setParams(params){
        if(params) {
            this.params = params;
            if(ParamsHandler.CurrentStateCollection[this.constructor.name]) {
                ParamsHandler.CurrentStateCollection[this.constructor.name].class = this;
                ParamsHandler.CurrentStateCollection[this.constructor.name].dom = this.Render();
                ParamsHandler.CurrentStateCollection[this.constructor.name].params = this.params;
            }
        }
    }

    Attribute(key, value){
        this._attributes[key] = value;
    }

    Style(key, value){
        this._style[key] = value;
    }

    AssignCSSClass(style_class){
        const cssClassName = this.constructor.name+"Style";
        this.cssClassName = cssClassName;
        this.styleContentText = style_class.split("&").join('.'+cssClassName).replace(/(\r\n|\n|\r)/gm,"");
    }

    static getById(id = null){
        return document.getElementById(id);
    }

    static getByClassName(selector = null){
        return document.getElementsByClassName(selector);
    }

    static getByName(name = null){
        return document.getElementByName(name);
    }

    static getByTagName(tag = null){
        return document.getElementByTagName(tag);
    }

    static getInstance(constructor=null){
        let inst = ParamsHandler.CurrentStateCollection[constructor].class;
        inst.Render = () => {
            let _dom = ParamsHandler.CurrentStateCollection[constructor].dom;

            for(var key in this) {
                try{
                    _dom[key] = inst[key];
                }catch(e){
                    console.log(e);
                }
            }
            for(var attr in inst._attributes){
                _dom.setAttribute(attr, inst._attributes[attr]);
            }

            if(inst.cssClassName) {
                _dom.classList.add(inst.cssClassName);
            }

            for(var attr in inst._style){
                _dom.style[attr] = inst._style[attr];
            }
        }
        return inst;
    }

    static select(selector=null){
        return document.querySelector(selector);
    }

    static selectAll(selector=null){
        return document.querySelectorAll(selector)
    }

    AfterRender(){}

    Render(){
        if (this.styleContentText){
            document.getElementById('emerald').innerHTML += this.styleContentText.replace(/(\r\n|\n|\r)/gm,"");
        }
        var _dom = document.createElement(this._tagName);
        for(var key in this) {
            try{
                _dom[key] = this[key];
            }catch(e){
                console.log(e);
            }
        }
        for(var attr in this._attributes){
            _dom.setAttribute(attr, this._attributes[attr]);
        }

        if(this.cssClassName) {
            _dom.classList.add(this.cssClassName);
        }

        for(var attr in this._style){
            _dom.style[attr] = this._style[attr];
        }

        if (_dom.onload) {
            Application._events.push(_dom.onload);
        }

        this.innerRef = _dom;
        _dom.innerRef = this.innerRef;

        this.Controls._arItems.forEach(function(item, index){
            item.parent = _dom.innerRef;
            _dom.append(item.Render())
        });
        this.AfterRender();

        ParamsHandler.Add(this, _dom);

        return _dom
    }
}