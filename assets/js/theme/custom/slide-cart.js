import MmenuLight from 'mmenu-light';
import utils from '@bigcommerce/stencil-utils';
import swal from 'sweetalert2';
import * as focusTrapPackage from 'focus-trap';

export default class SlideCart {
    constructor(context) {
        console.log('IntuitSolutions.net - Slide Cart')

        this.context = context;
        this.$cartLoading = $('<div class="loadingOverlay"></div>');
        this.$slideCart = $('.slide-cart');
        this.loadingClass = 'is-loading';
        this.options = {
            template: 'common/cart-preview',
        };

        this.focusTrap = null;
        this.$preModalFocusedEl = null;

        this.bindEvents();
    }

    initSlideCart() {
        const menu = new MmenuLight(document.querySelector('#slideCart'));
        const drawer = menu.offcanvas({position: 'right'});

        $('.slide-cart-open').on('click', event => {
            // Don't load on cart page
            if (this.context.template === 'pages/cart') return;

            this.setupFocusTrap();

            // Redirect to cart page on mobile
            if (/Mobi/i.test(navigator.userAgent)) {
                event.stopPropagation();
                window.location.href = '/cart.php';
                return;
            }

            event.preventDefault();
            drawer.open();
            this.queryCart();
        });

        $('.slide-cart-close, .mm-ocd__backdrop').on('click', () => {
            drawer.close();
            this.disableFocusTrap();
        }).on('keyup', (event) => {
            if (event.keyCode === 27) {
                drawer.close();
                this.disableFocusTrap();
            }
        });;
    }

    queryCart() {
        this.$slideCart.addClass(this.loadingClass).html(this.$cartLoading);
        this.$cartLoading.show();

        utils.api.cart.getContent(this.options, (err, response) => {
            if (err) {
                window.location.href = '/cart.php';
            }

            this.$cartLoading.hide();
            this.$slideCart.removeClass(this.loadingClass);
            this.$slideCart.html(response);
            this.slideCartRemoveEvent();
        });
    }

    getNewCartQty() {
        utils.api.cart.getCartQuantity({}, (err, response) => {
            if (err) throw new Error(err);
            $('.cart-quantity')
                .text(response)
                .toggleClass('countPill--positive', response > 0);
            if (utils.tools.storage.localStorageAvailable()) {
                localStorage.setItem('cart-quantity', response);
            }
        });
    };

    slideCartRemoveEvent() {
        $('.slide-cart-remove').on('click', (event) => {
            const itemId = $(event.currentTarget).data('cart-itemid');

            utils.api.cart.itemRemove(itemId, (err, response) => {
                if (response.data.status === 'succeed') {
                    this.$slideCart.addClass(this.loadingClass).html(this.$cartLoading);
                    this.$cartLoading.show();
                    this.getNewCartQty();
                    this.queryCart();
                } else {
                    swal.fire({
                        text: response.data.errors.join('\n'),
                        icon: 'error',
                    });
                }
            });
        });
    }

    setupFocusTrap() {
        if (!this.$preModalFocusedEl) this.$preModalFocusedEl = $(document.activeElement);

        if (!this.focusTrap) {
            this.focusTrap = focusTrapPackage.createFocusTrap(document.querySelector('#slideCart'), {
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
        this.initSlideCart();
    }
}
