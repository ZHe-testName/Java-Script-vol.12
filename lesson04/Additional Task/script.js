'use strict'

function addStringstyle(str){
    if(typeof str !== 'string'){
        alert('Это не строка!');
    }else{
        let newStr = str.trim()
        if(newStr.length > 30){
            return newStr = newStr.substr(0, 30) + '...';
        }else{
            return newStr;
        }
    }
}

console.log(addStringstyle(' jfolwfjjdjdncmffkgitjdjdmncjdhfgngmckcdkkdkdkdkd ')); 
