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

            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;

            if(timer.timeRemaning > 0){
                setTimeout(updateClock, 1000);
            }
        }

        updateClock();
    }

    countTimer('22 April 2020');
    
});

