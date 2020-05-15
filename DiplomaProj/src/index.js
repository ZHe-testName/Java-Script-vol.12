'use strict';

//polyphils
import 'nodelist-foreach-polyfill';


//All header manioulations functional
import headerActons from './modules/header';

//PopUp window actions
import repairPopUpActions from './modules/repiarPopUp';

//Feedback forms
import * as feedBackFormObj from './modules/feedbackForm';

//Header section init
headerActons();

//Repair popUp actions
repairPopUpActions();

//Forms requst initialization
feedBackFormObj.headerForm.init();
feedBackFormObj.letsGoForm.init();
feedBackFormObj.actionForm.init();
feedBackFormObj.repairCostForm.init();
feedBackFormObj.askQuestionForm.init();