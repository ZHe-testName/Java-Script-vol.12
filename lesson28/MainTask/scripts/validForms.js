'use strict';

const mainFormValidator = new Validator({
    selector: '#form1',
    pattern: {
        phone: /^\+380\d{9}$/,
    },
    method: {
        'form1-phone': [
            ['notEmpty'],
            ['pattern', 'phone']
        ],

        'form1-email': [
            ['notEmpty'],
            ['pattern', 'email']
        ],

        'form1-name': [
            ['notEmpty'],
            ['pattern', 'text']
        ]
    },
});

const footerFormValidator = new Validator({
    selector: '#form2',
    pattern: {
        phone: /^\+380\d{9}$/,
    },
    method: {
        'form2-phone': [
            ['notEmpty'],
            ['pattern', 'phone']
        ],

        'form2-email': [
            ['notEmpty'],
            ['pattern', 'email']
        ],

        'form2-name': [
            ['notEmpty'],
            ['pattern', 'text']
        ],

        'form2-message': [
            ['notEmpty'],
            ['pattern', 'text']
        ],
    },
});

const popUpFormValidator = new Validator({
    selector: '#form3',
    pattern: {
        phone: /^\+380\d{9}$/,
    },
    method: {
        'form3-phone': [
            ['notEmpty'],
            ['pattern', 'phone']
        ],

        'form3-email': [
            ['notEmpty'],
            ['pattern', 'email']
        ],

        'form3-name': [
            ['notEmpty'],
            ['pattern', 'text']
        ],

    },
});

mainFormValidator.init();
footerFormValidator.init();
popUpFormValidator.init();