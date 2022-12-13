import utils from '@bigcommerce/stencil-utils';
import swal from 'sweetalert2';
import _ from 'lodash';

export default class AddToCartUpsellProductDetails {
  constructor($scope) {
    this.$scope = $scope;
    this.initRadioAttributes();

    this.$form = $('form[data-upsell-cart-item-add]', this.$scope);
    this.$productId = $('[name="product_id"]', this.$form).val();

    this.makeOptionIdsUnique();
    this.addRequiredClasstoOptions();

    this.$productOptionsElement = $('[data-upsell-option-change]', this.$form);

    this.bindEvents();
  }

  /*
 * put productID on the element's "for" and "id" attrs so multiple cases of same option set won't conflict
 */
  makeOptionIdsUnique() {
    $('input[type="radio"], input[type="checkbox"]', this.$scope).each((index, el) => {
      const optionId = $(el).attr('id'); // update ID to include product ID
      $(el).attr('id', `atcu_${optionId}_${this.$productId}`); // update option ID to include product ID
      $(el).next().attr('for', `atcu_${optionId}_${this.$productId}`); // update option label to target updated ID
    });
    // add input fields label class and put in here. These options we need to select their sibling label
    const optionsWithLabelAttrs = [
      'input[type="text"]',
      'input[type="number"]',
      'input[type="file"]',
      'select',
      'textarea',
    ]
    const optionsWithLabelAttrsSelectors = optionsWithLabelAttrs.join(',');
    $(optionsWithLabelAttrsSelectors, this.$scope).parents('.form-field').find('label').each((index, el) => {
      const optionId = $(el).attr('for'); // update ID to include product ID
      $(el).attr('for', `atcu_${optionId}_${this.$productId}`); // update option ID to include product ID
      $(el).next().attr('id', `atcu_${optionId}_${this.$productId}`); // update option label to target updated ID
    });
  }

  /**
   * add "isRequired" to options that are required
   */
  addRequiredClasstoOptions() {
    $('[data-upsell-option-change] .form-field', this.$form).toArray().forEach(option => {
      if ($(option).find('small:contains("Required")')) {
        $(option).addClass('isRequired');
      }
    });
  }

  /**
       * Since $productView can be dynamically inserted using render_with,
       * We have to retrieve the respective elements
       *
       * @param $scope
       */
  getViewModel($scope) {
    return {
      $priceWithoutTax: $('[data-product-price-without-tax]', $scope),
    };
  }

  /**
   *
   * Handle product options changes
   *
   */
  productOptionsChanged(event) {
    const $changedOption = $(event.target);
    const optionRow = $changedOption.parents('.form-field');
    console.log('$changedOption ', $changedOption);
    // const $form = this.$form;
    // const productId = this.$productId;

    // Do not trigger an ajax request if it's a file or if the browser doesn't support FormData
    if ($changedOption.attr('type') === 'file' || window.FormData === undefined) {
      $changedOption[0].files.length
        ? optionRow.addClass('isSelected')
        : optionRow.removeClass('isSelected');
      return;
    }

    utils.api.productAttributes.optionChange(this.$productId, this.$form.serialize(), 'products/bulk-discount-rates', (err, response) => {
      const productAttributesData = response.data || {};
      this.updateProductAttributes(productAttributesData);
      this.updateView(productAttributesData);
      // if (productAttributesData.stock !== undefined) {
      //     $('.currentStock', this.$scope).text(productAttributesData.stock);
      // } else {
      //     $('.currentStock', this.$scope).text('');
      // }
    });

    // was an option with a value selected?
    if ($changedOption.val() !== '') {
      if ($changedOption.is('input')) {
        const type = $changedOption.attr('type');
        switch (type) {
          case 'radio':
            $changedOption.attr('checked', true);
            $changedOption.siblings('input').attr('checked', false);
            optionRow.addClass('isSelected');
            break;
          case 'checkbox':
            if ($changedOption.prop('checked')) {
              optionRow.addClass('isSelected')
              $changedOption.attr('checked', true);
            } else {
              optionRow.removeClass('isSelected');
              $changedOption.attr('checked', false);
            }
            break;
          case 'text':
          case 'number':
            $changedOption.val().length !== 0
              ? optionRow.addClass('isSelected')
              : optionRow.removeClass('isSelected');
            $changedOption.attr('value', $changedOption.val());
            break;
        }
      } else if ($changedOption.is('select')) {
        const $selectedOption = $changedOption.find(`option[value="${$changedOption.val()}"]`);
        $selectedOption.attr('selected', true);
        $selectedOption.siblings('option').attr('selected', false);
        // if it's a date select, make sure all 3 selects are filled in before saying it's filled in
        if (
          $changedOption.attr('name').indexOf('month') !== -1 ||
          $changedOption.attr('name').indexOf('day') !== -1 ||
          $changedOption.attr('name').indexOf('year') !== -1
        ) {
          // count the other date fields (if changed month, see if day and year are filled out)
          const otherSelectedDateFields = $changedOption.siblings('select').toArray().reduce((count, select) => {
            return $(select).val() === ''
              ? count
              : count + 1;
          }, 0);
          // if all fields are filled in
          if (otherSelectedDateFields === 2) {
            optionRow.addClass('isSelected');
          }
        } else {
          optionRow.addClass('isSelected'); // it's not a date select, just mark the option as selected
        }
      } else if ($changedOption.is('textarea')) {
        $changedOption.val().length !== 0
          ? optionRow.addClass('isSelected')
          : optionRow.removeClass('isSelected');
        $changedOption.text($changedOption.val());
      }
    } else {
      // else remove class (there was no value for this option)
      optionRow.removeClass('isSelected');
    }

    /*
    ## see if all options are selected
    */
    const numberRequiredOptions = $changedOption.parents('.card-options').find('.form-field.isRequired').length;
    const numberSelectedOptions = $changedOption.parents('.card-options').find('.form-field.isRequired.isSelected').length;
    const $addToCartButton = this.$form.find('.card-actions .button');
    $addToCartButton.removeClass('button--success');
    if (numberRequiredOptions <= numberSelectedOptions) {
      // add class to product for easy adding to cart
      $addToCartButton.val('Add to Cart').removeClass('button--disabled');
    } else {
      // remove class since not all options filled in
      $addToCartButton.val('Choose an Option').addClass('button--disabled');
    }
  }

  addProductToCart(event, form) {
    const $addToCartBtn = $('.card-actions .button', $(event.target));
    const originalBtnVal = $addToCartBtn.val();
    const waitMessage = 'Adding to cart...';

    // Do not do AJAX if browser doesn't support FormData
    if (window.FormData === undefined) {
      return;
    }

    // Prevent default
    event.preventDefault();

    $addToCartBtn.val(waitMessage).prop('disabled', true);

    // Add item to cart
    utils.api.cart.itemAdd(new FormData(form), (err, response) => {
      const errorMessage = err || response.data.error;

      $addToCartBtn.val(originalBtnVal).prop('disabled', false);

      // Guard statement
      if (errorMessage) {
        // Strip the HTML from the error message
        const tmp = document.createElement('DIV');
        tmp.innerHTML = errorMessage;

        return swal.fire({
          text: tmp.textContent || tmp.innerText,
          icon: 'error',
        });
      }

      // $addToCartBtn.addClass('button--success').val('Added to Cart');
    });
  }

  /**
       * Update the view of price, messages, SKU and stock options when a product option changes
       * @param  {Object} data Product attribute data
       */
  updatePriceView(viewModel, price) {
    if (price.without_tax) {
      viewModel.$priceWithoutTax.html(price.without_tax.formatted);
    }
  }

  /**
       * Update the view of price, messages, SKU and stock options when a product option changes
       * @param  {Object} data Product attribute data
       */
  updateView(data) {
    const viewModel = this.getViewModel(this.$scope);
    if (_.isObject(data.price)) {
      this.updatePriceView(viewModel, data.price);
    }
  }

  /**
       * Hide or mark as unavailable out of stock attributes if enabled
       * @param  {Object} data Product attribute data
       */
  updateProductAttributes(data) {
    const behavior = data.out_of_stock_behavior;
    const inStockIds = data.in_stock_attributes;
    const outOfStockMessage = ` (${data.out_of_stock_message})`;

    if (behavior !== 'hide_option' && behavior !== 'label_option') {
      return;
    }

    $('[data-product-attribute-value]', this.$scope).each((i, attribute) => {
      const $attribute = $(attribute);
      const attrId = parseInt($attribute.data('product-attribute-value'), 10);

      if (inStockIds.indexOf(attrId) !== -1) {
        this.enableAttribute($attribute, behavior, outOfStockMessage);
      } else {
        this.disableAttribute($attribute, behavior, outOfStockMessage);
      }
    });
  }

  disableAttribute($attribute, behavior, outOfStockMessage) {
    if (this.getAttributeType($attribute) === 'set-select') {
      return this.disableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
    }
    if (behavior === 'hide_option') {
      $attribute.hide();
    } else {
      $attribute.addClass('unavailable');
    }
  }

  disableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
    const $select = $attribute.parent();

    if (behavior === 'hide_option') {
      $attribute.toggleOption(false);
      // If the attribute is the selected option in a select dropdown, select the first option (MERC-639)
      if ($attribute.parent().val() === $attribute.attr('value')) {
        $select[0].selectedIndex = 0;
      }
    } else {
      $attribute.attr('disabled', 'disabled');
      $attribute.html($attribute.html().replace(outOfStockMessage, '') + outOfStockMessage);
    }
  }

  enableAttribute($attribute, behavior, outOfStockMessage) {
    if (this.getAttributeType($attribute) === 'set-select') {
      return this.enableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
    }

    if (behavior === 'hide_option') {
      $attribute.show();
    } else {
      $attribute.removeClass('unavailable');
    }
  }

  enableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
    if (behavior === 'hide_option') {
      $attribute.toggleOption(true);
    } else {
      $attribute.removeAttr('disabled');
      $attribute.html($attribute.html().replace(outOfStockMessage, ''));
    }
  }

  getAttributeType($attribute) {
    const $parent = $attribute.closest('[data-product-attribute]');
    return $parent ? $parent.data('product-attribute') : null;
  }

  /**
       * Allow radio buttons to get deselected
       */
  initRadioAttributes() {
    $('[data-product-attribute] input[type="radio"]', this.$scope).each((i, radio) => {
      const $radio = $(radio);

      // Only bind to click once
      if ($radio.attr('data-state') !== undefined) {
        $radio.click(() => {
          if ($radio.data('state') === true) {
            $radio.prop('checked', false);
            $radio.data('state', false);

            $radio.change();
          } else {
            $radio.data('state', true);
          }

          this.initRadioAttributes();
        });
      }

      $radio.attr('data-state', $radio.prop('checked'));
    });
  }

  /**
   * bind events
   */
  bindEvents() {
    // adding product to cart
    this.$form.submit(event => {
      this.addProductToCart(event, this.$form[0]);
    });
    // handle options stuff
    this.$productOptionsElement.change(event => {
      this.productOptionsChanged(event);
    });
    this.$productOptionsElement.show();
    // this.$productOptionsElement.find('input[type="checkbox"]').trigger('change'); // trigger selected checkbox options to update starting checkbox values
    // this.$productOptionsElement.find('input[type="radio"]:checked').trigger('change'); // trigger selected radio options to update starting radio buttons values
    // this.$productOptionsElement.find('input[type="text"]').trigger('change'); // trigger update on input text to catch any default values
    // this.$productOptionsElement.find('input[type="number"]').trigger('change'); // trigger update on input numbers to catch any default values
    // this.$productOptionsElement.find('textarea').trigger('change'); // trigger update on textarea tp catch any default values
    // this.$productOptionsElement.find('option:selected').parent().trigger('change'); // trigger selected options to update starting select box values
    // update default and in-stock options
    utils.api.productAttributes.optionChange(this.$productId, this.$form.serialize(), 'products/bulk-discount-rates', (err, response) => {
        const productAttributesData = response.data || {};
        console.log('productAttributesData', productAttributesData);
        this.updateProductAttributes(productAttributesData);
        this.updateView(productAttributesData, this.$productId);
    });
  }
}
