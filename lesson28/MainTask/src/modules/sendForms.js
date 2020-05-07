'use strict';

import Sender from '../../plugins/sender/formSender';

const mainFormSender = new Sender('#form1');

const footerFormSender = new Sender('#form2');

const popUpFormSender = new Sender('#form3');

export {mainFormSender, footerFormSender, popUpFormSender};
