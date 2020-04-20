'use strict';

window.addEventListener('DOMContentLoaded', function(){

    //Timer function
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

    //24Hours day counter counter

    function twentyFourHourCount(){
        let sec = 0,
            min = 0,
            hours = 0;

        setInterval(function(){
            sec++;
        
            if(sec === 60){
                min++;
                sec = 0;
            }
            if(min === 60){
                hours++;
                min = 0;
            }
            if(hours === 24){
                hours = 0;
            }
            console.log(sec, min, hours);
        }, 1000);
    }

    countTimer('22 April 2020');

    twentyFourHourCount();    
});

