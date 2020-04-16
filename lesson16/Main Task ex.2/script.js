'use strict';

class First{
    hello(){
        console.log('Привет, метод родителя!');
    }
};

class Second extends First{

    hello(){
        super.hello();
        console.log('А я насдедуемый метод.');
    }
};

let first = new First();
let second = new Second();

first.hello();
second.hello();

