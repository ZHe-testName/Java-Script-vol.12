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

lang === 'ru' ? console.log(daysOfWeek[0]) :
lang === 'en' ? console.log(daysOfWeek[1]) : console.log('Нужно ввести правильное значение!');


//2

let namePerson = 'макСИМ';

namePerson.toLowerCase() === 'артем' ? console.log('Директор') :
namePerson.toLowerCase() === 'максим' ? console.log('Преподаватель') : console.log('Студент');
