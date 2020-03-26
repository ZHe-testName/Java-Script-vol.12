'use strict'

let money = 1000000,
    income = undefined,
    addExpenses = [],
    deposit = false,
    mission = 'kill humanity!',
    period = null;

alert('ЗахАди в кАнцоль, дАрАгой!');

console.log('🔥 ПИрИвецтвую тебя в нашей кАнцоли,ара!👌🔥');

const header = document.querySelector("#header"),
    imgs = document.querySelectorAll(".fire-img");

const colors = ['red', 'orange', 'green', 'blue'];

const colorChange = (arr) => {
    let index = 0;
    setInterval(() => {
        header.style.color = arr[index];
        if(index === arr.length - 1){
            index = 0;
        }else{
            index++;
        };
    }, 500);

};

const fireworcks = (arrImgs) => {
    let index = 0;

    setInterval(() => {
       arrImgs[index].style.visibility = "visible";
       setTimeout(() => {
           arrImgs[index].style.visibility = "hidden";
           if(index === arrImgs.length - 1){
               index = 0;
           }else{
               index++;
           }
       }, 200); 
    }, 300);
};

colorChange(colors);
fireworcks(imgs);
