const togglePopUp = () => {
    const popUpWindow = document.querySelector('.popup'),
        popUpBtn = document.querySelectorAll('.popup-btn'),
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

export default togglePopUp;