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

        'form-name': [
            ['notEmpty'],
            ['pattern', 'text']
        ]
    },
});

mainFormValidator.init();