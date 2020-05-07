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
};

export default timeToMidnightCounter;
