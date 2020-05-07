const goToNext = () => {
    const nextBtn = document.querySelector('main>a');
    
    nextBtn.addEventListener('click', (event) => {
        event.preventDefault();

        let goTo = nextBtn.getAttribute('href').substr(1);

        document.querySelector(`#${goTo}`).scrollIntoView({block: 'start', behavior: 'smooth'});
    })
};

export default goToNext;