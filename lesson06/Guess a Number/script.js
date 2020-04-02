'use strict'

function isItNumber(n){
    if(!isNaN(parseFloat(n)) && isFinite(n)){
        return true;
    }
}

function playAgain(arg){
    (arg === true) ? letsPlay()() : alert('До новых встреч.');
}

function letsPlay(){
    let number = Math.floor(Math.random() * 100);
    let attemptAmount = 10;
    console.log(number);

    return function guess(){
        let yourChoise = prompt('Введите предпологаемое число.');

        if(isItNumber(yourChoise)){
            if(attemptAmount === 1){
                let failQuestion = confirm('Попытки закончились.Может еще разочек?');
                
                playAgain(failQuestion);
            }else if(yourChoise == number){
                alert('Вы угадали!!!');
                let question = confirm('Сыграем еще разок?');

                playAgain(question);
            }else if(yourChoise < number){
                attemptAmount--;
                alert('Загаданое число БОЛШЕ Вашего.Осталось ' + attemptAmount + ' попыток.');
                guess();
            }else if(yourChoise > number){
                attemptAmount--;
                alert('Загаданое число МЕНЬШЕ Вашего.Осталось ' + attemptAmount + ' попыток.');    
                guess();   
            }
        }else if(yourChoise == null){
            alert('До новых встреч.');
            return;
        }else{
            alert('Водите толко ЧИСЛА!!!');
            guess();
        }
    }
}

const game = letsPlay();

game();


