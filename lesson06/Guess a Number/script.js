'use strict'

function isItNumber(n){
    if(!isNaN(parseFloat(n)) && isFinite(n)){
        return true;
    }
}

function letsPlay(){
    let number = Math.floor(Math.random() * 100);
    console.log(number);

    return function guess(){
        let yourChoise = prompt('Введите предпологаемое число.');
        
        if(isItNumber(yourChoise)){
            if(yourChoise === number){
                alert('Вы угадали!!!');
                return;
            }else if(yourChoise < number){
                alert('Загаданое число БОЛШЕ Вашего.');
                guess();
            }else if(yourChoise > number){
                alert('Загаданое число МЕНЬШЕ Вашего.');    
                guess();   
            }
        }else if(yourChoise == null){
            return;
        }else{
            alert('Водите толко ЧИСЛА!!!');
            guess();
        }
    }
}

let Game = letsPlay();

Game();


