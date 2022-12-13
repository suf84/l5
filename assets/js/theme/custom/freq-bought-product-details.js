import $ from 'jquery';
import utils from '@bigcommerce/stencil-utils';
import _ from 'lodash';
import swal from 'sweetalert2';

export default class FreqBoughtProduct {
    constructor($scope) {
        this.$scope = $scope;

        this.$scope.addClass('hasOptions--wired');

        this.initRadioAttributes();

        this.$form = $('form', this.$scope);
        this.$productId = $('[name="product_id"]', this.$form).val();

        this.$productOptionsElement = $('[data-freq-option-change]', this.$form);

        this.makeOptionIdsUnique();
        this.addRequiredClasstoOptions();

        this.bindEvents();
    }

    /*
     * put productID on the element's "for" and "id" attrs so multiple cases of same option set won't conflict
     */
    makeOptionIdsUnique() {
        $('input[type="radio"], input[type="checkbox"]', this.$scope).each((index, el) => {
            const optionId = $(el).attr('id'); // update ID to include product ID
            $(el).attr('id', `fbt_${optionId}_${this.$productId}`); // update option ID to include product ID
            $(el).next().attr('for', `fbt_${optionId}_${this.$productId}`); // update option label to target updated ID
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
            $(el).attr('for', `fbt_${optionId}_${this.$productId}`); // update option ID to include product ID
            $(el).next().attr('id', `fbt_${optionId}_${this.$productId}`); // update option label to target updated ID
        });
    }

    /**
     * add "isRequired" to options that are required
     */
    addRequiredClasstoOptions() {
        $('[data-freq-option-change] .form-field', this.$form).toArray().forEach(option => {
            if ($(option).find('small:contains("Required")').length) {
                $(option).addClass('isRequired');
            }
        });
    }

    /**
     * Handle product options changes
     */
    productOptionsChanged(event) {
        const $changedOption = $(event.target);
        const optionRow = $(event.target).parents('.form-field');
        const $scope = $changedOption.parents('.fbt__detail-item');
        const $form = $scope.find('form');
        const productId = $('[name="product_id"]', $scope).val();

        // Do not trigger an ajax request if it's a file or if the browser doesn't support FormData
        if ($changedOption.attr('type') === 'file' || window.FormData === undefined) {
            // do nothing
        } else {
            utils.api.productAttributes.optionChange(productId, $form.serialize(), 'products/bulk-discount-rates', (err, response) => {
                const productAttributesData = response.data || {};
                console.log('productAttributesData', productAttributesData);
                this.updateProductAttributes(productAttributesData);
                this.updateView(productAttributesData, productId);
                // stock stuff (should wire up image change as well later)
                // if (productAttributesData.stock !== undefined) {
                //     $('.currentStock', $scope).text(productAttributesData.stock);
                // } else {
                //     $('.currentStock', $scope).text('');
                // }
            });
        }

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
        const numberRequiredOptions = $changedOption.parents('.fbt__detail-options').find('.form-field.isRequired').length;
        const numberSelectedOptions = $changedOption.parents('.fbt__detail-options').find('.form-field.isRequired.isSelected').length;
        // const $addToCartButton = $form.find('.card-actions .button');
        // $addToCartButton.removeClass('button--success');
        if (numberRequiredOptions <= numberSelectedOptions) {
            this.$scope.addClass('hasOptions--selected'); // add class to product for easy adding to cart
            $('.fbt__toggle-options', this.$scope).text('Options'); // update text for user as well
        } else {
            this.$scope.removeClass('hasOptions--selected'); // remove class since not all options filled in
            $('.fbt__toggle-options', this.$scope).text('Choose Options'); // update text for user as well
        }

        // see if helper text is still needed now that all options have correct classes
        // this.checkForOptionHelperText();
    }

    /**
     * Update the view of price, messages, SKU and stock options when a product option changes
     * @param  {Object} data Product attribute data
     *
     */
    updatePriceView(productId, price) {
        if (price.without_tax) {
            $(`.fbt__detail-item[data-product-id="${productId}"] [data-product-price-without-tax]`).html(price.without_tax.formatted);
        }
        // update Total Price since price changed
        this.updateTotalPrice();
    }

    /**
     * Update the view of price, messages, SKU and stock options when a product option changes
     * @param  {Object} data Product attribute data
     */
    updateView(data, productId) {
        // update price
        // const viewModel = this.getViewModel(this.$scope);
        if (_.isObject(data.price)) {
            this.updatePriceView(productId, data.price);
        }
        // update image
        if (_.isObject(data.image)) {
            const imageSrc = data.image.data.replace('{:size}', '300x300');
            $(`.fbt__image-item[data-product-id="${productId}"] .fbt__image`).attr('src', imageSrc);
        } else {
            $(`.fbt__image-item[data-product-id="${productId}"] .fbt__image`).attr('src', $(`.fbt__image-item[data-product-id="${productId}"] .fbt__image`).data('src'));
        }
        // update message if there is one
        const optionMessage = data.stock_message || data.purchasing_message;
        if (optionMessage !== null) {
            const optionsVisible = this.$productOptionsElement.is(':visible'); // prevents issue when on page-load FBT thows an alwert when customer is not looking at FBT. ie when customer has a default option set for a product but that option is out of stock.
            if (optionsVisible) {
                swal.fire({
                    text: optionMessage,
                    icon: 'error',
                });
            }
            $(`.fbt__detail-item[data-product-id="${productId}"]`).addClass('hasOptions--error');
        } else {
            $(`.fbt__detail-item[data-product-id="${productId}"]`).removeClass('hasOptions--error');
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

    /*
     * update Total Price
     */
    updateTotalPrice() {
        let total = 0; // start with a fresh total
        $('.fbt__detail-item.isChecked').each((index, el) => {  // loop over all "checked" products
            const thisPrice = $(el).find('.price.price--withoutTax').text().trim().replace(/[^\d\.]/g, '');
            total += Number(thisPrice);
        });

        // In the case of $7.99-9.99 we say price varies
        if (!total) return $('#fbt-totalPrice').text('Varies Based on Options');

        $('#fbt-totalPrice').text(`$${total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`); // update total price on the front end
    }

    /*
     * see if all selected products have options filled in
     */
    // checkForOptionHelperText() {
    //     // make sure all products with options have options all filled in
    //     const productsCheckedWithOptions = $('.fbt__detail-item.hasOptions.isChecked').length;
    //     const productsCheckedWithFilledInOptions = $('.fbt__detail-item.hasOptions.isChecked.hasOptions--selected').length;
    //     // if all products with options aren't filled in
    //     if (productsCheckedWithOptions !== productsCheckedWithFilledInOptions) {
    //         $('.freqBought-helperText').show();
    //         // disabled add to cart
    //         $('#freqBought-addAll').addClass('button--disabled');
    //     } else {
    //         $('.freqBought-helperText').hide();
    //         // enabled add to cart
    //         $('#freqBought-addAll').removeClass('button--disabled');
    //     }
    // }

    /**
     * bind events
     */
    bindEvents() {
        // handle options stuff
        this.$productOptionsElement.change(event => {
            this.productOptionsChanged(event, event.target);
        });
        this.$productOptionsElement.show();
        // this.$productOptionsElement.find('input[type="checkbox"]').trigger('change'); // trigger selected checkbox options to update starting checkbox values
        // this.$productOptionsElement.find('input[type="radio"]:checked').trigger('change'); // trigger selected radio options to update starting radio buttons values
        // this.$productOptionsElement.find('input[type="text"]').trigger('change'); // trigger update on input text to catch any default values
        // this.$productOptionsElement.find('input[type="number"]').trigger('change'); // trigger update on input numbers to catch any default values
        // this.$productOptionsElement.find('textarea').trigger('change'); // trigger update on textarea tp catch any default values
        // update default values
        // this.$productOptionsElement.find('option:selected').parent().trigger('change'); // trigger selected options to update starting select box values
        utils.api.productAttributes.optionChange(this.$productId, this.$form.serialize(), 'products/bulk-discount-rates', (err, response) => {
            const productAttributesData = response.data || {};
            console.log('productAttributesData', productAttributesData);
            this.updateProductAttributes(productAttributesData);
            this.updateView(productAttributesData, this.$productId);
        });
    }
}
