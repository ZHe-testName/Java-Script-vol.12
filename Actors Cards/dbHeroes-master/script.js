'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const getData = () => {
        return new Promise ((resolve, reject) => {
            const request = new XMLHttpRequest();

            request.open('GET', './dbHeroes.json');

            request.addEventListener('readystatechange', () => {
                if(request.readyState !== 4){
                    return;
                }

                if(request.status === 200){
                    const response = JSON.parse(request.responseText);
                    resolve(response);
                }else{
                    reject('Error happend!');
                }
            });

            request.send();
        })
    };

    const heroObj = getData();

    let set = new Set;
    
    heroObj
        .then(arr => {
            arr.forEach(item => {
                    if(item.movies){
                        item.movies.forEach(elem => {
                            set.add(elem);
                        })
                    }
                })
            })
        .then(console.log(set))
        .catch(error => console.error(error));

});