'use strict';

window.addEventListener('DOMContentLoaded', function(){
    //Timer to midnight
    const timeToMidnightCounter = () =>{
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
        
        const getTimeToMidnight = () =>{
            let year = new Date().getFullYear(),
                month = new Date().getMonth(),
                tomorrow = new Date().getDate() + 1,
                midnight = new Date(year, month, tomorrow).getTime(),
                secToMidnight = (midnight - new Date().getTime()) / 1000,

                seconds = Math.floor(secToMidnight % 60),
                minutes = Math.floor((secToMidnight / 60) % 60),
                hours = Math.floor(secToMidnight / 60 / 60);
                
                return {hours, minutes, seconds};
        }

        const clockRender = () =>{
            let timeObj = getTimeToMidnight();

            timerHours.textContent = (timeObj.hours < 10) ? `0${timeObj.hours}` : timeObj.hours;
            timerMinutes.textContent = (timeObj.minutes < 10) ? `0${timeObj.minutes}` : timeObj.minutes;
            timerSeconds.textContent = (timeObj.seconds < 10) ? `0${timeObj.seconds}` : timeObj.seconds;
        }

        setInterval(clockRender, 1000);
    }

    //Menu activation and navigation
    const toggleMenu = () => {
        const menuBlock = document.querySelector('menu'),
            body = document.querySelector('body');

        const hendlerMenu = () => {
            menuBlock.classList.toggle('active-menu');
        };

        body.addEventListener('click', (event) => {
            let target = event.target,
                link = target.closest('a');
                
            if(link){
                if(link.classList.contains('close-btn')){
                    hendlerMenu();
                }else if(link.closest('li')){
                    event.preventDefault();
                    hendlerMenu();

                    let sectionClass = link.getAttribute('href').substr(1);

                    if(sectionClass.includes('-')){
                        sectionClass = sectionClass.substr(0, sectionClass.indexOf('-'));
                    }
                    
                    document.querySelector(`.${sectionClass}`).scrollIntoView({block: 'start', behavior: 'smooth'});
                }else if(target.classList.contains('.menu')){
                    hendlerMenu();
                }
            }else if((target.closest('main')) && (menuBlock.classList.contains('active-menu'))){
                hendlerMenu();          
            }else if(target.closest('.menu')){
                hendlerMenu();
            }
        });
    };

    //PopUp windows
    const togglePopUp = () => {
        const popUpWindow = document.querySelector('.popup'),
            popUpBtn = document.querySelectorAll('.popup-btn'),
            popUpCloseBtn = document.querySelector('.popup-close'),
            popUpContent = document.querySelector('.popup-content');
        let leftLength = 10;
        
        function popUpAnimate(){
            if(document.documentElement.clientWidth > 768){
                popUpWindow.style.display = 'block';
                popUpContent.style.left = '10px';
                let animationInd,
                    breakPoint = ((document.documentElement.clientWidth - popUpContent.offsetWidth) / 2) + 50;
                
                const move = function(){
                    leftLength += 20;
                    animationInd = requestAnimationFrame(move)
                        if(leftLength < Math.ceil(breakPoint)){
                            popUpContent.style.left = leftLength + 'px';
                        }else{
                            cancelAnimationFrame(animationInd);
                            popUpContent.style.left = '';
                            leftLength = 10;
                        }
                };

                move();
            }else{
                popUpWindow.style.display = 'block';
            }
            
        }

        popUpBtn.forEach(item => item.addEventListener('click', popUpAnimate));

        popUpWindow.addEventListener('click', (event) => {
            let target = event.target;
            
            if(target.classList.contains('popup-close')){
                popUpWindow.style.display = 'none';
            }else{
                target = target.closest('.popup-content');

                if(!target){
                    popUpWindow.style.display = 'none';
                }
            }
        })
    };

    //Next slide
    const goToNext = () => {
        const nextBtn = document.querySelector('main>a');
        
        nextBtn.addEventListener('click', (event) => {
            event.preventDefault();

            let goTo = nextBtn.getAttribute('href').substr(1);

            document.querySelector(`#${goTo}`).scrollIntoView({block: 'start', behavior: 'smooth'});
        })
    };

    //Tabs switcher
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = document.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (ind) => {
                for(let i = 0; i < tabContent.length; i++){
                    if(ind === i){
                        tabContent[i].classList.remove('d-none');
                        tab[i].classList.add('active');
                    }else{
                        tabContent[i].classList.add('d-none');
                        tab[i].classList.remove('active');
                    }
                }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if(target){
                tab.forEach((item, index) => {
                    if(item === target){
                        toggleTabContent(index);
                    }
                })
            }
        })
    };

    //Slider actions
    const slider = () => {
        const slides = document.querySelectorAll('.portfolio-item'),
            btns = document.querySelectorAll('.portfolio-btn'),
            dots = document.querySelectorAll('.dot'),
            slider = document.querySelector('.portfolio-content');
        
        let curentSlide = 0,
            interval;

        const hideSlide = (elem, index, classStr) => {
            elem[index].classList.remove(classStr);
        };

        const showSlide = (elem, index, classStr) => {
            elem[index].classList.add(classStr);
        };

        const autoPlaySlide = () => {
            hideSlide(slides, curentSlide, 'portfolio-item-active');
            hideSlide(dots, curentSlide, 'dot-active');
            curentSlide++;
            
            if(curentSlide >= slides.length){
                curentSlide = 0;
            }

            showSlide(slides, curentSlide, 'portfolio-item-active');
            showSlide(dots, curentSlide, 'dot-active');
        };

        const startSlide = (time = 2000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        startSlide();

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;
 
            if(!target.matches('.portfolio-btn, .dot')){
                return;
            }

            hideSlide(slides, curentSlide, 'portfolio-item-active');
            hideSlide(dots, curentSlide, 'dot-active');

            if(target.matches('#arrow-left')){
                curentSlide--;
            }else if(target.matches('#arrow-right')){
                curentSlide++;
            }else if(target.matches('.dot')){
                dots.forEach((elem, index) => {
                    if(elem === target){
                        curentSlide = index;
                    }
                })
            }

            if(curentSlide >= slides.length){
                curentSlide = 0;
            }else if(curentSlide < 0){
                curentSlide = slides.length -1;
            }

            showSlide(slides, curentSlide, 'portfolio-item-active');
            showSlide(dots, curentSlide, 'dot-active');
           

        })

        slider.addEventListener('mouseover', (event) => {
            if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
                startSlide();
            }
        })
    };
    timeToMidnightCounter();
    toggleMenu();
    togglePopUp();
    goToNext();
    tabs();
    slider();

});





///////////////////////////////TEMPORARY DUMP////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/*

    Timer function
    function countTimer(deadline){
        let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaning(){
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaning = (dateStop - dateNow) / 1000,

                seconds = Math.floor(timeRemaning % 60),
                minutes = Math.floor((timeRemaning / 60) % 60),
                hours = Math.floor(timeRemaning / 60 / 60);

                return {hours, minutes, seconds, timeRemaning};
        }
    
        function updateClock(){
            let timer = getTimeRemaning();

            if(timer.timeRemaning > 0){
                timerHours.textContent = (timer.hours < 10) ? `0${timer.hours}` : timer.hours;
                timerMinutes.textContent = (timer.minutes < 10) ? `0${timer.minutes}` : timer.minutes;
                timerSeconds.textContent = (timer.seconds < 10) ? `0${timer.seconds}` : timer.seconds;
            }else{
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }

        setInterval(updateClock, 1000);
    }
*/