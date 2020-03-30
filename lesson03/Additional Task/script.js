'use strict'

//1

let lang = prompt('Вибирите язык.(ru или en)', 'ru').toLowerCase();

const daysOfWeek = [
    ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
    ['Sumday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
]

//через if...

if(lang === 'ru'){
    console.log(daysOfWeek[0]);
}else if(lang === 'en'){
    console.log(daysOfWeek[1]);
}else{
    console.log('Вы ввели не корректное значение.');
}

//через swich...

switch (lang){
    case 'ru':
        console.log(daysOfWeek[0]);
        break;
    case 'en':
        console.log(daysOfWeek[1]);
        break;
    default:
        console.log('Вы ввели не корректное значение.');
}

//через многомерный массив...
//не знаю правильно ли понял задание))
let notRu = false;
let notEn = false;

lang === 'ru' ? console.log(daysOfWeek[0]) : notRu = true;
lang === 'en' ? console.log(daysOfWeek[1]) : notEn = true;
(notEn && notRu) ? console.log('Нужно ввести правильное значение!') : (notRu = false, notEn = false);

//2

let namePerson = 'Артем';
let temp1 = false;
let temp2 = false;

namePerson.toLowerCase() === 'артем' ? console.log('Директор') : temp1 = true;
namePerson.toLowerCase() === 'максим' ? console.log('Преподаватель') : temp2 = true;
(temp1 && temp2) ? console.log('Студент') : (temp1 = false,temp2 = false);