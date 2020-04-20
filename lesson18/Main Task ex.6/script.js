'use strict';

const head = document.querySelector('h1'),
    nextNewYear = +new Date('1 January 2021'),
    week = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
    ];
    

function renderNowTime(date){
let hourNow = date.getHours(),
    numOfDay = date.getDay(),
    partOfDay = '',
    dayOfWeek = '',
    timeInHours = date.toLocaleTimeString('en').slice(0, -3).split(':'),
    partOfTime = date.toLocaleTimeString('en').slice(-2),
    daysToNextNY = Math.floor((nextNewYear - +date) / 1000 / 60 / 60 / 24);

((hourNow >= 5 && partOfTime === 'AM') || (hourNow <= 11 && partOfTime === "AM")) ? partOfDay = 'Доброе утро.' :
    ((hourNow == 12 && partOfTime === 'AM') || (hourNow <= 4 && partOfTime === "PM")) ? partOfDay = 'Добрый день.' :
    ((hourNow >= 5 && partOfTime === 'PM') || (hourNow <= 9 && partOfTime === 'PM')) ? partOfDay = 'Добрый вечер.' :
    ((hourNow >= 10 && partOfTime === 'PM') || hourNow <= 4 && partOfTime === 'AM') ? partOfDay = 'Доброй ночи.' : 
    alert('Очень странно что это видно.');

timeInHours.forEach((item, index) => {
    if(item.length !== 2){
        timeInHours[index] = '0' + item;
    }
});

switch(numOfDay){
    case 0:
        dayOfWeek = week[0];
        break;
    case 1:
        dayOfWeek = week[1];
        break;
    case 2:
        dayOfWeek = week[2];
        break;
    case 3:
        dayOfWeek = week[3];
        break;
    case 4:
        dayOfWeek = week[4];
        break;
    case 5:
        dayOfWeek = week[5];
        break;
    case 6:
        dayOfWeek = week[6];
        break;

}

const div = document.createElement('div');
div.innerHTML = `<p>${partOfDay}</p>
                    <p>Сегодня: ${dayOfWeek}.</p>
                    <p>${timeInHours.join(':')} ${partOfTime}</p>
                    <p>До Нового Года осталось: ${daysToNextNY} дней.</p>`;

head.insertAdjacentElement('afterend', div);

}

renderNowTime(new Date());

