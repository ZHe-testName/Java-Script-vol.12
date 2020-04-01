'use strict'

//1

const arr = [
    '100',
    '2440',
    '42',
    '689',
    '226711',
    '777',
    '210'
];

const findTwo = function(arr){
    let sortedArr = [];

    for(let i = 0; i < arr.length; i++){
        if(arr[i][0] === '2'){
            sortedArr.push(arr[i]);
        }
    }

    return sortedArr;
};

console.log(findTwo(arr));

//2

//2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97

const eratosfenStyleFunc = function(n){
    let simpleNums = [];

    for(let i = 2; i < n; i++){
        let isIt = false;

        for(let j = 2; j < i - 1; j++){
            if(i % j === 0){
                isIt = true;
                break;
            }
        }
        if(isIt === false){
            simpleNums.push(i);
        }
        
    }

    return simpleNums;
};

const showRez = function(arr){
    for(let i = 0; i < arr.length; i++){
        console.log(arr[i] + ' Делители етого числа : 1 и ' + arr[i]);
    }
};

let simpleNums = eratosfenStyleFunc(100);

showRez(simpleNums);


