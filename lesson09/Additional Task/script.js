'use strict'

let toDay = new Date();

const week = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четвер',
    'Пятница',
    'Суббота'
];

const monthes = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря'
];


function makeDateStr(date){
    function declOfNum(n, times) {
        return times[n % 10 === 1 && n % 100 !== 11 ?
                      0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
      }

    let dateString = `Сегодня ${week[date.getDay()]},${date.getDate()} ${monthes[date.getMonth()]}
        ${date.getFullYear()} года,${date.getHours()} ${declOfNum(date.getHours(), ['час','часа','часов'])} ${date.getMinutes()}минут ${date.getSeconds()}секунды`;

    return dateString;
}

function addZero(strNum){
    let str = strNum.toString();
    let answer = str.length === 1 ? '0' + str : str;
    return answer;
}

function makeDateNumbers(date){
   
    let dateNumbers = `${addZero(date.getDate())}.${addZero(date.getMonth())}.${date.getFullYear()} - 
    ${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}`
    return dateNumbers;
}

function showDate(str){
    let block = document.createElement('div');
    block.innerHTML = `<p>${str}</p>`;
    document.body.append(block);
}

showDate(makeDateStr(toDay));
showDate(makeDateNumbers(toDay));

let funcId = setInterval(function(){
    let toDay = new Date;
    showDate(makeDateStr(toDay));
}, 1000);

setTimeout(() => clearInterval(funcId), 5000);
