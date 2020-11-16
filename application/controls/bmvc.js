import {Application} from '../application.js'
import {Control} from './controls_collection.js';
import {Request} from './request.js';
import {Section} from './section.js';

export class BMVC
{
    constructor(){
        Application.request = new Request();
    }

    Run(){

        var locale = import('../../locale/'+Application.request.LanguageCode+'.js');
        locale.then(function(result){
            Application.locale = result.Locale;
            window.localStorage.setItem('locale-'+Application.request.LanguageCode, JSON.stringify(Application.locale));
        });

        let section = new Section();
        return section.Run();
    }
}