const headerActons = () => {
    const header = document.querySelector('.header'),
        phoneNumber = document.querySelector('.header-contacts__phone-number-accord'),
        headerArrow = document.querySelector('.header-contacts__arrow'),
        mainMenu = document.querySelector('.popup-dialog-menu');

    let dirFlag = false;

    header.addEventListener('click', (event) => {
        let target = event.target;
        
        if(target.classList.contains('header-contacts__arrow') || target.id === 'headerArrow'){
            if(!dirFlag){
                phoneNumber.style.marginTop = '25px';
                phoneNumber.firstChild.style.opacity = '1';
    
                headerArrow.classList.add('rotate-header-arrow');
                dirFlag = !dirFlag;
            }else{
                phoneNumber.style.marginTop = '';
                phoneNumber.firstChild.style.opacity = '0';

                headerArrow.classList.remove('rotate-header-arrow');
                dirFlag = !dirFlag;
            }
           
        }

        if(target.classList.contains('menu__icon')){
            mainMenu.classList.add('header-menu-descktop-show');
        }
    });

    mainMenu.addEventListener('click', (event) => {
        let target = event.target;

        if(target.classList.contains('close-menu')){
            mainMenu.classList.remove('header-menu-descktop-show');
        }
    });
};

export default headerActons;
