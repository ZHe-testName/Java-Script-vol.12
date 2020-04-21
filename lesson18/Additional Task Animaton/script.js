'use strict';

const smile = document.querySelector('#smile'),
    explosion = document.querySelector('#explosion'),
    reset = document.querySelector('#reset'),
    playPause = document.querySelector('#playPause');

let growingIntrval;
let count = 100;

function growing(){

        growingIntrval = requestAnimationFrame(growing);
        count += 2;
    
        setTimeout(function(){
            smile.classList.add('animated', 'shake');
        }, 900);
    
        if(count < 400){
            smile.style.width = count + 'px';
            smile.style.height = count + 'px';
        }else{
            smile.classList.remove('animated', 'shake');
    
            setTimeout(function(){
                smile.classList.add('animated', 'shake');
            }, 500);
            setTimeout(function(){
                smile.classList.add('invisible');
                explosion.classList.add('bang');
                playPause.setAttribute('disabled', 'disabled');
            }, 1000);
            count = 100;
            cancelAnimationFrame(growingIntrval);
        }
   
}

function rePlay(){
    playPause.classList.toggle('play');
    playPause.classList.toggle('pause');
    explosion.classList.remove('bang');
    smile.classList.remove('animated', 'shake', 'invisible');
    smile.style.width = count + 'px';
    smile.style.height = count + 'px';
    playPause.removeAttribute('disabled');
}

function pause(){
    cancelAnimationFrame(growingIntrval);

    playPause.classList.toggle('play');
    playPause.classList.toggle('pause');
}

reset.addEventListener('click', rePlay);
playPause.addEventListener('click', function(){
    if(playPause.className === 'button play'){
        growing();
        playPause.classList.toggle('play');
        playPause.classList.toggle('pause');
    }else if(playPause.className === 'button pause'){
        pause();
    }
});
