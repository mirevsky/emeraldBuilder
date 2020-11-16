import {Config} from './config/config.js';
import {Control} from './controls/controls_collection.js';
import {BMVC} from './controls/bmvc.js';
import {XMLHttpRequestHandler, StringHandler, ParamsHandler} from './controls/handlers.js';
import {Builder} from './builder/builder.js'
import {BuilderRightMenu} from './builder/builder_right_menu.js';
import {
    LIBRARIES
} from './builder/builder.constants.js'

export class Application
{
    constructor(){
        Application._events = [];
        Application._db = null;
        Application._permissions = null;
        Application.request = null;
        Application.config = null;
        Application.locale = null;
        ParamsHandler.CurrentStateCollection = {};
        ParamsHandler.PrevStateCollection = {};
        var style = new Control("style");
        style.id = "emerald"
        document.head.appendChild(style.Render());

        /*for(let i in LIBRARIES){
            document.head.appendChild(LIBRARIES[i].Render());
        }*/
    }

    static addLoadEvent(func) {
      var oldonload = window.onload;
      if (typeof window.onload != 'function') {
        window.onload = func;
      } else {
        window.onload = function() {
          if (oldonload) {
            oldonload();
          }
          func();
        }
      }
    }

    async asyncExecBuilder(){
        await this.RenderBuilder();
    }

    async RenderBuilder(){
        XMLHttpRequestHandler.Get("application/config/project.json", (data)=>{
            Application._db = JSON.parse(data);

            let builder = new Builder();
            builder.DisableContextMenu();
            for(var index in builder.Controls._arItems){
                document.body.appendChild(builder.Controls._arItems[index].Render());
            }

            let current_tab = window.localStorage.getItem('current_tab');
            if (current_tab) {
                let ct = current_tab.split("-");
                let module = ct[0];
                let item = ct[1];
                BuilderRightMenu.RenderModuleSource(module, item);
            }
        });
    }

    Run(){
        Application.config = Config;
        let bmvc = new BMVC();
        document.body.appendChild(bmvc.Run());

        Application._events.push(() => {
            this.asyncExecBuilder();
        });

        for (let events in Application._events){
            Application.addLoadEvent(Application._events[events]);
        }
        ParamsHandler.startServer();
    }
}