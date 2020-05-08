'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
        menuList = document.querySelector('.menu-list'),
        openCloseBtn = document.querySelector('.close-button'),
        arrow = document.querySelector('.arrow'),
        mainSectoin = document.querySelector('.main-section');

    let showArr = [];

    //Request method
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

    //Images loader
    const imagesRender = (arr) => {
        const imgsField = document.querySelector('.pictures-section');
            
        imgsField.innerHTML = '';

        arr.forEach(elem => {
            
            const div = document.createElement('div'),
                regExp = /^dbimage\/[\w-]*\.(jpg|png)$/;
            div.classList.add('hero-card');

            if(regExp.test(elem.photo)){
                div.innerHTML = `<div class="hero-img" style="background-image: url(./${elem.photo});"></div>
                            <div class="hero-about">
                                <h3>${elem.name}</h3>
                            </div>`;
            }else{
                div.innerHTML = `<div class="hero-img wrong-img"><img src="./icons/emoji_face_emoticon_sad_1-512.png"></div>
                                    <div class="hero-about">
                                        <h3 style="color: black;">OOPS...File is lost.</h3>
                                    </div>`;
            }
            
            imgsField.appendChild(div);
        })

        return arr;
    };

    //Function for showing cards
    const showImgs = (arr) => {
        const renderedImgs = document.querySelectorAll('.hero-card');

        let i = 0;

        setTimeout(() => {
            let intervalIndx = setInterval(() => {
                if(i < renderedImgs.length){
                    renderedImgs[i].style.visibility = 'visible';
                    i++;
                }else if(i === renderedImgs.length){
                    clearInterval(intervalIndx);
                }
            }, 150);
        }, 2000);

        return arr;
    };

    //Slider actions

    const showSlider = (arr) =>{
        const pictureSection = document.querySelector('.pictures-section'),
            coverSlider = document.querySelector('.cover-slider'),
            closeSlider = document.querySelector('.close-slider');

        pictureSection.addEventListener('click', (event) => {
            let target = event.target;

            if(target.classList.contains('hero-img')){
                coverSlider.classList.add('show-slider');
                console.log(arr);
            }
        });

        closeSlider.addEventListener('click', () => {
            coverSlider.classList.remove('show-slider');
        })
    }

    //Open/close menu button
    openCloseBtn.addEventListener('click', () => {
        menu.classList.toggle('active');
        arrow.classList.toggle('left');
    });

    //listener for choosing film
    menuList.addEventListener('click', (event) => {
        let target = event.target;
        showArr = [];

        if(target.classList.contains('button')){
            mainSectoin.classList.remove('main-active');
            let film = target.textContent;
            
            const heroObj = getData();
            const filmTitle = document.querySelector('.film-title');

            menu.classList.toggle('active');
            arrow.classList.toggle('left');
            
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
            
                    return showArr;
                })
                .then(imagesRender)
                .then(showImgs)
                .then(showSlider)
                .catch(error => console.error(error));

            filmTitle.textContent = film;
            mainSectoin.classList.add('main-active');
        }
    })

});