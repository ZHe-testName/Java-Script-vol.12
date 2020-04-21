'use strict';

window.addEventListener('DOMContentLoaded', function(){
    //Timer to midnight

    function timeToMidnightCounter(){
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
        
        function getTimeToMidnight(){
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

        function clockRender(){
            let timeObj = getTimeToMidnight();

            timerHours.textContent = (timeObj.hours < 10) ? `0${timeObj.hours}` : timeObj.hours;
            timerMinutes.textContent = (timeObj.minutes < 10) ? `0${timeObj.minutes}` : timeObj.minutes;
            timerSeconds.textContent = (timeObj.seconds < 10) ? `0${timeObj.seconds}` : timeObj.seconds;
        }

        setInterval(clockRender, 1000);
    }

    

    timeToMidnightCounter();
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