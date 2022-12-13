import MmenuLight from 'mmenu-light';
import * as focusTrapPackage from 'focus-trap';

export default class SlideSearch {
    constructor(context) {
        console.log('IntuitSolutions.net - Slide Search')
        this.context = context;
        this.$searchLoading = $('<div class="loadingOverlay"></div>');
        this.$slideSearch = $('.slide-search');
        this.loadingClass = 'is-loading';

        this.focusTrap = null;
        this.$preModalFocusedEl = null;

        this.bindEvents();
    }

    initSlideSearch() {
        const menu = new MmenuLight(document.querySelector('#slideSearch'));
        const drawer = menu.offcanvas({position: 'right'});

        //This is causing Search Slide to not open full-slide, how ours functions - just redirects to search page
        //If need to change later change here 
        $('.slide-search-open').on('click', event => {
            // Don't load on search page
            if (this.context.template === 'pages/search') return;

            this.setupFocusTrap();

            // Redirect to search page on mobile
            if (/Mobi/i.test(navigator.userAgent)) {
                event.stopPropagation();
                window.location.href = '/search.php';
                return;
            }

            event.preventDefault();
            drawer.open();
        });

        $('.slide-search-close, .mm-ocd__backdrop').on('click', () => {
            drawer.close();
            this.disableFocusTrap();
        }).on('keyup', (event) => {
            if (event.keyCode === 27) {
                drawer.close();
                this.disableFocusTrap();
            }
        });
    }


    setupFocusTrap() {
        if (!this.$preModalFocusedEl) this.$preModalFocusedEl = $(document.activeElement);

        if (!this.focusTrap) {
            this.focusTrap = focusTrapPackage.createFocusTrap(document.querySelector('#slideSearch'), {
                escapeDeactivates: false,
                returnFocusOnDeactivate: false,
                allowOutsideClick: true,
                fallbackFocus: () => {
                    const fallbackNode = this.$preModalFocusedEl && this.$preModalFocusedEl.length
                        ? this.$preModalFocusedEl[0]
                        : $('[data-header-logo-link]')[0];

                    return fallbackNode;
                },
            });
        }

        this.focusTrap.deactivate();
        this.focusTrap.activate();
    };

    disableFocusTrap() {
        if (this.focusTrap) this.focusTrap.deactivate();
        if (this.$preModalFocusedEl) this.$preModalFocusedEl.focus();

        this.$preModalFocusedEl = null;
    };

    bindEvents() {
        this.initSlideSearch();
    }
}
