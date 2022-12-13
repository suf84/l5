
export default function () {
    /*--------------------------------------
        Header top link animations
    ----------------------------------------*/
    const headerLink1 = $('.header-1__link-1');
    const headerLink2 = $('.header-1__link-2');
    function toggleHeader() {
        if (headerLink1.hasClass('open')) {
            headerLink1.removeClass('open');
            headerLink2.addClass('open');
        } else {
            headerLink2.removeClass('open');
            headerLink1.addClass('open');
        }
    }
    setInterval(toggleHeader, 5000);

    /*--------------------------------------
        Mobile nav button click
    ----------------------------------------*/
    const navPages = $('.navPages-button');
    const mobileMenuToggle = $('.mobileMenu-toggle');
    navPages.on('click', () => {
        mobileMenuToggle.trigger('click');
    });
    /*--------------------------------------
    Mobile Menu slide animation button click
    ----------------------------------------*/
    const navContainer = $('.navPages-container');
    
    function toggleMobile() {
        if (!navContainer.hasClass('is-open')) {
            navContainer.addClass('is-close');
        } else {
            navContainer.removeClass('is-close');
        }
    }
    
    navContainer.on('animationend', toggleMobile);
}
