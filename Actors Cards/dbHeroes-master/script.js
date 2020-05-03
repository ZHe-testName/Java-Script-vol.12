'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
        menuList = document.querySelector('.menu-list'),
        openCloseBtn = document.querySelector('.close-button'),
        arrow = document.querySelector('.arrow');

    let showArr = [];

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
                    reject('Error! Something wrong.');
                }
            });

            request.send();
        })
    };

    openCloseBtn.addEventListener('click', () => {
        menu.classList.toggle('active');
        arrow.classList.toggle('left');
    });

    menuList.addEventListener('click', (event) => {
        let target = event.target;
        showArr = [];

        if(target.classList.contains('button')){
            let film = target.textContent;
            const heroObj = getData();
            
            heroObj
                .then(array => {
                    array.forEach(item => {
                        if(item.movies){
                            item.movies.forEach(elem => {
                                if(elem === film){
                                    showArr.push(item);
                                }
                            })
                        }
                    });
            
                    console.log(showArr);
                })
                .catch(error => console.error(error));
        }
    })

});