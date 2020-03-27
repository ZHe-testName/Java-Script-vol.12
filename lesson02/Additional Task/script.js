'use strict'

let num = 266219;

const productOfNumbers = (numder) => {
    let arrNums = String(numder).split('');
    let prod = 1;

    for(let n of arrNums){
        prod *= n;
    }
    
    return prod;
};

let bigNum = productOfNumbers(num);

console.log(bigNum);

let lot = bigNum ** 3;
console.log(lot);

let subString = String(lot).slice(0, 2);

alert(subString);
