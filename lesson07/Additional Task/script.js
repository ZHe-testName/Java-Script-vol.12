'use strict'

const week = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thurday',
    'Friday',
    'Saturday'
];

let now = new Date().getDay();

document.write(week + '<br/><br/>');

week.forEach(function(item, i){
    if(item === 'Saturday' || item === 'Sunday'){
        document.write(`<em>${item}</em>` + '<br/>');
    }else if(now === i){
        document.write(`<strong>${item}</strong>` + '<br/>');
    }else{
        document.write(item + '<br/>');
    }
});


