const headerActons = () => {
    const main = document.querySelector('.main'),
        phoneNumber = document.querySelector('.header-contacts__phone-number-accord'),
        headerArrow = document.querySelector('.header-contacts__arrow'),
        mainMenu = document.querySelector('.popup-dialog-menu'),
        body = document.querySelector('body'),
        buttonFooter = document.querySelector('.button-footer');

    let dirFlag = false;
    headerArrow.style.zIndex = '100';
    main.addEventListener('click', (event) => {
        let target = event.target;
        
        if(target.classList.contains('header-contacts__arrow') || target.id === 'headerArrow'){
            if(!dirFlag){
                phoneNumber.style.marginTop = '25px';
                phoneNumber.firstChild.style.opacity = '1';
    
                headerArrow.classList.toggle('rotate-header-arrow');
                dirFlag = !dirFlag;
            }else{
                phoneNumber.style.marginTop = '';
                phoneNumber.firstChild.style.opacity = '0';

                headerArrow.classList.toggle('rotate-header-arrow');
                dirFlag = !dirFlag;
            }
           
        }

        if(target.classList.contains('menu__icon')){
            mainMenu.classList.add('header-menu-descktop-show');

            if(body.clientWidth < 576){
                mainMenu.classList.add('header-menu-mobile-show');
            }
        }

    });

    mainMenu.addEventListener('click', (event) => {
        let target = event.target;

        if(target.classList.contains('close-menu')){
            mainMenu.classList.remove('header-menu-descktop-show');

            if(body.clientWidth < 576){
                mainMenu.classList.remove('header-menu-mobile-show');
            }
        }

        if(target.classList.contains('menu-link') && (!target.classList.contains('no-overflow'))){
            event.preventDefault();

            mainMenu.classList.remove('header-menu-descktop-show');

            if(body.clientWidth < 576){
                mainMenu.classList.remove('header-menu-mobile-show');
            }

            let link = target.getAttribute('href').substr(1);
            
            document.querySelector(`.${link}`).scrollIntoView({block: 'start', behavior: 'smooth'});
        }

    });

    buttonFooter.addEventListener('click', () => {
        event.preventDefault();

        let link = buttonFooter.firstChild.getAttribute('href').substr(1);
            
        document.querySelector(`.${link}`).scrollIntoView({block: 'start', behavior: 'smooth'});
    });
};

export default headerActons;
