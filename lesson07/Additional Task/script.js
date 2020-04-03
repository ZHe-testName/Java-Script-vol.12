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

let now = new Date().getDay() ;
let weekString = week.join(',');

let days = document.createElement('div');
days.innerHTML = `<p>${weekString}</p>`;
document.body.append(days);

week.forEach(function(item, i){
    let oneDay = document.createElement('div');

    if((item === 'Saturday' &&  now === i) || (item === 'Sunday' && now === i)){
        oneDay.innerHTML = `<p><strong><em>${item}</em></strong></p>`
        document.body.append(oneDay);
    }else if(item === 'Saturday' || item === 'Sunday'){
        oneDay.innerHTML = `<p><em>${item}</em></p>`
        document.body.append(oneDay);
    }else if(now === i){
        oneDay.innerHTML = `<p><strong>${item}</strong></p>`
        document.body.append(oneDay);
    }else{
        oneDay.innerHTML = `<p>${item}</p>` 
        document.body.append(oneDay);
    }
});


