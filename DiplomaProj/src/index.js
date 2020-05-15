'use strict';

//polyphils
import 'nodelist-foreach-polyfill';


//All header manioulations functional
import headerActons from './modules/header';

//PopUp window actions
import repairPopUpActions from './modules/repiarPopUp';

//Feedback forms
import * as feedBackFormObj from './modules/feedbackForm';


headerActons();

repairPopUpActions();

feedBackFormObj.headerForm.init();
feedBackFormObj.actionForm.init();