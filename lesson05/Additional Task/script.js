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

