'use strict';

import timeToMidnightCounter from './modules/timeToMidnightCounter';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import goToNext from './modules/goToNext';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changeImg from './modules/changeImg';
import calcValidator from './modules/calcValidator';
import calculator from './modules/calculator';
import * as formSendersObj from './modules/sendForms';

//Timer to midnight
timeToMidnightCounter();
//Menu activation and navigation
toggleMenu();
//PopUp windows
togglePopUp();
//Next slide
goToNext();
//Tabs switcher
tabs();
//Slider actions
slider();
//Our comand images changer
changeImg();
//Validator for calculator
calcValidator();
//Cost calculator functions
calculator(100);

//Server AJAX request initializatons
formSendersObj.mainFormSender.init();
formSendersObj.footerFormSender.init();
formSendersObj.popUpFormSender.init();
