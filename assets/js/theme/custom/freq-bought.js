import utils from '@bigcommerce/stencil-utils';
import FreqBoughtProductDetails from './freq-bought-product-details';
import swal from 'sweetalert2';
import "regenerator-runtime";
import UpsellArray from './upsell-array-product-page';

//  Apr 2019: updated version includes ITS Upsell Suite
const VERSION = '2.0';
const upsellSuite = false;

export default class FreqBoughtTogether {
    /**
     * @constructor
     * @param {Object} customOptions - object containing any custom options
     * @param {string} customOptions.dataSelector - selector of the element ontaining our upsell product info (ie. a product URL or product ID)
     * @param {number} customOptions.productLimit - maximum number of products to AJAX
     * @param {Object} customOptions.productTemplates - the HTML files we'll use when AJAX'ing our upsell products
     */
    constructor(customOptions) {
        console.log('IntuitSolutions.net - Frequently Bought Together Upsell', VERSION); // eslint-disable-line
        const defaultOptions = {
            dataSelector: '.productView-info-value.fbt-product', // TODO: instructions must say to add CF name as class to the CF
            productLimit: 3,
            productTemplates: {
                imageItem: 'custom/freq-bought-together-image-item',
                detailItem: 'custom/freq-bought-together-detail-item',
                detailItemOptions: 'custom/freq-bought-together-detail-options',
            },
        };

        this.options = $.extend({}, defaultOptions, customOptions); // merge custom options into our default options

        this.$loading = $('#fbt .loadingOverlay');

        utils.api.product.getById = utils.api.product.getById.bind(utils.api.product); // required to keep scope of utils to the utils
        utils.api.getPage = utils.api.getPage.bind(utils.api); // required to keep scope of utils to the utils

        this.mode = this.getMode();
 console.log("this.mode ", this.mode);
        switch (this.mode) {
            case 'related-products':
                return this.handleRelatedProductsMode();
            case 'upsell-suite':
                try {
                    this.upsellArray = new UpsellArray('fbt', this.options.cartItems, this.options.productLimit);
                    if (!this.upsellArray.enabled) {
                        $('#fbt').hide(); // hide FBT
                        return;
                    }
                }   catch(err)  {
                    console.error("FBT: Upsell Suite has not been correctly installed");
                }
            case 'custom-fields':
                return this.handleCustomFieldsMode();
        }
    }

    /**
     * get fbt mode
     * @return {string} "custom-fields", or "related-products", or null
     */
    getMode() {
        if (upsellSuite) {
            return 'upsell-suite';
        }   else if ($('.productView-info-value.fbt-product').length) {
            return 'custom-fields';
        } else if ($('.productView-info-value.fbt').length) {
            return 'related-products';
        }
        return null;
    }


    /**
     * handle "Custom Fields" mode
     */
    handleCustomFieldsMode() {
        $('#fbt').show(); // show FBT
        this.loadUpsellTargets();
    }

    /**
     * handle "Related Products" mode
     */
    handleRelatedProductsMode() {
        $('#fbt').show(); // show FBT
        this.bindEvents();
    }

    /**
     * returns array of upsell product URLs and/or IDs
     */
    getUpsellTargets() {
        const result = [];
        $(this.options.dataSelector).each((index, el) => {
            let thisTarget = $(el).text().trim();
            result.push(thisTarget);
        });
        return result;
    }

    /**
     * AJAX the upsell URLs and/or IDs and append where needed
     */
    async loadUpsellTargets() {
        let targets = [];
        try {
            targets = (upsellSuite && this.upsellArray.enabled)
                ? await this.upsellArray.getTargets()
                : this.getUpsellTargets();
        }   catch(err)  {
            targets = this.getUpsellTargets();
            if (!targets.length) {
                $('#fbt').hide(); // hide FBT
                return;
            }
        }
        targets = targets.slice(0, this.options.productLimit || targets.length);
        const runQueueInOrder = () => {
            if (targets.length === 0) {
                return this.bindEvents();
            } else {
                const target = targets.shift();
                const requestMethod = target.match(/^[0-9]+$/) !== null
                    ? utils.api.product.getById
                    : utils.api.getPage;
                requestMethod(target, { template: this.options.productTemplates }, (err, response) => {
                    if (err) { return; } // if error stop
                    // append our ajax'd markup
                    $('.fbt__image-item.fbt__total').before($(response.imageItem));
                    $('.fbt__detail-list').append($(response.detailItem));
                    if (response.detailItemOptions) {
                        const currentProductId = $(response.imageItem).data('product-id');
                        const currentProduct = $(`.fbt__detail-item[data-product-id="${currentProductId}"]`);
                        $('.fbt__detail-options', currentProduct).append($(response.detailItemOptions));
                    }
                    runQueueInOrder(); // run next item
                });
            }
        };
        // start the loop
        runQueueInOrder();
    }

    /*
     * update Total Price
     */
    updateTotalPrice() {
        let total = 0; // start with a fresh total
        $('.fbt__detail-item.isChecked').each((index, el) => {  // loop over all "checked" products
            const thisPrice = $(el).find('.price.price--withoutTax').text().trim().replace(/[^\d\.]/g, '');
            total += Number(thisPrice);
        });

        if(!total) return $('#fbt-totalPrice').text('Varies Based on Options');

        $('#fbt-totalPrice').text(`$${total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`); // update total price on the front end
    }

    /*
     * toggle options
     */
    toggleOptions(event) {
        const $scope = $(event.currentTarget).parents('.fbt__detail-item'); // grab this product's <li>
        const optionsContainer = $('.fbt__detail-options', $scope);
        optionsContainer.slideToggle(); // toggle the options
        // if we haven't already loaded the options
        if (!$scope.hasClass('hasOptions--loaded')) {
            this.$loading.show();
            $scope.addClass('hasOptions--loaded');// add class so we don't fire again
            const productId = $scope.data('product-id');
            utils.api.product.getById(productId, { template: 'custom/freq-bought-together-detail-options' }, (err, response) => {
                optionsContainer.append(response); // append markup to product card
                new FreqBoughtProductDetails($scope); // fire up new Product Details for just this item's options
                this.$loading.hide();
            });
        }
    }

    /**
     * toggle selection of product, ie. whether or not to add this product to cart or now
     * @param {object} event
     */
    toggleProductSelection(event) {
        const $scope = $(event.currentTarget).parents('.fbt__detail-item'); // get our entire product aka our scope
        const productId = $scope.data('product-id'); // get this item's ID for targeting
        const isChecked = $(event.currentTarget).prop('checked');// grab status of checkbox
        if (isChecked) {// if input is now checked
            $scope.addClass('isChecked');// add actively checked class
            $(`.fbt__image-item[data-product-id="${productId}"]`).addClass('isChecked'); // add actively checked class to image as well
        } else {
            $scope.removeClass('isChecked');// remove active checked class
            $(`.fbt__image-item[data-product-id="${productId}"]`).removeClass('isChecked');// add actively checked class to image as well
            $('.fbt__detail-options', $scope).slideUp();// close options if they're open
        }
        this.updateTotalPrice();// always update "Total Price"
    }


    /**
     * add all to cart
     */
    addAllToCart(productForms) {
        const forms = productForms;
        // let currentItem = 0; // for finding error item
        const runQueInOrder = () => {
            // when done all products
            if (forms.length === 0) {
                // go to cart
                window.location.href = '/cart.php';
            } else {
                // currentItem++;
                const endpoint = forms.shift();
                utils.api.cart.itemAdd(new FormData(endpoint[1]), (err, response) => {
                    // take note of errors
                    const errorMessage = err || response.data.error;
                    // Guard statement
                    if (errorMessage) {
                        // Strip the HTML from the error message
                        const tmp = document.createElement('DIV');
                        tmp.innerHTML = errorMessage;
                        this.$loading.hide();
                        $('#fbt-addAll').val('Add All to Cart').prop('disabled', false);
                        // alert user of error
                        return swal.fire({
                            text: tmp.textContent || tmp.innerText,
                            icon: 'error',
                        });
                    }
                    // run next item
                    runQueInOrder();
                });
            }
        };
        runQueInOrder();
    }

    /**
     * handle adding all products to the cart
     */
    handleAddingAllToCart() {
        // make sure no checked options have errors
        if ($('.isChecked.hasOptions--error').length) {
            return swal.fire({
                text: 'Please check to see that there are no errors.',
                icon: 'error',
            });
        }
        // make sure all products with options have options all filled in
        const productsCheckedWithOptions = $('.fbt__detail-item.hasOptions.isChecked')
            .filter(item => $(item).find('.form-field small:contains("Required")').length)
            .length;
        const productsCheckedWithFilledInOptions = $('.fbt__detail-item.hasOptions.isChecked.hasOptions--selected')
            .filter(item => $(item).find('.form-field small:contains("Required")').length)
            .length;

        // if all products with options aren't filled in
        if (productsCheckedWithOptions !== productsCheckedWithFilledInOptions) {
            return swal.fire({
                text: 'Please make sure all options have been filled in.',
                icon: 'error',
            });
        }
        this.$loading.show(); // show loading
        const productForms = []; // set up fresh variable to store our forms to add to cart
        $('.fbt__detail-item.isChecked').each((index, el) => { // loop over each "Checked" option
            productForms.push($.parseHTML($(el).html())); // push form markup to our forms array
        });
        this.addAllToCart(productForms); // add all products to cart
    }

    /*
     * applies handlers for our various interactions
     */
    bindEvents() {
        this.updateTotalPrice();

        // toggle options open / closed & load options if it's first time
        $('.fbt__toggle-options').on('click', event => {
            this.toggleOptions(event);
        });

        // handle checking & unchecking list items
        $('.fbt__detail-checkbox').on('change', event => {
            this.toggleProductSelection(event);
        });

        // handle adding all products to cart
        $('#fbt-addAll').on('click', () => {
            this.handleAddingAllToCart();
        });

        // wire up any options that are on page but not wired
        $('.hasOptions--loaded').not('.hasOptions--wired').each((index, el) => {
            new FreqBoughtProductDetails($(el));
            $(el).find('.fbt__detail-options').hide();
        });
    }
}
