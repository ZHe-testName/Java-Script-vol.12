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

let nums = [
    2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
    50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
    70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
    80, 81, 82, 83, 84, 85, 86, 87, 88, 89,
    90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100
];

const eratosfenStyleFunc = function(arr){
    let simpleNums = [];

    for(let i = 0; i < arr.length; i++){
        for(let j = i + 1; j < arr.length; j++){
            if(arr[j] % arr[i] === 0){
                //arr.splice((arr[j] - 1), 1);
                delete arr[j];
            }
        }
    }

    for(let i = 0; i < arr.length; i++){
        if((typeof arr[i]) === 'number'){
            simpleNums.push(arr[i]);
        }
    }

    return simpleNums;
};

const showRez = function(arr){
    for(let i = 0; i < arr.length; i++){
        console.log(arr[i] + ' Делители етого числа : 1 и ' + arr[i]);
    }
};

let simpleNums = eratosfenStyleFunc(nums);

showRez(simpleNums);


