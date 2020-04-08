'use strict'

let allBooks = document.querySelectorAll('.book'),
    advertising = document.querySelector('.adv'),
    allHeaders = document.querySelectorAll('h2>a'),
    allUl = document.querySelectorAll('.book>ul'),
    secondBookContains = allUl[0].querySelectorAll('li'),
    fiveBookContains = allUl[5].querySelectorAll('li'),
    sixBookContains = allUl[2].querySelectorAll('li');



allBooks[0].before(allBooks[1]);
allBooks[3].before(allBooks[4]);
allBooks[5].after(allBooks[2]);

document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

allHeaders[4].innerText = 'Книга 3. this и Прототипы Объектов';

advertising.remove();

secondBookContains[3].after(secondBookContains[6]);
secondBookContains[9].after(secondBookContains[2]);
secondBookContains[6].after(secondBookContains[8]);

fiveBookContains[3].before(fiveBookContains[9]);
fiveBookContains[6].before(fiveBookContains[2]);
fiveBookContains[8].before(fiveBookContains[5]);

let newLi = document.createElement('li');
newLi.innerText = 'Глава 8: За пределами ES6';
sixBookContains[9].before(newLi);
