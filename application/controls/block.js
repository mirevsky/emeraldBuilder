import {Control} from './controls_collection.js';
import {StringHandler} from './handlers.js'

export class Block extends Control
{
    constructor(id = null, action='index', params={}){
        super("div")
        if(id) this.id = id;
        this.action = action;
        this.params = params;
    }

    Render(){
        this.Controls._arItems = [];
        let actionMethod = this.action+'Action';
        eval('this.'+actionMethod+'(this.params);');
        return super.Render()
    }
}