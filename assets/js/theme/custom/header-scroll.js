/**
 * Hides the header on scroll and shows it again when the user starts scroll back up.
 */
 const toggleHeaderOnScroll = () => (function () {
    const w = window;
    const doc = document.documentElement;
    const $header = $('.header-1__bottom');

    const $body = $('body');
    const watchWindow = w.matchMedia('(max-width: 1024px)'); // when the code should bind to the window (default is bind below 801px)
    const scrollThreshold = 94; // The higher the number the further the user needs to scroll to hide the header.
    const useClassToHide = true; // If false the header height will be used to set the negative top css property on scroll

    let curScroll;
    let prevScroll = w.scrollY || doc.scrollTop;
    let curDirection = 0;
    let prevDirection = 0;
    let toggled;

    const checkScroll = () => {
        curScroll = w.scrollY || doc.scrollTop;

        curDirection = curScroll > prevScroll ? 2 : 1; // Scrolled up : Scrolled down

        if (curDirection !== prevDirection) toggled = toggleHeader();

        prevScroll = curScroll;

        if (toggled) prevDirection = curDirection;
    };

    const hideHeader = () => {
        if (useClassToHide) {
            $header.addClass('header--hide');
            $body.addClass('header--hide');

            $header.removeClass('header--show');
        } else {
            $header.css('top', -Math.abs($header.height()));
        }
    }

    const showHeader = () => {
        if (useClassToHide) {
            $header.removeClass('header--hide');
            $body.removeClass('header--hide');

            $header.addClass('header--show');

        } else {
            $header.css('top', 0);
        }
    }

    const toggleHeader = () => {
        let shouldHide = curDirection === 2 && curScroll > scrollThreshold;
        let shouldShow = curDirection === 1;

        toggled = true;

        if (shouldHide) {
            hideHeader()
        } else if (shouldShow && scrollThreshold>=curScroll) {
            showHeader()
        } else {
            toggled = false;
        }

        return toggled;
    };

    $(watchWindow).on('change', e => {
        let bindToWindow = !e.target.matches

        if (bindToWindow) {
            $(w).on('scroll', checkScroll);
        } else {
            $(w).off('scroll', checkScroll);
            showHeader(); // ALWAYS reset the header on unbind
        }
    }).change();

})();

export default toggleHeaderOnScroll;
