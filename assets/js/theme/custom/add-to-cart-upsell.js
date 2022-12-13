import utils from '@bigcommerce/stencil-utils';
import AddToCartUpsellProductDetails from './add-to-cart-upsell-product-details';
import UpsellArray from './upsell-array-product-page';

//  Apr 2019: updated version includes ITS Upsell Suite
const VERSION = '2.0';
const upsellSuite = false;

export default class AddToCartUpsell {
  constructor($scope, cartItems) {
    if (upsellSuite) {
      try {
        this.upsellArray = new UpsellArray('atc', cartItems, 4)
        //  if there is a custom field on the current product
        //  marked 'disable' abort add-on for this page
        if (!this.upsellArray.enabled) return;
      } catch(err)  {
        console.error("ATC: Upsell Suite has not been correctly installed");
      }
    }

    console.log('IntuitSolutions.net - Add to Cart Upsell', VERSION);
    this.$scope = $scope;
    this.addedToCart = false;
    this.ajaxingStarted = false;
    this.upsellProducts = [];
    this.productCards = [];

    this.dataSelector = '.productView-info-value.atc-product'; // selector of the element ontaining our upsell product info(ie.a product URL or product ID)

    utils.api.product.getById = utils.api.product.getById.bind(utils.api.product); // required to keep scope of utils to the utils
    utils.api.getPage = utils.api.getPage.bind(utils.api); // required to keep scope of utils to the utils

    this.getUpsellTargets();
  }

  /**
   * return true if there are any product IDs or HTML cards downloaded
   */
  hasItems() {
    return !!this.upsellProducts.length || !!this.productCards.length;
  }

  /**
   * returns array of upsell product URLs and/or IDs
   */
  async getUpsellTargets() {
    let customFieldsOnly = !upsellSuite;
    try {
        if (upsellSuite)  {
          this.upsellProducts = await this.upsellArray.getTargets();
        } else  {
          customFieldsOnly = true;
        }
    }   catch(err)  {
        customFieldsOnly = true;
    }

    if (customFieldsOnly) {
      $(this.dataSelector, this.$scope).each((index, el) => {
        this.upsellProducts.push($(el).text().trim());
      });
    }
  }

  /**
     * AJAX the upsell URLs and/or IDs and append where needed
     */
  loadUpsellTargets() {
    if (this.ajaxingStarted || !this.upsellProducts.length) return;
    this.ajaxingStarted = true;
    const runQueueInOrder = () => {
      if (this.upsellProducts.length === 0) { // when done all products
        return console.log('DONE');
      }
      const target = this.upsellProducts.shift();
      const requestMethod = target.match(/^[0-9]+$/) ? utils.api.product.getById : utils.api.getPage;
      requestMethod(target, { template: 'custom/add-to-cart-upsell-product' }, (err, response) => {
        if (err) { // if error, log error but don't stop downloading other products
          console.error("ATC AJAX error: ", err);
        }
        //  if current product has already been added to cart, begin displaying upsell products
        if (this.addedToCart) {
          $('#wf__productlist').append(response); // no error, append markup
          new AddToCartUpsellProductDetails($('.wf__product').last()); // apply handlers
        }
        //  also save products if modal not yet displayed
        this.productCards.push(response);
        runQueueInOrder(); // run next item
      });
    };
    runQueueInOrder(); // start the loop
  }

  /*
   *  Fires when current product is added to cart
   *  to display ATC products in modal
   */
  displayProducts() {
    this.addedToCart = true;
    //  if upsell products have already begun downloading,
    //  display the ones completed so far
    if (this.ajaxingStarted) {
      this.productCards.forEach(card => {
        $('#wf__productlist').append(card); // no error, append markup
        new AddToCartUpsellProductDetails($('.wf__product').last()); // apply handlers
      });
    //  if not, begin the process
    } else  {
      this.loadUpsellTargets();
    }
  }
}
