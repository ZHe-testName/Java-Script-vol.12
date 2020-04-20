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
    daysToNextNY = Math.floor((nextNewYear - +date) / 1000 / 60 / 60 / 24);

(hourNow >= 5 && hourNow <= 11) ? partOfDay = 'Доброе утро.' :
    (hourNow >= 12 && hourNow <= 16) ? partOfDay = 'Добрый день.' :
    (hourNow >= 17 && hourNow <= 21) ? partOfDay = 'Добрый вечер.' :
    (hourNow >= 22 || hourNow <= 4) ? partOfDay = 'Доброй ночи.' : alert('Очень странно что это видно.');

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
                    <p>${date.toLocaleTimeString('en')}</p>
                    <p>До Нового Года осталось: ${daysToNextNY} дней.</p>`;

head.insertAdjacentElement('afterend', div);

}

renderNowTime(new Date());

