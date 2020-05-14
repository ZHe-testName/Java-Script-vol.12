const headerActons = () => {
    const header = document.querySelector('.header'),
        phoneNumber = document.querySelector('.header-contacts__phone-number-accord'),
        headerArrow = document.querySelector('.header-contacts__arrow');

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
    })
};

export default headerActons;
