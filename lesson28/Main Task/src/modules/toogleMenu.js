const toggleMenu = () => {
    const menuBlock = document.querySelector('menu'),
        main = document.querySelector('main');

    const hendlerMenu = () => {
        menuBlock.classList.toggle('active-menu');
    };

    menuBlock.addEventListener('click', (event) => {
        let target = event.target,
            link = target.closest('a');
            
        if(link){
            if(link.classList.contains('close-btn')){
                hendlerMenu();
            }else if(link.closest('li')){
                event.preventDefault();
                hendlerMenu();

                let sectionClass = link.getAttribute('href').substr(1);

                if(sectionClass.includes('-')){
                    sectionClass = sectionClass.substr(0, sectionClass.indexOf('-'));
                }
                
                document.querySelector(`.${sectionClass}`).scrollIntoView({block: 'start', behavior: 'smooth'});
            }
        }
    });

    main.addEventListener('click', (event) => {
        let target = event.target;

        if(target.closest('.menu')){
            hendlerMenu();
        }else if(target.closest('main') && (menuBlock.classList.contains('active-menu'))){
            hendlerMenu();
        }
    });
};

export default toggleMenu;