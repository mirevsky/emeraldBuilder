import {Application} from '../application.js'
export class Request
{


    constructor(){
        const URLParams = new URLSearchParams(window.location.search);
        const SectionCode = URLParams.get('SectionCode') ? URLParams.get('SectionCode') : 'index';
        const LanguageCode = URLParams.get('LanguageCode') ? URLParams.get('LanguageCode') : Application.config.default.language.code;
        const Action = URLParams.get('Action') ? URLParams.get('Action') : 'index';
        const Id = URLParams.get('Id') ? URLParams.get('Id') : 0;
        this.SectionCode = SectionCode;
        this.LanguageCode = LanguageCode;
        this.Action = Action;
        this.Id = Id;

        if (window.localStorage.getItem('LanguageCode') != null) {
            this.LanguageCode = window.localStorage.getItem('LanguageCode');
        }else{
            window.localStorage.setItem('LanguageCode', this.LanguageCode);
        }

        return this
    }

}