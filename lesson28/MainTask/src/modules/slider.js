const slider = () => {
    const slides = document.querySelectorAll('.portfolio-item'),
        slider = document.querySelector('.portfolio-content'),
        portfolioDots = document.querySelector('.portfolio-dots');
    
    let curentSlide = 0,
        interval,
        dots;

    const hideSlide = (elem, index, classStr) => {
        elem[index].classList.remove(classStr);
    };

    const showSlide = (elem, index, classStr) => {
        elem[index].classList.add(classStr);
    };

    const dotsRender = (amount) => {
        portfolioDots.innerHTML = '';

        for(let i = 0; i < (amount + 1); i++){
            let li = document.createElement('li');
            li.classList.add('dot');
            portfolioDots.appendChild(li);
        }

        dots = document.querySelectorAll('.dot');
    };

    const autoPlaySlide = () => {
        hideSlide(slides, curentSlide, 'portfolio-item-active');

        curentSlide++;
        
        if(curentSlide >= slides.length){
            curentSlide = 0;
        }

        dotsRender(curentSlide);
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
    dotsRender(curentSlide);
    showSlide(dots, curentSlide, 'dot-active');

    slider.addEventListener('click', (event) => {
        
        event.preventDefault();

        let target = event.target;

        if(!target.matches('.portfolio-btn, .dot')){
            return;
        }

        hideSlide(slides, curentSlide, 'portfolio-item-active');

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

        dotsRender(curentSlide);
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

export default slider;