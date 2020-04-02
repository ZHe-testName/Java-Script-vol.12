'use strict'

function isItNumber(n){
    
}

function letsPlay(){
    let number = Math.floor(Math.random() * 100);
    console.log(number);

    return function guess(){
        let yourChoise = prompt('Введите предпологаемое число.');

        if(yourChoise == null){
            return;
        }else if(yourChoise === number){
            alert('Вы угадали!!!');
            return;
        }else if(yourChoise < number){
            alert('Загаданое число БОЛШЕ Вашего.');
            guess();
        }else if(yourChoise > number){
            alert('Загаданое число МЕНЬШЕ Вашего.');    
            guess();   
        }
    }
}

let Game = letsPlay();

Game();


