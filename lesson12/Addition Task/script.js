'use strict'

let changeColorButton = document.querySelector('button'),
    hexValue = document.querySelector('.hex-value'),
    body = document.querySelector('body');



function randomHexColor(){
    const mainArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
    let colorArr = [];
    let color = '';

    for(let i = 0; i < 6; i++){
        let randIndex = Math.floor(Math.random() * 16);
        colorArr.push(mainArray[randIndex]);
    }
    color = colorArr.join('');
    hexValue.innerHTML = color;
    body.style.backgroundColor = `#${color}`;
}

changeColorButton.addEventListener('click', randomHexColor)