import {Application} from '../application.js'
import {Control} from './controls_collection.js'
export class XMLHttpRequestHandler
{
    static Get(url='', callback){
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                callback(this.responseText);
            }
          };
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    static Post(url='', params={}, callback){
        let xhttp = new XMLHttpRequest();
        let formData = new FormData();
        for (let index in params) {
            formData.append(index, params[index]);
        }
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                callback(this.responseText);
            }
          };
        xhttp.open("POST", url, true);
        xhttp.send(formData);
    }

    static Put(url='', params={}, callback){
        let xhttp = new XMLHttpRequest();
        let formData = new FormData();
        for (let index in params) {
            formData.append(index, params[index]);
        }
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                callback(this.responseText);
            }
          };
        xhttp.open("PUT", url, true);
        xhttp.send(formData);
    }

    static Patch(url='', params={}, callback){
        let xhttp = new XMLHttpRequest();
        let formData = new FormData();
        for (let index in params) {
            formData.append(index, params[index]);
        }
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                callback(this.responseText);
            }
          };
        xhttp.open("PATCH", url, true);
        xhttp.send(formData);
    }

    static Delete(url='', params={}, callback){
        let xhttp = new XMLHttpRequest();
        let formData = new FormData();
        for (let index in params) {
            formData.append(index, params[index]);
        }
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                callback(this.responseText);
            }
          };
        xhttp.open("DELETE", url, true);
        xhttp.send(formData);
    }
}

export class ParamsHandler
{
    static Add(element, dom){
        let params = (element.params) ? element.params : null;
        if(element.constructor.name != 'Control' && params) {
            ParamsHandler.CurrentStateCollection[element.constructor.name] = {
                class: element,
                dom : dom,
                params : params,
            };

            if(!ParamsHandler.PrevStateCollection[element.constructor.name]) {
                ParamsHandler.PrevStateCollection[element.constructor.name] = {
                    class: element,
                    dom : dom,
                    params : params,
                };
            }
        }
    }

    static startServer(){
        let paramsHandlerServer = setInterval(
            function(){
                for (var key in ParamsHandler.CurrentStateCollection) {
                    if(!ParamsHandler.compareParams(ParamsHandler.PrevStateCollection[key].params, ParamsHandler.CurrentStateCollection[key].params)){
                        let dom = ParamsHandler.CurrentStateCollection[key].dom;
                        let element = ParamsHandler.CurrentStateCollection[key].class;
                        let params = ParamsHandler.CurrentStateCollection[key].params;
                        ParamsHandler.PrevStateCollection[key].dom.outerHTML = dom.outerHTML;
                        ParamsHandler.PrevStateCollection[key].params = params;
                        ParamsHandler.PrevStateCollection[key].class = element;
                        ParamsHandler.PrevStateCollection[key].dom = ParamsHandler.CurrentStateCollection[key].dom;
                    }
                }
            }
        );
    }

    static compareParams(prev, current){
        for (var key in current) {
            if(!prev[key]){
                return false;
            }
        }
        return true;
    }
}

export class StringHandler
{
    static camelCase(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index)
        {
            return index == 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    }

    static camelCaseFirstUpperCase(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index)
        {
            return word.toUpperCase();
        }).replace(/\s+/g, '');
    }

    static snakeCase(str){
        return str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map(x => x.toLowerCase()).join('_');
    }

    static parseCSSText(cssText) {
        var cssTxt = cssText.replace(/\/\*(.|\s)*?\*\//g, " ").replace(/\s+/g, " ");
        var style = {}, [,ruleName,rule] = cssTxt.match(/ ?(.*?) ?{([^}]*)}/)||[,,cssTxt];
        var cssToJs = s => s.replace(/\W+\w/g, match => match.slice(-1).toUpperCase());
        var properties = rule.split(";").map(o => o.split(":").map(x => x && x.trim()));
        for (var [property, value] of properties) style[cssToJs(property)] = value;
    return {cssText, ruleName, style};
}
}

export class Randomize
{
    static makeText(length){
       var result           = '';
       var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
       var charactersLength = characters.length;
       for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
       }
       return result;
    }

    static caesarCipher(str, key) {
      return str.toUpperCase().replace(/[A-Z]/g, c => String.fromCharCode((c.charCodeAt(0)-65 + key ) % 26 + 65));
    }
}