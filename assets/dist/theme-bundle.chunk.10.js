(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./assets/js/theme/cart.js":
/*!*********************************!*\
  !*** ./assets/js/theme/cart.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Cart; });
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/bind */ "./node_modules/lodash/bind.js");
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_bind__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/gift-certificate-validator */ "./assets/js/theme/common/gift-certificate-validator.js");
/* harmony import */ var _common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cart/shipping-estimator */ "./assets/js/theme/cart/shipping-estimator.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./global/sweet-alert */ "./assets/js/theme/global/sweet-alert.js");
/* harmony import */ var _common_cart_item_details__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./common/cart-item-details */ "./assets/js/theme/common/cart-item-details.js");
/* harmony import */ var _custom_custom_cart__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./custom/custom-cart */ "./assets/js/theme/custom/custom-cart.js");
/* harmony import */ var _custom_cart_page_upsell__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./custom/cart-page-upsell */ "./assets/js/theme/custom/cart-page-upsell.js");


function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }










var Cart = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Cart, _PageManager);
  function Cart() {
    return _PageManager.apply(this, arguments) || this;
  }
  var _proto = Cart.prototype;
  _proto.onReady = function onReady() {
    this.$modal = null;
    this.$cartPageContent = $('[data-cart]');
    this.$cartContent = $('[data-cart-content]');
    this.$cartMessages = $('[data-cart-status]');
    this.$cartTotals = $('[data-cart-totals]');
    this.$cartAdditionalCheckoutBtns = $('[data-cart-additional-checkout-buttons]');
    this.$overlay = $('[data-cart] .loadingOverlay').hide(); // TODO: temporary until roper pulls in his cart components
    this.$activeCartItemId = null;
    this.$activeCartItemBtnAction = null;
    this.customCart = this.context.itsConfig.custom_cart;
    if (this.customCart) {
      Object(_custom_custom_cart__WEBPACK_IMPORTED_MODULE_10__["floatingCheckoutButton"])();
    }
    this.cartPageUpsell = new _custom_cart_page_upsell__WEBPACK_IMPORTED_MODULE_11__["default"](this.context);
    this.setApplePaySupport();
    this.bindEvents();
  };
  _proto.setApplePaySupport = function setApplePaySupport() {
    if (window.ApplePaySession) {
      this.$cartPageContent.addClass('apple-pay-supported');
    }
  };
  _proto.cartUpdate = function cartUpdate($target) {
    var _this = this;
    var itemId = $target.data('cartItemid');
    this.$activeCartItemId = itemId;
    this.$activeCartItemBtnAction = $target.data('action');
    var $el = $("#qty-" + itemId);
    var oldQty = parseInt($el.val(), 10);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = $target.data('action') === 'inc' ? oldQty + 1 : oldQty - 1;
    // Does not quality for min/max quantity
    if (newQty < minQty) {
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
        text: minError,
        icon: 'error'
      });
    } else if (maxQty > 0 && newQty > maxQty) {
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
        text: maxError,
        icon: 'error'
      });
    }
    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this.$overlay.hide();
      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;
        _this.refreshContent(remove);
      } else {
        $el.val(oldQty);
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
          text: response.data.errors.join('\n'),
          icon: 'error'
        });
      }
    });
  };
  _proto.cartUpdateQtyTextChange = function cartUpdateQtyTextChange($target, preVal) {
    var _this2 = this;
    if (preVal === void 0) {
      preVal = null;
    }
    var itemId = $target.data('cartItemid');
    var $el = $("#qty-" + itemId);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var oldQty = preVal !== null ? preVal : minQty;
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = parseInt(Number($el.val()), 10);
    var invalidEntry;

    // Does not quality for min/max quantity
    if (!newQty) {
      invalidEntry = $el.val();
      $el.val(oldQty);
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
        text: this.context.invalidEntryMessage.replace('[ENTRY]', invalidEntry),
        icon: 'error'
      });
    } else if (newQty < minQty) {
      $el.val(oldQty);
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
        text: minError,
        icon: 'error'
      });
    } else if (maxQty > 0 && newQty > maxQty) {
      $el.val(oldQty);
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
        text: maxError,
        icon: 'error'
      });
    }
    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this2.$overlay.hide();
      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;
        _this2.refreshContent(remove);
      } else {
        $el.val(oldQty);
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
          text: response.data.errors.join('\n'),
          icon: 'error'
        });
      }
    });
  };
  _proto.cartRemoveItem = function cartRemoveItem(itemId) {
    var _this3 = this;
    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemRemove(itemId, function (err, response) {
      if (response.data.status === 'succeed') {
        _this3.refreshContent(true);
      } else {
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
          text: response.data.errors.join('\n'),
          icon: 'error'
        });
      }
    });
  };
  _proto.cartEditOptions = function cartEditOptions(itemId, productId) {
    var _this4 = this;
    var context = Object.assign({
      productForChangeId: productId
    }, this.context);
    var modal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["defaultModal"])();
    if (this.$modal === null) {
      this.$modal = $('#modal');
    }
    var options = {
      template: 'cart/modals/configure-product'
    };
    modal.open();
    this.$modal.find('.modal-content').addClass('hide-content');
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.productAttributes.configureInCart(itemId, options, function (err, response) {
      modal.updateContent(response.content);
      var optionChangeHandler = function optionChangeHandler() {
        var $productOptionsContainer = $('[data-product-attributes-wrapper]', _this4.$modal);
        var modalBodyReservedHeight = $productOptionsContainer.outerHeight();
        if ($productOptionsContainer.length && modalBodyReservedHeight) {
          $productOptionsContainer.css('height', modalBodyReservedHeight);
        }
      };
      if (_this4.$modal.hasClass('open')) {
        optionChangeHandler();
      } else {
        _this4.$modal.one(_global_modal__WEBPACK_IMPORTED_MODULE_7__["ModalEvents"].opened, optionChangeHandler);
      }
      _this4.productDetails = new _common_cart_item_details__WEBPACK_IMPORTED_MODULE_9__["default"](_this4.$modal, context);
      _this4.bindGiftWrappingForm();
    });
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].hooks.on('product-option-change', function (event, currentTarget) {
      var $form = $(currentTarget).find('form');
      var $submit = $('input.button', $form);
      var $messageBox = $('.alertMessageBox');
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.productAttributes.optionChange(productId, $form.serialize(), function (err, result) {
        var data = result.data || {};
        if (err) {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
            text: err,
            icon: 'error'
          });
          return false;
        }
        if (data.purchasing_message) {
          $('p.alertBox-message', $messageBox).text(data.purchasing_message);
          $submit.prop('disabled', true);
          $messageBox.show();
        } else {
          $submit.prop('disabled', false);
          $messageBox.hide();
        }
        if (!data.purchasable || !data.instock) {
          $submit.prop('disabled', true);
        } else {
          $submit.prop('disabled', false);
        }
      });
    });
  };
  _proto.refreshContent = function refreshContent(remove) {
    var _this5 = this;
    var $cartItemsRows = $('[data-item-row]', this.$cartContent);
    var $cartPageTitle = $('[data-cart-page-title]');
    var options = {
      template: {
        content: this.customCart ? 'custom/cart/content' : 'cart/content',
        totals: this.customCart ? 'custom/cart/totals' : 'cart/totals',
        pageTitle: 'cart/page-title',
        statusMessages: 'cart/status-messages',
        additionalCheckoutButtons: 'cart/additional-checkout-buttons'
      }
    };
    this.$overlay.show();

    // Remove last item from cart? Reload
    if (remove && $cartItemsRows.length === 1) {
      return window.location.reload();
    }
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.getContent(options, function (err, response) {
      _this5.$cartContent.html(response.content);
      _this5.$cartTotals.html(response.totals);
      _this5.$cartMessages.html(response.statusMessages);
      _this5.$cartAdditionalCheckoutBtns.html(response.additionalCheckoutButtons);
      $cartPageTitle.replaceWith(response.pageTitle);
      _this5.bindEvents();
      _this5.$overlay.hide();
      var quantity = $('[data-cart-quantity]', _this5.$cartContent).data('cartQuantity') || 0;
      $('body').trigger('cart-quantity-update', quantity);
      $("[data-cart-itemid='" + _this5.$activeCartItemId + "']", _this5.$cartContent).filter("[data-action='" + _this5.$activeCartItemBtnAction + "']").trigger('focus');
    });
  };
  _proto.bindCartEvents = function bindCartEvents() {
    var _this6 = this;
    var debounceTimeout = 400;
    var cartUpdate = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartUpdate, debounceTimeout), this);
    var cartUpdateQtyTextChange = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartUpdateQtyTextChange, debounceTimeout), this);
    var cartRemoveItem = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartRemoveItem, debounceTimeout), this);
    var preVal;

    // cart update
    $('[data-cart-update]', this.$cartContent).on('click', function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault();

      // update cart quantity
      cartUpdate($target);
    });

    // cart qty manually updates
    $('.cart-item-qty-input', this.$cartContent).on('focus', function onQtyFocus() {
      preVal = this.value;
    }).change(function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault();

      // update cart quantity
      cartUpdateQtyTextChange($target, preVal);
    });
    $('.cart-remove', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('cartItemid');
      var string = $(event.currentTarget).data('confirmDelete');
      _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
        text: string,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: _this6.context.cancelButtonText
      }).then(function (result) {
        if (result.value) {
          // remove item from cart
          cartRemoveItem(itemId);
        }
      });
      event.preventDefault();
    });
    $('[data-item-edit]', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemEdit');
      var productId = $(event.currentTarget).data('productId');
      event.preventDefault();
      // edit item in cart
      _this6.cartEditOptions(itemId, productId);
    });
  };
  _proto.bindPromoCodeEvents = function bindPromoCodeEvents() {
    var _this7 = this;
    var $couponContainer = $('.coupon-code');
    var $couponForm = $('.coupon-form');
    var $codeInput = $('[name="couponcode"]', $couponForm);
    $('.coupon-code-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).hide();
      $couponContainer.show();
      $('.coupon-code-cancel').show();
      $codeInput.trigger('focus');
    });
    $('.coupon-code-cancel').on('click', function (event) {
      event.preventDefault();
      $couponContainer.hide();
      $('.coupon-code-cancel').hide();
      $('.coupon-code-add').show();
    });
    $couponForm.on('submit', function (event) {
      var code = $codeInput.val();
      event.preventDefault();

      // Empty code
      if (!code) {
        return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
          text: $codeInput.data('error'),
          icon: 'error'
        });
      }
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.applyCode(code, function (err, response) {
        if (response.data.status === 'success') {
          _this7.refreshContent();
        } else {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
            html: response.data.errors.join('\n'),
            icon: 'error'
          });
        }
      });
    });
  };
  _proto.bindGiftCertificateEvents = function bindGiftCertificateEvents() {
    var _this8 = this;
    var $certContainer = $('.gift-certificate-code');
    var $certForm = $('.cart-gift-certificate-form');
    var $certInput = $('[name="certcode"]', $certForm);
    $('.gift-certificate-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).toggle();
      $certContainer.toggle();
      $('.gift-certificate-cancel').toggle();
    });
    $('.gift-certificate-cancel').on('click', function (event) {
      event.preventDefault();
      $certContainer.toggle();
      $('.gift-certificate-add').toggle();
      $('.gift-certificate-cancel').toggle();
    });
    $certForm.on('submit', function (event) {
      var code = $certInput.val();
      event.preventDefault();
      if (!Object(_common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__["default"])(code)) {
        var validationDictionary = Object(_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__["createTranslationDictionary"])(_this8.context);
        return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
          text: validationDictionary.invalid_gift_certificate,
          icon: 'error'
        });
      }
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.applyGiftCertificate(code, function (err, resp) {
        if (resp.data.status === 'success') {
          _this8.refreshContent();
        } else {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
            html: resp.data.errors.join('\n'),
            icon: 'error'
          });
        }
      });
    });
  };
  _proto.bindGiftWrappingEvents = function bindGiftWrappingEvents() {
    var _this9 = this;
    var modal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["defaultModal"])();
    $('[data-item-giftwrap]').on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemGiftwrap');
      var options = {
        template: 'cart/modals/gift-wrapping-form'
      };
      event.preventDefault();
      modal.open();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.getItemGiftWrappingOptions(itemId, options, function (err, response) {
        modal.updateContent(response.content);
        _this9.bindGiftWrappingForm();
      });
    });
  };
  _proto.bindGiftWrappingForm = function bindGiftWrappingForm() {
    $('.giftWrapping-select').on('change', function (event) {
      var $select = $(event.currentTarget);
      var id = $select.val();
      var index = $select.data('index');
      if (!id) {
        return;
      }
      var allowMessage = $select.find("option[value=" + id + "]").data('allowMessage');
      $(".giftWrapping-image-" + index).hide();
      $("#giftWrapping-image-" + index + "-" + id).show();
      if (allowMessage) {
        $("#giftWrapping-message-" + index).show();
      } else {
        $("#giftWrapping-message-" + index).hide();
      }
    });
    $('.giftWrapping-select').trigger('change');
    function toggleViews() {
      var value = $('input:radio[name ="giftwraptype"]:checked').val();
      var $singleForm = $('.giftWrapping-single');
      var $multiForm = $('.giftWrapping-multiple');
      if (value === 'same') {
        $singleForm.show();
        $multiForm.hide();
      } else {
        $singleForm.hide();
        $multiForm.show();
      }
    }
    $('[name="giftwraptype"]').on('click', toggleViews);
    toggleViews();
  };
  _proto.bindEvents = function bindEvents() {
    var _this10 = this;
    this.bindCartEvents();
    this.bindPromoCodeEvents();
    this.bindGiftWrappingEvents();
    this.bindGiftCertificateEvents();

    // initiate shipping estimator module
    var shippingErrorMessages = {
      country: this.context.shippingCountryErrorMessage,
      province: this.context.shippingProvinceErrorMessage
    };
    this.shippingEstimator = new _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_6__["default"]($('[data-shipping-estimator]'), shippingErrorMessages);

    // reload cart content when a Cart Page Upsell item is added to the cart
    $(document).on('cpu-refresh-cart-content', function () {
      return _this10.refreshContent(false);
    });
  };
  return Cart;
}(_page_manager__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/cart/shipping-estimator.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/cart/shipping-estimator.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShippingEstimator; });
/* harmony import */ var _common_state_country__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/state-country */ "./assets/js/theme/common/state-country.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _global_sweet_alert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../global/sweet-alert */ "./assets/js/theme/global/sweet-alert.js");






var ShippingEstimator = /*#__PURE__*/function () {
  function ShippingEstimator($element, shippingErrorMessages) {
    this.$element = $element;
    this.$state = $('[data-field-type="State"]', this.$element);
    this.isEstimatorFormOpened = false;
    this.shippingErrorMessages = shippingErrorMessages;
    this.initFormValidation();
    this.bindStateCountryChange();
    this.bindEstimatorEvents();
  }
  var _proto = ShippingEstimator.prototype;
  _proto.initFormValidation = function initFormValidation() {
    var _this = this;
    var shippingEstimatorAlert = $('.shipping-quotes');
    this.shippingEstimator = 'form[data-shipping-estimator]';
    this.shippingValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: this.shippingEstimator + " .shipping-estimate-submit",
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__["announceInputErrorMessage"]
    });
    $('.shipping-estimate-submit', this.$element).on('click', function (event) {
      // estimator error messages are being injected in html as a result
      // of user submit; clearing and adding role on submit provides
      // regular announcement of these error messages
      if (shippingEstimatorAlert.attr('role')) {
        shippingEstimatorAlert.removeAttr('role');
      }
      shippingEstimatorAlert.attr('role', 'alert');
      // When switching between countries, the state/region is dynamic
      // Only perform a check for all fields when country has a value
      // Otherwise areAll('valid') will check country for validity
      if ($(_this.shippingEstimator + " select[name=\"shipping-country\"]").val()) {
        _this.shippingValidator.performCheck();
      }
      if (_this.shippingValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
    });
    this.bindValidation();
    this.bindStateValidation();
    this.bindUPSRates();
  };
  _proto.bindValidation = function bindValidation() {
    this.shippingValidator.add([{
      selector: this.shippingEstimator + " select[name=\"shipping-country\"]",
      validate: function validate(cb, val) {
        var countryId = Number(val);
        var result = countryId !== 0 && !Number.isNaN(countryId);
        cb(result);
      },
      errorMessage: this.shippingErrorMessages.country
    }]);
  };
  _proto.bindStateValidation = function bindStateValidation() {
    var _this2 = this;
    this.shippingValidator.add([{
      selector: $(this.shippingEstimator + " select[name=\"shipping-state\"]"),
      validate: function validate(cb) {
        var result;
        var $ele = $(_this2.shippingEstimator + " select[name=\"shipping-state\"]");
        if ($ele.length) {
          var eleVal = $ele.val();
          result = eleVal && eleVal.length && eleVal !== 'State/province';
        }
        cb(result);
      },
      errorMessage: this.shippingErrorMessages.province
    }]);
  }

  /**
   * Toggle between default shipping and ups shipping rates
   */;
  _proto.bindUPSRates = function bindUPSRates() {
    var UPSRateToggle = '.estimator-form-toggleUPSRate';
    $('body').on('click', UPSRateToggle, function (event) {
      var $estimatorFormUps = $('.estimator-form--ups');
      var $estimatorFormDefault = $('.estimator-form--default');
      event.preventDefault();
      $estimatorFormUps.toggleClass('u-hiddenVisually');
      $estimatorFormDefault.toggleClass('u-hiddenVisually');
    });
  };
  _proto.bindStateCountryChange = function bindStateCountryChange() {
    var _this3 = this;
    var $last;

    // Requests the states for a country with AJAX
    Object(_common_state_country__WEBPACK_IMPORTED_MODULE_0__["default"])(this.$state, this.context, {
      useIdForStates: true
    }, function (err, field) {
      if (err) {
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_5__["default"].fire({
          text: err,
          icon: 'error'
        });
        throw new Error(err);
      }
      var $field = $(field);
      if (_this3.shippingValidator.getStatus(_this3.$state) !== 'undefined') {
        _this3.shippingValidator.remove(_this3.$state);
      }
      if ($last) {
        _this3.shippingValidator.remove($last);
      }
      if ($field.is('select')) {
        $last = field;
        _this3.bindStateValidation();
      } else {
        $field.attr('placeholder', 'State/province');
        _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__["Validators"].cleanUpStateValidation(field);
      }

      // When you change a country, you swap the state/province between an input and a select dropdown
      // Not all countries require the province to be filled
      // We have to remove this class when we swap since nod validation doesn't cleanup for us
      $(_this3.shippingEstimator).find('.form-field--success').removeClass('form-field--success');
    });
  };
  _proto.toggleEstimatorFormState = function toggleEstimatorFormState(toggleButton, buttonSelector, $toggleContainer) {
    var changeAttributesOnToggle = function changeAttributesOnToggle(selectorToActivate) {
      $(toggleButton).attr('aria-labelledby', selectorToActivate);
      $(buttonSelector).text($("#" + selectorToActivate).text());
    };
    if (!this.isEstimatorFormOpened) {
      changeAttributesOnToggle('estimator-close');
      $toggleContainer.removeClass('u-hidden');
    } else {
      changeAttributesOnToggle('estimator-add');
      $toggleContainer.addClass('u-hidden');
    }
    this.isEstimatorFormOpened = !this.isEstimatorFormOpened;
  };
  _proto.bindEstimatorEvents = function bindEstimatorEvents() {
    var _this4 = this;
    var $estimatorContainer = $('.shipping-estimator');
    var $estimatorForm = $('.estimator-form');
    Object(_common_collapsible__WEBPACK_IMPORTED_MODULE_4__["default"])();
    $estimatorForm.on('submit', function (event) {
      var params = {
        country_id: $('[name="shipping-country"]', $estimatorForm).val(),
        state_id: $('[name="shipping-state"]', $estimatorForm).val(),
        city: $('[name="shipping-city"]', $estimatorForm).val(),
        zip_code: $('[name="shipping-zip"]', $estimatorForm).val()
      };
      event.preventDefault();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.getShippingQuotes(params, 'cart/shipping-quotes', function (err, response) {
        $('.shipping-quotes').html(response.content);

        // bind the select button
        $('.select-shipping-quote').on('click', function (clickEvent) {
          var quoteId = $('.shipping-quote:checked').val();
          clickEvent.preventDefault();
          _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.submitShippingQuote(quoteId, function () {
            window.location.reload();
          });
        });
      });
    });
    $('.shipping-estimate-show').on('click', function (event) {
      event.preventDefault();
      _this4.toggleEstimatorFormState(event.currentTarget, '.shipping-estimate-show__btn-name', $estimatorContainer);
    });
  };
  return ShippingEstimator;
}();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/cart-item-details.js":
/*!*****************************************************!*\
  !*** ./assets/js/theme/common/cart-item-details.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CartItemDetails; });
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _product_details_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./product-details-base */ "./assets/js/theme/common/product-details-base.js");
/* harmony import */ var _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/ie-helpers */ "./assets/js/theme/common/utils/ie-helpers.js");

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var CartItemDetails = /*#__PURE__*/function (_ProductDetailsBase) {
  _inheritsLoose(CartItemDetails, _ProductDetailsBase);
  function CartItemDetails($scope, context, productAttributesData) {
    var _this;
    if (productAttributesData === void 0) {
      productAttributesData = {};
    }
    _this = _ProductDetailsBase.call(this, $scope, context) || this;
    var $form = $('#CartEditProductFieldsForm', _this.$scope);
    var $productOptionsElement = $('[data-product-attributes-wrapper]', $form);
    var hasOptions = $productOptionsElement.html().trim().length;
    var hasDefaultOptions = $productOptionsElement.find('[data-default]').length;
    $productOptionsElement.on('change', function () {
      _this.setProductVariant();
    });
    var optionChangeCallback = _product_details_base__WEBPACK_IMPORTED_MODULE_2__["optionChangeDecorator"].call(_assertThisInitialized(_this), hasDefaultOptions);

    // Update product attributes. Also update the initial view in case items are oos
    // or have default variant properties that change the view
    if ((lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(productAttributesData) || hasDefaultOptions) && hasOptions) {
      var productId = _this.context.productForChangeId;
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.productAttributes.optionChange(productId, $form.serialize(), 'products/bulk-discount-rates', optionChangeCallback);
    } else {
      _this.updateProductAttributes(productAttributesData);
    }
    return _this;
  }
  var _proto = CartItemDetails.prototype;
  _proto.setProductVariant = function setProductVariant() {
    var unsatisfiedRequiredFields = [];
    var options = [];
    $.each($('[data-product-attribute]'), function (index, value) {
      var optionLabel = value.children[0].innerText;
      var optionTitle = optionLabel.split(':')[0].trim();
      var required = optionLabel.toLowerCase().includes('required');
      var type = value.getAttribute('data-product-attribute');
      if ((type === 'input-file' || type === 'input-text' || type === 'input-number') && value.querySelector('input').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }
      if (type === 'textarea' && value.querySelector('textarea').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }
      if (type === 'date') {
        var isSatisfied = Array.from(value.querySelectorAll('select')).every(function (select) {
          return select.selectedIndex !== 0;
        });
        if (isSatisfied) {
          var dateString = Array.from(value.querySelectorAll('select')).map(function (x) {
            return x.value;
          }).join('-');
          options.push(optionTitle + ":" + dateString);
          return;
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
      if (type === 'set-select') {
        var select = value.querySelector('select');
        var selectedIndex = select.selectedIndex;
        if (selectedIndex !== 0) {
          options.push(optionTitle + ":" + select.options[selectedIndex].innerText);
          return;
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
      if (type === 'set-rectangle' || type === 'set-radio' || type === 'swatch' || type === 'input-checkbox' || type === 'product-list') {
        var checked = value.querySelector(':checked');
        if (checked) {
          var getSelectedOptionLabel = function getSelectedOptionLabel() {
            var productVariantslist = Object(_utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__["convertIntoArray"])(value.children);
            var matchLabelForCheckedInput = function matchLabelForCheckedInput(inpt) {
              return inpt.dataset.productAttributeValue === checked.value;
            };
            return productVariantslist.filter(matchLabelForCheckedInput)[0];
          };
          if (type === 'set-rectangle' || type === 'set-radio' || type === 'product-list') {
            var label = _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__["isBrowserIE"] ? getSelectedOptionLabel().innerText.trim() : checked.labels[0].innerText;
            if (label) {
              options.push(optionTitle + ":" + label);
            }
          }
          if (type === 'swatch') {
            var _label = _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__["isBrowserIE"] ? getSelectedOptionLabel().children[0] : checked.labels[0].children[0];
            if (_label) {
              options.push(optionTitle + ":" + _label.title);
            }
          }
          if (type === 'input-checkbox') {
            options.push(optionTitle + ":Yes");
          }
          return;
        }
        if (type === 'input-checkbox') {
          options.push(optionTitle + ":No");
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
    });
    var productVariant = unsatisfiedRequiredFields.length === 0 ? options.sort().join(', ') : 'unsatisfied';
    var view = $('.modal-header-title');
    if (productVariant) {
      productVariant = productVariant === 'unsatisfied' ? '' : productVariant;
      if (view.attr('data-event-type')) {
        view.attr('data-product-variant', productVariant);
      } else {
        var productName = view.html().match(/'(.*?)'/)[1];
        var card = $("[data-name=\"" + productName + "\"]");
        card.attr('data-product-variant', productVariant);
      }
    }
  }

  /**
   * Hide or mark as unavailable out of stock attributes if enabled
   * @param  {Object} data Product attribute data
   */;
  _proto.updateProductAttributes = function updateProductAttributes(data) {
    _ProductDetailsBase.prototype.updateProductAttributes.call(this, data);
    this.$scope.find('.modal-content').removeClass('hide-content');
  };
  return CartItemDetails;
}(_product_details_base__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/gift-certificate-validator.js":
/*!**************************************************************!*\
  !*** ./assets/js/theme/common/gift-certificate-validator.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (cert) {
  if (typeof cert !== 'string' || cert.length === 0) {
    return false;
  }

  // Add any custom gift certificate validation logic here
  return true;
});

/***/ }),

/***/ "./assets/js/theme/common/state-country.js":
/*!*************************************************!*\
  !*** ./assets/js/theme/common/state-country.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/each */ "./node_modules/lodash/each.js");
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/transform */ "./node_modules/lodash/transform.js");
/* harmony import */ var lodash_transform__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_transform__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _utils_form_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");







/**
 * If there are no options from bcapp, a text field will be sent. This will create a select element to hold options after the remote request.
 * @returns {jQuery|HTMLElement}
 */
function makeStateRequired(stateElement, context) {
  var attrs = lodash_transform__WEBPACK_IMPORTED_MODULE_2___default()(stateElement.prop('attributes'), function (result, item) {
    var ret = result;
    ret[item.name] = item.value;
    return ret;
  });
  var replacementAttributes = {
    id: attrs.id,
    'data-label': attrs['data-label'],
    "class": 'form-select',
    name: attrs.name,
    'data-field-type': attrs['data-field-type']
  };
  stateElement.replaceWith($('<select></select>', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');
  var $hiddenInput = $('[name*="FormFieldIsText"]');
  if ($hiddenInput.length !== 0) {
    $hiddenInput.remove();
  }
  if ($newElement.prev().find('small').length === 0) {
    // String is injected from localizer
    $newElement.prev().append("<small>" + context.required + "</small>");
  } else {
    $newElement.prev().find('small').show();
  }
  return $newElement;
}

/**
 * If a country with states is the default, a select will be sent,
 * In this case we need to be able to switch to an input field and hide the required field
 */
function makeStateOptional(stateElement) {
  var attrs = lodash_transform__WEBPACK_IMPORTED_MODULE_2___default()(stateElement.prop('attributes'), function (result, item) {
    var ret = result;
    ret[item.name] = item.value;
    return ret;
  });
  var replacementAttributes = {
    type: 'text',
    id: attrs.id,
    'data-label': attrs['data-label'],
    "class": 'form-input',
    name: attrs.name,
    'data-field-type': attrs['data-field-type']
  };
  stateElement.replaceWith($('<input />', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');
  if ($newElement.length !== 0) {
    Object(_utils_form_utils__WEBPACK_IMPORTED_MODULE_4__["insertStateHiddenField"])($newElement);
    $newElement.prev().find('small').hide();
  }
  return $newElement;
}

/**
 * Adds the array of options from the remote request to the newly created select box.
 * @param {Object} statesArray
 * @param {jQuery} $selectElement
 * @param {Object} options
 */
function addOptions(statesArray, $selectElement, options) {
  var container = [];
  container.push("<option value=\"\">" + statesArray.prefix + "</option>");
  if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1___default()($selectElement)) {
    lodash_each__WEBPACK_IMPORTED_MODULE_0___default()(statesArray.states, function (stateObj) {
      if (options.useIdForStates) {
        container.push("<option value=\"" + stateObj.id + "\">" + stateObj.name + "</option>");
      } else {
        container.push("<option value=\"" + stateObj.name + "\">" + (stateObj.label ? stateObj.label : stateObj.name) + "</option>");
      }
    });
    $selectElement.html(container.join(' '));
  }
}

/**
 *
 * @param {jQuery} stateElement
 * @param {Object} context
 * @param {Object} options
 * @param {Function} callback
 */
/* harmony default export */ __webpack_exports__["default"] = (function (stateElement, context, options, callback) {
  if (context === void 0) {
    context = {};
  }
  /**
   * Backwards compatible for three parameters instead of four
   *
   * Available options:
   *
   * useIdForStates {Bool} - Generates states dropdown using id for values instead of strings
   */
  if (typeof options === 'function') {
    /* eslint-disable no-param-reassign */
    callback = options;
    options = {};
    /* eslint-enable no-param-reassign */
  }

  $('select[data-field-type="Country"]').on('change', function (event) {
    var countryName = $(event.currentTarget).val();
    if (countryName === '') {
      return;
    }
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["default"].api.country.getByName(countryName, function (err, response) {
      if (err) {
        Object(_global_modal__WEBPACK_IMPORTED_MODULE_5__["showAlertModal"])(context.state_error);
        return callback(err);
      }
      var $currentInput = $('[data-field-type="State"]');
      if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1___default()(response.data.states)) {
        // The element may have been replaced with a select, reselect it
        var $selectElement = makeStateRequired($currentInput, context);
        addOptions(response.data, $selectElement, options);
        callback(null, $selectElement);
      } else {
        var newElement = makeStateOptional($currentInput, context);
        callback(null, newElement);
      }
    });
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/utils/translations-utils.js":
/*!************************************************************!*\
  !*** ./assets/js/theme/common/utils/translations-utils.js ***!
  \************************************************************/
/*! exports provided: createTranslationDictionary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTranslationDictionary", function() { return createTranslationDictionary; });
var TRANSLATIONS = 'translations';
var isTranslationDictionaryNotEmpty = function isTranslationDictionaryNotEmpty(dictionary) {
  return !!Object.keys(dictionary[TRANSLATIONS]).length;
};
var chooseActiveDictionary = function chooseActiveDictionary() {
  for (var i = 0; i < arguments.length; i++) {
    var dictionary = JSON.parse(i < 0 || arguments.length <= i ? undefined : arguments[i]);
    if (isTranslationDictionaryNotEmpty(dictionary)) {
      return dictionary;
    }
  }
};

/**
 * defines Translation Dictionary to use
 * @param context provides access to 3 validation JSONs from en.json:
 * validation_messages, validation_fallback_messages and default_messages
 * @returns {Object}
 */
var createTranslationDictionary = function createTranslationDictionary(context) {
  var validationDictionaryJSON = context.validationDictionaryJSON,
    validationFallbackDictionaryJSON = context.validationFallbackDictionaryJSON,
    validationDefaultDictionaryJSON = context.validationDefaultDictionaryJSON;
  var activeDictionary = chooseActiveDictionary(validationDictionaryJSON, validationFallbackDictionaryJSON, validationDefaultDictionaryJSON);
  var localizations = Object.values(activeDictionary[TRANSLATIONS]);
  var translationKeys = Object.keys(activeDictionary[TRANSLATIONS]).map(function (key) {
    return key.split('.').pop();
  });
  return translationKeys.reduce(function (acc, key, i) {
    acc[key] = localizations[i];
    return acc;
  }, {});
};

/***/ }),

/***/ "./assets/js/theme/custom/cart-page-upsell-product-details.js":
/*!********************************************************************!*\
  !*** ./assets/js/theme/custom/cart-page-upsell-product-details.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CartPageUpsellProduct; });
/* harmony import */ var lodash_isObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isObject */ "./node_modules/lodash/isObject.js");
/* harmony import */ var lodash_isObject__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isObject__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _make_options_unique__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./make-options-unique */ "./assets/js/theme/custom/make-options-unique.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.min.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_3__);




var CartPageUpsellProduct = /*#__PURE__*/function () {
  function CartPageUpsellProduct($scope) {
    this.$scope = $scope;
    this.$scope.addClass('hasOptions--wired');
    this.initRadioAttributes();
    this.$form = $('form', this.$scope);
    this.$productId = $('[name="product_id"]', this.$form).val();
    this.key = 'cpu'; // unique indentifier for this customization

    this.$productOptionsElement = $("[data-" + this.key + "-option-change]", this.$form); // ie <div class="options" data-cpu-option-change>

    this.updateOptionView();
    // utils.api.productAttributes.optionChange(this.$productId, this.$form.serialize(), 'products/bulk-discount-rates', (err, response) => {
    //     const attributesData = response.data || {};
    //     const attributesContent = response.content || {};
    //     this.updateProductAttributes(attributesData);
    //     // if (hasDefaultOptions) {
    //         this.updateView(attributesData, attributesContent);
    //     // } else {
    //     //     this.updateDefaultAttributesForOOS(attributesData);
    //     // }
    // });

    this.bindEvents();
  }

  /**
   * add "isRequired" to options that are required
   */
  var _proto = CartPageUpsellProduct.prototype;
  _proto.addRequiredClasstoOptions = function addRequiredClasstoOptions() {
    $('.form-field', this.$productOptionsElement).toArray().forEach(function (option) {
      if ($(option).find('small:contains("Required")').length) {
        $(option).addClass('isRequired');
      }
    });
  }

  /**
   * Handle product options changes
   */;
  _proto.productOptionsChanged = function productOptionsChanged(event) {
    var $changedOption = $(event.target);
    var optionRow = $(event.target).parents('.form-field');

    // Do not trigger an ajax request if it's a file or if the browser doesn't support FormData
    if ($changedOption.attr('type') === 'file' || window.FormData === undefined) {
      // do nothing
    } else {
      this.updateOptionView();
    }

    // was an option with a value selected?
    if ($changedOption.val() !== '') {
      if ($changedOption.is('input')) {
        var type = $changedOption.attr('type');
        switch (type) {
          case 'radio':
            $changedOption.attr('checked', true);
            $changedOption.siblings('input').attr('checked', false);
            optionRow.addClass('isSelected');
            break;
          case 'checkbox':
            if ($changedOption.prop('checked')) {
              optionRow.addClass('isSelected');
              $changedOption.attr('checked', true);
            } else {
              optionRow.removeClass('isSelected');
              $changedOption.attr('checked', false);
            }
            break;
          case 'text':
          case 'number':
            $changedOption.val().length !== 0 ? optionRow.addClass('isSelected') : optionRow.removeClass('isSelected');
            $changedOption.attr('value', $changedOption.val());
            break;
        }
      } else if ($changedOption.is('select')) {
        var $selectedOption = $changedOption.find("option[value=\"" + $changedOption.val() + "\"]");
        $selectedOption.attr('selected', true);
        $selectedOption.siblings('option').attr('selected', false);
        // if it's a date select, make sure all 3 selects are filled in before saying it's filled in
        if ($changedOption.attr('name').indexOf('month') !== -1 || $changedOption.attr('name').indexOf('day') !== -1 || $changedOption.attr('name').indexOf('year') !== -1) {
          // count the other date fields (if changed month, see if day and year are filled out)
          var otherSelectedDateFields = $changedOption.siblings('select').toArray().reduce(function (count, select) {
            return $(select).val() === '' ? count : count + 1;
          }, 0);
          // if all fields are filled in
          if (otherSelectedDateFields === 2) {
            optionRow.addClass('isSelected');
          }
        } else {
          optionRow.addClass('isSelected'); // it's not a date select, just mark the option as selected
        }
      } else if ($changedOption.is('textarea')) {
        $changedOption.val().length !== 0 ? optionRow.addClass('isSelected') : optionRow.removeClass('isSelected');
        $changedOption.text($changedOption.val());
      }
    } else {
      // else remove class (there was no value for this option)
      optionRow.removeClass('isSelected');
    }
    this.checkOptionsSelected();
  }

  /**
   *  Make API call on option change to update availability
   */;
  _proto.updateOptionView = function updateOptionView() {
    var _this = this;
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.productAttributes.optionChange(this.$productId, this.$form.serialize(), 'products/bulk-discount-rates', function (err, response) {
      var productAttributesData = response.data || {};
      _this.updateProductAttributes(productAttributesData);
      _this.updateView(productAttributesData);
      // stock stuff (should wire up image change as well later)
      // if (productAttributesData.stock !== undefined) {
      //     $('.currentStock', $scope).text(productAttributesData.stock);
      // } else {
      //     $('.currentStock', $scope).text('');
      // }
    });
  }

  /**
   *  Check whether all required options are selected
   */;
  _proto.checkOptionsSelected = function checkOptionsSelected() {
    /*
    ## see if all options are selected
    */
    var numberRequiredOptions = this.$scope.find('.form-field.isRequired').length;
    var numberSelectedOptions = this.$scope.find('.form-field.isRequired.isSelected').length;
    // const $addToCartButton = $form.find('.card-actions .button');
    // $addToCartButton.removeClass('button--success');
    if (numberRequiredOptions === 0 || numberRequiredOptions <= numberSelectedOptions) {
      this.$scope.addClass('hasOptions--selected'); // add class to product for easy adding to cart
      $('.cpu__modal').addClass('hasOptions--selected'); // update text for user as well
    } else {
      this.$scope.removeClass('hasOptions--selected'); // remove class since not all options filled in
      $('.cpu__modal').removeClass('hasOptions--selected'); // update text for user as well
    }
  }

  /**
   * Update the view of price, messages, SKU and stock options when a product option changes
   * @param  {Object} data Product attribute data
   *
   */;
  _proto.updatePriceView = function updatePriceView(price) {
    if (price.without_tax) {
      $("[data-product-price-without-tax]", this.$scope).html(price.without_tax.formatted);
    }
  }

  /**
   * Update the view of price, messages, SKU and stock options when a product option changes
   * @param  {Object} data Product attribute data
   */;
  _proto.updateView = function updateView(data) {
    // update price
    // const viewModel = this.getViewModel(this.$scope);
    if (lodash_isObject__WEBPACK_IMPORTED_MODULE_0___default()(data.price)) {
      this.updatePriceView(data.price);
    }
    // update image
    var imageEl = $(".cpu__item-img", this.$scope);
    if (lodash_isObject__WEBPACK_IMPORTED_MODULE_0___default()(data.image)) {
      var imageSrc = data.image.data.replace('{:size}', '300x300');
      imageEl.attr('src', imageSrc);
    } else {
      imageEl.attr('src', imageEl.data('src'));
    }
    // update message if there is one
    var optionMessage = data.stock_message || data.purchasing_message;
    if (optionMessage !== null) {
      sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire({
        text: optionMessage,
        icon: 'error'
      });
      this.$scope.addClass('hasOptions--error');
    } else {
      this.$scope.removeClass('hasOptions--error');
    }
  }

  /**
   * Hide or mark as unavailable out of stock attributes if enabled
   * @param  {Object} data Product attribute data
   */;
  _proto.updateProductAttributes = function updateProductAttributes(data) {
    var _this2 = this;
    var behavior = data.out_of_stock_behavior;
    var inStockIds = data.in_stock_attributes;
    var outOfStockMessage = " (" + data.out_of_stock_message + ")";
    if (behavior !== 'hide_option' && behavior !== 'label_option') {
      return;
    }
    $('[data-product-attribute-value]', this.$scope.add('.cpu__modal')).each(function (i, attribute) {
      var $attribute = $(attribute);
      var attrId = parseInt($attribute.data('product-attribute-value'), 10);
      if (inStockIds.indexOf(attrId) !== -1) {
        _this2.enableAttribute($attribute, behavior, outOfStockMessage);
      } else {
        _this2.disableAttribute($attribute, behavior, outOfStockMessage);
      }
    });
  };
  _proto.disableAttribute = function disableAttribute($attribute, behavior, outOfStockMessage) {
    if (this.getAttributeType($attribute) === 'set-select') {
      return this.disableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
    }
    if (behavior === 'hide_option') {
      $attribute.hide();
    } else {
      $attribute.addClass('unavailable').prev('input').attr('disabled', true);
    }
  };
  _proto.disableSelectOptionAttribute = function disableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
    var $select = $attribute.parent();
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
  };
  _proto.enableAttribute = function enableAttribute($attribute, behavior, outOfStockMessage) {
    if (this.getAttributeType($attribute) === 'set-select') {
      return this.enableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
    }
    if (behavior === 'hide_option') {
      $attribute.show();
    } else {
      $attribute.removeClass('unavailable').prev('input').attr('disabled', false);
    }
  };
  _proto.enableSelectOptionAttribute = function enableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
    if (behavior === 'hide_option') {
      $attribute.toggleOption(true);
    } else {
      $attribute.removeAttr('disabled');
      $attribute.html($attribute.html().replace(outOfStockMessage, ''));
    }
  };
  _proto.getAttributeType = function getAttributeType($attribute) {
    var $parent = $attribute.closest('[data-product-attribute]');
    return $parent ? $parent.data('product-attribute') : null;
  }

  /**
   * Allow radio buttons to get deselected
   */;
  _proto.initRadioAttributes = function initRadioAttributes() {
    var _this3 = this;
    $('[data-product-attribute] input[type="radio"]', this.$scope).each(function (i, radio) {
      var $radio = $(radio);

      // Only bind to click once
      if ($radio.attr('data-state') !== undefined) {
        $radio.click(function () {
          if ($radio.data('state') === true) {
            $radio.prop('checked', false);
            $radio.data('state', false);
            $radio.change();
          } else {
            $radio.data('state', true);
          }
          _this3.initRadioAttributes();
        });
      }
      $radio.attr('data-state', $radio.prop('checked'));
    });
  }

  /**
   * bind events
   */;
  _proto.bindEvents = function bindEvents() {
    var _this4 = this;
    Object(_make_options_unique__WEBPACK_IMPORTED_MODULE_2__["default"])(this.$scope, this.$productId, this.key); // make options unique so there aer no conflicts when selecting options

    this.addRequiredClasstoOptions(); // add "isRequired" to required options
    this.checkOptionsSelected();

    // listen for option changes
    this.$productOptionsElement.change(function (event) {
      _this4.productOptionsChanged(event, event.target);
    });
    this.$productOptionsElement.show();

    // update options selected on load
    this.$productOptionsElement.find('input[type="checkbox"]').trigger('change'); // trigger selected checkbox options to update starting checkbox values
    this.$productOptionsElement.find('input[type="radio"]:checked').trigger('change'); // trigger selected radio options to update starting radio buttons values
    this.$productOptionsElement.find('input[type="text"]').trigger('change'); // trigger update on input text to catch any default values
    this.$productOptionsElement.find('input[type="number"]').trigger('change'); // trigger update on input numbers to catch any default values
    this.$productOptionsElement.find('textarea').trigger('change'); // trigger update on textarea tp catch any default values
    this.$productOptionsElement.find('option:selected').parent().trigger('change'); // trigger selected options to update starting select box values
  };
  return CartPageUpsellProduct;
}();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/custom/cart-page-upsell.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/custom/cart-page-upsell.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CartPageUpsell; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.min.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _cart_page_upsell_product_details__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cart-page-upsell-product-details */ "./assets/js/theme/custom/cart-page-upsell-product-details.js");
/* harmony import */ var _make_options_unique__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./make-options-unique */ "./assets/js/theme/custom/make-options-unique.js");
/* harmony import */ var _common_carousel_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/carousel/index */ "./assets/js/theme/common/carousel/index.js");
/* harmony import */ var _upsell_array_cart_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./upsell-array-cart-page */ "./assets/js/theme/custom/upsell-array-cart-page.js");
/* harmony import */ var _common_media_query_list__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/media-query-list */ "./assets/js/theme/common/media-query-list.js");
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }








//  Apr 2019: updated version includes ITS Upsell Suite
var VERSION = '2.0';
var CartPageUpsell = /*#__PURE__*/function () {
  function CartPageUpsell(context) {
    console.log('IntuitSolutions.net - Cart Page Upsell', VERSION);
    this.context = context;

    /**
     * options = 'related', 'similar', 'custom fields'
     * errorDefault = backup mode; only necessary with Upsell Suite
     * -- related = automatically loads related products from a random item in the cart
     * -- similar = automatically loads similar by view products from a random item in the cart
     * -- custom fields = will load the products specified by the cart item's custom fields
     * -- upsell suite = will load products specified by Upsell Suite CSVs
     */
    this.mode = 'upsell suite';
    this.errorDefault = 'related';
    this.showMobileInCarousel = true;
    this.productLimit = 3;
    this.loading = $('#cpu .loadingOverlay');
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.product.getById = _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.product.getById.bind(_bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.product); // required to keep scope of utils to the utils
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.getPage = _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.getPage.bind(_bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api); // required to keep scope of utils to the utils

    this.bindEvents();
  }

  /**
   * remove duplicate items from array
   *
   * pulled from stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
   * @param {array} upsellTargets - array of items we want to strip out any duplicate items from
   */
  var _proto = CartPageUpsell.prototype;
  _proto.removeDuplicateTargets = function removeDuplicateTargets(upsellTargets) {
    return Array.from(new Set(upsellTargets));
  }

  /**
   * get cart items URLs and Product Ids so we don't try to upsell an item that's already in the cart
   * @param {array} upsellTargets - array of items we want to strip out any cart item matches from
   */;
  _proto.removeCartItemTargets = function removeCartItemTargets(upsellTargets) {
    // get all data from the cart items
    var cartItemData = [];
    $('[data-upsell]').toArray().forEach(function (cartItem) {
      var producturl = $(cartItem).data('product-url').replace(window.location.origin, '') || '';
      var productId = $(cartItem).data('product-id').toString() || '';
      cartItemData.push(producturl, productId);
    });
    // only keep upsell items that aren't within our cartItemData array
    var result = upsellTargets.reduce(function (upsellItems, upsellitem) {
      if (cartItemData.indexOf(upsellitem) === -1) {
        upsellItems.push(upsellitem);
      }
      return upsellItems;
    }, []);
    // return result
    return result;
  }

  /**
   * get random int given a max
   */;
  _proto.getRandomInt = function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  /**
   * automatically load products from the cart item's either related products or similar by view items
   * @param {string} type - "related" or "similar"
   */;
  _proto.loadAutoTargets = function loadAutoTargets(type) {
    var _this = this;
    var itemIndex = this.getRandomInt($('.cart-item').length); // get random item index (pick random item)
    var itemId = $('.cart-item').eq(itemIndex || 0).data('product-id'); // get product id of that random item
    if (itemId == undefined) {
      return $('#cpu').hide();
    }
    // see if we already ajax'd for these upsell items
    var storedData = JSON.parse(localStorage.getItem("cpu__items" + itemId)) || [];
    if (storedData.length) {
      // if already ajaxed and stored upsell items
      storedData = this.removeDuplicateTargets(storedData); // remove duplicate upsell targets
      storedData = this.removeCartItemTargets(storedData); // remove any upsell targets that match an item already in the cart
      this.loadUpsellTargets(storedData); // load those stored upsell items
    } else {
      // otherwise
      var opts = {
        template: "custom/cart-page-upsell-targets--" + type,
        config: {
          product: {
            related_products: {
              limit: 70
            },
            similar_by_views: {
              limit: 70
            }
          }
        }
      };
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.product.getById(itemId, opts, function (err, res) {
        // ajax for the first item's upsell items (suggested products)
        if (err) {
          return $('#cpu').hide();
        }
        var targets = JSON.parse(res) || [];
        targets = _this.removeDuplicateTargets(targets); // remove duplicate upsell targets
        targets = _this.removeCartItemTargets(targets); // remove any upsell targets that match an item already in the cart
        localStorage.setItem("cpu__items" + itemId, JSON.stringify(targets));
        _this.loadUpsellTargets(targets);
      });
    }
  }

  /**
   * returns array of upsell product URLs and/or IDs
   */;
  _proto.loadCustomFieldTargets = function loadCustomFieldTargets() {
    var targets = [];
    $('[data-upsell]').toArray().forEach(function (cartItem) {
      var upsellItems = $(cartItem).data('upsell');
      if (upsellItems.length) {
        upsellItems.split(',').forEach(function (upsellItem) {
          if (upsellItem.length) {
            targets.push(upsellItem);
          }
        });
      }
    });
    // if mode is set to custom fields but no items have custom fields applied, default to using related products
    if (targets.length === 0) {
      return this.loadAutoTargets('related');
    }
    targets = this.removeDuplicateTargets(targets); // remove duplicate upsell targets
    targets = this.removeCartItemTargets(targets); // remove any upsell targets that match an item already in the cart
    return this.loadUpsellTargets(targets);
  };
  _proto.loadCSVTargets = /*#__PURE__*/function () {
    var _loadCSVTargets = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var cpuHTMLtext, cpuHTML, remainingSlots, targets;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            //  get the previously AJAXed products from sessionStorage
            cpuHTMLtext = sessionStorage.getItem("cpuCards");
            cpuHTML = _upsell_array_cart_page__WEBPACK_IMPORTED_MODULE_5__["default"].parseArrayFromString(cpuHTMLtext); //  if nothing has been downloaded,
            //  revert to backup mode
            if (cpuHTML.length) {
              _context.next = 4;
              break;
            }
            return _context.abrupt("return", this.loadAutoTargets(this.errorDefault));
          case 4:
            //  display the previouly downloaded products
            cpuHTML.forEach(function (card) {
              return $('#cpu .cpu__list--customfields').append(card.html);
            });

            //  if there is room for more products,
            //  fill the rest of the add-on by
            //  adding products from the CSVs
            //  of products already in the CPU
            remainingSlots = this.productLimit - cpuHTML.length;
            if (!remainingSlots) {
              _context.next = 17;
              break;
            }
            _context.prev = 7;
            _context.next = 10;
            return _upsell_array_cart_page__WEBPACK_IMPORTED_MODULE_5__["default"].getAdditionalProducts(cpuHTML.map(function (product) {
              return product.product_id;
            }), remainingSlots);
          case 10:
            targets = _context.sent;
            return _context.abrupt("return", this.loadUpsellTargets(targets));
          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](7);
            console.error("CPU parse error: ", _context.t0);
          case 17:
            this.applyUpsellHandlers();
            return _context.abrupt("return", this.loading.hide());
          case 19:
          case "end":
            return _context.stop();
        }
      }, _callee, this, [[7, 14]]);
    }));
    function loadCSVTargets() {
      return _loadCSVTargets.apply(this, arguments);
    }
    return loadCSVTargets;
  }()
  /**
   * handle adding items to cart
   */
  ;
  _proto.addToCart = function addToCart(event) {
    var _this2 = this;
    var product = $(event.currentTarget).parents('.cpu__item');
    product.removeClass('hasError'); // remove any error highlighting
    // make sure all options are selected
    if (product.hasClass('hasOptions') && !product.hasClass('hasOptions--selected')) {
      product.hasClass('hasOptions--wired') ? $('.qaatx__options', product).slideDown() // if options loaded, just show them
      : this.toggleOptions(event); // options aren't loaded, load them + show them
      product.addClass('hasError');
      $('.cpu__item.isBeingAdded').removeClass('isBeingAdded');
      return sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.fire({
        text: 'Please make sure all required options have been selected',
        type: 'error'
      });
    }
    // actually add to cart
    this.loading.show();
    var form = $('.cpu__item-form', product);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.cart.itemAdd(new FormData(form[0]), function (err, response) {
      var errorMessage = err || response.data.error; // take note of errors
      if (errorMessage) {
        // Guard statement
        // Strip the HTML from the error message
        var tmp = document.createElement('DIV');
        tmp.innerHTML = errorMessage;
        _this2.loading.hide();
        product.addClass('hasError'); // highlgihht error item
        var errorOffset = product.offset().top;
        $('html, body').animate({
          scrollTop: errorOffset - 20
        }, 700); // scroll user to the error product
        // remove class from our 'qued" items
        $('.cpu__item.isBeingAdded').removeClass('isBeingAdded');
        // alert user of error
        return sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.fire({
          text: tmp.textContent || tmp.innerText,
          icon: 'error'
        });
      }
      _this2.loading.hide();
      // product.addClass('wasAdded');
      // $('.cpu__item-button', product).text('Added to Cart');
      $(document).trigger('cpu-refresh-cart-content');
      // if (product.hasClass('isBeingAdded')) {
      //     product.removeClass('isBeingAdded');
      //     ($('.cpu__item.isBeingAdded') && $('.cpu__item.isBeingAdded').length)
      //         ? $('.cpu__item.isBeingAdded').eq(0).find('.qaatc__addtocart').trigger('click') // trigger submitting next product to the cart
      //         : window.location = '/cart.php';
      // }
    });
  }

  /**
   * when modal option changed we need to sync the "real" form. Sync options selected in scope1 with scope2
   * @param {object} event
   * @param {string} productId
   */;
  _proto.syncFormOption = function syncFormOption(event, productId) {
    var opt = $(event.target).parents('.form-field');
    var type = $(opt).data('product-attribute');
    var target = null;
    var targetId = null;
    var value = null;
    switch (type) {
      case 'input-checkbox':
      case 'set-rectangle':
      case 'set-radio':
      case 'product-list':
      case 'swatch':
        target = $('input:checked', opt);
        if (target && target.length) {
          targetId = target.prop('id').replace("_" + productId, '').replace('modal_', '');
          $("#" + targetId).prop('checked', true);
          $("#" + targetId).siblings('input').prop('checked', false);
        } else {
          targetId = $(event.target).prop('id').replace("_" + productId, '').replace('modal_', '');
        }
        break;
      case 'set-select':
        target = $('.form-select', opt);
        targetId = target.prop('id').replace("_" + productId, '').replace('modal_', '');
        value = target.val();
        $("#" + targetId).val(value);
        break;
      case 'input-text':
      case 'textarea':
        target = $('.form-input', opt);
        targetId = target.prop('id').replace("_" + productId, '').replace('modal_', '');
        value = target.val();
        $("#" + targetId).val(value);
        break;
    }
    // force update on the "real" form
    $("#" + targetId).trigger('change');
  }

  /**
   * Add to cart from modal
   */;
  _proto.addToCartFromModal = function addToCartFromModal(modalContent, product) {
    var modal = modalContent.parents('.cpu__modal');
    if (!modal.hasClass('hasOptions--selected')) {
      return sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.fire({
        text: 'Please make sure all required options have been selected',
        icon: 'error',
        onClose: function onClose() {
          $('.cpu__item-button--options', product).trigger('click'); // show options again if tried adding to cart before selecting all options
        }
      });
    }

    $('.cpu__item-button--addtocart', product).trigger('click'); // trigger add to cart button click on main product
    sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.close(); // close modal
  }

  /**
   * show and load if needed this product's options
   */;
  _proto.showOptions = function showOptions(e) {
    var _this3 = this;
    var product = $(e.currentTarget).parents('.cpu__item');
    var name = $('.cpu__item-name', product).text();
    var optionMarkup = $('.cpu__item-options', product).html();
    var productId = $('[name="product_id"]', product).val();
    sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.fire({
      title: "Options for " + name,
      html: optionMarkup,
      customClass: 'cpu__modal',
      showCloseButton: true,
      showConfirmButton: false,
      onOpen: function onOpen() {
        // since the moda lHTML is cloned it doesn't have any handlers applied to it. This handles the "fake" cloned options to update the "real" options
        var modalContent = $(sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.getContent());
        Object(_make_options_unique__WEBPACK_IMPORTED_MODULE_3__["default"])(modalContent, productId, 'modal');
        $('[data-cpu-option-change]', modalContent).change(function (event) {
          _this3.syncFormOption(event, productId);
        });
        // trigger default selected options unless there's an error.. then we'll get stuck in a loop
        if (!product.hasClass('hasOptions--error')) {
          $('[data-cpu-option-change]', modalContent).find('input[type="checkbox"]').trigger('change'); // trigger selected checkbox options to update starting checkbox values
          $('[data-cpu-option-change]', modalContent).find('input[type="radio"]:checked').trigger('change'); // trigger selected radio options to update starting radio buttons values
          $('[data-cpu-option-change]', modalContent).find('input[type="text"]').trigger('change'); // trigger update on input text to catch any default values
          $('[data-cpu-option-change]', modalContent).find('input[type="number"]').trigger('change'); // trigger update on input numbers to catch any default values
          $('[data-cpu-option-change]', modalContent).find('textarea').trigger('change'); // trigger update on textarea tp catch any default values
          $('[data-cpu-option-change]', modalContent).find('option:selected').parent().trigger('change'); // trigger selected options to update starting select box values
        }

        // this.optionHandlers[productId].updateOptionView();
        _this3.optionHandlers[productId].checkOptionsSelected(modalContent);

        // handle adding to cart from modal
        $('.cpu__item-button--modaladdtocart', modalContent).on('click', function () {
          return _this3.addToCartFromModal(modalContent, product);
        });
      }
    });
  }

  /**
   * apply upsell handlers
   */;
  _proto.applyUpsellHandlers = function applyUpsellHandlers() {
    var _this4 = this;
    this.optionHandlers = {};
    $('.cpu__item.hasOptions').toArray().forEach(function (product) {
      var thisID = $(product).find('input[name="product_id"]').val();
      _this4.optionHandlers[thisID] = new _cart_page_upsell_product_details__WEBPACK_IMPORTED_MODULE_2__["default"]($(product));
    }); // handle options for all products w/ options
    console.log(this.optionHandlers);
    $('.cpu__item-button--addtocart').on('click', function (e) {
      return _this4.addToCart(e);
    }); // manage adding to cart

    $('.cpu__item-button--options').on('click', function (e) {
      return _this4.showOptions(e);
    }); // manage adding to cart

    this.displayInCarousel();
  }

  /**
   * AJAX the upsell URLs and/or IDs and append where needed
   * @param {array} targets - targets to upsell
   */;
  _proto.loadUpsellTargets = function loadUpsellTargets(targets) {
    var _this5 = this;
    if (targets.length) {
      targets = targets.slice(0, this.productLimit || targets.length);
      var runQueueInOrder = function runQueueInOrder() {
        if (targets.length === 0) {
          // when done all products
          _this5.applyUpsellHandlers();
          return _this5.loading.hide();
        }
        var target = targets.shift();
        var requestMethod = target.toString().match(/^[0-9]+$/) ? _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.product.getById : _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.getPage;
        requestMethod(target, {
          template: 'custom/cart-page-upsell-item'
        }, function (err, response) {
          if (err) {
            return;
          } // if error
          $('#cpu .cpu__list--customfields').append(response); // no error, append markup
          runQueueInOrder(); // run next item
        });
      };

      runQueueInOrder(); // start the loop
    } else {
      $('#cpu').hide();
    }
  }

  /**
   * Add Slick options to product display after loading products,
   * then fire Slick
   */;
  _proto.displayInCarousel = function displayInCarousel() {
    if (!this.showMobileInCarousel) return;

    //  Add CSS to product cards before firing Slick
    $('.cpu__list').addClass('cpu__list-slick');
    $('.cpu__item').addClass('cpu__item-slick');
    $('.cpu__list').attr('data-slick', "{\n            \"infinite\": true,\n            \"dots\": false,\n            \"arrows\": true,\n            \"mobileFirst\": true,\n            \"rows\": 1,\n            \"slidesToShow\": 1,\n            \"slidesToScroll\": 1,\n            \"responsive\": [\n                {\n                    \"breakpoint\": 1025,\n                    \"settings\": \"unslick\"\n                }\n            ]\n        }");
    Object(_common_carousel_index__WEBPACK_IMPORTED_MODULE_4__["default"])(this.context);
    var mediaMatch = Object(_common_media_query_list__WEBPACK_IMPORTED_MODULE_6__["default"])('medium');
    $(mediaMatch).on('change', function (e) {
      var bindToWindow = !e.target.matches;
      if (bindToWindow) {
        $('.cpu__list').slick('reinit');
      }
    });
  }

  /**
   * bind events
   */;
  _proto.bindEvents = function bindEvents() {
    this.loading.show();
    switch (this.mode) {
      case 'related':
        return this.loadAutoTargets('related');
      case 'similar':
        return this.loadAutoTargets('similar');
      case 'custom fields':
        return this.loadCustomFieldTargets();
      case 'upsell suite':
        return this.loadCSVTargets();
    }
  };
  return CartPageUpsell;
}();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/custom/custom-cart.js":
/*!***********************************************!*\
  !*** ./assets/js/theme/custom/custom-cart.js ***!
  \***********************************************/
/*! exports provided: floatingCheckoutButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "floatingCheckoutButton", function() { return floatingCheckoutButton; });
/* harmony import */ var _common_media_query_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/media-query-list */ "./assets/js/theme/common/media-query-list.js");

var floatingCheckoutButton = function floatingCheckoutButton() {
  var $summaryContainer = $('.js-cart__totals');
  var $floatingButton = $('.floating-checkout-button');
  var mq = Object(_common_media_query_list__WEBPACK_IMPORTED_MODULE_0__["default"])('medium');
  function WidthChange(mq) {
    var fadeTiming = 400;
    if (!mq.matches) {
      var initWindowPosition = window.scrollY + window.innerHeight;
      if (initWindowPosition < $summaryContainer.offset().top) {
        $floatingButton.show();
      } else {
        $floatingButton.hide();
      }
      $(window).on('scroll', function () {
        var bottomWindowPosition = window.scrollY + window.innerHeight;
        if (bottomWindowPosition < $summaryContainer.offset().top) {
          $floatingButton.fadeIn(fadeTiming);
        } else {
          $floatingButton.fadeOut(fadeTiming);
        }
      });
    } else {
      $floatingButton.hide();
    }
  }
  mq.addListener(WidthChange);
  WidthChange(mq);
  $floatingButton.on('click', function () {
    var goToCheckout = false; // Set to true if the button should go to checkout instead of scrolling the user down the page
    var totalsOffset = $summaryContainer.offset().top;
    if (goToCheckout) {
      window.location.href = '/checkout.php';
    } else {
      $('html, body').animate({
        scrollTop: totalsOffset - 100
      }, 700); // scroll user to the real checkout button product
    }
  });
};


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/custom/make-options-unique.js":
/*!*******************************************************!*\
  !*** ./assets/js/theme/custom/make-options-unique.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/*
 * put productID on the element's "for" and "id" attrs so multiple cases of same option set won't conflict
 */
var makeOptionIdsUnique = function makeOptionIdsUnique(scope, productId, key) {
  $('input[type="radio"], input[type="checkbox"]', scope).each(function (index, el) {
    var optionId = $(el).attr('id'); // update ID to include product ID
    $(el).attr('id', key + "_" + optionId + "_" + productId); // update option ID to include product ID
    $(el).next().attr('for', key + "_" + optionId + "_" + productId); // update option label to target updated ID
  });
  // add input fields label class and put in here. These options we need to select their sibling label
  var optionsWithLabelAttrs = ['input[type="text"]', 'input[type="number"]', 'input[type="file"]', 'select', 'textarea'];
  var optionsWithLabelAttrsSelectors = optionsWithLabelAttrs.join(',');
  $(optionsWithLabelAttrsSelectors, scope).parents('.form-field').find('label').each(function (index, el) {
    var optionId = $(el).attr('for'); // update ID to include product ID
    $(el).attr('for', key + "_" + optionId + "_" + productId); // update option ID to include product ID
    $(el).next().attr('id', key + "_" + optionId + "_" + productId); // update option label to target updated ID
  });
};

/* harmony default export */ __webpack_exports__["default"] = (makeOptionIdsUnique);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC9zaGlwcGluZy1lc3RpbWF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi9jYXJ0LWl0ZW0tZGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2dpZnQtY2VydGlmaWNhdGUtdmFsaWRhdG9yLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vc3RhdGUtY291bnRyeS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY3VzdG9tL2NhcnQtcGFnZS11cHNlbGwtcHJvZHVjdC1kZXRhaWxzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jdXN0b20vY2FydC1wYWdlLXVwc2VsbC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY3VzdG9tL2N1c3RvbS1jYXJ0LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jdXN0b20vbWFrZS1vcHRpb25zLXVuaXF1ZS5qcyJdLCJuYW1lcyI6WyJDYXJ0Iiwib25SZWFkeSIsIiRtb2RhbCIsIiRjYXJ0UGFnZUNvbnRlbnQiLCIkIiwiJGNhcnRDb250ZW50IiwiJGNhcnRNZXNzYWdlcyIsIiRjYXJ0VG90YWxzIiwiJGNhcnRBZGRpdGlvbmFsQ2hlY2tvdXRCdG5zIiwiJG92ZXJsYXkiLCJoaWRlIiwiJGFjdGl2ZUNhcnRJdGVtSWQiLCIkYWN0aXZlQ2FydEl0ZW1CdG5BY3Rpb24iLCJjdXN0b21DYXJ0IiwiY29udGV4dCIsIml0c0NvbmZpZyIsImN1c3RvbV9jYXJ0IiwiZmxvYXRpbmdDaGVja291dEJ1dHRvbiIsImNhcnRQYWdlVXBzZWxsIiwiQ2FydFBhZ2VVcHNlbGwiLCJzZXRBcHBsZVBheVN1cHBvcnQiLCJiaW5kRXZlbnRzIiwid2luZG93IiwiQXBwbGVQYXlTZXNzaW9uIiwiYWRkQ2xhc3MiLCJjYXJ0VXBkYXRlIiwiJHRhcmdldCIsIml0ZW1JZCIsImRhdGEiLCIkZWwiLCJvbGRRdHkiLCJwYXJzZUludCIsInZhbCIsIm1heFF0eSIsIm1pblF0eSIsIm1pbkVycm9yIiwibWF4RXJyb3IiLCJuZXdRdHkiLCJzd2FsIiwiZmlyZSIsInRleHQiLCJpY29uIiwic2hvdyIsInV0aWxzIiwiYXBpIiwiY2FydCIsIml0ZW1VcGRhdGUiLCJlcnIiLCJyZXNwb25zZSIsInN0YXR1cyIsInJlbW92ZSIsInJlZnJlc2hDb250ZW50IiwiZXJyb3JzIiwiam9pbiIsImNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlIiwicHJlVmFsIiwiTnVtYmVyIiwiaW52YWxpZEVudHJ5IiwiaW52YWxpZEVudHJ5TWVzc2FnZSIsInJlcGxhY2UiLCJjYXJ0UmVtb3ZlSXRlbSIsIml0ZW1SZW1vdmUiLCJjYXJ0RWRpdE9wdGlvbnMiLCJwcm9kdWN0SWQiLCJwcm9kdWN0Rm9yQ2hhbmdlSWQiLCJtb2RhbCIsImRlZmF1bHRNb2RhbCIsIm9wdGlvbnMiLCJ0ZW1wbGF0ZSIsIm9wZW4iLCJmaW5kIiwicHJvZHVjdEF0dHJpYnV0ZXMiLCJjb25maWd1cmVJbkNhcnQiLCJ1cGRhdGVDb250ZW50IiwiY29udGVudCIsIm9wdGlvbkNoYW5nZUhhbmRsZXIiLCIkcHJvZHVjdE9wdGlvbnNDb250YWluZXIiLCJtb2RhbEJvZHlSZXNlcnZlZEhlaWdodCIsIm91dGVySGVpZ2h0IiwibGVuZ3RoIiwiY3NzIiwiaGFzQ2xhc3MiLCJvbmUiLCJNb2RhbEV2ZW50cyIsIm9wZW5lZCIsInByb2R1Y3REZXRhaWxzIiwiQ2FydEl0ZW1EZXRhaWxzIiwiYmluZEdpZnRXcmFwcGluZ0Zvcm0iLCJob29rcyIsIm9uIiwiZXZlbnQiLCJjdXJyZW50VGFyZ2V0IiwiJGZvcm0iLCIkc3VibWl0IiwiJG1lc3NhZ2VCb3giLCJvcHRpb25DaGFuZ2UiLCJzZXJpYWxpemUiLCJyZXN1bHQiLCJwdXJjaGFzaW5nX21lc3NhZ2UiLCJwcm9wIiwicHVyY2hhc2FibGUiLCJpbnN0b2NrIiwiJGNhcnRJdGVtc1Jvd3MiLCIkY2FydFBhZ2VUaXRsZSIsInRvdGFscyIsInBhZ2VUaXRsZSIsInN0YXR1c01lc3NhZ2VzIiwiYWRkaXRpb25hbENoZWNrb3V0QnV0dG9ucyIsImxvY2F0aW9uIiwicmVsb2FkIiwiZ2V0Q29udGVudCIsImh0bWwiLCJyZXBsYWNlV2l0aCIsInF1YW50aXR5IiwidHJpZ2dlciIsImZpbHRlciIsImJpbmRDYXJ0RXZlbnRzIiwiZGVib3VuY2VUaW1lb3V0IiwicHJldmVudERlZmF1bHQiLCJvblF0eUZvY3VzIiwidmFsdWUiLCJjaGFuZ2UiLCJzdHJpbmciLCJzaG93Q2FuY2VsQnV0dG9uIiwiY2FuY2VsQnV0dG9uVGV4dCIsInRoZW4iLCJiaW5kUHJvbW9Db2RlRXZlbnRzIiwiJGNvdXBvbkNvbnRhaW5lciIsIiRjb3Vwb25Gb3JtIiwiJGNvZGVJbnB1dCIsImNvZGUiLCJhcHBseUNvZGUiLCJiaW5kR2lmdENlcnRpZmljYXRlRXZlbnRzIiwiJGNlcnRDb250YWluZXIiLCIkY2VydEZvcm0iLCIkY2VydElucHV0IiwidG9nZ2xlIiwiY2hlY2tJc0dpZnRDZXJ0VmFsaWQiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeSIsImNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSIsImludmFsaWRfZ2lmdF9jZXJ0aWZpY2F0ZSIsImFwcGx5R2lmdENlcnRpZmljYXRlIiwicmVzcCIsImJpbmRHaWZ0V3JhcHBpbmdFdmVudHMiLCJnZXRJdGVtR2lmdFdyYXBwaW5nT3B0aW9ucyIsIiRzZWxlY3QiLCJpZCIsImluZGV4IiwiYWxsb3dNZXNzYWdlIiwidG9nZ2xlVmlld3MiLCIkc2luZ2xlRm9ybSIsIiRtdWx0aUZvcm0iLCJzaGlwcGluZ0Vycm9yTWVzc2FnZXMiLCJjb3VudHJ5Iiwic2hpcHBpbmdDb3VudHJ5RXJyb3JNZXNzYWdlIiwicHJvdmluY2UiLCJzaGlwcGluZ1Byb3ZpbmNlRXJyb3JNZXNzYWdlIiwic2hpcHBpbmdFc3RpbWF0b3IiLCJTaGlwcGluZ0VzdGltYXRvciIsImRvY3VtZW50IiwiUGFnZU1hbmFnZXIiLCIkZWxlbWVudCIsIiRzdGF0ZSIsImlzRXN0aW1hdG9yRm9ybU9wZW5lZCIsImluaXRGb3JtVmFsaWRhdGlvbiIsImJpbmRTdGF0ZUNvdW50cnlDaGFuZ2UiLCJiaW5kRXN0aW1hdG9yRXZlbnRzIiwic2hpcHBpbmdFc3RpbWF0b3JBbGVydCIsInNoaXBwaW5nVmFsaWRhdG9yIiwibm9kIiwic3VibWl0IiwidGFwIiwiYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSIsImF0dHIiLCJyZW1vdmVBdHRyIiwicGVyZm9ybUNoZWNrIiwiYXJlQWxsIiwiYmluZFZhbGlkYXRpb24iLCJiaW5kU3RhdGVWYWxpZGF0aW9uIiwiYmluZFVQU1JhdGVzIiwiYWRkIiwic2VsZWN0b3IiLCJ2YWxpZGF0ZSIsImNiIiwiY291bnRyeUlkIiwiaXNOYU4iLCJlcnJvck1lc3NhZ2UiLCIkZWxlIiwiZWxlVmFsIiwiVVBTUmF0ZVRvZ2dsZSIsIiRlc3RpbWF0b3JGb3JtVXBzIiwiJGVzdGltYXRvckZvcm1EZWZhdWx0IiwidG9nZ2xlQ2xhc3MiLCIkbGFzdCIsInN0YXRlQ291bnRyeSIsInVzZUlkRm9yU3RhdGVzIiwiZmllbGQiLCJFcnJvciIsIiRmaWVsZCIsImdldFN0YXR1cyIsImlzIiwiVmFsaWRhdG9ycyIsImNsZWFuVXBTdGF0ZVZhbGlkYXRpb24iLCJyZW1vdmVDbGFzcyIsInRvZ2dsZUVzdGltYXRvckZvcm1TdGF0ZSIsInRvZ2dsZUJ1dHRvbiIsImJ1dHRvblNlbGVjdG9yIiwiJHRvZ2dsZUNvbnRhaW5lciIsImNoYW5nZUF0dHJpYnV0ZXNPblRvZ2dsZSIsInNlbGVjdG9yVG9BY3RpdmF0ZSIsIiRlc3RpbWF0b3JDb250YWluZXIiLCIkZXN0aW1hdG9yRm9ybSIsImNvbGxhcHNpYmxlRmFjdG9yeSIsInBhcmFtcyIsImNvdW50cnlfaWQiLCJzdGF0ZV9pZCIsImNpdHkiLCJ6aXBfY29kZSIsImdldFNoaXBwaW5nUXVvdGVzIiwiY2xpY2tFdmVudCIsInF1b3RlSWQiLCJzdWJtaXRTaGlwcGluZ1F1b3RlIiwiJHNjb3BlIiwicHJvZHVjdEF0dHJpYnV0ZXNEYXRhIiwiJHByb2R1Y3RPcHRpb25zRWxlbWVudCIsImhhc09wdGlvbnMiLCJ0cmltIiwiaGFzRGVmYXVsdE9wdGlvbnMiLCJzZXRQcm9kdWN0VmFyaWFudCIsIm9wdGlvbkNoYW5nZUNhbGxiYWNrIiwib3B0aW9uQ2hhbmdlRGVjb3JhdG9yIiwiY2FsbCIsInVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzIiwidW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcyIsImVhY2giLCJvcHRpb25MYWJlbCIsImNoaWxkcmVuIiwiaW5uZXJUZXh0Iiwib3B0aW9uVGl0bGUiLCJzcGxpdCIsInJlcXVpcmVkIiwidG9Mb3dlckNhc2UiLCJpbmNsdWRlcyIsInR5cGUiLCJnZXRBdHRyaWJ1dGUiLCJxdWVyeVNlbGVjdG9yIiwicHVzaCIsImlzU2F0aXNmaWVkIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsImV2ZXJ5Iiwic2VsZWN0Iiwic2VsZWN0ZWRJbmRleCIsImRhdGVTdHJpbmciLCJtYXAiLCJ4IiwiY2hlY2tlZCIsImdldFNlbGVjdGVkT3B0aW9uTGFiZWwiLCJwcm9kdWN0VmFyaWFudHNsaXN0IiwiY29udmVydEludG9BcnJheSIsIm1hdGNoTGFiZWxGb3JDaGVja2VkSW5wdXQiLCJpbnB0IiwiZGF0YXNldCIsInByb2R1Y3RBdHRyaWJ1dGVWYWx1ZSIsImxhYmVsIiwiaXNCcm93c2VySUUiLCJsYWJlbHMiLCJ0aXRsZSIsInByb2R1Y3RWYXJpYW50Iiwic29ydCIsInZpZXciLCJwcm9kdWN0TmFtZSIsIm1hdGNoIiwiY2FyZCIsIlByb2R1Y3REZXRhaWxzQmFzZSIsImNlcnQiLCJtYWtlU3RhdGVSZXF1aXJlZCIsInN0YXRlRWxlbWVudCIsImF0dHJzIiwiaXRlbSIsInJldCIsIm5hbWUiLCJyZXBsYWNlbWVudEF0dHJpYnV0ZXMiLCIkbmV3RWxlbWVudCIsIiRoaWRkZW5JbnB1dCIsInByZXYiLCJhcHBlbmQiLCJtYWtlU3RhdGVPcHRpb25hbCIsImluc2VydFN0YXRlSGlkZGVuRmllbGQiLCJhZGRPcHRpb25zIiwic3RhdGVzQXJyYXkiLCIkc2VsZWN0RWxlbWVudCIsImNvbnRhaW5lciIsInByZWZpeCIsInN0YXRlcyIsInN0YXRlT2JqIiwiY2FsbGJhY2siLCJjb3VudHJ5TmFtZSIsImdldEJ5TmFtZSIsInNob3dBbGVydE1vZGFsIiwic3RhdGVfZXJyb3IiLCIkY3VycmVudElucHV0IiwibmV3RWxlbWVudCIsIlRSQU5TTEFUSU9OUyIsImlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkiLCJkaWN0aW9uYXJ5IiwiT2JqZWN0Iiwia2V5cyIsImNob29zZUFjdGl2ZURpY3Rpb25hcnkiLCJpIiwiSlNPTiIsInBhcnNlIiwidmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIiwiYWN0aXZlRGljdGlvbmFyeSIsImxvY2FsaXphdGlvbnMiLCJ2YWx1ZXMiLCJ0cmFuc2xhdGlvbktleXMiLCJrZXkiLCJwb3AiLCJyZWR1Y2UiLCJhY2MiLCJDYXJ0UGFnZVVwc2VsbFByb2R1Y3QiLCJpbml0UmFkaW9BdHRyaWJ1dGVzIiwiJHByb2R1Y3RJZCIsInVwZGF0ZU9wdGlvblZpZXciLCJhZGRSZXF1aXJlZENsYXNzdG9PcHRpb25zIiwidG9BcnJheSIsImZvckVhY2giLCJvcHRpb24iLCJwcm9kdWN0T3B0aW9uc0NoYW5nZWQiLCIkY2hhbmdlZE9wdGlvbiIsInRhcmdldCIsIm9wdGlvblJvdyIsInBhcmVudHMiLCJGb3JtRGF0YSIsInVuZGVmaW5lZCIsInNpYmxpbmdzIiwiJHNlbGVjdGVkT3B0aW9uIiwiaW5kZXhPZiIsIm90aGVyU2VsZWN0ZWREYXRlRmllbGRzIiwiY291bnQiLCJjaGVja09wdGlvbnNTZWxlY3RlZCIsInVwZGF0ZVZpZXciLCJudW1iZXJSZXF1aXJlZE9wdGlvbnMiLCJudW1iZXJTZWxlY3RlZE9wdGlvbnMiLCJ1cGRhdGVQcmljZVZpZXciLCJwcmljZSIsIndpdGhvdXRfdGF4IiwiZm9ybWF0dGVkIiwiaW1hZ2VFbCIsImltYWdlIiwiaW1hZ2VTcmMiLCJvcHRpb25NZXNzYWdlIiwic3RvY2tfbWVzc2FnZSIsImJlaGF2aW9yIiwib3V0X29mX3N0b2NrX2JlaGF2aW9yIiwiaW5TdG9ja0lkcyIsImluX3N0b2NrX2F0dHJpYnV0ZXMiLCJvdXRPZlN0b2NrTWVzc2FnZSIsIm91dF9vZl9zdG9ja19tZXNzYWdlIiwiYXR0cmlidXRlIiwiJGF0dHJpYnV0ZSIsImF0dHJJZCIsImVuYWJsZUF0dHJpYnV0ZSIsImRpc2FibGVBdHRyaWJ1dGUiLCJnZXRBdHRyaWJ1dGVUeXBlIiwiZGlzYWJsZVNlbGVjdE9wdGlvbkF0dHJpYnV0ZSIsInBhcmVudCIsInRvZ2dsZU9wdGlvbiIsImVuYWJsZVNlbGVjdE9wdGlvbkF0dHJpYnV0ZSIsIiRwYXJlbnQiLCJjbG9zZXN0IiwicmFkaW8iLCIkcmFkaW8iLCJjbGljayIsIm1ha2VPcHRpb25JZHNVbmlxdWUiLCJWRVJTSU9OIiwiY29uc29sZSIsImxvZyIsIm1vZGUiLCJlcnJvckRlZmF1bHQiLCJzaG93TW9iaWxlSW5DYXJvdXNlbCIsInByb2R1Y3RMaW1pdCIsImxvYWRpbmciLCJwcm9kdWN0IiwiZ2V0QnlJZCIsImJpbmQiLCJnZXRQYWdlIiwicmVtb3ZlRHVwbGljYXRlVGFyZ2V0cyIsInVwc2VsbFRhcmdldHMiLCJTZXQiLCJyZW1vdmVDYXJ0SXRlbVRhcmdldHMiLCJjYXJ0SXRlbURhdGEiLCJjYXJ0SXRlbSIsInByb2R1Y3R1cmwiLCJvcmlnaW4iLCJ0b1N0cmluZyIsInVwc2VsbEl0ZW1zIiwidXBzZWxsaXRlbSIsImdldFJhbmRvbUludCIsIm1heCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImxvYWRBdXRvVGFyZ2V0cyIsIml0ZW1JbmRleCIsImVxIiwic3RvcmVkRGF0YSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJsb2FkVXBzZWxsVGFyZ2V0cyIsIm9wdHMiLCJjb25maWciLCJyZWxhdGVkX3Byb2R1Y3RzIiwibGltaXQiLCJzaW1pbGFyX2J5X3ZpZXdzIiwicmVzIiwidGFyZ2V0cyIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJsb2FkQ3VzdG9tRmllbGRUYXJnZXRzIiwidXBzZWxsSXRlbSIsImxvYWRDU1ZUYXJnZXRzIiwiY3B1SFRNTHRleHQiLCJzZXNzaW9uU3RvcmFnZSIsImNwdUhUTUwiLCJ1cHNlbGxTdWl0ZUNQVSIsInBhcnNlQXJyYXlGcm9tU3RyaW5nIiwicmVtYWluaW5nU2xvdHMiLCJnZXRBZGRpdGlvbmFsUHJvZHVjdHMiLCJwcm9kdWN0X2lkIiwiZXJyb3IiLCJhcHBseVVwc2VsbEhhbmRsZXJzIiwiYWRkVG9DYXJ0Iiwic2xpZGVEb3duIiwidG9nZ2xlT3B0aW9ucyIsImZvcm0iLCJpdGVtQWRkIiwidG1wIiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImVycm9yT2Zmc2V0Iiwib2Zmc2V0IiwidG9wIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsInRleHRDb250ZW50Iiwic3luY0Zvcm1PcHRpb24iLCJvcHQiLCJ0YXJnZXRJZCIsImFkZFRvQ2FydEZyb21Nb2RhbCIsIm1vZGFsQ29udGVudCIsIm9uQ2xvc2UiLCJjbG9zZSIsInNob3dPcHRpb25zIiwiZSIsIm9wdGlvbk1hcmt1cCIsImN1c3RvbUNsYXNzIiwic2hvd0Nsb3NlQnV0dG9uIiwic2hvd0NvbmZpcm1CdXR0b24iLCJvbk9wZW4iLCJvcHRpb25IYW5kbGVycyIsInRoaXNJRCIsImRpc3BsYXlJbkNhcm91c2VsIiwic2xpY2UiLCJydW5RdWV1ZUluT3JkZXIiLCJzaGlmdCIsInJlcXVlc3RNZXRob2QiLCJmb3JtYXRDYXJvdXNlbCIsIm1lZGlhTWF0Y2giLCJtZWRpYVF1ZXJ5TGlzdEZhY3RvcnkiLCJiaW5kVG9XaW5kb3ciLCJtYXRjaGVzIiwic2xpY2siLCIkc3VtbWFyeUNvbnRhaW5lciIsIiRmbG9hdGluZ0J1dHRvbiIsIm1xIiwiV2lkdGhDaGFuZ2UiLCJmYWRlVGltaW5nIiwiaW5pdFdpbmRvd1Bvc2l0aW9uIiwic2Nyb2xsWSIsImlubmVySGVpZ2h0IiwiYm90dG9tV2luZG93UG9zaXRpb24iLCJmYWRlSW4iLCJmYWRlT3V0IiwiYWRkTGlzdGVuZXIiLCJnb1RvQ2hlY2tvdXQiLCJ0b3RhbHNPZmZzZXQiLCJocmVmIiwic2NvcGUiLCJlbCIsIm9wdGlvbklkIiwibmV4dCIsIm9wdGlvbnNXaXRoTGFiZWxBdHRycyIsIm9wdGlvbnNXaXRoTGFiZWxBdHRyc1NlbGVjdG9ycyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXlDO0FBRThCO0FBQ1M7QUFDakM7QUFDVztBQUNDO0FBQ25CO0FBQ2lCO0FBRUs7QUFDUDtBQUFBLElBRWxDQSxJQUFJO0VBQUE7RUFBQTtJQUFBO0VBQUE7RUFBQTtFQUFBLE9BQ3JCQyxPQUFPLEdBQVAsbUJBQVU7SUFDTixJQUFJLENBQUNDLE1BQU0sR0FBRyxJQUFJO0lBQ2xCLElBQUksQ0FBQ0MsZ0JBQWdCLEdBQUdDLENBQUMsQ0FBQyxhQUFhLENBQUM7SUFDeEMsSUFBSSxDQUFDQyxZQUFZLEdBQUdELENBQUMsQ0FBQyxxQkFBcUIsQ0FBQztJQUM1QyxJQUFJLENBQUNFLGFBQWEsR0FBR0YsQ0FBQyxDQUFDLG9CQUFvQixDQUFDO0lBQzVDLElBQUksQ0FBQ0csV0FBVyxHQUFHSCxDQUFDLENBQUMsb0JBQW9CLENBQUM7SUFDMUMsSUFBSSxDQUFDSSwyQkFBMkIsR0FBR0osQ0FBQyxDQUFDLHlDQUF5QyxDQUFDO0lBQy9FLElBQUksQ0FBQ0ssUUFBUSxHQUFHTCxDQUFDLENBQUMsNkJBQTZCLENBQUMsQ0FDM0NNLElBQUksRUFBRSxDQUFDLENBQUM7SUFDYixJQUFJLENB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LENBQUNoVSxJQUFJLENBQUMsS0FBSyxFQUFLbUosR0FBRyxTQUFJOEssUUFBUSxTQUFJL2EsU0FBUyxDQUFHLENBQUMsQ0FBQztJQUN0RDNELENBQUMsQ0FBQ3llLEVBQUUsQ0FBQyxDQUFDRSxJQUFJLEVBQUUsQ0FBQ2xVLElBQUksQ0FBQyxJQUFJLEVBQUttSixHQUFHLFNBQUk4SyxRQUFRLFNBQUkvYSxTQUFTLENBQUcsQ0FBQyxDQUFDO0VBQ2hFLENBQUMsQ0FBQztBQUNOLENBQUM7O0FBRWMyVCxrRkFBbUIsRSIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuMTAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi9wYWdlLW1hbmFnZXInO1xuaW1wb3J0IHsgYmluZCwgZGVib3VuY2UgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGNoZWNrSXNHaWZ0Q2VydFZhbGlkIGZyb20gJy4vY29tbW9uL2dpZnQtY2VydGlmaWNhdGUtdmFsaWRhdG9yJztcbmltcG9ydCB7IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSB9IGZyb20gJy4vY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IFNoaXBwaW5nRXN0aW1hdG9yIGZyb20gJy4vY2FydC9zaGlwcGluZy1lc3RpbWF0b3InO1xuaW1wb3J0IHsgZGVmYXVsdE1vZGFsLCBNb2RhbEV2ZW50cyB9IGZyb20gJy4vZ2xvYmFsL21vZGFsJztcbmltcG9ydCBzd2FsIGZyb20gJy4vZ2xvYmFsL3N3ZWV0LWFsZXJ0JztcbmltcG9ydCBDYXJ0SXRlbURldGFpbHMgZnJvbSAnLi9jb21tb24vY2FydC1pdGVtLWRldGFpbHMnO1xuXG5pbXBvcnQgeyBmbG9hdGluZ0NoZWNrb3V0QnV0dG9uIH0gZnJvbSAnLi9jdXN0b20vY3VzdG9tLWNhcnQnO1xuaW1wb3J0IENhcnRQYWdlVXBzZWxsIGZyb20gJy4vY3VzdG9tL2NhcnQtcGFnZS11cHNlbGwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJ0IGV4dGVuZHMgUGFnZU1hbmFnZXIge1xuICAgIG9uUmVhZHkoKSB7XG4gICAgICAgIHRoaXMuJG1vZGFsID0gbnVsbDtcbiAgICAgICAgdGhpcy4kY2FydFBhZ2VDb250ZW50ID0gJCgnW2RhdGEtY2FydF0nKTtcbiAgICAgICAgdGhpcy4kY2FydENvbnRlbnQgPSAkKCdbZGF0YS1jYXJ0LWNvbnRlbnRdJyk7XG4gICAgICAgIHRoaXMuJGNhcnRNZXNzYWdlcyA9ICQoJ1tkYXRhLWNhcnQtc3RhdHVzXScpO1xuICAgICAgICB0aGlzLiRjYXJ0VG90YWxzID0gJCgnW2RhdGEtY2FydC10b3RhbHNdJyk7XG4gICAgICAgIHRoaXMuJGNhcnRBZGRpdGlvbmFsQ2hlY2tvdXRCdG5zID0gJCgnW2RhdGEtY2FydC1hZGRpdGlvbmFsLWNoZWNrb3V0LWJ1dHRvbnNdJyk7XG4gICAgICAgIHRoaXMuJG92ZXJsYXkgPSAkKCdbZGF0YS1jYXJ0XSAubG9hZGluZ092ZXJsYXknKVxuICAgICAgICAgICAgLmhpZGUoKTsgLy8gVE9ETzogdGVtcG9yYXJ5IHVudGlsIHJvcGVyIHB1bGxzIGluIGhpcyBjYXJ0IGNvbXBvbmVudHNcbiAgICAgICAgdGhpcy4kYWN0aXZlQ2FydEl0ZW1JZCA9IG51bGw7XG4gICAgICAgIHRoaXMuJGFjdGl2ZUNhcnRJdGVtQnRuQWN0aW9uID0gbnVsbDtcblxuICAgICAgICB0aGlzLmN1c3RvbUNhcnQgPSB0aGlzLmNvbnRleHQuaXRzQ29uZmlnLmN1c3RvbV9jYXJ0O1xuXG4gICAgICAgIGlmICh0aGlzLmN1c3RvbUNhcnQpIHtcbiAgICAgICAgICAgIGZsb2F0aW5nQ2hlY2tvdXRCdXR0b24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FydFBhZ2VVcHNlbGwgPSBuZXcgQ2FydFBhZ2VVcHNlbGwodGhpcy5jb250ZXh0KTtcblxuICAgICAgICB0aGlzLnNldEFwcGxlUGF5U3VwcG9ydCgpO1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB9XG5cbiAgICBzZXRBcHBsZVBheVN1cHBvcnQoKSB7XG4gICAgICAgIGlmICh3aW5kb3cuQXBwbGVQYXlTZXNzaW9uKSB7XG4gICAgICAgICAgICB0aGlzLiRjYXJ0UGFnZUNvbnRlbnQuYWRkQ2xhc3MoJ2FwcGxlLXBheS1zdXBwb3J0ZWQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhcnRVcGRhdGUoJHRhcmdldCkge1xuICAgICAgICBjb25zdCBpdGVtSWQgPSAkdGFyZ2V0LmRhdGEoJ2NhcnRJdGVtaWQnKTtcbiAgICAgICAgdGhpcy4kYWN0aXZlQ2FydEl0ZW1JZCA9IGl0ZW1JZDtcbiAgICAgICAgdGhpcy4kYWN0aXZlQ2FydEl0ZW1CdG5BY3Rpb24gPSAkdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xuXG4gICAgICAgIGNvbnN0ICRlbCA9ICQoYCNxdHktJHtpdGVtSWR9YCk7XG4gICAgICAgIGNvbnN0IG9sZFF0eSA9IHBhcnNlSW50KCRlbC52YWwoKSwgMTApO1xuICAgICAgICBjb25zdCBtYXhRdHkgPSBwYXJzZUludCgkZWwuZGF0YSgncXVhbnRpdHlNYXgnKSwgMTApO1xuICAgICAgICBjb25zdCBtaW5RdHkgPSBwYXJzZUludCgkZWwuZGF0YSgncXVhbnRpdHlNaW4nKSwgMTApO1xuICAgICAgICBjb25zdCBtaW5FcnJvciA9ICRlbC5kYXRhKCdxdWFudGl0eU1pbkVycm9yJyk7XG4gICAgICAgIGNvbnN0IG1heEVycm9yID0gJGVsLmRhdGEoJ3F1YW50aXR5TWF4RXJyb3InKTtcbiAgICAgICAgY29uc3QgbmV3UXR5ID0gJHRhcmdldC5kYXRhKCdhY3Rpb24nKSA9PT0gJ2luYycgPyBvbGRRdHkgKyAxIDogb2xkUXR5IC0gMTtcbiAgICAgICAgLy8gRG9lcyBub3QgcXVhbGl0eSBmb3IgbWluL21heCBxdWFudGl0eVxuICAgICAgICBpZiAobmV3UXR5IDwgbWluUXR5KSB7XG4gICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBtaW5FcnJvcixcbiAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAobWF4UXR5ID4gMCAmJiBuZXdRdHkgPiBtYXhRdHkpIHtcbiAgICAgICAgICAgIHJldHVybiBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgIHRleHQ6IG1heEVycm9yLFxuICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuJG92ZXJsYXkuc2hvdygpO1xuXG4gICAgICAgIHV0aWxzLmFwaS5jYXJ0Lml0ZW1VcGRhdGUoaXRlbUlkLCBuZXdRdHksIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRvdmVybGF5LmhpZGUoKTtcblxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09PSAnc3VjY2VlZCcpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcXVhbnRpdHkgaXMgY2hhbmdlZCBcIjFcIiBmcm9tIFwiMFwiLCB3ZSBoYXZlIHRvIHJlbW92ZSB0aGUgcm93LlxuICAgICAgICAgICAgICAgIGNvbnN0IHJlbW92ZSA9IChuZXdRdHkgPT09IDApO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudChyZW1vdmUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkZWwudmFsKG9sZFF0eSk7XG4gICAgICAgICAgICAgICAgc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogcmVzcG9uc2UuZGF0YS5lcnJvcnMuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlKCR0YXJnZXQsIHByZVZhbCA9IG51bGwpIHtcbiAgICAgICAgY29uc3QgaXRlbUlkID0gJHRhcmdldC5kYXRhKCdjYXJ0SXRlbWlkJyk7XG4gICAgICAgIGNvbnN0ICRlbCA9ICQoYCNxdHktJHtpdGVtSWR9YCk7XG4gICAgICAgIGNvbnN0IG1heFF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1heCcpLCAxMCk7XG4gICAgICAgIGNvbnN0IG1pblF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1pbicpLCAxMCk7XG4gICAgICAgIGNvbnN0IG9sZFF0eSA9IHByZVZhbCAhPT0gbnVsbCA/IHByZVZhbCA6IG1pblF0eTtcbiAgICAgICAgY29uc3QgbWluRXJyb3IgPSAkZWwuZGF0YSgncXVhbnRpdHlNaW5FcnJvcicpO1xuICAgICAgICBjb25zdCBtYXhFcnJvciA9ICRlbC5kYXRhKCdxdWFudGl0eU1heEVycm9yJyk7XG4gICAgICAgIGNvbnN0IG5ld1F0eSA9IHBhcnNlSW50KE51bWJlcigkZWwudmFsKCkpLCAxMCk7XG4gICAgICAgIGxldCBpbnZhbGlkRW50cnk7XG5cbiAgICAgICAgLy8gRG9lcyBub3QgcXVhbGl0eSBmb3IgbWluL21heCBxdWFudGl0eVxuICAgICAgICBpZiAoIW5ld1F0eSkge1xuICAgICAgICAgICAgaW52YWxpZEVudHJ5ID0gJGVsLnZhbCgpO1xuICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xuICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgdGV4dDogdGhpcy5jb250ZXh0LmludmFsaWRFbnRyeU1lc3NhZ2UucmVwbGFjZSgnW0VOVFJZXScsIGludmFsaWRFbnRyeSksXG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKG5ld1F0eSA8IG1pblF0eSkge1xuICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xuICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgdGV4dDogbWluRXJyb3IsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKG1heFF0eSA+IDAgJiYgbmV3UXR5ID4gbWF4UXR5KSB7XG4gICAgICAgICAgICAkZWwudmFsKG9sZFF0eSk7XG4gICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBtYXhFcnJvcixcbiAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coKTtcbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuaXRlbVVwZGF0ZShpdGVtSWQsIG5ld1F0eSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJG92ZXJsYXkuaGlkZSgpO1xuXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT09ICdzdWNjZWVkJykge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBxdWFudGl0eSBpcyBjaGFuZ2VkIFwiMVwiIGZyb20gXCIwXCIsIHdlIGhhdmUgdG8gcmVtb3ZlIHRoZSByb3cuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlID0gKG5ld1F0eSA9PT0gMCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KHJlbW92ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcbiAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiByZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FydFJlbW92ZUl0ZW0oaXRlbUlkKSB7XG4gICAgICAgIHRoaXMuJG92ZXJsYXkuc2hvdygpO1xuICAgICAgICB1dGlscy5hcGkuY2FydC5pdGVtUmVtb3ZlKGl0ZW1JZCwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2NlZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudCh0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogcmVzcG9uc2UuZGF0YS5lcnJvcnMuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhcnRFZGl0T3B0aW9ucyhpdGVtSWQsIHByb2R1Y3RJZCkge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0geyBwcm9kdWN0Rm9yQ2hhbmdlSWQ6IHByb2R1Y3RJZCwgLi4udGhpcy5jb250ZXh0IH07XG4gICAgICAgIGNvbnN0IG1vZGFsID0gZGVmYXVsdE1vZGFsKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuJG1vZGFsID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLiRtb2RhbCA9ICQoJyNtb2RhbCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnY2FydC9tb2RhbHMvY29uZmlndXJlLXByb2R1Y3QnLFxuICAgICAgICB9O1xuXG4gICAgICAgIG1vZGFsLm9wZW4oKTtcbiAgICAgICAgdGhpcy4kbW9kYWwuZmluZCgnLm1vZGFsLWNvbnRlbnQnKS5hZGRDbGFzcygnaGlkZS1jb250ZW50Jyk7XG5cbiAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3RBdHRyaWJ1dGVzLmNvbmZpZ3VyZUluQ2FydChpdGVtSWQsIG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBtb2RhbC51cGRhdGVDb250ZW50KHJlc3BvbnNlLmNvbnRlbnQpO1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uQ2hhbmdlSGFuZGxlciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCAkcHJvZHVjdE9wdGlvbnNDb250YWluZXIgPSAkKCdbZGF0YS1wcm9kdWN0LWF0dHJpYnV0ZXMtd3JhcHBlcl0nLCB0aGlzLiRtb2RhbCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbW9kYWxCb2R5UmVzZXJ2ZWRIZWlnaHQgPSAkcHJvZHVjdE9wdGlvbnNDb250YWluZXIub3V0ZXJIZWlnaHQoKTtcblxuICAgICAgICAgICAgICAgIGlmICgkcHJvZHVjdE9wdGlvbnNDb250YWluZXIubGVuZ3RoICYmIG1vZGFsQm9keVJlc2VydmVkSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICRwcm9kdWN0T3B0aW9uc0NvbnRhaW5lci5jc3MoJ2hlaWdodCcsIG1vZGFsQm9keVJlc2VydmVkSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAodGhpcy4kbW9kYWwuaGFzQ2xhc3MoJ29wZW4nKSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbkNoYW5nZUhhbmRsZXIoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbW9kYWwub25lKE1vZGFsRXZlbnRzLm9wZW5lZCwgb3B0aW9uQ2hhbmdlSGFuZGxlcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucHJvZHVjdERldGFpbHMgPSBuZXcgQ2FydEl0ZW1EZXRhaWxzKHRoaXMuJG1vZGFsLCBjb250ZXh0KTtcblxuICAgICAgICAgICAgdGhpcy5iaW5kR2lmdFdyYXBwaW5nRm9ybSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB1dGlscy5ob29rcy5vbigncHJvZHVjdC1vcHRpb24tY2hhbmdlJywgKGV2ZW50LCBjdXJyZW50VGFyZ2V0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkZm9ybSA9ICQoY3VycmVudFRhcmdldCkuZmluZCgnZm9ybScpO1xuICAgICAgICAgICAgY29uc3QgJHN1Ym1pdCA9ICQoJ2lucHV0LmJ1dHRvbicsICRmb3JtKTtcbiAgICAgICAgICAgIGNvbnN0ICRtZXNzYWdlQm94ID0gJCgnLmFsZXJ0TWVzc2FnZUJveCcpO1xuXG4gICAgICAgICAgICB1dGlscy5hcGkucHJvZHVjdEF0dHJpYnV0ZXMub3B0aW9uQ2hhbmdlKHByb2R1Y3RJZCwgJGZvcm0uc2VyaWFsaXplKCksIChlcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXN1bHQuZGF0YSB8fCB7fTtcblxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGVycixcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEucHVyY2hhc2luZ19tZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJ3AuYWxlcnRCb3gtbWVzc2FnZScsICRtZXNzYWdlQm94KS50ZXh0KGRhdGEucHVyY2hhc2luZ19tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgJHN1Ym1pdC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAkbWVzc2FnZUJveC5zaG93KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJHN1Ym1pdC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgJG1lc3NhZ2VCb3guaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghZGF0YS5wdXJjaGFzYWJsZSB8fCAhZGF0YS5pbnN0b2NrKSB7XG4gICAgICAgICAgICAgICAgICAgICRzdWJtaXQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkc3VibWl0LnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZWZyZXNoQ29udGVudChyZW1vdmUpIHtcbiAgICAgICAgY29uc3QgJGNhcnRJdGVtc1Jvd3MgPSAkKCdbZGF0YS1pdGVtLXJvd10nLCB0aGlzLiRjYXJ0Q29udGVudCk7XG4gICAgICAgIGNvbnN0ICRjYXJ0UGFnZVRpdGxlID0gJCgnW2RhdGEtY2FydC1wYWdlLXRpdGxlXScpO1xuXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMuY3VzdG9tQ2FydCA/ICdjdXN0b20vY2FydC9jb250ZW50JyA6ICdjYXJ0L2NvbnRlbnQnLFxuICAgICAgICAgICAgICAgIHRvdGFsczogdGhpcy5jdXN0b21DYXJ0ID8gJ2N1c3RvbS9jYXJ0L3RvdGFscycgOiAnY2FydC90b3RhbHMnLFxuICAgICAgICAgICAgICAgIHBhZ2VUaXRsZTogJ2NhcnQvcGFnZS10aXRsZScsXG4gICAgICAgICAgICAgICAgc3RhdHVzTWVzc2FnZXM6ICdjYXJ0L3N0YXR1cy1tZXNzYWdlcycsXG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbENoZWNrb3V0QnV0dG9uczogJ2NhcnQvYWRkaXRpb25hbC1jaGVja291dC1idXR0b25zJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy4kb3ZlcmxheS5zaG93KCk7XG5cbiAgICAgICAgLy8gUmVtb3ZlIGxhc3QgaXRlbSBmcm9tIGNhcnQ/IFJlbG9hZFxuICAgICAgICBpZiAocmVtb3ZlICYmICRjYXJ0SXRlbXNSb3dzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHV0aWxzLmFwaS5jYXJ0LmdldENvbnRlbnQob3B0aW9ucywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJGNhcnRDb250ZW50Lmh0bWwocmVzcG9uc2UuY29udGVudCk7XG4gICAgICAgICAgICB0aGlzLiRjYXJ0VG90YWxzLmh0bWwocmVzcG9uc2UudG90YWxzKTtcbiAgICAgICAgICAgIHRoaXMuJGNhcnRNZXNzYWdlcy5odG1sKHJlc3BvbnNlLnN0YXR1c01lc3NhZ2VzKTtcbiAgICAgICAgICAgIHRoaXMuJGNhcnRBZGRpdGlvbmFsQ2hlY2tvdXRCdG5zLmh0bWwocmVzcG9uc2UuYWRkaXRpb25hbENoZWNrb3V0QnV0dG9ucyk7XG5cbiAgICAgICAgICAgICRjYXJ0UGFnZVRpdGxlLnJlcGxhY2VXaXRoKHJlc3BvbnNlLnBhZ2VUaXRsZSk7XG4gICAgICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICAgICAgICAgIHRoaXMuJG92ZXJsYXkuaGlkZSgpO1xuXG4gICAgICAgICAgICBjb25zdCBxdWFudGl0eSA9ICQoJ1tkYXRhLWNhcnQtcXVhbnRpdHldJywgdGhpcy4kY2FydENvbnRlbnQpLmRhdGEoJ2NhcnRRdWFudGl0eScpIHx8IDA7XG5cbiAgICAgICAgICAgICQoJ2JvZHknKS50cmlnZ2VyKCdjYXJ0LXF1YW50aXR5LXVwZGF0ZScsIHF1YW50aXR5KTtcblxuICAgICAgICAgICAgJChgW2RhdGEtY2FydC1pdGVtaWQ9JyR7dGhpcy4kYWN0aXZlQ2FydEl0ZW1JZH0nXWAsIHRoaXMuJGNhcnRDb250ZW50KVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoYFtkYXRhLWFjdGlvbj0nJHt0aGlzLiRhY3RpdmVDYXJ0SXRlbUJ0bkFjdGlvbn0nXWApXG4gICAgICAgICAgICAgICAgLnRyaWdnZXIoJ2ZvY3VzJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRDYXJ0RXZlbnRzKCkge1xuICAgICAgICBjb25zdCBkZWJvdW5jZVRpbWVvdXQgPSA0MDA7XG4gICAgICAgIGNvbnN0IGNhcnRVcGRhdGUgPSBiaW5kKGRlYm91bmNlKHRoaXMuY2FydFVwZGF0ZSwgZGVib3VuY2VUaW1lb3V0KSwgdGhpcyk7XG4gICAgICAgIGNvbnN0IGNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlID0gYmluZChkZWJvdW5jZSh0aGlzLmNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlLCBkZWJvdW5jZVRpbWVvdXQpLCB0aGlzKTtcbiAgICAgICAgY29uc3QgY2FydFJlbW92ZUl0ZW0gPSBiaW5kKGRlYm91bmNlKHRoaXMuY2FydFJlbW92ZUl0ZW0sIGRlYm91bmNlVGltZW91dCksIHRoaXMpO1xuICAgICAgICBsZXQgcHJlVmFsO1xuXG4gICAgICAgIC8vIGNhcnQgdXBkYXRlXG4gICAgICAgICQoJ1tkYXRhLWNhcnQtdXBkYXRlXScsIHRoaXMuJGNhcnRDb250ZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCAkdGFyZ2V0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIGNhcnQgcXVhbnRpdHlcbiAgICAgICAgICAgIGNhcnRVcGRhdGUoJHRhcmdldCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNhcnQgcXR5IG1hbnVhbGx5IHVwZGF0ZXNcbiAgICAgICAgJCgnLmNhcnQtaXRlbS1xdHktaW5wdXQnLCB0aGlzLiRjYXJ0Q29udGVudCkub24oJ2ZvY3VzJywgZnVuY3Rpb24gb25RdHlGb2N1cygpIHtcbiAgICAgICAgICAgIHByZVZhbCA9IHRoaXMudmFsdWU7XG4gICAgICAgIH0pLmNoYW5nZShldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCAkdGFyZ2V0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSBjYXJ0IHF1YW50aXR5XG4gICAgICAgICAgICBjYXJ0VXBkYXRlUXR5VGV4dENoYW5nZSgkdGFyZ2V0LCBwcmVWYWwpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuY2FydC1yZW1vdmUnLCB0aGlzLiRjYXJ0Q29udGVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbUlkID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdjYXJ0SXRlbWlkJyk7XG4gICAgICAgICAgICBjb25zdCBzdHJpbmcgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2NvbmZpcm1EZWxldGUnKTtcbiAgICAgICAgICAgIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgdGV4dDogc3RyaW5nLFxuICAgICAgICAgICAgICAgIGljb246ICd3YXJuaW5nJyxcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IHRoaXMuY29udGV4dC5jYW5jZWxCdXR0b25UZXh0LFxuICAgICAgICAgICAgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgaXRlbSBmcm9tIGNhcnRcbiAgICAgICAgICAgICAgICAgICAgY2FydFJlbW92ZUl0ZW0oaXRlbUlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ1tkYXRhLWl0ZW0tZWRpdF0nLCB0aGlzLiRjYXJ0Q29udGVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbUlkID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdpdGVtRWRpdCcpO1xuICAgICAgICAgICAgY29uc3QgcHJvZHVjdElkID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdwcm9kdWN0SWQnKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAvLyBlZGl0IGl0ZW0gaW4gY2FydFxuICAgICAgICAgICAgdGhpcy5jYXJ0RWRpdE9wdGlvbnMoaXRlbUlkLCBwcm9kdWN0SWQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kUHJvbW9Db2RlRXZlbnRzKCkge1xuICAgICAgICBjb25zdCAkY291cG9uQ29udGFpbmVyID0gJCgnLmNvdXBvbi1jb2RlJyk7XG4gICAgICAgIGNvbnN0ICRjb3Vwb25Gb3JtID0gJCgnLmNvdXBvbi1mb3JtJyk7XG4gICAgICAgIGNvbnN0ICRjb2RlSW5wdXQgPSAkKCdbbmFtZT1cImNvdXBvbmNvZGVcIl0nLCAkY291cG9uRm9ybSk7XG5cbiAgICAgICAgJCgnLmNvdXBvbi1jb2RlLWFkZCcpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICQoZXZlbnQuY3VycmVudFRhcmdldCkuaGlkZSgpO1xuICAgICAgICAgICAgJGNvdXBvbkNvbnRhaW5lci5zaG93KCk7XG4gICAgICAgICAgICAkKCcuY291cG9uLWNvZGUtY2FuY2VsJykuc2hvdygpO1xuICAgICAgICAgICAgJGNvZGVJbnB1dC50cmlnZ2VyKCdmb2N1cycpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuY291cG9uLWNvZGUtY2FuY2VsJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJGNvdXBvbkNvbnRhaW5lci5oaWRlKCk7XG4gICAgICAgICAgICAkKCcuY291cG9uLWNvZGUtY2FuY2VsJykuaGlkZSgpO1xuICAgICAgICAgICAgJCgnLmNvdXBvbi1jb2RlLWFkZCcpLnNob3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGNvdXBvbkZvcm0ub24oJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvZGUgPSAkY29kZUlucHV0LnZhbCgpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAvLyBFbXB0eSBjb2RlXG4gICAgICAgICAgICBpZiAoIWNvZGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJGNvZGVJbnB1dC5kYXRhKCdlcnJvcicpLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5hcHBseUNvZGUoY29kZSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHJlc3BvbnNlLmRhdGEuZXJyb3JzLmpvaW4oJ1xcbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRHaWZ0Q2VydGlmaWNhdGVFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0ICRjZXJ0Q29udGFpbmVyID0gJCgnLmdpZnQtY2VydGlmaWNhdGUtY29kZScpO1xuICAgICAgICBjb25zdCAkY2VydEZvcm0gPSAkKCcuY2FydC1naWZ0LWNlcnRpZmljYXRlLWZvcm0nKTtcbiAgICAgICAgY29uc3QgJGNlcnRJbnB1dCA9ICQoJ1tuYW1lPVwiY2VydGNvZGVcIl0nLCAkY2VydEZvcm0pO1xuXG4gICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWFkZCcpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnRvZ2dsZSgpO1xuICAgICAgICAgICAgJGNlcnRDb250YWluZXIudG9nZ2xlKCk7XG4gICAgICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1jYW5jZWwnKS50b2dnbGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmdpZnQtY2VydGlmaWNhdGUtY2FuY2VsJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICRjZXJ0Q29udGFpbmVyLnRvZ2dsZSgpO1xuICAgICAgICAgICAgJCgnLmdpZnQtY2VydGlmaWNhdGUtYWRkJykudG9nZ2xlKCk7XG4gICAgICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1jYW5jZWwnKS50b2dnbGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGNlcnRGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb2RlID0gJGNlcnRJbnB1dC52YWwoKTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgaWYgKCFjaGVja0lzR2lmdENlcnRWYWxpZChjb2RlKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb25EaWN0aW9uYXJ5ID0gY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5KHRoaXMuY29udGV4dCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHZhbGlkYXRpb25EaWN0aW9uYXJ5LmludmFsaWRfZ2lmdF9jZXJ0aWZpY2F0ZSxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuYXBwbHlHaWZ0Q2VydGlmaWNhdGUoY29kZSwgKGVyciwgcmVzcCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwLmRhdGEuc3RhdHVzID09PSAnc3VjY2VzcycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sOiByZXNwLmRhdGEuZXJyb3JzLmpvaW4oJ1xcbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRHaWZ0V3JhcHBpbmdFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0IG1vZGFsID0gZGVmYXVsdE1vZGFsKCk7XG5cbiAgICAgICAgJCgnW2RhdGEtaXRlbS1naWZ0d3JhcF0nKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtSWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2l0ZW1HaWZ0d3JhcCcpO1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogJ2NhcnQvbW9kYWxzL2dpZnQtd3JhcHBpbmctZm9ybScsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBtb2RhbC5vcGVuKCk7XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LmdldEl0ZW1HaWZ0V3JhcHBpbmdPcHRpb25zKGl0ZW1JZCwgb3B0aW9ucywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBtb2RhbC51cGRhdGVDb250ZW50KHJlc3BvbnNlLmNvbnRlbnQpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kR2lmdFdyYXBwaW5nRm9ybSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRHaWZ0V3JhcHBpbmdGb3JtKCkge1xuICAgICAgICAkKCcuZ2lmdFdyYXBwaW5nLXNlbGVjdCcpLm9uKCdjaGFuZ2UnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCAkc2VsZWN0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgICAgIGNvbnN0IGlkID0gJHNlbGVjdC52YWwoKTtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gJHNlbGVjdC5kYXRhKCdpbmRleCcpO1xuXG4gICAgICAgICAgICBpZiAoIWlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBhbGxvd01lc3NhZ2UgPSAkc2VsZWN0LmZpbmQoYG9wdGlvblt2YWx1ZT0ke2lkfV1gKS5kYXRhKCdhbGxvd01lc3NhZ2UnKTtcblxuICAgICAgICAgICAgJChgLmdpZnRXcmFwcGluZy1pbWFnZS0ke2luZGV4fWApLmhpZGUoKTtcbiAgICAgICAgICAgICQoYCNnaWZ0V3JhcHBpbmctaW1hZ2UtJHtpbmRleH0tJHtpZH1gKS5zaG93KCk7XG5cbiAgICAgICAgICAgIGlmIChhbGxvd01lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAkKGAjZ2lmdFdyYXBwaW5nLW1lc3NhZ2UtJHtpbmRleH1gKS5zaG93KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoYCNnaWZ0V3JhcHBpbmctbWVzc2FnZS0ke2luZGV4fWApLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmdpZnRXcmFwcGluZy1zZWxlY3QnKS50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICBmdW5jdGlvbiB0b2dnbGVWaWV3cygpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gJCgnaW5wdXQ6cmFkaW9bbmFtZSA9XCJnaWZ0d3JhcHR5cGVcIl06Y2hlY2tlZCcpLnZhbCgpO1xuICAgICAgICAgICAgY29uc3QgJHNpbmdsZUZvcm0gPSAkKCcuZ2lmdFdyYXBwaW5nLXNpbmdsZScpO1xuICAgICAgICAgICAgY29uc3QgJG11bHRpRm9ybSA9ICQoJy5naWZ0V3JhcHBpbmctbXVsdGlwbGUnKTtcblxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSAnc2FtZScpIHtcbiAgICAgICAgICAgICAgICAkc2luZ2xlRm9ybS5zaG93KCk7XG4gICAgICAgICAgICAgICAgJG11bHRpRm9ybS5oaWRlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRzaW5nbGVGb3JtLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAkbXVsdGlGb3JtLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICQoJ1tuYW1lPVwiZ2lmdHdyYXB0eXBlXCJdJykub24oJ2NsaWNrJywgdG9nZ2xlVmlld3MpO1xuXG4gICAgICAgIHRvZ2dsZVZpZXdzKCk7XG4gICAgfVxuXG4gICAgYmluZEV2ZW50cygpIHtcbiAgICAgICAgdGhpcy5iaW5kQ2FydEV2ZW50cygpO1xuICAgICAgICB0aGlzLmJpbmRQcm9tb0NvZGVFdmVudHMoKTtcbiAgICAgICAgdGhpcy5iaW5kR2lmdFdyYXBwaW5nRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuYmluZEdpZnRDZXJ0aWZpY2F0ZUV2ZW50cygpO1xuXG4gICAgICAgIC8vIGluaXRpYXRlIHNoaXBwaW5nIGVzdGltYXRvciBtb2R1bGVcbiAgICAgICAgY29uc3Qgc2hpcHBpbmdFcnJvck1lc3NhZ2VzID0ge1xuICAgICAgICAgICAgY291bnRyeTogdGhpcy5jb250ZXh0LnNoaXBwaW5nQ291bnRyeUVycm9yTWVzc2FnZSxcbiAgICAgICAgICAgIHByb3ZpbmNlOiB0aGlzLmNvbnRleHQuc2hpcHBpbmdQcm92aW5jZUVycm9yTWVzc2FnZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zaGlwcGluZ0VzdGltYXRvciA9IG5ldyBTaGlwcGluZ0VzdGltYXRvcigkKCdbZGF0YS1zaGlwcGluZy1lc3RpbWF0b3JdJyksIHNoaXBwaW5nRXJyb3JNZXNzYWdlcyk7XG5cbiAgICAgICAgLy8gcmVsb2FkIGNhcnQgY29udGVudCB3aGVuIGEgQ2FydCBQYWdlIFVwc2VsbCBpdGVtIGlzIGFkZGVkIHRvIHRoZSBjYXJ0XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjcHUtcmVmcmVzaC1jYXJ0LWNvbnRlbnQnLCAoKSA9PiB0aGlzLnJlZnJlc2hDb250ZW50KGZhbHNlKSk7XG5cbiAgICB9XG59XG4iLCJpbXBvcnQgc3RhdGVDb3VudHJ5IGZyb20gJy4uL2NvbW1vbi9zdGF0ZS1jb3VudHJ5JztcbmltcG9ydCBub2QgZnJvbSAnLi4vY29tbW9uL25vZCc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IHsgVmFsaWRhdG9ycywgYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSB9IGZyb20gJy4uL2NvbW1vbi91dGlscy9mb3JtLXV0aWxzJztcbmltcG9ydCBjb2xsYXBzaWJsZUZhY3RvcnkgZnJvbSAnLi4vY29tbW9uL2NvbGxhcHNpYmxlJztcbmltcG9ydCBzd2FsIGZyb20gJy4uL2dsb2JhbC9zd2VldC1hbGVydCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXBwaW5nRXN0aW1hdG9yIHtcbiAgICBjb25zdHJ1Y3RvcigkZWxlbWVudCwgc2hpcHBpbmdFcnJvck1lc3NhZ2VzKSB7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcblxuICAgICAgICB0aGlzLiRzdGF0ZSA9ICQoJ1tkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXScsIHRoaXMuJGVsZW1lbnQpO1xuICAgICAgICB0aGlzLmlzRXN0aW1hdG9yRm9ybU9wZW5lZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNoaXBwaW5nRXJyb3JNZXNzYWdlcyA9IHNoaXBwaW5nRXJyb3JNZXNzYWdlcztcbiAgICAgICAgdGhpcy5pbml0Rm9ybVZhbGlkYXRpb24oKTtcbiAgICAgICAgdGhpcy5iaW5kU3RhdGVDb3VudHJ5Q2hhbmdlKCk7XG4gICAgICAgIHRoaXMuYmluZEVzdGltYXRvckV2ZW50cygpO1xuICAgIH1cblxuICAgIGluaXRGb3JtVmFsaWRhdGlvbigpIHtcbiAgICAgICAgY29uc3Qgc2hpcHBpbmdFc3RpbWF0b3JBbGVydCA9ICQoJy5zaGlwcGluZy1xdW90ZXMnKTtcblxuICAgICAgICB0aGlzLnNoaXBwaW5nRXN0aW1hdG9yID0gJ2Zvcm1bZGF0YS1zaGlwcGluZy1lc3RpbWF0b3JdJztcbiAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvciA9IG5vZCh7XG4gICAgICAgICAgICBzdWJtaXQ6IGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IC5zaGlwcGluZy1lc3RpbWF0ZS1zdWJtaXRgLFxuICAgICAgICAgICAgdGFwOiBhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlLFxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuc2hpcHBpbmctZXN0aW1hdGUtc3VibWl0JywgdGhpcy4kZWxlbWVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgLy8gZXN0aW1hdG9yIGVycm9yIG1lc3NhZ2VzIGFyZSBiZWluZyBpbmplY3RlZCBpbiBodG1sIGFzIGEgcmVzdWx0XG4gICAgICAgICAgICAvLyBvZiB1c2VyIHN1Ym1pdDsgY2xlYXJpbmcgYW5kIGFkZGluZyByb2xlIG9uIHN1Ym1pdCBwcm92aWRlc1xuICAgICAgICAgICAgLy8gcmVndWxhciBhbm5vdW5jZW1lbnQgb2YgdGhlc2UgZXJyb3IgbWVzc2FnZXNcbiAgICAgICAgICAgIGlmIChzaGlwcGluZ0VzdGltYXRvckFsZXJ0LmF0dHIoJ3JvbGUnKSkge1xuICAgICAgICAgICAgICAgIHNoaXBwaW5nRXN0aW1hdG9yQWxlcnQucmVtb3ZlQXR0cigncm9sZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzaGlwcGluZ0VzdGltYXRvckFsZXJ0LmF0dHIoJ3JvbGUnLCAnYWxlcnQnKTtcbiAgICAgICAgICAgIC8vIFdoZW4gc3dpdGNoaW5nIGJldHdlZW4gY291bnRyaWVzLCB0aGUgc3RhdGUvcmVnaW9uIGlzIGR5bmFtaWNcbiAgICAgICAgICAgIC8vIE9ubHkgcGVyZm9ybSBhIGNoZWNrIGZvciBhbGwgZmllbGRzIHdoZW4gY291bnRyeSBoYXMgYSB2YWx1ZVxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIGFyZUFsbCgndmFsaWQnKSB3aWxsIGNoZWNrIGNvdW50cnkgZm9yIHZhbGlkaXR5XG4gICAgICAgICAgICBpZiAoJChgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSBzZWxlY3RbbmFtZT1cInNoaXBwaW5nLWNvdW50cnlcIl1gKS52YWwoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLmFyZUFsbCgndmFsaWQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5iaW5kVmFsaWRhdGlvbigpO1xuICAgICAgICB0aGlzLmJpbmRTdGF0ZVZhbGlkYXRpb24oKTtcbiAgICAgICAgdGhpcy5iaW5kVVBTUmF0ZXMoKTtcbiAgICB9XG5cbiAgICBiaW5kVmFsaWRhdGlvbigpIHtcbiAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5hZGQoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSBzZWxlY3RbbmFtZT1cInNoaXBwaW5nLWNvdW50cnlcIl1gLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb3VudHJ5SWQgPSBOdW1iZXIodmFsKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gY291bnRyeUlkICE9PSAwICYmICFOdW1iZXIuaXNOYU4oY291bnRyeUlkKTtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLnNoaXBwaW5nRXJyb3JNZXNzYWdlcy5jb3VudHJ5LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgYmluZFN0YXRlVmFsaWRhdGlvbigpIHtcbiAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5hZGQoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAkKGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IHNlbGVjdFtuYW1lPVwic2hpcHBpbmctc3RhdGVcIl1gKSxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgJGVsZSA9ICQoYCR7dGhpcy5zaGlwcGluZ0VzdGltYXRvcn0gc2VsZWN0W25hbWU9XCJzaGlwcGluZy1zdGF0ZVwiXWApO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICgkZWxlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlVmFsID0gJGVsZS52YWwoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZWxlVmFsICYmIGVsZVZhbC5sZW5ndGggJiYgZWxlVmFsICE9PSAnU3RhdGUvcHJvdmluY2UnO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5zaGlwcGluZ0Vycm9yTWVzc2FnZXMucHJvdmluY2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGUgYmV0d2VlbiBkZWZhdWx0IHNoaXBwaW5nIGFuZCB1cHMgc2hpcHBpbmcgcmF0ZXNcbiAgICAgKi9cbiAgICBiaW5kVVBTUmF0ZXMoKSB7XG4gICAgICAgIGNvbnN0IFVQU1JhdGVUb2dnbGUgPSAnLmVzdGltYXRvci1mb3JtLXRvZ2dsZVVQU1JhdGUnO1xuXG4gICAgICAgICQoJ2JvZHknKS5vbignY2xpY2snLCBVUFNSYXRlVG9nZ2xlLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRlc3RpbWF0b3JGb3JtVXBzID0gJCgnLmVzdGltYXRvci1mb3JtLS11cHMnKTtcbiAgICAgICAgICAgIGNvbnN0ICRlc3RpbWF0b3JGb3JtRGVmYXVsdCA9ICQoJy5lc3RpbWF0b3ItZm9ybS0tZGVmYXVsdCcpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkZXN0aW1hdG9yRm9ybVVwcy50b2dnbGVDbGFzcygndS1oaWRkZW5WaXN1YWxseScpO1xuICAgICAgICAgICAgJGVzdGltYXRvckZvcm1EZWZhdWx0LnRvZ2dsZUNsYXNzKCd1LWhpZGRlblZpc3VhbGx5Jyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRTdGF0ZUNvdW50cnlDaGFuZ2UoKSB7XG4gICAgICAgIGxldCAkbGFzdDtcblxuICAgICAgICAvLyBSZXF1ZXN0cyB0aGUgc3RhdGVzIGZvciBhIGNvdW50cnkgd2l0aCBBSkFYXG4gICAgICAgIHN0YXRlQ291bnRyeSh0aGlzLiRzdGF0ZSwgdGhpcy5jb250ZXh0LCB7IHVzZUlkRm9yU3RhdGVzOiB0cnVlIH0sIChlcnIsIGZpZWxkKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogZXJyLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0ICRmaWVsZCA9ICQoZmllbGQpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5nZXRTdGF0dXModGhpcy4kc3RhdGUpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IucmVtb3ZlKHRoaXMuJHN0YXRlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCRsYXN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5yZW1vdmUoJGxhc3QpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJGZpZWxkLmlzKCdzZWxlY3QnKSkge1xuICAgICAgICAgICAgICAgICRsYXN0ID0gZmllbGQ7XG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kU3RhdGVWYWxpZGF0aW9uKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRmaWVsZC5hdHRyKCdwbGFjZWhvbGRlcicsICdTdGF0ZS9wcm92aW5jZScpO1xuICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMuY2xlYW5VcFN0YXRlVmFsaWRhdGlvbihmaWVsZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFdoZW4geW91IGNoYW5nZSBhIGNvdW50cnksIHlvdSBzd2FwIHRoZSBzdGF0ZS9wcm92aW5jZSBiZXR3ZWVuIGFuIGlucHV0IGFuZCBhIHNlbGVjdCBkcm9wZG93blxuICAgICAgICAgICAgLy8gTm90IGFsbCBjb3VudHJpZXMgcmVxdWlyZSB0aGUgcHJvdmluY2UgdG8gYmUgZmlsbGVkXG4gICAgICAgICAgICAvLyBXZSBoYXZlIHRvIHJlbW92ZSB0aGlzIGNsYXNzIHdoZW4gd2Ugc3dhcCBzaW5jZSBub2QgdmFsaWRhdGlvbiBkb2Vzbid0IGNsZWFudXAgZm9yIHVzXG4gICAgICAgICAgICAkKHRoaXMuc2hpcHBpbmdFc3RpbWF0b3IpLmZpbmQoJy5mb3JtLWZpZWxkLS1zdWNjZXNzJykucmVtb3ZlQ2xhc3MoJ2Zvcm0tZmllbGQtLXN1Y2Nlc3MnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdG9nZ2xlRXN0aW1hdG9yRm9ybVN0YXRlKHRvZ2dsZUJ1dHRvbiwgYnV0dG9uU2VsZWN0b3IsICR0b2dnbGVDb250YWluZXIpIHtcbiAgICAgICAgY29uc3QgY2hhbmdlQXR0cmlidXRlc09uVG9nZ2xlID0gKHNlbGVjdG9yVG9BY3RpdmF0ZSkgPT4ge1xuICAgICAgICAgICAgJCh0b2dnbGVCdXR0b24pLmF0dHIoJ2FyaWEtbGFiZWxsZWRieScsIHNlbGVjdG9yVG9BY3RpdmF0ZSk7XG4gICAgICAgICAgICAkKGJ1dHRvblNlbGVjdG9yKS50ZXh0KCQoYCMke3NlbGVjdG9yVG9BY3RpdmF0ZX1gKS50ZXh0KCkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmICghdGhpcy5pc0VzdGltYXRvckZvcm1PcGVuZWQpIHtcbiAgICAgICAgICAgIGNoYW5nZUF0dHJpYnV0ZXNPblRvZ2dsZSgnZXN0aW1hdG9yLWNsb3NlJyk7XG4gICAgICAgICAgICAkdG9nZ2xlQ29udGFpbmVyLnJlbW92ZUNsYXNzKCd1LWhpZGRlbicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2hhbmdlQXR0cmlidXRlc09uVG9nZ2xlKCdlc3RpbWF0b3ItYWRkJyk7XG4gICAgICAgICAgICAkdG9nZ2xlQ29udGFpbmVyLmFkZENsYXNzKCd1LWhpZGRlbicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNFc3RpbWF0b3JGb3JtT3BlbmVkID0gIXRoaXMuaXNFc3RpbWF0b3JGb3JtT3BlbmVkO1xuICAgIH1cblxuICAgIGJpbmRFc3RpbWF0b3JFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0ICRlc3RpbWF0b3JDb250YWluZXIgPSAkKCcuc2hpcHBpbmctZXN0aW1hdG9yJyk7XG4gICAgICAgIGNvbnN0ICRlc3RpbWF0b3JGb3JtID0gJCgnLmVzdGltYXRvci1mb3JtJyk7XG4gICAgICAgIGNvbGxhcHNpYmxlRmFjdG9yeSgpO1xuICAgICAgICAkZXN0aW1hdG9yRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgIGNvdW50cnlfaWQ6ICQoJ1tuYW1lPVwic2hpcHBpbmctY291bnRyeVwiXScsICRlc3RpbWF0b3JGb3JtKS52YWwoKSxcbiAgICAgICAgICAgICAgICBzdGF0ZV9pZDogJCgnW25hbWU9XCJzaGlwcGluZy1zdGF0ZVwiXScsICRlc3RpbWF0b3JGb3JtKS52YWwoKSxcbiAgICAgICAgICAgICAgICBjaXR5OiAkKCdbbmFtZT1cInNoaXBwaW5nLWNpdHlcIl0nLCAkZXN0aW1hdG9yRm9ybSkudmFsKCksXG4gICAgICAgICAgICAgICAgemlwX2NvZGU6ICQoJ1tuYW1lPVwic2hpcHBpbmctemlwXCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuZ2V0U2hpcHBpbmdRdW90ZXMocGFyYW1zLCAnY2FydC9zaGlwcGluZy1xdW90ZXMnLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICQoJy5zaGlwcGluZy1xdW90ZXMnKS5odG1sKHJlc3BvbnNlLmNvbnRlbnQpO1xuXG4gICAgICAgICAgICAgICAgLy8gYmluZCB0aGUgc2VsZWN0IGJ1dHRvblxuICAgICAgICAgICAgICAgICQoJy5zZWxlY3Qtc2hpcHBpbmctcXVvdGUnKS5vbignY2xpY2snLCBjbGlja0V2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcXVvdGVJZCA9ICQoJy5zaGlwcGluZy1xdW90ZTpjaGVja2VkJykudmFsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2xpY2tFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LnN1Ym1pdFNoaXBwaW5nUXVvdGUocXVvdGVJZCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuc2hpcHBpbmctZXN0aW1hdGUtc2hvdycpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUVzdGltYXRvckZvcm1TdGF0ZShldmVudC5jdXJyZW50VGFyZ2V0LCAnLnNoaXBwaW5nLWVzdGltYXRlLXNob3dfX2J0bi1uYW1lJywgJGVzdGltYXRvckNvbnRhaW5lcik7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgUHJvZHVjdERldGFpbHNCYXNlLCB7IG9wdGlvbkNoYW5nZURlY29yYXRvciB9IGZyb20gJy4vcHJvZHVjdC1kZXRhaWxzLWJhc2UnO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBpc0Jyb3dzZXJJRSwgY29udmVydEludG9BcnJheSB9IGZyb20gJy4vdXRpbHMvaWUtaGVscGVycyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcnRJdGVtRGV0YWlscyBleHRlbmRzIFByb2R1Y3REZXRhaWxzQmFzZSB7XG4gICAgY29uc3RydWN0b3IoJHNjb3BlLCBjb250ZXh0LCBwcm9kdWN0QXR0cmlidXRlc0RhdGEgPSB7fSkge1xuICAgICAgICBzdXBlcigkc2NvcGUsIGNvbnRleHQpO1xuXG4gICAgICAgIGNvbnN0ICRmb3JtID0gJCgnI0NhcnRFZGl0UHJvZHVjdEZpZWxkc0Zvcm0nLCB0aGlzLiRzY29wZSk7XG4gICAgICAgIGNvbnN0ICRwcm9kdWN0T3B0aW9uc0VsZW1lbnQgPSAkKCdbZGF0YS1wcm9kdWN0LWF0dHJpYnV0ZXMtd3JhcHBlcl0nLCAkZm9ybSk7XG4gICAgICAgIGNvbnN0IGhhc09wdGlvbnMgPSAkcHJvZHVjdE9wdGlvbnNFbGVtZW50Lmh0bWwoKS50cmltKCkubGVuZ3RoO1xuICAgICAgICBjb25zdCBoYXNEZWZhdWx0T3B0aW9ucyA9ICRwcm9kdWN0T3B0aW9uc0VsZW1lbnQuZmluZCgnW2RhdGEtZGVmYXVsdF0nKS5sZW5ndGg7XG5cbiAgICAgICAgJHByb2R1Y3RPcHRpb25zRWxlbWVudC5vbignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRQcm9kdWN0VmFyaWFudCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBvcHRpb25DaGFuZ2VDYWxsYmFjayA9IG9wdGlvbkNoYW5nZURlY29yYXRvci5jYWxsKHRoaXMsIGhhc0RlZmF1bHRPcHRpb25zKTtcblxuICAgICAgICAvLyBVcGRhdGUgcHJvZHVjdCBhdHRyaWJ1dGVzLiBBbHNvIHVwZGF0ZSB0aGUgaW5pdGlhbCB2aWV3IGluIGNhc2UgaXRlbXMgYXJlIG9vc1xuICAgICAgICAvLyBvciBoYXZlIGRlZmF1bHQgdmFyaWFudCBwcm9wZXJ0aWVzIHRoYXQgY2hhbmdlIHRoZSB2aWV3XG4gICAgICAgIGlmICgoaXNFbXB0eShwcm9kdWN0QXR0cmlidXRlc0RhdGEpIHx8IGhhc0RlZmF1bHRPcHRpb25zKSAmJiBoYXNPcHRpb25zKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0SWQgPSB0aGlzLmNvbnRleHQucHJvZHVjdEZvckNoYW5nZUlkO1xuXG4gICAgICAgICAgICB1dGlscy5hcGkucHJvZHVjdEF0dHJpYnV0ZXMub3B0aW9uQ2hhbmdlKHByb2R1Y3RJZCwgJGZvcm0uc2VyaWFsaXplKCksICdwcm9kdWN0cy9idWxrLWRpc2NvdW50LXJhdGVzJywgb3B0aW9uQ2hhbmdlQ2FsbGJhY2spO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQcm9kdWN0QXR0cmlidXRlcyhwcm9kdWN0QXR0cmlidXRlc0RhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0UHJvZHVjdFZhcmlhbnQoKSB7XG4gICAgICAgIGNvbnN0IHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMgPSBbXTtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuXG4gICAgICAgICQuZWFjaCgkKCdbZGF0YS1wcm9kdWN0LWF0dHJpYnV0ZV0nKSwgKGluZGV4LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uTGFiZWwgPSB2YWx1ZS5jaGlsZHJlblswXS5pbm5lclRleHQ7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25UaXRsZSA9IG9wdGlvbkxhYmVsLnNwbGl0KCc6JylbMF0udHJpbSgpO1xuICAgICAgICAgICAgY29uc3QgcmVxdWlyZWQgPSBvcHRpb25MYWJlbC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdyZXF1aXJlZCcpO1xuICAgICAgICAgICAgY29uc3QgdHlwZSA9IHZhbHVlLmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9kdWN0LWF0dHJpYnV0ZScpO1xuXG4gICAgICAgICAgICBpZiAoKHR5cGUgPT09ICdpbnB1dC1maWxlJyB8fCB0eXBlID09PSAnaW5wdXQtdGV4dCcgfHwgdHlwZSA9PT0gJ2lucHV0LW51bWJlcicpICYmIHZhbHVlLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykudmFsdWUgPT09ICcnICYmIHJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICd0ZXh0YXJlYScgJiYgdmFsdWUucXVlcnlTZWxlY3RvcigndGV4dGFyZWEnKS52YWx1ZSA9PT0gJycgJiYgcmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2RhdGUnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNTYXRpc2ZpZWQgPSBBcnJheS5mcm9tKHZhbHVlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NlbGVjdCcpKS5ldmVyeSgoc2VsZWN0KSA9PiBzZWxlY3Quc2VsZWN0ZWRJbmRleCAhPT0gMCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNTYXRpc2ZpZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IEFycmF5LmZyb20odmFsdWUucXVlcnlTZWxlY3RvckFsbCgnc2VsZWN0JykpLm1hcCgoeCkgPT4geC52YWx1ZSkuam9pbignLScpO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9OiR7ZGF0ZVN0cmluZ31gKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3NldC1zZWxlY3QnKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ID0gdmFsdWUucXVlcnlTZWxlY3Rvcignc2VsZWN0Jyk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRJbmRleCA9IHNlbGVjdC5zZWxlY3RlZEluZGV4O1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkSW5kZXggIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfToke3NlbGVjdC5vcHRpb25zW3NlbGVjdGVkSW5kZXhdLmlubmVyVGV4dH1gKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3NldC1yZWN0YW5nbGUnIHx8IHR5cGUgPT09ICdzZXQtcmFkaW8nIHx8IHR5cGUgPT09ICdzd2F0Y2gnIHx8IHR5cGUgPT09ICdpbnB1dC1jaGVja2JveCcgfHwgdHlwZSA9PT0gJ3Byb2R1Y3QtbGlzdCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGVja2VkID0gdmFsdWUucXVlcnlTZWxlY3RvcignOmNoZWNrZWQnKTtcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBnZXRTZWxlY3RlZE9wdGlvbkxhYmVsID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvZHVjdFZhcmlhbnRzbGlzdCA9IGNvbnZlcnRJbnRvQXJyYXkodmFsdWUuY2hpbGRyZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF0Y2hMYWJlbEZvckNoZWNrZWRJbnB1dCA9IGlucHQgPT4gaW5wdC5kYXRhc2V0LnByb2R1Y3RBdHRyaWJ1dGVWYWx1ZSA9PT0gY2hlY2tlZC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9kdWN0VmFyaWFudHNsaXN0LmZpbHRlcihtYXRjaExhYmVsRm9yQ2hlY2tlZElucHV0KVswXTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdzZXQtcmVjdGFuZ2xlJyB8fCB0eXBlID09PSAnc2V0LXJhZGlvJyB8fCB0eXBlID09PSAncHJvZHVjdC1saXN0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBpc0Jyb3dzZXJJRSA/IGdldFNlbGVjdGVkT3B0aW9uTGFiZWwoKS5pbm5lclRleHQudHJpbSgpIDogY2hlY2tlZC5sYWJlbHNbMF0uaW5uZXJUZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfToke2xhYmVsfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdzd2F0Y2gnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IGlzQnJvd3NlcklFID8gZ2V0U2VsZWN0ZWRPcHRpb25MYWJlbCgpLmNoaWxkcmVuWzBdIDogY2hlY2tlZC5sYWJlbHNbMF0uY2hpbGRyZW5bMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9OiR7bGFiZWwudGl0bGV9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2lucHV0LWNoZWNrYm94Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfTpZZXNgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2lucHV0LWNoZWNrYm94Jykge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9Ok5vYCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgcHJvZHVjdFZhcmlhbnQgPSB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLmxlbmd0aCA9PT0gMCA/IG9wdGlvbnMuc29ydCgpLmpvaW4oJywgJykgOiAndW5zYXRpc2ZpZWQnO1xuICAgICAgICBjb25zdCB2aWV3ID0gJCgnLm1vZGFsLWhlYWRlci10aXRsZScpO1xuXG4gICAgICAgIGlmIChwcm9kdWN0VmFyaWFudCkge1xuICAgICAgICAgICAgcHJvZHVjdFZhcmlhbnQgPSBwcm9kdWN0VmFyaWFudCA9PT0gJ3Vuc2F0aXNmaWVkJyA/ICcnIDogcHJvZHVjdFZhcmlhbnQ7XG4gICAgICAgICAgICBpZiAodmlldy5hdHRyKCdkYXRhLWV2ZW50LXR5cGUnKSkge1xuICAgICAgICAgICAgICAgIHZpZXcuYXR0cignZGF0YS1wcm9kdWN0LXZhcmlhbnQnLCBwcm9kdWN0VmFyaWFudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2R1Y3ROYW1lID0gdmlldy5odG1sKCkubWF0Y2goLycoLio/KScvKVsxXTtcbiAgICAgICAgICAgICAgICBjb25zdCBjYXJkID0gJChgW2RhdGEtbmFtZT1cIiR7cHJvZHVjdE5hbWV9XCJdYCk7XG4gICAgICAgICAgICAgICAgY2FyZC5hdHRyKCdkYXRhLXByb2R1Y3QtdmFyaWFudCcsIHByb2R1Y3RWYXJpYW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGUgb3IgbWFyayBhcyB1bmF2YWlsYWJsZSBvdXQgb2Ygc3RvY2sgYXR0cmlidXRlcyBpZiBlbmFibGVkXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBkYXRhIFByb2R1Y3QgYXR0cmlidXRlIGRhdGFcbiAgICAgKi9cbiAgICB1cGRhdGVQcm9kdWN0QXR0cmlidXRlcyhkYXRhKSB7XG4gICAgICAgIHN1cGVyLnVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzKGRhdGEpO1xuXG4gICAgICAgIHRoaXMuJHNjb3BlLmZpbmQoJy5tb2RhbC1jb250ZW50JykucmVtb3ZlQ2xhc3MoJ2hpZGUtY29udGVudCcpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChjZXJ0KSB7XG4gICAgaWYgKHR5cGVvZiBjZXJ0ICE9PSAnc3RyaW5nJyB8fCBjZXJ0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gQWRkIGFueSBjdXN0b20gZ2lmdCBjZXJ0aWZpY2F0ZSB2YWxpZGF0aW9uIGxvZ2ljIGhlcmVcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbiIsImltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgaW5zZXJ0U3RhdGVIaWRkZW5GaWVsZCB9IGZyb20gJy4vdXRpbHMvZm9ybS11dGlscyc7XG5pbXBvcnQgeyBzaG93QWxlcnRNb2RhbCB9IGZyb20gJy4uL2dsb2JhbC9tb2RhbCc7XG5cbi8qKlxuICogSWYgdGhlcmUgYXJlIG5vIG9wdGlvbnMgZnJvbSBiY2FwcCwgYSB0ZXh0IGZpZWxkIHdpbGwgYmUgc2VudC4gVGhpcyB3aWxsIGNyZWF0ZSBhIHNlbGVjdCBlbGVtZW50IHRvIGhvbGQgb3B0aW9ucyBhZnRlciB0aGUgcmVtb3RlIHJlcXVlc3QuXG4gKiBAcmV0dXJucyB7alF1ZXJ5fEhUTUxFbGVtZW50fVxuICovXG5mdW5jdGlvbiBtYWtlU3RhdGVSZXF1aXJlZChzdGF0ZUVsZW1lbnQsIGNvbnRleHQpIHtcbiAgICBjb25zdCBhdHRycyA9IF8udHJhbnNmb3JtKHN0YXRlRWxlbWVudC5wcm9wKCdhdHRyaWJ1dGVzJyksIChyZXN1bHQsIGl0ZW0pID0+IHtcbiAgICAgICAgY29uc3QgcmV0ID0gcmVzdWx0O1xuICAgICAgICByZXRbaXRlbS5uYW1lXSA9IGl0ZW0udmFsdWU7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfSk7XG5cbiAgICBjb25zdCByZXBsYWNlbWVudEF0dHJpYnV0ZXMgPSB7XG4gICAgICAgIGlkOiBhdHRycy5pZCxcbiAgICAgICAgJ2RhdGEtbGFiZWwnOiBhdHRyc1snZGF0YS1sYWJlbCddLFxuICAgICAgICBjbGFzczogJ2Zvcm0tc2VsZWN0JyxcbiAgICAgICAgbmFtZTogYXR0cnMubmFtZSxcbiAgICAgICAgJ2RhdGEtZmllbGQtdHlwZSc6IGF0dHJzWydkYXRhLWZpZWxkLXR5cGUnXSxcbiAgICB9O1xuXG4gICAgc3RhdGVFbGVtZW50LnJlcGxhY2VXaXRoKCQoJzxzZWxlY3Q+PC9zZWxlY3Q+JywgcmVwbGFjZW1lbnRBdHRyaWJ1dGVzKSk7XG5cbiAgICBjb25zdCAkbmV3RWxlbWVudCA9ICQoJ1tkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXScpO1xuICAgIGNvbnN0ICRoaWRkZW5JbnB1dCA9ICQoJ1tuYW1lKj1cIkZvcm1GaWVsZElzVGV4dFwiXScpO1xuXG4gICAgaWYgKCRoaWRkZW5JbnB1dC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgJGhpZGRlbklucHV0LnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGlmICgkbmV3RWxlbWVudC5wcmV2KCkuZmluZCgnc21hbGwnKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgLy8gU3RyaW5nIGlzIGluamVjdGVkIGZyb20gbG9jYWxpemVyXG4gICAgICAgICRuZXdFbGVtZW50LnByZXYoKS5hcHBlbmQoYDxzbWFsbD4ke2NvbnRleHQucmVxdWlyZWR9PC9zbWFsbD5gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkbmV3RWxlbWVudC5wcmV2KCkuZmluZCgnc21hbGwnKS5zaG93KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuICRuZXdFbGVtZW50O1xufVxuXG4vKipcbiAqIElmIGEgY291bnRyeSB3aXRoIHN0YXRlcyBpcyB0aGUgZGVmYXVsdCwgYSBzZWxlY3Qgd2lsbCBiZSBzZW50LFxuICogSW4gdGhpcyBjYXNlIHdlIG5lZWQgdG8gYmUgYWJsZSB0byBzd2l0Y2ggdG8gYW4gaW5wdXQgZmllbGQgYW5kIGhpZGUgdGhlIHJlcXVpcmVkIGZpZWxkXG4gKi9cbmZ1bmN0aW9uIG1ha2VTdGF0ZU9wdGlvbmFsKHN0YXRlRWxlbWVudCkge1xuICAgIGNvbnN0IGF0dHJzID0gXy50cmFuc2Zvcm0oc3RhdGVFbGVtZW50LnByb3AoJ2F0dHJpYnV0ZXMnKSwgKHJlc3VsdCwgaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCByZXQgPSByZXN1bHQ7XG4gICAgICAgIHJldFtpdGVtLm5hbWVdID0gaXRlbS52YWx1ZTtcblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH0pO1xuXG4gICAgY29uc3QgcmVwbGFjZW1lbnRBdHRyaWJ1dGVzID0ge1xuICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgIGlkOiBhdHRycy5pZCxcbiAgICAgICAgJ2RhdGEtbGFiZWwnOiBhdHRyc1snZGF0YS1sYWJlbCddLFxuICAgICAgICBjbGFzczogJ2Zvcm0taW5wdXQnLFxuICAgICAgICBuYW1lOiBhdHRycy5uYW1lLFxuICAgICAgICAnZGF0YS1maWVsZC10eXBlJzogYXR0cnNbJ2RhdGEtZmllbGQtdHlwZSddLFxuICAgIH07XG5cbiAgICBzdGF0ZUVsZW1lbnQucmVwbGFjZVdpdGgoJCgnPGlucHV0IC8+JywgcmVwbGFjZW1lbnRBdHRyaWJ1dGVzKSk7XG5cbiAgICBjb25zdCAkbmV3RWxlbWVudCA9ICQoJ1tkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXScpO1xuXG4gICAgaWYgKCRuZXdFbGVtZW50Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgICBpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkKCRuZXdFbGVtZW50KTtcbiAgICAgICAgJG5ld0VsZW1lbnQucHJldigpLmZpbmQoJ3NtYWxsJykuaGlkZSgpO1xuICAgIH1cblxuICAgIHJldHVybiAkbmV3RWxlbWVudDtcbn1cblxuLyoqXG4gKiBBZGRzIHRoZSBhcnJheSBvZiBvcHRpb25zIGZyb20gdGhlIHJlbW90ZSByZXF1ZXN0IHRvIHRoZSBuZXdseSBjcmVhdGVkIHNlbGVjdCBib3guXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGVzQXJyYXlcbiAqIEBwYXJhbSB7alF1ZXJ5fSAkc2VsZWN0RWxlbWVudFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqL1xuZnVuY3Rpb24gYWRkT3B0aW9ucyhzdGF0ZXNBcnJheSwgJHNlbGVjdEVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBjb250YWluZXIgPSBbXTtcblxuICAgIGNvbnRhaW5lci5wdXNoKGA8b3B0aW9uIHZhbHVlPVwiXCI+JHtzdGF0ZXNBcnJheS5wcmVmaXh9PC9vcHRpb24+YCk7XG5cbiAgICBpZiAoIV8uaXNFbXB0eSgkc2VsZWN0RWxlbWVudCkpIHtcbiAgICAgICAgXy5lYWNoKHN0YXRlc0FycmF5LnN0YXRlcywgKHN0YXRlT2JqKSA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy51c2VJZEZvclN0YXRlcykge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5wdXNoKGA8b3B0aW9uIHZhbHVlPVwiJHtzdGF0ZU9iai5pZH1cIj4ke3N0YXRlT2JqLm5hbWV9PC9vcHRpb24+YCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5wdXNoKGA8b3B0aW9uIHZhbHVlPVwiJHtzdGF0ZU9iai5uYW1lfVwiPiR7c3RhdGVPYmoubGFiZWwgPyBzdGF0ZU9iai5sYWJlbCA6IHN0YXRlT2JqLm5hbWV9PC9vcHRpb24+YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzZWxlY3RFbGVtZW50Lmh0bWwoY29udGFpbmVyLmpvaW4oJyAnKSk7XG4gICAgfVxufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0ge2pRdWVyeX0gc3RhdGVFbGVtZW50XG4gKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZUVsZW1lbnQsIGNvbnRleHQgPSB7fSwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICAvKipcbiAgICAgKiBCYWNrd2FyZHMgY29tcGF0aWJsZSBmb3IgdGhyZWUgcGFyYW1ldGVycyBpbnN0ZWFkIG9mIGZvdXJcbiAgICAgKlxuICAgICAqIEF2YWlsYWJsZSBvcHRpb25zOlxuICAgICAqXG4gICAgICogdXNlSWRGb3JTdGF0ZXMge0Jvb2x9IC0gR2VuZXJhdGVzIHN0YXRlcyBkcm9wZG93biB1c2luZyBpZCBmb3IgdmFsdWVzIGluc3RlYWQgb2Ygc3RyaW5nc1xuICAgICAqL1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuICAgICAgICBjYWxsYmFjayA9IG9wdGlvbnM7XG4gICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgLyogZXNsaW50LWVuYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuICAgIH1cblxuICAgICQoJ3NlbGVjdFtkYXRhLWZpZWxkLXR5cGU9XCJDb3VudHJ5XCJdJykub24oJ2NoYW5nZScsIGV2ZW50ID0+IHtcbiAgICAgICAgY29uc3QgY291bnRyeU5hbWUgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnZhbCgpO1xuXG4gICAgICAgIGlmIChjb3VudHJ5TmFtZSA9PT0gJycpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHV0aWxzLmFwaS5jb3VudHJ5LmdldEJ5TmFtZShjb3VudHJ5TmFtZSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBzaG93QWxlcnRNb2RhbChjb250ZXh0LnN0YXRlX2Vycm9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgJGN1cnJlbnRJbnB1dCA9ICQoJ1tkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXScpO1xuXG4gICAgICAgICAgICBpZiAoIV8uaXNFbXB0eShyZXNwb25zZS5kYXRhLnN0YXRlcykpIHtcbiAgICAgICAgICAgICAgICAvLyBUaGUgZWxlbWVudCBtYXkgaGF2ZSBiZWVuIHJlcGxhY2VkIHdpdGggYSBzZWxlY3QsIHJlc2VsZWN0IGl0XG4gICAgICAgICAgICAgICAgY29uc3QgJHNlbGVjdEVsZW1lbnQgPSBtYWtlU3RhdGVSZXF1aXJlZCgkY3VycmVudElucHV0LCBjb250ZXh0KTtcblxuICAgICAgICAgICAgICAgIGFkZE9wdGlvbnMocmVzcG9uc2UuZGF0YSwgJHNlbGVjdEVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsICRzZWxlY3RFbGVtZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3RWxlbWVudCA9IG1ha2VTdGF0ZU9wdGlvbmFsKCRjdXJyZW50SW5wdXQsIGNvbnRleHQpO1xuXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgbmV3RWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuIiwiY29uc3QgVFJBTlNMQVRJT05TID0gJ3RyYW5zbGF0aW9ucyc7XG5jb25zdCBpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5ID0gKGRpY3Rpb25hcnkpID0+ICEhT2JqZWN0LmtleXMoZGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5sZW5ndGg7XG5jb25zdCBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5ID0gKC4uLmRpY3Rpb25hcnlKc29uTGlzdCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGljdGlvbmFyeUpzb25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRpY3Rpb25hcnkgPSBKU09OLnBhcnNlKGRpY3Rpb25hcnlKc29uTGlzdFtpXSk7XG4gICAgICAgIGlmIChpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5KGRpY3Rpb25hcnkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZGljdGlvbmFyeTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogZGVmaW5lcyBUcmFuc2xhdGlvbiBEaWN0aW9uYXJ5IHRvIHVzZVxuICogQHBhcmFtIGNvbnRleHQgcHJvdmlkZXMgYWNjZXNzIHRvIDMgdmFsaWRhdGlvbiBKU09OcyBmcm9tIGVuLmpzb246XG4gKiB2YWxpZGF0aW9uX21lc3NhZ2VzLCB2YWxpZGF0aW9uX2ZhbGxiYWNrX21lc3NhZ2VzIGFuZCBkZWZhdWx0X21lc3NhZ2VzXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5ID0gKGNvbnRleHQpID0+IHtcbiAgICBjb25zdCB7IHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04gfSA9IGNvbnRleHQ7XG4gICAgY29uc3QgYWN0aXZlRGljdGlvbmFyeSA9IGNob29zZUFjdGl2ZURpY3Rpb25hcnkodmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTik7XG4gICAgY29uc3QgbG9jYWxpemF0aW9ucyA9IE9iamVjdC52YWx1ZXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKTtcbiAgICBjb25zdCB0cmFuc2xhdGlvbktleXMgPSBPYmplY3Qua2V5cyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLm1hcChrZXkgPT4ga2V5LnNwbGl0KCcuJykucG9wKCkpO1xuXG4gICAgcmV0dXJuIHRyYW5zbGF0aW9uS2V5cy5yZWR1Y2UoKGFjYywga2V5LCBpKSA9PiB7XG4gICAgICAgIGFjY1trZXldID0gbG9jYWxpemF0aW9uc1tpXTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG59O1xuIiwiaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBtYWtlT3B0aW9uSWRzVW5pcXVlIGZyb20gJy4vbWFrZS1vcHRpb25zLXVuaXF1ZSc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHN3YWwgZnJvbSAnc3dlZXRhbGVydDInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJ0UGFnZVVwc2VsbFByb2R1Y3Qge1xuICAgIGNvbnN0cnVjdG9yKCRzY29wZSkge1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcblxuICAgICAgICB0aGlzLiRzY29wZS5hZGRDbGFzcygnaGFzT3B0aW9ucy0td2lyZWQnKTtcblxuICAgICAgICB0aGlzLmluaXRSYWRpb0F0dHJpYnV0ZXMoKTtcblxuICAgICAgICB0aGlzLiRmb3JtID0gJCgnZm9ybScsIHRoaXMuJHNjb3BlKTtcbiAgICAgICAgdGhpcy4kcHJvZHVjdElkID0gJCgnW25hbWU9XCJwcm9kdWN0X2lkXCJdJywgdGhpcy4kZm9ybSkudmFsKCk7XG5cbiAgICAgICAgdGhpcy5rZXkgPSAnY3B1JzsgLy8gdW5pcXVlIGluZGVudGlmaWVyIGZvciB0aGlzIGN1c3RvbWl6YXRpb25cblxuICAgICAgICB0aGlzLiRwcm9kdWN0T3B0aW9uc0VsZW1lbnQgPSAkKGBbZGF0YS0ke3RoaXMua2V5fS1vcHRpb24tY2hhbmdlXWAsIHRoaXMuJGZvcm0pOyAvLyBpZSA8ZGl2IGNsYXNzPVwib3B0aW9uc1wiIGRhdGEtY3B1LW9wdGlvbi1jaGFuZ2U+XG5cbiAgICAgICAgdGhpcy51cGRhdGVPcHRpb25WaWV3KCk7XG4gICAgICAgIC8vIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5vcHRpb25DaGFuZ2UodGhpcy4kcHJvZHVjdElkLCB0aGlzLiRmb3JtLnNlcmlhbGl6ZSgpLCAncHJvZHVjdHMvYnVsay1kaXNjb3VudC1yYXRlcycsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIC8vICAgICBjb25zdCBhdHRyaWJ1dGVzRGF0YSA9IHJlc3BvbnNlLmRhdGEgfHwge307XG4gICAgICAgIC8vICAgICBjb25zdCBhdHRyaWJ1dGVzQ29udGVudCA9IHJlc3BvbnNlLmNvbnRlbnQgfHwge307XG4gICAgICAgIC8vICAgICB0aGlzLnVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzKGF0dHJpYnV0ZXNEYXRhKTtcbiAgICAgICAgLy8gICAgIC8vIGlmIChoYXNEZWZhdWx0T3B0aW9ucykge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMudXBkYXRlVmlldyhhdHRyaWJ1dGVzRGF0YSwgYXR0cmlidXRlc0NvbnRlbnQpO1xuICAgICAgICAvLyAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgLy8gICAgIC8vICAgICB0aGlzLnVwZGF0ZURlZmF1bHRBdHRyaWJ1dGVzRm9yT09TKGF0dHJpYnV0ZXNEYXRhKTtcbiAgICAgICAgLy8gICAgIC8vIH1cbiAgICAgICAgLy8gfSk7XG5cblxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBhZGQgXCJpc1JlcXVpcmVkXCIgdG8gb3B0aW9ucyB0aGF0IGFyZSByZXF1aXJlZFxuICAgICAqL1xuICAgIGFkZFJlcXVpcmVkQ2xhc3N0b09wdGlvbnMoKSB7XG4gICAgICAgICQoJy5mb3JtLWZpZWxkJywgdGhpcy4kcHJvZHVjdE9wdGlvbnNFbGVtZW50KS50b0FycmF5KCkuZm9yRWFjaChvcHRpb24gPT4ge1xuICAgICAgICAgICAgaWYgKCQob3B0aW9uKS5maW5kKCdzbWFsbDpjb250YWlucyhcIlJlcXVpcmVkXCIpJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJChvcHRpb24pLmFkZENsYXNzKCdpc1JlcXVpcmVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBwcm9kdWN0IG9wdGlvbnMgY2hhbmdlc1xuICAgICAqL1xuICAgIHByb2R1Y3RPcHRpb25zQ2hhbmdlZChldmVudCkge1xuICAgICAgICBjb25zdCAkY2hhbmdlZE9wdGlvbiA9ICQoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgY29uc3Qgb3B0aW9uUm93ID0gJChldmVudC50YXJnZXQpLnBhcmVudHMoJy5mb3JtLWZpZWxkJyk7XG5cbiAgICAgICAgLy8gRG8gbm90IHRyaWdnZXIgYW4gYWpheCByZXF1ZXN0IGlmIGl0J3MgYSBmaWxlIG9yIGlmIHRoZSBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBGb3JtRGF0YVxuICAgICAgICBpZiAoJGNoYW5nZWRPcHRpb24uYXR0cigndHlwZScpID09PSAnZmlsZScgfHwgd2luZG93LkZvcm1EYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlT3B0aW9uVmlldygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gd2FzIGFuIG9wdGlvbiB3aXRoIGEgdmFsdWUgc2VsZWN0ZWQ/XG4gICAgICAgIGlmICgkY2hhbmdlZE9wdGlvbi52YWwoKSAhPT0gJycpIHtcbiAgICAgICAgICAgIGlmICgkY2hhbmdlZE9wdGlvbi5pcygnaW5wdXQnKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSAkY2hhbmdlZE9wdGlvbi5hdHRyKCd0eXBlJyk7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JhZGlvJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICRjaGFuZ2VkT3B0aW9uLmF0dHIoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRjaGFuZ2VkT3B0aW9uLnNpYmxpbmdzKCdpbnB1dCcpLmF0dHIoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25Sb3cuYWRkQ2xhc3MoJ2lzU2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjaGVja2JveCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJGNoYW5nZWRPcHRpb24ucHJvcCgnY2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uUm93LmFkZENsYXNzKCdpc1NlbGVjdGVkJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkY2hhbmdlZE9wdGlvbi5hdHRyKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvblJvdy5yZW1vdmVDbGFzcygnaXNTZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRjaGFuZ2VkT3B0aW9uLmF0dHIoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndGV4dCc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAkY2hhbmdlZE9wdGlvbi52YWwoKS5sZW5ndGggIT09IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IG9wdGlvblJvdy5hZGRDbGFzcygnaXNTZWxlY3RlZCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBvcHRpb25Sb3cucmVtb3ZlQ2xhc3MoJ2lzU2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRjaGFuZ2VkT3B0aW9uLmF0dHIoJ3ZhbHVlJywgJGNoYW5nZWRPcHRpb24udmFsKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICgkY2hhbmdlZE9wdGlvbi5pcygnc2VsZWN0JykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCAkc2VsZWN0ZWRPcHRpb24gPSAkY2hhbmdlZE9wdGlvbi5maW5kKGBvcHRpb25bdmFsdWU9XCIkeyRjaGFuZ2VkT3B0aW9uLnZhbCgpfVwiXWApO1xuICAgICAgICAgICAgICAgICRzZWxlY3RlZE9wdGlvbi5hdHRyKCdzZWxlY3RlZCcsIHRydWUpO1xuICAgICAgICAgICAgICAgICRzZWxlY3RlZE9wdGlvbi5zaWJsaW5ncygnb3B0aW9uJykuYXR0cignc2VsZWN0ZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgLy8gaWYgaXQncyBhIGRhdGUgc2VsZWN0LCBtYWtlIHN1cmUgYWxsIDMgc2VsZWN0cyBhcmUgZmlsbGVkIGluIGJlZm9yZSBzYXlpbmcgaXQncyBmaWxsZWQgaW5cbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICRjaGFuZ2VkT3B0aW9uLmF0dHIoJ25hbWUnKS5pbmRleE9mKCdtb250aCcpICE9PSAtMSB8fFxuICAgICAgICAgICAgICAgICAgICAkY2hhbmdlZE9wdGlvbi5hdHRyKCduYW1lJykuaW5kZXhPZignZGF5JykgIT09IC0xIHx8XG4gICAgICAgICAgICAgICAgICAgICRjaGFuZ2VkT3B0aW9uLmF0dHIoJ25hbWUnKS5pbmRleE9mKCd5ZWFyJykgIT09IC0xXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvdW50IHRoZSBvdGhlciBkYXRlIGZpZWxkcyAoaWYgY2hhbmdlZCBtb250aCwgc2VlIGlmIGRheSBhbmQgeWVhciBhcmUgZmlsbGVkIG91dClcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3RoZXJTZWxlY3RlZERhdGVGaWVsZHMgPSAkY2hhbmdlZE9wdGlvbi5zaWJsaW5ncygnc2VsZWN0JykudG9BcnJheSgpLnJlZHVjZSgoY291bnQsIHNlbGVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoc2VsZWN0KS52YWwoKSA9PT0gJydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGNvdW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBjb3VudCArIDE7XG4gICAgICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiBhbGwgZmllbGRzIGFyZSBmaWxsZWQgaW5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG90aGVyU2VsZWN0ZWREYXRlRmllbGRzID09PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25Sb3cuYWRkQ2xhc3MoJ2lzU2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvblJvdy5hZGRDbGFzcygnaXNTZWxlY3RlZCcpOyAvLyBpdCdzIG5vdCBhIGRhdGUgc2VsZWN0LCBqdXN0IG1hcmsgdGhlIG9wdGlvbiBhcyBzZWxlY3RlZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoJGNoYW5nZWRPcHRpb24uaXMoJ3RleHRhcmVhJykpIHtcbiAgICAgICAgICAgICAgICAkY2hhbmdlZE9wdGlvbi52YWwoKS5sZW5ndGggIT09IDBcbiAgICAgICAgICAgICAgICAgICAgPyBvcHRpb25Sb3cuYWRkQ2xhc3MoJ2lzU2VsZWN0ZWQnKVxuICAgICAgICAgICAgICAgICAgICA6IG9wdGlvblJvdy5yZW1vdmVDbGFzcygnaXNTZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICRjaGFuZ2VkT3B0aW9uLnRleHQoJGNoYW5nZWRPcHRpb24udmFsKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZWxzZSByZW1vdmUgY2xhc3MgKHRoZXJlIHdhcyBubyB2YWx1ZSBmb3IgdGhpcyBvcHRpb24pXG4gICAgICAgICAgICBvcHRpb25Sb3cucmVtb3ZlQ2xhc3MoJ2lzU2VsZWN0ZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hlY2tPcHRpb25zU2VsZWN0ZWQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgTWFrZSBBUEkgY2FsbCBvbiBvcHRpb24gY2hhbmdlIHRvIHVwZGF0ZSBhdmFpbGFiaWxpdHlcbiAgICAgKi9cbiAgICB1cGRhdGVPcHRpb25WaWV3KCkgIHtcbiAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3RBdHRyaWJ1dGVzLm9wdGlvbkNoYW5nZSh0aGlzLiRwcm9kdWN0SWQsIHRoaXMuJGZvcm0uc2VyaWFsaXplKCksICdwcm9kdWN0cy9idWxrLWRpc2NvdW50LXJhdGVzJywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RBdHRyaWJ1dGVzRGF0YSA9IHJlc3BvbnNlLmRhdGEgfHwge307XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzKHByb2R1Y3RBdHRyaWJ1dGVzRGF0YSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZpZXcocHJvZHVjdEF0dHJpYnV0ZXNEYXRhKTtcbiAgICAgICAgICAgIC8vIHN0b2NrIHN0dWZmIChzaG91bGQgd2lyZSB1cCBpbWFnZSBjaGFuZ2UgYXMgd2VsbCBsYXRlcilcbiAgICAgICAgICAgIC8vIGlmIChwcm9kdWN0QXR0cmlidXRlc0RhdGEuc3RvY2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gICAgICQoJy5jdXJyZW50U3RvY2snLCAkc2NvcGUpLnRleHQocHJvZHVjdEF0dHJpYnV0ZXNEYXRhLnN0b2NrKTtcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAgICAgJCgnLmN1cnJlbnRTdG9jaycsICRzY29wZSkudGV4dCgnJyk7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBDaGVjayB3aGV0aGVyIGFsbCByZXF1aXJlZCBvcHRpb25zIGFyZSBzZWxlY3RlZFxuICAgICAqL1xuICAgIGNoZWNrT3B0aW9uc1NlbGVjdGVkKCkgIHtcbiAgICAgICAgLypcbiAgICAgICAgIyMgc2VlIGlmIGFsbCBvcHRpb25zIGFyZSBzZWxlY3RlZFxuICAgICAgICAqL1xuICAgICAgICBjb25zdCBudW1iZXJSZXF1aXJlZE9wdGlvbnMgPSB0aGlzLiRzY29wZS5maW5kKCcuZm9ybS1maWVsZC5pc1JlcXVpcmVkJykubGVuZ3RoO1xuICAgICAgICBjb25zdCBudW1iZXJTZWxlY3RlZE9wdGlvbnMgPSB0aGlzLiRzY29wZS5maW5kKCcuZm9ybS1maWVsZC5pc1JlcXVpcmVkLmlzU2VsZWN0ZWQnKS5sZW5ndGg7XG4gICAgICAgIC8vIGNvbnN0ICRhZGRUb0NhcnRCdXR0b24gPSAkZm9ybS5maW5kKCcuY2FyZC1hY3Rpb25zIC5idXR0b24nKTtcbiAgICAgICAgLy8gJGFkZFRvQ2FydEJ1dHRvbi5yZW1vdmVDbGFzcygnYnV0dG9uLS1zdWNjZXNzJyk7XG4gICAgICAgIGlmIChudW1iZXJSZXF1aXJlZE9wdGlvbnMgPT09IDAgfHwgbnVtYmVyUmVxdWlyZWRPcHRpb25zIDw9IG51bWJlclNlbGVjdGVkT3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuYWRkQ2xhc3MoJ2hhc09wdGlvbnMtLXNlbGVjdGVkJyk7IC8vIGFkZCBjbGFzcyB0byBwcm9kdWN0IGZvciBlYXN5IGFkZGluZyB0byBjYXJ0XG4gICAgICAgICAgICAkKCcuY3B1X19tb2RhbCcpLmFkZENsYXNzKCdoYXNPcHRpb25zLS1zZWxlY3RlZCcpOyAvLyB1cGRhdGUgdGV4dCBmb3IgdXNlciBhcyB3ZWxsXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5yZW1vdmVDbGFzcygnaGFzT3B0aW9ucy0tc2VsZWN0ZWQnKTsgLy8gcmVtb3ZlIGNsYXNzIHNpbmNlIG5vdCBhbGwgb3B0aW9ucyBmaWxsZWQgaW5cbiAgICAgICAgICAgICQoJy5jcHVfX21vZGFsJykucmVtb3ZlQ2xhc3MoJ2hhc09wdGlvbnMtLXNlbGVjdGVkJyk7IC8vIHVwZGF0ZSB0ZXh0IGZvciB1c2VyIGFzIHdlbGxcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSB2aWV3IG9mIHByaWNlLCBtZXNzYWdlcywgU0tVIGFuZCBzdG9jayBvcHRpb25zIHdoZW4gYSBwcm9kdWN0IG9wdGlvbiBjaGFuZ2VzXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBkYXRhIFByb2R1Y3QgYXR0cmlidXRlIGRhdGFcbiAgICAgKlxuICAgICAqL1xuICAgIHVwZGF0ZVByaWNlVmlldyhwcmljZSkge1xuICAgICAgICBpZiAocHJpY2Uud2l0aG91dF90YXgpIHtcbiAgICAgICAgICAgICQoYFtkYXRhLXByb2R1Y3QtcHJpY2Utd2l0aG91dC10YXhdYCwgdGhpcy4kc2NvcGUpLmh0bWwocHJpY2Uud2l0aG91dF90YXguZm9ybWF0dGVkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgdmlldyBvZiBwcmljZSwgbWVzc2FnZXMsIFNLVSBhbmQgc3RvY2sgb3B0aW9ucyB3aGVuIGEgcHJvZHVjdCBvcHRpb24gY2hhbmdlc1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gZGF0YSBQcm9kdWN0IGF0dHJpYnV0ZSBkYXRhXG4gICAgICovXG4gICAgdXBkYXRlVmlldyhkYXRhKSB7XG4gICAgICAgIC8vIHVwZGF0ZSBwcmljZVxuICAgICAgICAvLyBjb25zdCB2aWV3TW9kZWwgPSB0aGlzLmdldFZpZXdNb2RlbCh0aGlzLiRzY29wZSk7XG4gICAgICAgIGlmIChfLmlzT2JqZWN0KGRhdGEucHJpY2UpKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVByaWNlVmlldyhkYXRhLnByaWNlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB1cGRhdGUgaW1hZ2VcbiAgICAgICAgY29uc3QgaW1hZ2VFbCA9ICQoYC5jcHVfX2l0ZW0taW1nYCwgdGhpcy4kc2NvcGUpO1xuICAgICAgICBpZiAoXy5pc09iamVjdChkYXRhLmltYWdlKSkge1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VTcmMgPSBkYXRhLmltYWdlLmRhdGEucmVwbGFjZSgnezpzaXplfScsICczMDB4MzAwJyk7XG4gICAgICAgICAgICBpbWFnZUVsLmF0dHIoJ3NyYycsIGltYWdlU3JjKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGltYWdlRWwuYXR0cignc3JjJywgaW1hZ2VFbC5kYXRhKCdzcmMnKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdXBkYXRlIG1lc3NhZ2UgaWYgdGhlcmUgaXMgb25lXG4gICAgICAgIGNvbnN0IG9wdGlvbk1lc3NhZ2UgPSBkYXRhLnN0b2NrX21lc3NhZ2UgfHwgZGF0YS5wdXJjaGFzaW5nX21lc3NhZ2U7XG4gICAgICAgIGlmIChvcHRpb25NZXNzYWdlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgIHRleHQ6IG9wdGlvbk1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuYWRkQ2xhc3MoJ2hhc09wdGlvbnMtLWVycm9yJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5yZW1vdmVDbGFzcygnaGFzT3B0aW9ucy0tZXJyb3InKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGUgb3IgbWFyayBhcyB1bmF2YWlsYWJsZSBvdXQgb2Ygc3RvY2sgYXR0cmlidXRlcyBpZiBlbmFibGVkXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBkYXRhIFByb2R1Y3QgYXR0cmlidXRlIGRhdGFcbiAgICAgKi9cbiAgICB1cGRhdGVQcm9kdWN0QXR0cmlidXRlcyhkYXRhKSB7XG4gICAgICAgIGNvbnN0IGJlaGF2aW9yID0gZGF0YS5vdXRfb2Zfc3RvY2tfYmVoYXZpb3I7XG4gICAgICAgIGNvbnN0IGluU3RvY2tJZHMgPSBkYXRhLmluX3N0b2NrX2F0dHJpYnV0ZXM7XG4gICAgICAgIGNvbnN0IG91dE9mU3RvY2tNZXNzYWdlID0gYCAoJHtkYXRhLm91dF9vZl9zdG9ja19tZXNzYWdlfSlgO1xuXG4gICAgICAgIGlmIChiZWhhdmlvciAhPT0gJ2hpZGVfb3B0aW9uJyAmJiBiZWhhdmlvciAhPT0gJ2xhYmVsX29wdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlLXZhbHVlXScsIHRoaXMuJHNjb3BlLmFkZCgnLmNwdV9fbW9kYWwnKSkuZWFjaCgoaSwgYXR0cmlidXRlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkYXR0cmlidXRlID0gJChhdHRyaWJ1dGUpO1xuICAgICAgICAgICAgY29uc3QgYXR0cklkID0gcGFyc2VJbnQoJGF0dHJpYnV0ZS5kYXRhKCdwcm9kdWN0LWF0dHJpYnV0ZS12YWx1ZScpLCAxMCk7XG5cbiAgICAgICAgICAgIGlmIChpblN0b2NrSWRzLmluZGV4T2YoYXR0cklkKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZUF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc2FibGVBdHRyaWJ1dGUoJGF0dHJpYnV0ZSwgYmVoYXZpb3IsIG91dE9mU3RvY2tNZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGlzYWJsZUF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlVHlwZSgkYXR0cmlidXRlKSA9PT0gJ3NldC1zZWxlY3QnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlU2VsZWN0T3B0aW9uQXR0cmlidXRlKCRhdHRyaWJ1dGUsIGJlaGF2aW9yLCBvdXRPZlN0b2NrTWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJlaGF2aW9yID09PSAnaGlkZV9vcHRpb24nKSB7XG4gICAgICAgICAgICAkYXR0cmlidXRlLmhpZGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRhdHRyaWJ1dGVcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3VuYXZhaWxhYmxlJylcbiAgICAgICAgICAgICAgICAucHJldignaW5wdXQnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzYWJsZVNlbGVjdE9wdGlvbkF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpIHtcbiAgICAgICAgY29uc3QgJHNlbGVjdCA9ICRhdHRyaWJ1dGUucGFyZW50KCk7XG5cbiAgICAgICAgaWYgKGJlaGF2aW9yID09PSAnaGlkZV9vcHRpb24nKSB7XG4gICAgICAgICAgICAkYXR0cmlidXRlLnRvZ2dsZU9wdGlvbihmYWxzZSk7XG4gICAgICAgICAgICAvLyBJZiB0aGUgYXR0cmlidXRlIGlzIHRoZSBzZWxlY3RlZCBvcHRpb24gaW4gYSBzZWxlY3QgZHJvcGRvd24sIHNlbGVjdCB0aGUgZmlyc3Qgb3B0aW9uIChNRVJDLTYzOSlcbiAgICAgICAgICAgIGlmICgkYXR0cmlidXRlLnBhcmVudCgpLnZhbCgpID09PSAkYXR0cmlidXRlLmF0dHIoJ3ZhbHVlJykpIHtcbiAgICAgICAgICAgICAgICAkc2VsZWN0WzBdLnNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGF0dHJpYnV0ZS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgJGF0dHJpYnV0ZS5odG1sKCRhdHRyaWJ1dGUuaHRtbCgpLnJlcGxhY2Uob3V0T2ZTdG9ja01lc3NhZ2UsICcnKSArIG91dE9mU3RvY2tNZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVuYWJsZUF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlVHlwZSgkYXR0cmlidXRlKSA9PT0gJ3NldC1zZWxlY3QnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbmFibGVTZWxlY3RPcHRpb25BdHRyaWJ1dGUoJGF0dHJpYnV0ZSwgYmVoYXZpb3IsIG91dE9mU3RvY2tNZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChiZWhhdmlvciA9PT0gJ2hpZGVfb3B0aW9uJykge1xuICAgICAgICAgICAgJGF0dHJpYnV0ZS5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkYXR0cmlidXRlXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd1bmF2YWlsYWJsZScpXG4gICAgICAgICAgICAgICAgLnByZXYoJ2lucHV0JylcbiAgICAgICAgICAgICAgICAuYXR0cignZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlbmFibGVTZWxlY3RPcHRpb25BdHRyaWJ1dGUoJGF0dHJpYnV0ZSwgYmVoYXZpb3IsIG91dE9mU3RvY2tNZXNzYWdlKSB7XG4gICAgICAgIGlmIChiZWhhdmlvciA9PT0gJ2hpZGVfb3B0aW9uJykge1xuICAgICAgICAgICAgJGF0dHJpYnV0ZS50b2dnbGVPcHRpb24odHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkYXR0cmlidXRlLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICAkYXR0cmlidXRlLmh0bWwoJGF0dHJpYnV0ZS5odG1sKCkucmVwbGFjZShvdXRPZlN0b2NrTWVzc2FnZSwgJycpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEF0dHJpYnV0ZVR5cGUoJGF0dHJpYnV0ZSkge1xuICAgICAgICBjb25zdCAkcGFyZW50ID0gJGF0dHJpYnV0ZS5jbG9zZXN0KCdbZGF0YS1wcm9kdWN0LWF0dHJpYnV0ZV0nKTtcbiAgICAgICAgcmV0dXJuICRwYXJlbnQgPyAkcGFyZW50LmRhdGEoJ3Byb2R1Y3QtYXR0cmlidXRlJykgOiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFsbG93IHJhZGlvIGJ1dHRvbnMgdG8gZ2V0IGRlc2VsZWN0ZWRcbiAgICAgKi9cbiAgICBpbml0UmFkaW9BdHRyaWJ1dGVzKCkge1xuICAgICAgICAkKCdbZGF0YS1wcm9kdWN0LWF0dHJpYnV0ZV0gaW5wdXRbdHlwZT1cInJhZGlvXCJdJywgdGhpcy4kc2NvcGUpLmVhY2goKGksIHJhZGlvKSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkcmFkaW8gPSAkKHJhZGlvKTtcblxuICAgICAgICAgICAgLy8gT25seSBiaW5kIHRvIGNsaWNrIG9uY2VcbiAgICAgICAgICAgIGlmICgkcmFkaW8uYXR0cignZGF0YS1zdGF0ZScpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAkcmFkaW8uY2xpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJHJhZGlvLmRhdGEoJ3N0YXRlJykgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRyYWRpby5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHJhZGlvLmRhdGEoJ3N0YXRlJywgZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkcmFkaW8uY2hhbmdlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcmFkaW8uZGF0YSgnc3RhdGUnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFJhZGlvQXR0cmlidXRlcygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkcmFkaW8uYXR0cignZGF0YS1zdGF0ZScsICRyYWRpby5wcm9wKCdjaGVja2VkJykpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBiaW5kIGV2ZW50c1xuICAgICAqL1xuICAgIGJpbmRFdmVudHMoKSB7XG4gICAgICAgIG1ha2VPcHRpb25JZHNVbmlxdWUodGhpcy4kc2NvcGUsIHRoaXMuJHByb2R1Y3RJZCwgdGhpcy5rZXkpOyAvLyBtYWtlIG9wdGlvbnMgdW5pcXVlIHNvIHRoZXJlIGFlciBubyBjb25mbGljdHMgd2hlbiBzZWxlY3Rpbmcgb3B0aW9uc1xuXG4gICAgICAgIHRoaXMuYWRkUmVxdWlyZWRDbGFzc3RvT3B0aW9ucygpOyAvLyBhZGQgXCJpc1JlcXVpcmVkXCIgdG8gcmVxdWlyZWQgb3B0aW9uc1xuICAgICAgICB0aGlzLmNoZWNrT3B0aW9uc1NlbGVjdGVkKCk7XG5cbiAgICAgICAgLy8gbGlzdGVuIGZvciBvcHRpb24gY2hhbmdlc1xuICAgICAgICB0aGlzLiRwcm9kdWN0T3B0aW9uc0VsZW1lbnQuY2hhbmdlKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdE9wdGlvbnNDaGFuZ2VkKGV2ZW50LCBldmVudC50YXJnZXQpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy4kcHJvZHVjdE9wdGlvbnNFbGVtZW50LnNob3coKTtcblxuICAgICAgICAvLyB1cGRhdGUgb3B0aW9ucyBzZWxlY3RlZCBvbiBsb2FkXG4gICAgICAgIHRoaXMuJHByb2R1Y3RPcHRpb25zRWxlbWVudC5maW5kKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKS50cmlnZ2VyKCdjaGFuZ2UnKTsgLy8gdHJpZ2dlciBzZWxlY3RlZCBjaGVja2JveCBvcHRpb25zIHRvIHVwZGF0ZSBzdGFydGluZyBjaGVja2JveCB2YWx1ZXNcbiAgICAgICAgdGhpcy4kcHJvZHVjdE9wdGlvbnNFbGVtZW50LmZpbmQoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXTpjaGVja2VkJykudHJpZ2dlcignY2hhbmdlJyk7IC8vIHRyaWdnZXIgc2VsZWN0ZWQgcmFkaW8gb3B0aW9ucyB0byB1cGRhdGUgc3RhcnRpbmcgcmFkaW8gYnV0dG9ucyB2YWx1ZXNcbiAgICAgICAgdGhpcy4kcHJvZHVjdE9wdGlvbnNFbGVtZW50LmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJykudHJpZ2dlcignY2hhbmdlJyk7IC8vIHRyaWdnZXIgdXBkYXRlIG9uIGlucHV0IHRleHQgdG8gY2F0Y2ggYW55IGRlZmF1bHQgdmFsdWVzXG4gICAgICAgIHRoaXMuJHByb2R1Y3RPcHRpb25zRWxlbWVudC5maW5kKCdpbnB1dFt0eXBlPVwibnVtYmVyXCJdJykudHJpZ2dlcignY2hhbmdlJyk7IC8vIHRyaWdnZXIgdXBkYXRlIG9uIGlucHV0IG51bWJlcnMgdG8gY2F0Y2ggYW55IGRlZmF1bHQgdmFsdWVzXG4gICAgICAgIHRoaXMuJHByb2R1Y3RPcHRpb25zRWxlbWVudC5maW5kKCd0ZXh0YXJlYScpLnRyaWdnZXIoJ2NoYW5nZScpOyAvLyB0cmlnZ2VyIHVwZGF0ZSBvbiB0ZXh0YXJlYSB0cCBjYXRjaCBhbnkgZGVmYXVsdCB2YWx1ZXNcbiAgICAgICAgdGhpcy4kcHJvZHVjdE9wdGlvbnNFbGVtZW50LmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpLnBhcmVudCgpLnRyaWdnZXIoJ2NoYW5nZScpOyAvLyB0cmlnZ2VyIHNlbGVjdGVkIG9wdGlvbnMgdG8gdXBkYXRlIHN0YXJ0aW5nIHNlbGVjdCBib3ggdmFsdWVzXG4gICAgfVxufVxuIiwiaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBzd2FsIGZyb20gJ3N3ZWV0YWxlcnQyJztcbmltcG9ydCBDYXJ0UGFnZVVwc2VsbFByb2R1Y3QgZnJvbSAnLi9jYXJ0LXBhZ2UtdXBzZWxsLXByb2R1Y3QtZGV0YWlscyc7XG5pbXBvcnQgbWFrZU9wdGlvbklkc1VuaXF1ZSBmcm9tICcuL21ha2Utb3B0aW9ucy11bmlxdWUnO1xuaW1wb3J0IGZvcm1hdENhcm91c2VsIGZyb20gJy4uL2NvbW1vbi9jYXJvdXNlbC9pbmRleCc7XG5pbXBvcnQgdXBzZWxsU3VpdGVDUFUgZnJvbSAnLi91cHNlbGwtYXJyYXktY2FydC1wYWdlJztcblxuaW1wb3J0IG1lZGlhUXVlcnlMaXN0RmFjdG9yeSBmcm9tICcuLi9jb21tb24vbWVkaWEtcXVlcnktbGlzdCc7XG5cbi8vICBBcHIgMjAxOTogdXBkYXRlZCB2ZXJzaW9uIGluY2x1ZGVzIElUUyBVcHNlbGwgU3VpdGVcbmNvbnN0IFZFUlNJT04gPSAnMi4wJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FydFBhZ2VVcHNlbGwge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0ludHVpdFNvbHV0aW9ucy5uZXQgLSBDYXJ0IFBhZ2UgVXBzZWxsJywgVkVSU0lPTik7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIG9wdGlvbnMgPSAncmVsYXRlZCcsICdzaW1pbGFyJywgJ2N1c3RvbSBmaWVsZHMnXG4gICAgICAgICAqIGVycm9yRGVmYXVsdCA9IGJhY2t1cCBtb2RlOyBvbmx5IG5lY2Vzc2FyeSB3aXRoIFVwc2VsbCBTdWl0ZVxuICAgICAgICAgKiAtLSByZWxhdGVkID0gYXV0b21hdGljYWxseSBsb2FkcyByZWxhdGVkIHByb2R1Y3RzIGZyb20gYSByYW5kb20gaXRlbSBpbiB0aGUgY2FydFxuICAgICAgICAgKiAtLSBzaW1pbGFyID0gYXV0b21hdGljYWxseSBsb2FkcyBzaW1pbGFyIGJ5IHZpZXcgcHJvZHVjdHMgZnJvbSBhIHJhbmRvbSBpdGVtIGluIHRoZSBjYXJ0XG4gICAgICAgICAqIC0tIGN1c3RvbSBmaWVsZHMgPSB3aWxsIGxvYWQgdGhlIHByb2R1Y3RzIHNwZWNpZmllZCBieSB0aGUgY2FydCBpdGVtJ3MgY3VzdG9tIGZpZWxkc1xuICAgICAgICAgKiAtLSB1cHNlbGwgc3VpdGUgPSB3aWxsIGxvYWQgcHJvZHVjdHMgc3BlY2lmaWVkIGJ5IFVwc2VsbCBTdWl0ZSBDU1ZzXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1vZGUgPSAndXBzZWxsIHN1aXRlJztcbiAgICAgICAgdGhpcy5lcnJvckRlZmF1bHQgPSAncmVsYXRlZCc7XG4gICAgICAgIHRoaXMuc2hvd01vYmlsZUluQ2Fyb3VzZWwgPSB0cnVlO1xuICAgICAgICB0aGlzLnByb2R1Y3RMaW1pdCA9IDM7XG5cbiAgICAgICAgdGhpcy5sb2FkaW5nID0gJCgnI2NwdSAubG9hZGluZ092ZXJsYXknKTtcblxuICAgICAgICB1dGlscy5hcGkucHJvZHVjdC5nZXRCeUlkID0gdXRpbHMuYXBpLnByb2R1Y3QuZ2V0QnlJZC5iaW5kKHV0aWxzLmFwaS5wcm9kdWN0KTsgLy8gcmVxdWlyZWQgdG8ga2VlcCBzY29wZSBvZiB1dGlscyB0byB0aGUgdXRpbHNcbiAgICAgICAgdXRpbHMuYXBpLmdldFBhZ2UgPSB1dGlscy5hcGkuZ2V0UGFnZS5iaW5kKHV0aWxzLmFwaSk7IC8vIHJlcXVpcmVkIHRvIGtlZXAgc2NvcGUgb2YgdXRpbHMgdG8gdGhlIHV0aWxzXG5cbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVtb3ZlIGR1cGxpY2F0ZSBpdGVtcyBmcm9tIGFycmF5XG4gICAgICpcbiAgICAgKiBwdWxsZWQgZnJvbSBzdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvOTIyOTY0NS9yZW1vdmUtZHVwbGljYXRlLXZhbHVlcy1mcm9tLWpzLWFycmF5XG4gICAgICogQHBhcmFtIHthcnJheX0gdXBzZWxsVGFyZ2V0cyAtIGFycmF5IG9mIGl0ZW1zIHdlIHdhbnQgdG8gc3RyaXAgb3V0IGFueSBkdXBsaWNhdGUgaXRlbXMgZnJvbVxuICAgICAqL1xuICAgIHJlbW92ZUR1cGxpY2F0ZVRhcmdldHModXBzZWxsVGFyZ2V0cykge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KHVwc2VsbFRhcmdldHMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBnZXQgY2FydCBpdGVtcyBVUkxzIGFuZCBQcm9kdWN0IElkcyBzbyB3ZSBkb24ndCB0cnkgdG8gdXBzZWxsIGFuIGl0ZW0gdGhhdCdzIGFscmVhZHkgaW4gdGhlIGNhcnRcbiAgICAgKiBAcGFyYW0ge2FycmF5fSB1cHNlbGxUYXJnZXRzIC0gYXJyYXkgb2YgaXRlbXMgd2Ugd2FudCB0byBzdHJpcCBvdXQgYW55IGNhcnQgaXRlbSBtYXRjaGVzIGZyb21cbiAgICAgKi9cbiAgICByZW1vdmVDYXJ0SXRlbVRhcmdldHModXBzZWxsVGFyZ2V0cykge1xuICAgICAgICAvLyBnZXQgYWxsIGRhdGEgZnJvbSB0aGUgY2FydCBpdGVtc1xuICAgICAgICBjb25zdCBjYXJ0SXRlbURhdGEgPSBbXTtcbiAgICAgICAgJCgnW2RhdGEtdXBzZWxsXScpLnRvQXJyYXkoKS5mb3JFYWNoKGNhcnRJdGVtID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3R1cmwgPSAkKGNhcnRJdGVtKS5kYXRhKCdwcm9kdWN0LXVybCcpLnJlcGxhY2Uod2luZG93LmxvY2F0aW9uLm9yaWdpbiwgJycpIHx8ICcnO1xuICAgICAgICAgICAgY29uc3QgcHJvZHVjdElkID0gJChjYXJ0SXRlbSkuZGF0YSgncHJvZHVjdC1pZCcpLnRvU3RyaW5nKCkgfHwgJyc7XG4gICAgICAgICAgICBjYXJ0SXRlbURhdGEucHVzaChwcm9kdWN0dXJsLCBwcm9kdWN0SWQpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gb25seSBrZWVwIHVwc2VsbCBpdGVtcyB0aGF0IGFyZW4ndCB3aXRoaW4gb3VyIGNhcnRJdGVtRGF0YSBhcnJheVxuICAgICAgICBjb25zdCByZXN1bHQgPSB1cHNlbGxUYXJnZXRzLnJlZHVjZSgodXBzZWxsSXRlbXMsIHVwc2VsbGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChjYXJ0SXRlbURhdGEuaW5kZXhPZih1cHNlbGxpdGVtKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB1cHNlbGxJdGVtcy5wdXNoKHVwc2VsbGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVwc2VsbEl0ZW1zO1xuICAgICAgICB9LCBbXSk7XG4gICAgICAgIC8vIHJldHVybiByZXN1bHRcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBnZXQgcmFuZG9tIGludCBnaXZlbiBhIG1heFxuICAgICAqL1xuICAgIGdldFJhbmRvbUludChtYXgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IobWF4KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYXV0b21hdGljYWxseSBsb2FkIHByb2R1Y3RzIGZyb20gdGhlIGNhcnQgaXRlbSdzIGVpdGhlciByZWxhdGVkIHByb2R1Y3RzIG9yIHNpbWlsYXIgYnkgdmlldyBpdGVtc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gXCJyZWxhdGVkXCIgb3IgXCJzaW1pbGFyXCJcbiAgICAgKi9cbiAgICBsb2FkQXV0b1RhcmdldHModHlwZSkge1xuICAgICAgICBjb25zdCBpdGVtSW5kZXggPSB0aGlzLmdldFJhbmRvbUludCgkKCcuY2FydC1pdGVtJykubGVuZ3RoKTsgLy8gZ2V0IHJhbmRvbSBpdGVtIGluZGV4IChwaWNrIHJhbmRvbSBpdGVtKVxuICAgICAgICBjb25zdCBpdGVtSWQgPSAkKCcuY2FydC1pdGVtJykuZXEoaXRlbUluZGV4IHx8IDApLmRhdGEoJ3Byb2R1Y3QtaWQnKTsgLy8gZ2V0IHByb2R1Y3QgaWQgb2YgdGhhdCByYW5kb20gaXRlbVxuICAgICAgICBpZiAoaXRlbUlkID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuICQoJyNjcHUnKS5oaWRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2VlIGlmIHdlIGFscmVhZHkgYWpheCdkIGZvciB0aGVzZSB1cHNlbGwgaXRlbXNcbiAgICAgICAgbGV0IHN0b3JlZERhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBjcHVfX2l0ZW1zJHtpdGVtSWR9YCkpIHx8IFtdO1xuICAgICAgICBpZiAoc3RvcmVkRGF0YS5sZW5ndGgpIHsgLy8gaWYgYWxyZWFkeSBhamF4ZWQgYW5kIHN0b3JlZCB1cHNlbGwgaXRlbXNcbiAgICAgICAgICAgIHN0b3JlZERhdGEgPSB0aGlzLnJlbW92ZUR1cGxpY2F0ZVRhcmdldHMoc3RvcmVkRGF0YSk7IC8vIHJlbW92ZSBkdXBsaWNhdGUgdXBzZWxsIHRhcmdldHNcbiAgICAgICAgICAgIHN0b3JlZERhdGEgPSB0aGlzLnJlbW92ZUNhcnRJdGVtVGFyZ2V0cyhzdG9yZWREYXRhKTsgLy8gcmVtb3ZlIGFueSB1cHNlbGwgdGFyZ2V0cyB0aGF0IG1hdGNoIGFuIGl0ZW0gYWxyZWFkeSBpbiB0aGUgY2FydFxuICAgICAgICAgICAgdGhpcy5sb2FkVXBzZWxsVGFyZ2V0cyhzdG9yZWREYXRhKTsgLy8gbG9hZCB0aG9zZSBzdG9yZWQgdXBzZWxsIGl0ZW1zXG4gICAgICAgIH0gZWxzZSB7IC8vIG90aGVyd2lzZVxuICAgICAgICAgICAgY29uc3Qgb3B0cyA9IHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogYGN1c3RvbS9jYXJ0LXBhZ2UtdXBzZWxsLXRhcmdldHMtLSR7dHlwZX1gLFxuICAgICAgICAgICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxhdGVkX3Byb2R1Y3RzOiB7IGxpbWl0OiA3MCwgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpbWlsYXJfYnlfdmlld3M6IHsgbGltaXQ6IDcwLCB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB1dGlscy5hcGkucHJvZHVjdC5nZXRCeUlkKGl0ZW1JZCwgb3B0cywgKGVyciwgcmVzKSA9PiB7IC8vIGFqYXggZm9yIHRoZSBmaXJzdCBpdGVtJ3MgdXBzZWxsIGl0ZW1zIChzdWdnZXN0ZWQgcHJvZHVjdHMpXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCgnI2NwdScpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldHMgPSBKU09OLnBhcnNlKHJlcykgfHwgW107XG4gICAgICAgICAgICAgICAgdGFyZ2V0cyA9IHRoaXMucmVtb3ZlRHVwbGljYXRlVGFyZ2V0cyh0YXJnZXRzKTsgLy8gcmVtb3ZlIGR1cGxpY2F0ZSB1cHNlbGwgdGFyZ2V0c1xuICAgICAgICAgICAgICAgIHRhcmdldHMgPSB0aGlzLnJlbW92ZUNhcnRJdGVtVGFyZ2V0cyh0YXJnZXRzKTsgLy8gcmVtb3ZlIGFueSB1cHNlbGwgdGFyZ2V0cyB0aGF0IG1hdGNoIGFuIGl0ZW0gYWxyZWFkeSBpbiB0aGUgY2FydFxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBjcHVfX2l0ZW1zJHtpdGVtSWR9YCwgSlNPTi5zdHJpbmdpZnkodGFyZ2V0cykpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZFVwc2VsbFRhcmdldHModGFyZ2V0cyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJldHVybnMgYXJyYXkgb2YgdXBzZWxsIHByb2R1Y3QgVVJMcyBhbmQvb3IgSURzXG4gICAgICovXG4gICAgbG9hZEN1c3RvbUZpZWxkVGFyZ2V0cygpIHtcbiAgICAgICAgbGV0IHRhcmdldHMgPSBbXTtcbiAgICAgICAgJCgnW2RhdGEtdXBzZWxsXScpLnRvQXJyYXkoKS5mb3JFYWNoKGNhcnRJdGVtID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHVwc2VsbEl0ZW1zID0gJChjYXJ0SXRlbSkuZGF0YSgndXBzZWxsJyk7XG4gICAgICAgICAgICBpZiAodXBzZWxsSXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdXBzZWxsSXRlbXNcbiAgICAgICAgICAgICAgICAgICAgLnNwbGl0KCcsJylcbiAgICAgICAgICAgICAgICAgICAgLmZvckVhY2godXBzZWxsSXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodXBzZWxsSXRlbS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRzLnB1c2godXBzZWxsSXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gaWYgbW9kZSBpcyBzZXQgdG8gY3VzdG9tIGZpZWxkcyBidXQgbm8gaXRlbXMgaGF2ZSBjdXN0b20gZmllbGRzIGFwcGxpZWQsIGRlZmF1bHQgdG8gdXNpbmcgcmVsYXRlZCBwcm9kdWN0c1xuICAgICAgICBpZiAodGFyZ2V0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvYWRBdXRvVGFyZ2V0cygncmVsYXRlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHRhcmdldHMgPSB0aGlzLnJlbW92ZUR1cGxpY2F0ZVRhcmdldHModGFyZ2V0cyk7IC8vIHJlbW92ZSBkdXBsaWNhdGUgdXBzZWxsIHRhcmdldHNcbiAgICAgICAgdGFyZ2V0cyA9IHRoaXMucmVtb3ZlQ2FydEl0ZW1UYXJnZXRzKHRhcmdldHMpOyAvLyByZW1vdmUgYW55IHVwc2VsbCB0YXJnZXRzIHRoYXQgbWF0Y2ggYW4gaXRlbSBhbHJlYWR5IGluIHRoZSBjYXJ0XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRVcHNlbGxUYXJnZXRzKHRhcmdldHMpO1xuICAgIH1cblxuICAgIGFzeW5jIGxvYWRDU1ZUYXJnZXRzICgpICAgIHtcbiAgICAgICAgLy8gIGdldCB0aGUgcHJldmlvdXNseSBBSkFYZWQgcHJvZHVjdHMgZnJvbSBzZXNzaW9uU3RvcmFnZVxuICAgICAgICBjb25zdCBjcHVIVE1MdGV4dCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJjcHVDYXJkc1wiKTtcbiAgICAgICAgY29uc3QgY3B1SFRNTCA9IHVwc2VsbFN1aXRlQ1BVLnBhcnNlQXJyYXlGcm9tU3RyaW5nKGNwdUhUTUx0ZXh0KTtcblxuICAgICAgICAvLyAgaWYgbm90aGluZyBoYXMgYmVlbiBkb3dubG9hZGVkLFxuICAgICAgICAvLyAgcmV2ZXJ0IHRvIGJhY2t1cCBtb2RlXG4gICAgICAgIGlmICghY3B1SFRNTC5sZW5ndGgpIHJldHVybiB0aGlzLmxvYWRBdXRvVGFyZ2V0cyh0aGlzLmVycm9yRGVmYXVsdCk7XG5cbiAgICAgICAgLy8gIGRpc3BsYXkgdGhlIHByZXZpb3VseSBkb3dubG9hZGVkIHByb2R1Y3RzXG4gICAgICAgIGNwdUhUTUwuZm9yRWFjaChjYXJkID0+ICQoJyNjcHUgLmNwdV9fbGlzdC0tY3VzdG9tZmllbGRzJykuYXBwZW5kKGNhcmQuaHRtbCkpXG5cbiAgICAgICAgLy8gIGlmIHRoZXJlIGlzIHJvb20gZm9yIG1vcmUgcHJvZHVjdHMsXG4gICAgICAgIC8vICBmaWxsIHRoZSByZXN0IG9mIHRoZSBhZGQtb24gYnlcbiAgICAgICAgLy8gIGFkZGluZyBwcm9kdWN0cyBmcm9tIHRoZSBDU1ZzXG4gICAgICAgIC8vICBvZiBwcm9kdWN0cyBhbHJlYWR5IGluIHRoZSBDUFVcbiAgICAgICAgbGV0IHJlbWFpbmluZ1Nsb3RzID0gdGhpcy5wcm9kdWN0TGltaXQgLSBjcHVIVE1MLmxlbmd0aDtcbiAgICAgICAgaWYgKHJlbWFpbmluZ1Nsb3RzKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRzID0gYXdhaXQgdXBzZWxsU3VpdGVDUFUuZ2V0QWRkaXRpb25hbFByb2R1Y3RzKGNwdUhUTUwubWFwKHByb2R1Y3QgPT4gcHJvZHVjdC5wcm9kdWN0X2lkKSwgcmVtYWluaW5nU2xvdHMpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvYWRVcHNlbGxUYXJnZXRzKHRhcmdldHMpO1xuICAgICAgICAgICAgfSAgIGNhdGNoKGVycikgIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ1BVIHBhcnNlIGVycm9yOiBcIiwgZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYXBwbHlVcHNlbGxIYW5kbGVycygpO1xuICAgICAgICByZXR1cm4gdGhpcy5sb2FkaW5nLmhpZGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBoYW5kbGUgYWRkaW5nIGl0ZW1zIHRvIGNhcnRcbiAgICAgKi9cbiAgICBhZGRUb0NhcnQoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgcHJvZHVjdCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkucGFyZW50cygnLmNwdV9faXRlbScpO1xuICAgICAgICBwcm9kdWN0LnJlbW92ZUNsYXNzKCdoYXNFcnJvcicpOyAvLyByZW1vdmUgYW55IGVycm9yIGhpZ2hsaWdodGluZ1xuICAgICAgICAvLyBtYWtlIHN1cmUgYWxsIG9wdGlvbnMgYXJlIHNlbGVjdGVkXG4gICAgICAgIGlmIChwcm9kdWN0Lmhhc0NsYXNzKCdoYXNPcHRpb25zJykgJiYgIXByb2R1Y3QuaGFzQ2xhc3MoJ2hhc09wdGlvbnMtLXNlbGVjdGVkJykpIHtcbiAgICAgICAgICAgIHByb2R1Y3QuaGFzQ2xhc3MoJ2hhc09wdGlvbnMtLXdpcmVkJylcbiAgICAgICAgICAgICAgICA/ICQoJy5xYWF0eF9fb3B0aW9ucycsIHByb2R1Y3QpLnNsaWRlRG93bigpIC8vIGlmIG9wdGlvbnMgbG9hZGVkLCBqdXN0IHNob3cgdGhlbVxuICAgICAgICAgICAgICAgIDogdGhpcy50b2dnbGVPcHRpb25zKGV2ZW50KTsgLy8gb3B0aW9ucyBhcmVuJ3QgbG9hZGVkLCBsb2FkIHRoZW0gKyBzaG93IHRoZW1cbiAgICAgICAgICAgIHByb2R1Y3QuYWRkQ2xhc3MoJ2hhc0Vycm9yJyk7XG4gICAgICAgICAgICAkKCcuY3B1X19pdGVtLmlzQmVpbmdBZGRlZCcpLnJlbW92ZUNsYXNzKCdpc0JlaW5nQWRkZWQnKTtcbiAgICAgICAgICAgIHJldHVybiBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgIHRleHQ6ICdQbGVhc2UgbWFrZSBzdXJlIGFsbCByZXF1aXJlZCBvcHRpb25zIGhhdmUgYmVlbiBzZWxlY3RlZCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGFjdHVhbGx5IGFkZCB0byBjYXJ0XG4gICAgICAgIHRoaXMubG9hZGluZy5zaG93KCk7XG4gICAgICAgIGNvbnN0IGZvcm0gPSAkKCcuY3B1X19pdGVtLWZvcm0nLCBwcm9kdWN0KTtcbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuaXRlbUFkZChuZXcgRm9ybURhdGEoZm9ybVswXSksIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBlcnIgfHwgcmVzcG9uc2UuZGF0YS5lcnJvcjsgLy8gdGFrZSBub3RlIG9mIGVycm9yc1xuICAgICAgICAgICAgaWYgKGVycm9yTWVzc2FnZSkgeyAvLyBHdWFyZCBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICAvLyBTdHJpcCB0aGUgSFRNTCBmcm9tIHRoZSBlcnJvciBtZXNzYWdlXG4gICAgICAgICAgICAgICAgY29uc3QgdG1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgICAgICAgICAgICAgdG1wLmlubmVySFRNTCA9IGVycm9yTWVzc2FnZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcuaGlkZSgpO1xuICAgICAgICAgICAgICAgIHByb2R1Y3QuYWRkQ2xhc3MoJ2hhc0Vycm9yJyk7IC8vIGhpZ2hsZ2loaHQgZXJyb3IgaXRlbVxuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yT2Zmc2V0ID0gcHJvZHVjdC5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IChlcnJvck9mZnNldCAtIDIwKSB9LCA3MDApOyAvLyBzY3JvbGwgdXNlciB0byB0aGUgZXJyb3IgcHJvZHVjdFxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBjbGFzcyBmcm9tIG91ciAncXVlZFwiIGl0ZW1zXG4gICAgICAgICAgICAgICAgJCgnLmNwdV9faXRlbS5pc0JlaW5nQWRkZWQnKS5yZW1vdmVDbGFzcygnaXNCZWluZ0FkZGVkJyk7XG4gICAgICAgICAgICAgICAgLy8gYWxlcnQgdXNlciBvZiBlcnJvclxuICAgICAgICAgICAgICAgIHJldHVybiBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0bXAudGV4dENvbnRlbnQgfHwgdG1wLmlubmVyVGV4dCxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubG9hZGluZy5oaWRlKCk7XG4gICAgICAgICAgICAvLyBwcm9kdWN0LmFkZENsYXNzKCd3YXNBZGRlZCcpO1xuICAgICAgICAgICAgLy8gJCgnLmNwdV9faXRlbS1idXR0b24nLCBwcm9kdWN0KS50ZXh0KCdBZGRlZCB0byBDYXJ0Jyk7XG4gICAgICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKCdjcHUtcmVmcmVzaC1jYXJ0LWNvbnRlbnQnKTtcbiAgICAgICAgICAgIC8vIGlmIChwcm9kdWN0Lmhhc0NsYXNzKCdpc0JlaW5nQWRkZWQnKSkge1xuICAgICAgICAgICAgLy8gICAgIHByb2R1Y3QucmVtb3ZlQ2xhc3MoJ2lzQmVpbmdBZGRlZCcpO1xuICAgICAgICAgICAgLy8gICAgICgkKCcuY3B1X19pdGVtLmlzQmVpbmdBZGRlZCcpICYmICQoJy5jcHVfX2l0ZW0uaXNCZWluZ0FkZGVkJykubGVuZ3RoKVxuICAgICAgICAgICAgLy8gICAgICAgICA/ICQoJy5jcHVfX2l0ZW0uaXNCZWluZ0FkZGVkJykuZXEoMCkuZmluZCgnLnFhYXRjX19hZGR0b2NhcnQnKS50cmlnZ2VyKCdjbGljaycpIC8vIHRyaWdnZXIgc3VibWl0dGluZyBuZXh0IHByb2R1Y3QgdG8gdGhlIGNhcnRcbiAgICAgICAgICAgIC8vICAgICAgICAgOiB3aW5kb3cubG9jYXRpb24gPSAnL2NhcnQucGhwJztcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogd2hlbiBtb2RhbCBvcHRpb24gY2hhbmdlZCB3ZSBuZWVkIHRvIHN5bmMgdGhlIFwicmVhbFwiIGZvcm0uIFN5bmMgb3B0aW9ucyBzZWxlY3RlZCBpbiBzY29wZTEgd2l0aCBzY29wZTJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvZHVjdElkXG4gICAgICovXG4gICAgc3luY0Zvcm1PcHRpb24oZXZlbnQsIHByb2R1Y3RJZCkge1xuICAgICAgICBjb25zdCBvcHQgPSAkKGV2ZW50LnRhcmdldCkucGFyZW50cygnLmZvcm0tZmllbGQnKTtcbiAgICAgICAgY29uc3QgdHlwZSA9ICQob3B0KS5kYXRhKCdwcm9kdWN0LWF0dHJpYnV0ZScpO1xuICAgICAgICBsZXQgdGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgbGV0IHRhcmdldElkID0gbnVsbDtcbiAgICAgICAgbGV0IHZhbHVlID0gbnVsbDtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdpbnB1dC1jaGVja2JveCc6XG4gICAgICAgICAgICBjYXNlICdzZXQtcmVjdGFuZ2xlJzpcbiAgICAgICAgICAgIGNhc2UgJ3NldC1yYWRpbyc6XG4gICAgICAgICAgICBjYXNlICdwcm9kdWN0LWxpc3QnOlxuICAgICAgICAgICAgY2FzZSAnc3dhdGNoJzpcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSAkKCdpbnB1dDpjaGVja2VkJywgb3B0KTtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ICYmIHRhcmdldC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0SWQgPSB0YXJnZXQucHJvcCgnaWQnKS5yZXBsYWNlKGBfJHtwcm9kdWN0SWR9YCwgJycpLnJlcGxhY2UoJ21vZGFsXycsICcnKTtcbiAgICAgICAgICAgICAgICAgICAgJChgIyR7dGFyZ2V0SWR9YCkucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAkKGAjJHt0YXJnZXRJZH1gKS5zaWJsaW5ncygnaW5wdXQnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldElkID0gJChldmVudC50YXJnZXQpLnByb3AoJ2lkJykucmVwbGFjZShgXyR7cHJvZHVjdElkfWAsICcnKS5yZXBsYWNlKCdtb2RhbF8nLCAnJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc2V0LXNlbGVjdCc6XG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gJCgnLmZvcm0tc2VsZWN0Jywgb3B0KTtcbiAgICAgICAgICAgICAgICB0YXJnZXRJZCA9IHRhcmdldC5wcm9wKCdpZCcpLnJlcGxhY2UoYF8ke3Byb2R1Y3RJZH1gLCAnJykucmVwbGFjZSgnbW9kYWxfJywgJycpO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdGFyZ2V0LnZhbCgpO1xuICAgICAgICAgICAgICAgICQoYCMke3RhcmdldElkfWApLnZhbCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdpbnB1dC10ZXh0JzpcbiAgICAgICAgICAgIGNhc2UgJ3RleHRhcmVhJzpcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSAkKCcuZm9ybS1pbnB1dCcsIG9wdCk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0SWQgPSB0YXJnZXQucHJvcCgnaWQnKS5yZXBsYWNlKGBfJHtwcm9kdWN0SWR9YCwgJycpLnJlcGxhY2UoJ21vZGFsXycsICcnKTtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRhcmdldC52YWwoKTtcbiAgICAgICAgICAgICAgICAkKGAjJHt0YXJnZXRJZH1gKS52YWwodmFsdWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIC8vIGZvcmNlIHVwZGF0ZSBvbiB0aGUgXCJyZWFsXCIgZm9ybVxuICAgICAgICAkKGAjJHt0YXJnZXRJZH1gKS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgdG8gY2FydCBmcm9tIG1vZGFsXG4gICAgICovXG4gICAgYWRkVG9DYXJ0RnJvbU1vZGFsKG1vZGFsQ29udGVudCwgcHJvZHVjdCkge1xuICAgICAgICBjb25zdCBtb2RhbCA9IG1vZGFsQ29udGVudC5wYXJlbnRzKCcuY3B1X19tb2RhbCcpO1xuICAgICAgICBpZiAoIW1vZGFsLmhhc0NsYXNzKCdoYXNPcHRpb25zLS1zZWxlY3RlZCcpKSB7XG4gICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnUGxlYXNlIG1ha2Ugc3VyZSBhbGwgcmVxdWlyZWQgb3B0aW9ucyBoYXZlIGJlZW4gc2VsZWN0ZWQnLFxuICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgb25DbG9zZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkKCcuY3B1X19pdGVtLWJ1dHRvbi0tb3B0aW9ucycsIHByb2R1Y3QpLnRyaWdnZXIoJ2NsaWNrJyk7IC8vIHNob3cgb3B0aW9ucyBhZ2FpbiBpZiB0cmllZCBhZGRpbmcgdG8gY2FydCBiZWZvcmUgc2VsZWN0aW5nIGFsbCBvcHRpb25zXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgICQoJy5jcHVfX2l0ZW0tYnV0dG9uLS1hZGR0b2NhcnQnLCBwcm9kdWN0KS50cmlnZ2VyKCdjbGljaycpOyAvLyB0cmlnZ2VyIGFkZCB0byBjYXJ0IGJ1dHRvbiBjbGljayBvbiBtYWluIHByb2R1Y3RcbiAgICAgICAgc3dhbC5jbG9zZSgpOyAvLyBjbG9zZSBtb2RhbFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNob3cgYW5kIGxvYWQgaWYgbmVlZGVkIHRoaXMgcHJvZHVjdCdzIG9wdGlvbnNcbiAgICAgKi9cbiAgICBzaG93T3B0aW9ucyhlKSB7XG4gICAgICAgIGNvbnN0IHByb2R1Y3QgPSAkKGUuY3VycmVudFRhcmdldCkucGFyZW50cygnLmNwdV9faXRlbScpO1xuICAgICAgICBjb25zdCBuYW1lID0gJCgnLmNwdV9faXRlbS1uYW1lJywgcHJvZHVjdCkudGV4dCgpO1xuICAgICAgICBjb25zdCBvcHRpb25NYXJrdXAgPSAkKCcuY3B1X19pdGVtLW9wdGlvbnMnLCBwcm9kdWN0KS5odG1sKCk7XG4gICAgICAgIGNvbnN0IHByb2R1Y3RJZCA9ICQoJ1tuYW1lPVwicHJvZHVjdF9pZFwiXScsIHByb2R1Y3QpLnZhbCgpO1xuXG4gICAgICAgIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICB0aXRsZTogYE9wdGlvbnMgZm9yICR7bmFtZX1gLFxuICAgICAgICAgICAgaHRtbDogb3B0aW9uTWFya3VwLFxuICAgICAgICAgICAgY3VzdG9tQ2xhc3M6ICdjcHVfX21vZGFsJyxcbiAgICAgICAgICAgIHNob3dDbG9zZUJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgICAgIHNob3dDb25maXJtQnV0dG9uOiBmYWxzZSxcbiAgICAgICAgICAgIG9uT3BlbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHNpbmNlIHRoZSBtb2RhIGxIVE1MIGlzIGNsb25lZCBpdCBkb2Vzbid0IGhhdmUgYW55IGhhbmRsZXJzIGFwcGxpZWQgdG8gaXQuIFRoaXMgaGFuZGxlcyB0aGUgXCJmYWtlXCIgY2xvbmVkIG9wdGlvbnMgdG8gdXBkYXRlIHRoZSBcInJlYWxcIiBvcHRpb25zXG4gICAgICAgICAgICAgICAgY29uc3QgbW9kYWxDb250ZW50ID0gJChzd2FsLmdldENvbnRlbnQoKSk7XG4gICAgICAgICAgICAgICAgbWFrZU9wdGlvbklkc1VuaXF1ZShtb2RhbENvbnRlbnQsIHByb2R1Y3RJZCwgJ21vZGFsJyk7XG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtY3B1LW9wdGlvbi1jaGFuZ2VdJywgbW9kYWxDb250ZW50KS5jaGFuZ2UoZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bmNGb3JtT3B0aW9uKGV2ZW50LCBwcm9kdWN0SWQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIHRyaWdnZXIgZGVmYXVsdCBzZWxlY3RlZCBvcHRpb25zIHVubGVzcyB0aGVyZSdzIGFuIGVycm9yLi4gdGhlbiB3ZSdsbCBnZXQgc3R1Y2sgaW4gYSBsb29wXG4gICAgICAgICAgICAgICAgaWYgKCFwcm9kdWN0Lmhhc0NsYXNzKCdoYXNPcHRpb25zLS1lcnJvcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJ1tkYXRhLWNwdS1vcHRpb24tY2hhbmdlXScsIG1vZGFsQ29udGVudCkuZmluZCgnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykudHJpZ2dlcignY2hhbmdlJyk7IC8vIHRyaWdnZXIgc2VsZWN0ZWQgY2hlY2tib3ggb3B0aW9ucyB0byB1cGRhdGUgc3RhcnRpbmcgY2hlY2tib3ggdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgICQoJ1tkYXRhLWNwdS1vcHRpb24tY2hhbmdlXScsIG1vZGFsQ29udGVudCkuZmluZCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdOmNoZWNrZWQnKS50cmlnZ2VyKCdjaGFuZ2UnKTsgLy8gdHJpZ2dlciBzZWxlY3RlZCByYWRpbyBvcHRpb25zIHRvIHVwZGF0ZSBzdGFydGluZyByYWRpbyBidXR0b25zIHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICAkKCdbZGF0YS1jcHUtb3B0aW9uLWNoYW5nZV0nLCBtb2RhbENvbnRlbnQpLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJykudHJpZ2dlcignY2hhbmdlJyk7IC8vIHRyaWdnZXIgdXBkYXRlIG9uIGlucHV0IHRleHQgdG8gY2F0Y2ggYW55IGRlZmF1bHQgdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgICQoJ1tkYXRhLWNwdS1vcHRpb24tY2hhbmdlXScsIG1vZGFsQ29udGVudCkuZmluZCgnaW5wdXRbdHlwZT1cIm51bWJlclwiXScpLnRyaWdnZXIoJ2NoYW5nZScpOyAvLyB0cmlnZ2VyIHVwZGF0ZSBvbiBpbnB1dCBudW1iZXJzIHRvIGNhdGNoIGFueSBkZWZhdWx0IHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICAkKCdbZGF0YS1jcHUtb3B0aW9uLWNoYW5nZV0nLCBtb2RhbENvbnRlbnQpLmZpbmQoJ3RleHRhcmVhJykudHJpZ2dlcignY2hhbmdlJyk7IC8vIHRyaWdnZXIgdXBkYXRlIG9uIHRleHRhcmVhIHRwIGNhdGNoIGFueSBkZWZhdWx0IHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICAkKCdbZGF0YS1jcHUtb3B0aW9uLWNoYW5nZV0nLCBtb2RhbENvbnRlbnQpLmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpLnBhcmVudCgpLnRyaWdnZXIoJ2NoYW5nZScpOyAvLyB0cmlnZ2VyIHNlbGVjdGVkIG9wdGlvbnMgdG8gdXBkYXRlIHN0YXJ0aW5nIHNlbGVjdCBib3ggdmFsdWVzXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5vcHRpb25IYW5kbGVyc1twcm9kdWN0SWRdLnVwZGF0ZU9wdGlvblZpZXcoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbkhhbmRsZXJzW3Byb2R1Y3RJZF0uY2hlY2tPcHRpb25zU2VsZWN0ZWQobW9kYWxDb250ZW50KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBoYW5kbGUgYWRkaW5nIHRvIGNhcnQgZnJvbSBtb2RhbFxuICAgICAgICAgICAgICAgICQoJy5jcHVfX2l0ZW0tYnV0dG9uLS1tb2RhbGFkZHRvY2FydCcsIG1vZGFsQ29udGVudCkub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5hZGRUb0NhcnRGcm9tTW9kYWwobW9kYWxDb250ZW50LCBwcm9kdWN0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGFwcGx5IHVwc2VsbCBoYW5kbGVyc1xuICAgICAqL1xuICAgIGFwcGx5VXBzZWxsSGFuZGxlcnMoKSB7XG4gICAgICAgIHRoaXMub3B0aW9uSGFuZGxlcnMgPSB7fTtcbiAgICAgICAgJCgnLmNwdV9faXRlbS5oYXNPcHRpb25zJykudG9BcnJheSgpLmZvckVhY2gocHJvZHVjdCA9PiB7XG4gICAgICAgICAgICBsZXQgdGhpc0lEID0gJChwcm9kdWN0KS5maW5kKCdpbnB1dFtuYW1lPVwicHJvZHVjdF9pZFwiXScpLnZhbCgpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25IYW5kbGVyc1t0aGlzSURdID0gbmV3IENhcnRQYWdlVXBzZWxsUHJvZHVjdCgkKHByb2R1Y3QpKVxuICAgICAgICB9KTsgLy8gaGFuZGxlIG9wdGlvbnMgZm9yIGFsbCBwcm9kdWN0cyB3LyBvcHRpb25zXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMub3B0aW9uSGFuZGxlcnMpO1xuICAgICAgICAkKCcuY3B1X19pdGVtLWJ1dHRvbi0tYWRkdG9jYXJ0Jykub24oJ2NsaWNrJywgZSA9PiB0aGlzLmFkZFRvQ2FydChlKSk7IC8vIG1hbmFnZSBhZGRpbmcgdG8gY2FydFxuXG4gICAgICAgICQoJy5jcHVfX2l0ZW0tYnV0dG9uLS1vcHRpb25zJykub24oJ2NsaWNrJywgZSA9PiB0aGlzLnNob3dPcHRpb25zKGUpKTsgLy8gbWFuYWdlIGFkZGluZyB0byBjYXJ0XG5cbiAgICAgICAgdGhpcy5kaXNwbGF5SW5DYXJvdXNlbCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFKQVggdGhlIHVwc2VsbCBVUkxzIGFuZC9vciBJRHMgYW5kIGFwcGVuZCB3aGVyZSBuZWVkZWRcbiAgICAgKiBAcGFyYW0ge2FycmF5fSB0YXJnZXRzIC0gdGFyZ2V0cyB0byB1cHNlbGxcbiAgICAgKi9cbiAgICBsb2FkVXBzZWxsVGFyZ2V0cyh0YXJnZXRzKSB7XG4gICAgICAgIGlmICh0YXJnZXRzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGFyZ2V0cyA9IHRhcmdldHMuc2xpY2UoMCwgdGhpcy5wcm9kdWN0TGltaXQgfHwgdGFyZ2V0cy5sZW5ndGgpO1xuICAgICAgICAgICAgY29uc3QgcnVuUXVldWVJbk9yZGVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRzLmxlbmd0aCA9PT0gMCkgeyAvLyB3aGVuIGRvbmUgYWxsIHByb2R1Y3RzXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlVcHNlbGxIYW5kbGVycygpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkaW5nLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGFyZ2V0cy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVlc3RNZXRob2QgPSB0YXJnZXQudG9TdHJpbmcoKS5tYXRjaCgvXlswLTldKyQvKSA/IHV0aWxzLmFwaS5wcm9kdWN0LmdldEJ5SWQgOiB1dGlscy5hcGkuZ2V0UGFnZTtcbiAgICAgICAgICAgICAgICByZXF1ZXN0TWV0aG9kKHRhcmdldCwgeyB0ZW1wbGF0ZTogJ2N1c3RvbS9jYXJ0LXBhZ2UtdXBzZWxsLWl0ZW0nIH0sIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHsgcmV0dXJuOyB9IC8vIGlmIGVycm9yXG4gICAgICAgICAgICAgICAgICAgICQoJyNjcHUgLmNwdV9fbGlzdC0tY3VzdG9tZmllbGRzJykuYXBwZW5kKHJlc3BvbnNlKTsgLy8gbm8gZXJyb3IsIGFwcGVuZCBtYXJrdXBcbiAgICAgICAgICAgICAgICAgICAgcnVuUXVldWVJbk9yZGVyKCk7IC8vIHJ1biBuZXh0IGl0ZW1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBydW5RdWV1ZUluT3JkZXIoKTsgLy8gc3RhcnQgdGhlIGxvb3BcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJyNjcHUnKS5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgU2xpY2sgb3B0aW9ucyB0byBwcm9kdWN0IGRpc3BsYXkgYWZ0ZXIgbG9hZGluZyBwcm9kdWN0cyxcbiAgICAgKiB0aGVuIGZpcmUgU2xpY2tcbiAgICAgKi9cbiAgICBkaXNwbGF5SW5DYXJvdXNlbCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNob3dNb2JpbGVJbkNhcm91c2VsKSByZXR1cm47XG5cbiAgICAgICAgLy8gIEFkZCBDU1MgdG8gcHJvZHVjdCBjYXJkcyBiZWZvcmUgZmlyaW5nIFNsaWNrXG4gICAgICAgICQoJy5jcHVfX2xpc3QnKS5hZGRDbGFzcygnY3B1X19saXN0LXNsaWNrJylcbiAgICAgICAgJCgnLmNwdV9faXRlbScpLmFkZENsYXNzKCdjcHVfX2l0ZW0tc2xpY2snKVxuXG4gICAgICAgICQoJy5jcHVfX2xpc3QnKS5hdHRyKCdkYXRhLXNsaWNrJywgYHtcbiAgICAgICAgICAgIFwiaW5maW5pdGVcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiZG90c1wiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiYXJyb3dzXCI6IHRydWUsXG4gICAgICAgICAgICBcIm1vYmlsZUZpcnN0XCI6IHRydWUsXG4gICAgICAgICAgICBcInJvd3NcIjogMSxcbiAgICAgICAgICAgIFwic2xpZGVzVG9TaG93XCI6IDEsXG4gICAgICAgICAgICBcInNsaWRlc1RvU2Nyb2xsXCI6IDEsXG4gICAgICAgICAgICBcInJlc3BvbnNpdmVcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJicmVha3BvaW50XCI6IDEwMjUsXG4gICAgICAgICAgICAgICAgICAgIFwic2V0dGluZ3NcIjogXCJ1bnNsaWNrXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1gKTtcblxuICAgICAgICBmb3JtYXRDYXJvdXNlbCh0aGlzLmNvbnRleHQpO1xuXG4gICAgICAgIGNvbnN0IG1lZGlhTWF0Y2ggPSBtZWRpYVF1ZXJ5TGlzdEZhY3RvcnkoJ21lZGl1bScpO1xuXG4gICAgICAgICQobWVkaWFNYXRjaCkub24oJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICAgICAgbGV0IGJpbmRUb1dpbmRvdyA9ICFlLnRhcmdldC5tYXRjaGVzXG5cbiAgICAgICAgICAgIGlmIChiaW5kVG9XaW5kb3cpIHtcbiAgICAgICAgICAgICAgICAkKCcuY3B1X19saXN0Jykuc2xpY2soJ3JlaW5pdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGJpbmQgZXZlbnRzXG4gICAgICovXG4gICAgYmluZEV2ZW50cygpIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nLnNob3coKTtcblxuICAgICAgICBzd2l0Y2ggKHRoaXMubW9kZSkge1xuICAgICAgICAgICAgY2FzZSAncmVsYXRlZCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9hZEF1dG9UYXJnZXRzKCdyZWxhdGVkJyk7XG4gICAgICAgICAgICBjYXNlICdzaW1pbGFyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkQXV0b1RhcmdldHMoJ3NpbWlsYXInKTtcbiAgICAgICAgICAgIGNhc2UgJ2N1c3RvbSBmaWVsZHMnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvYWRDdXN0b21GaWVsZFRhcmdldHMoKTtcbiAgICAgICAgICAgIGNhc2UgJ3Vwc2VsbCBzdWl0ZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9hZENTVlRhcmdldHMoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBtZWRpYVF1ZXJ5TGlzdEZhY3RvcnkgZnJvbSAnLi4vY29tbW9uL21lZGlhLXF1ZXJ5LWxpc3QnO1xuXG5jb25zdCBmbG9hdGluZ0NoZWNrb3V0QnV0dG9uID0gKCkgPT4ge1xuICAgIGNvbnN0ICRzdW1tYXJ5Q29udGFpbmVyID0gJCgnLmpzLWNhcnRfX3RvdGFscycpO1xuICAgIGNvbnN0ICRmbG9hdGluZ0J1dHRvbiA9ICQoJy5mbG9hdGluZy1jaGVja291dC1idXR0b24nKTtcbiAgICBjb25zdCBtcSA9IG1lZGlhUXVlcnlMaXN0RmFjdG9yeSgnbWVkaXVtJyk7XG5cbiAgICBmdW5jdGlvbiBXaWR0aENoYW5nZShtcSkge1xuICAgICAgICBjb25zdCBmYWRlVGltaW5nID0gNDAwO1xuXG4gICAgICAgIGlmICghbXEubWF0Y2hlcykge1xuICAgICAgICAgICAgY29uc3QgaW5pdFdpbmRvd1Bvc2l0aW9uID0gd2luZG93LnNjcm9sbFkgKyB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgICAgICAgIGlmIChpbml0V2luZG93UG9zaXRpb24gPCAkc3VtbWFyeUNvbnRhaW5lci5vZmZzZXQoKS50b3ApIHtcbiAgICAgICAgICAgICAgICAkZmxvYXRpbmdCdXR0b24uc2hvdygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkZmxvYXRpbmdCdXR0b24uaGlkZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBib3R0b21XaW5kb3dQb3NpdGlvbiA9IHdpbmRvdy5zY3JvbGxZICsgd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgaWYgKGJvdHRvbVdpbmRvd1Bvc2l0aW9uIDwgJHN1bW1hcnlDb250YWluZXIub2Zmc2V0KCkudG9wKSB7XG4gICAgICAgICAgICAgICAgICAgICRmbG9hdGluZ0J1dHRvbi5mYWRlSW4oZmFkZVRpbWluZyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJGZsb2F0aW5nQnV0dG9uLmZhZGVPdXQoZmFkZVRpbWluZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkZmxvYXRpbmdCdXR0b24uaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbXEuYWRkTGlzdGVuZXIoV2lkdGhDaGFuZ2UpO1xuICAgIFdpZHRoQ2hhbmdlKG1xKTtcblxuICAgICRmbG9hdGluZ0J1dHRvbi5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGdvVG9DaGVja291dCA9IGZhbHNlOyAvLyBTZXQgdG8gdHJ1ZSBpZiB0aGUgYnV0dG9uIHNob3VsZCBnbyB0byBjaGVja291dCBpbnN0ZWFkIG9mIHNjcm9sbGluZyB0aGUgdXNlciBkb3duIHRoZSBwYWdlXG4gICAgICAgIGNvbnN0IHRvdGFsc09mZnNldCA9ICRzdW1tYXJ5Q29udGFpbmVyLm9mZnNldCgpLnRvcDtcblxuICAgICAgICBpZiAoZ29Ub0NoZWNrb3V0KSB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvY2hlY2tvdXQucGhwJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiB0b3RhbHNPZmZzZXQgLSAxMDAgfSwgNzAwKTsgLy8gc2Nyb2xsIHVzZXIgdG8gdGhlIHJlYWwgY2hlY2tvdXQgYnV0dG9uIHByb2R1Y3RcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuZXhwb3J0IHsgZmxvYXRpbmdDaGVja291dEJ1dHRvbiB9O1xuIiwiLypcbiAqIHB1dCBwcm9kdWN0SUQgb24gdGhlIGVsZW1lbnQncyBcImZvclwiIGFuZCBcImlkXCIgYXR0cnMgc28gbXVsdGlwbGUgY2FzZXMgb2Ygc2FtZSBvcHRpb24gc2V0IHdvbid0IGNvbmZsaWN0XG4gKi9cbmNvbnN0IG1ha2VPcHRpb25JZHNVbmlxdWUgPSAoc2NvcGUsIHByb2R1Y3RJZCwga2V5KSA9PiB7XG4gICAgJCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdLCBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nLCBzY29wZSkuZWFjaCgoaW5kZXgsIGVsKSA9PiB7XG4gICAgICAgIGNvbnN0IG9wdGlvbklkID0gJChlbCkuYXR0cignaWQnKTsgLy8gdXBkYXRlIElEIHRvIGluY2x1ZGUgcHJvZHVjdCBJRFxuICAgICAgICAkKGVsKS5hdHRyKCdpZCcsIGAke2tleX1fJHtvcHRpb25JZH1fJHtwcm9kdWN0SWR9YCk7IC8vIHVwZGF0ZSBvcHRpb24gSUQgdG8gaW5jbHVkZSBwcm9kdWN0IElEXG4gICAgICAgICQoZWwpLm5leHQoKS5hdHRyKCdmb3InLCBgJHtrZXl9XyR7b3B0aW9uSWR9XyR7cHJvZHVjdElkfWApOyAvLyB1cGRhdGUgb3B0aW9uIGxhYmVsIHRvIHRhcmdldCB1cGRhdGVkIElEXG4gICAgfSk7XG4gICAgLy8gYWRkIGlucHV0IGZpZWxkcyBsYWJlbCBjbGFzcyBhbmQgcHV0IGluIGhlcmUuIFRoZXNlIG9wdGlvbnMgd2UgbmVlZCB0byBzZWxlY3QgdGhlaXIgc2libGluZyBsYWJlbFxuICAgIGNvbnN0IG9wdGlvbnNXaXRoTGFiZWxBdHRycyA9IFtcbiAgICAgICAgJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJyxcbiAgICAgICAgJ2lucHV0W3R5cGU9XCJudW1iZXJcIl0nLFxuICAgICAgICAnaW5wdXRbdHlwZT1cImZpbGVcIl0nLFxuICAgICAgICAnc2VsZWN0JyxcbiAgICAgICAgJ3RleHRhcmVhJyxcbiAgICBdXG4gICAgY29uc3Qgb3B0aW9uc1dpdGhMYWJlbEF0dHJzU2VsZWN0b3JzID0gb3B0aW9uc1dpdGhMYWJlbEF0dHJzLmpvaW4oJywnKTtcbiAgICAkKG9wdGlvbnNXaXRoTGFiZWxBdHRyc1NlbGVjdG9ycywgc2NvcGUpLnBhcmVudHMoJy5mb3JtLWZpZWxkJykuZmluZCgnbGFiZWwnKS5lYWNoKChpbmRleCwgZWwpID0+IHtcbiAgICAgICAgY29uc3Qgb3B0aW9uSWQgPSAkKGVsKS5hdHRyKCdmb3InKTsgLy8gdXBkYXRlIElEIHRvIGluY2x1ZGUgcHJvZHVjdCBJRFxuICAgICAgICAkKGVsKS5hdHRyKCdmb3InLCBgJHtrZXl9XyR7b3B0aW9uSWR9XyR7cHJvZHVjdElkfWApOyAvLyB1cGRhdGUgb3B0aW9uIElEIHRvIGluY2x1ZGUgcHJvZHVjdCBJRFxuICAgICAgICAkKGVsKS5uZXh0KCkuYXR0cignaWQnLCBgJHtrZXl9XyR7b3B0aW9uSWR9XyR7cHJvZHVjdElkfWApOyAvLyB1cGRhdGUgb3B0aW9uIGxhYmVsIHRvIHRhcmdldCB1cGRhdGVkIElEXG4gICAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1ha2VPcHRpb25JZHNVbmlxdWU7XG4iXSwic291cmNlUm9vdCI6IiJ9