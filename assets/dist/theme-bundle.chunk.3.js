(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./assets/js/theme/custom/its-product.js":
/*!***********************************************!*\
  !*** ./assets/js/theme/custom/its-product.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ITSProduct; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _custom_schematics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../custom/schematics */ "./assets/js/theme/custom/schematics.js");



/**
 * IntuitSolutions - Custom JS that fires on the PDP
 */
var ITSProduct = /*#__PURE__*/function () {
  function ITSProduct(context) {
    this.context = context;
    var showMoreReviews = this.showMoreReviews.bind(this);
    $('.js-load-more-reviews').on('click', showMoreReviews);

    // schematic + parts list buttons
    $('.schematic__content .button:not(.button--pdf)').on('click', _custom_schematics__WEBPACK_IMPORTED_MODULE_1__["default"]);
    $('.more-info-slider__text a[href="#tab-warranty"]').on('click', function (e) {
      var $targetTabId = $(e.currentTarget).attr('href');
      $(".tab-title[href=\"" + $targetTabId + "\"]").trigger('click');
    });
  }
  var _proto = ITSProduct.prototype;
  _proto.showMoreReviews = function showMoreReviews(e) {
    e.preventDefault();
    var $store = $(e.currentTarget);
    var currentPage = $store.data('current-page');
    var productPageReviewsCount = this.context.productpageReviewsCount || 3;
    var productPageURL = this.context.productpageURL;
    var nextPageURL = productPageURL + "?revpage=" + (currentPage + 1);
    $store.attr('disabled', true);
    var requestOptions = {
      config: {
        product: {
          reviews: {
            limit: productPageReviewsCount
          }
        }
      },
      template: 'products/ajax-reviews'
    };
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.getPage(nextPageURL, requestOptions, function (err, res) {
      if (err) {
        $store.attr('disable', false);
        return;
      }
      $(res).hide().appendTo("#productReviews-list").slideDown(200);
      $store.data('current-page', currentPage + 1).attr('disabled', false);
    });
  };
  return ITSProduct;
}();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/custom/schematics.js":
/*!**********************************************!*\
  !*** ./assets/js/theme/custom/schematics.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var photoswipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! photoswipe */ "./node_modules/photoswipe/dist/photoswipe.js");
/* harmony import */ var photoswipe__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(photoswipe__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var photoswipe_dist_photoswipe_ui_default__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! photoswipe/dist/photoswipe-ui-default */ "./node_modules/photoswipe/dist/photoswipe-ui-default.js");
/* harmony import */ var photoswipe_dist_photoswipe_ui_default__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(photoswipe_dist_photoswipe_ui_default__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = (function (event) {
  event.preventDefault();
  var image = new Image();
  image.src = $(event.currentTarget).attr('href') || '';
  image.onload = function (event) {
    var data = [{
      src: event.target.src,
      w: event.target.width,
      h: event.target.height
    }];
    loadGallery(data);
  };
  function loadGallery(images) {
    var pswpElement = document.querySelectorAll('.pswp')[0];
    var options = {
      index: 0,
      bgOpacity: 0.8
    };
    var gallery = new photoswipe__WEBPACK_IMPORTED_MODULE_0___default.a(pswpElement, photoswipe_dist_photoswipe_ui_default__WEBPACK_IMPORTED_MODULE_1___default.a, images, options);
    gallery.init();
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/product.js":
/*!************************************!*\
  !*** ./assets/js/theme/product.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Product; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _product_reviews__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product/reviews */ "./assets/js/theme/product/reviews.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _common_product_details__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/product-details */ "./assets/js/theme/common/product-details.js");
/* harmony import */ var _product_video_gallery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./product/video-gallery */ "./assets/js/theme/product/video-gallery.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _custom_its_product__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./custom/its-product */ "./assets/js/theme/custom/its-product.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
/*
 Import all product specific js
 */








var Product = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Product, _PageManager);
  function Product(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    _this.url = window.location.href;
    _this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    _this.$bulkPricingLink = $('[data-reveal-id="modal-bulk-pricing"]');
    _this.reviewModal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_6__["default"])('#modal-review-form')[0];
    return _this;
  }
  var _proto = Product.prototype;
  _proto.onReady = function onReady() {
    var _this2 = this;
    // Listen for foundation modal close events to sanitize URL after review.
    $(document).on('close.fndtn.reveal', function () {
      if (_this2.url.indexOf('#write_review') !== -1 && typeof window.history.replaceState === 'function') {
        window.history.replaceState(null, document.title, window.location.pathname);
      }
    });
    var validator;

    // Init collapsible
    Object(_common_collapsible__WEBPACK_IMPORTED_MODULE_2__["default"])();
    this.productDetails = new _common_product_details__WEBPACK_IMPORTED_MODULE_3__["default"]($('.productView'), this.context, window.BCData.product_attributes);
    this.productDetails.setProductVariant();
    Object(_product_video_gallery__WEBPACK_IMPORTED_MODULE_4__["default"])();
    this.bulkPricingHandler();
    var $reviewForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["classifyForm"])('.writeReview-form');
    if ($reviewForm.length === 0) return;
    var review = new _product_reviews__WEBPACK_IMPORTED_MODULE_1__["default"]({
      $reviewForm: $reviewForm
    });
    $('body').on('click', '[data-reveal-id="modal-review-form"]', function () {
      validator = review.registerValidation(_this2.context);
      _this2.ariaDescribeReviewInputs($reviewForm);
    });
    $reviewForm.on('submit', function () {
      if (validator) {
        validator.performCheck();
        return validator.areAll('valid');
      }
      return false;
    });
    this.productReviewHandler();

    /**
     * IntuitSolutions - Custom Product
     */
    this.ITSProduct = new _custom_its_product__WEBPACK_IMPORTED_MODULE_7__["default"](this.context);
  };
  _proto.ariaDescribeReviewInputs = function ariaDescribeReviewInputs($form) {
    $form.find('[data-input]').each(function (_, input) {
      var $input = $(input);
      var msgSpanId = $input.attr('name') + "-msg";
      $input.siblings('span').attr('id', msgSpanId);
      $input.attr('aria-describedby', msgSpanId);
    });
  };
  _proto.productReviewHandler = function productReviewHandler() {
    if (this.url.indexOf('#write_review') !== -1) {
      this.$reviewLink.trigger('click');
    }
  };
  _proto.bulkPricingHandler = function bulkPricingHandler() {
    if (this.url.indexOf('#bulk_pricing') !== -1) {
      this.$bulkPricingLink.trigger('click');
    }
  };
  return Product;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/product/video-gallery.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/product/video-gallery.js ***!
  \**************************************************/
/*! exports provided: VideoGallery, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoGallery", function() { return VideoGallery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return videoGallery; });
var VideoGallery = /*#__PURE__*/function () {
  function VideoGallery($element) {
    this.$player = $element.find('[data-video-player]');
    this.$videos = $element.find('[data-video-item]');
    this.currentVideo = {};
    this.bindEvents();
  }
  var _proto = VideoGallery.prototype;
  _proto.selectNewVideo = function selectNewVideo(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    this.currentVideo = {
      id: $target.data('videoId'),
      $selectedThumb: $target
    };
    this.setMainVideo();
    this.setActiveThumb();
  };
  _proto.setMainVideo = function setMainVideo() {
    this.$player.attr('src', "//www.youtube.com/embed/" + this.currentVideo.id);
  };
  _proto.setActiveThumb = function setActiveThumb() {
    this.$videos.removeClass('is-active');
    this.currentVideo.$selectedThumb.addClass('is-active');
  };
  _proto.bindEvents = function bindEvents() {
    this.$videos.on('click', this.selectNewVideo.bind(this));
  };
  return VideoGallery;
}();
function videoGallery() {
  var pluginKey = 'video-gallery';
  var $videoGallery = $("[data-" + pluginKey + "]");
  $videoGallery.each(function (index, element) {
    var $el = $(element);
    var isInitialized = $el.data(pluginKey) instanceof VideoGallery;
    if (isInitialized) {
      return;
    }
    $el.data(pluginKey, new VideoGallery($el));
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY3VzdG9tL2l0cy1wcm9kdWN0LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jdXN0b20vc2NoZW1hdGljcy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvcHJvZHVjdC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvcHJvZHVjdC92aWRlby1nYWxsZXJ5LmpzIl0sIm5hbWVzIjpbIklUU1Byb2R1Y3QiLCJjb250ZXh0Iiwic2hvd01vcmVSZXZpZXdzIiwiYmluZCIsIiQiLCJvbiIsInNjaGVtYXRpY3MiLCJlIiwiJHRhcmdldFRhYklkIiwiY3VycmVudFRhcmdldCIsImF0dHIiLCJ0cmlnZ2VyIiwicHJldmVudERlZmF1bHQiLCIkc3RvcmUiLCJjdXJyZW50UGFnZSIsImRhdGEiLCJwcm9kdWN0UGFnZVJldmlld3NDb3VudCIsInByb2R1Y3RwYWdlUmV2aWV3c0NvdW50IiwicHJvZHVjdFBhZ2VVUkwiLCJwcm9kdWN0cGFnZVVSTCIsIm5leHRQYWdlVVJMIiwicmVxdWVzdE9wdGlvbnMiLCJjb25maWciLCJwcm9kdWN0IiwicmV2aWV3cyIsImxpbWl0IiwidGVtcGxhdGUiLCJ1dGlscyIsImFwaSIsImdldFBhZ2UiLCJlcnIiLCJyZXMiLCJoaWRlIiwiYXBwZW5kVG8iLCJzbGlkZURvd24iLCJldmVudCIsImltYWdlIiwiSW1hZ2UiLCJzcmMiLCJvbmxvYWQiLCJ0YXJnZXQiLCJ3Iiwid2lkdGgiLCJoIiwiaGVpZ2h0IiwibG9hZEdhbGxlcnkiLCJpbWFnZXMiLCJwc3dwRWxlbWVudCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsIm9wdGlvbnMiLCJpbmRleCIsImJnT3BhY2l0eSIsImdhbGxlcnkiLCJQaG90b1N3aXBlIiwiUGhvdG9Td2lwZVVJRGVmYXVsdCIsImluaXQiLCJQcm9kdWN0IiwidXJsIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiJHJldmlld0xpbmsiLCIkYnVsa1ByaWNpbmdMaW5rIiwicmV2aWV3TW9kYWwiLCJtb2RhbEZhY3RvcnkiLCJvblJlYWR5IiwiaW5kZXhPZiIsImhpc3RvcnkiLCJyZXBsYWNlU3RhdGUiLCJ0aXRsZSIsInBhdGhuYW1lIiwidmFsaWRhdG9yIiwiY29sbGFwc2libGVGYWN0b3J5IiwicHJvZHVjdERldGFpbHMiLCJQcm9kdWN0RGV0YWlscyIsIkJDRGF0YSIsInByb2R1Y3RfYXR0cmlidXRlcyIsInNldFByb2R1Y3RWYXJpYW50IiwidmlkZW9HYWxsZXJ5IiwiYnVsa1ByaWNpbmdIYW5kbGVyIiwiJHJldmlld0Zvcm0iLCJjbGFzc2lmeUZvcm0iLCJsZW5ndGgiLCJyZXZpZXciLCJSZXZpZXciLCJyZWdpc3RlclZhbGlkYXRpb24iLCJhcmlhRGVzY3JpYmVSZXZpZXdJbnB1dHMiLCJwZXJmb3JtQ2hlY2siLCJhcmVBbGwiLCJwcm9kdWN0UmV2aWV3SGFuZGxlciIsIiRmb3JtIiwiZmluZCIsImVhY2giLCJfIiwiaW5wdXQiLCIkaW5wdXQiLCJtc2dTcGFuSWQiLCJzaWJsaW5ncyIsIlBhZ2VNYW5hZ2VyIiwiVmlkZW9HYWxsZXJ5IiwiJGVsZW1lbnQiLCIkcGxheWVyIiwiJHZpZGVvcyIsImN1cnJlbnRWaWRlbyIsImJpbmRFdmVudHMiLCJzZWxlY3ROZXdWaWRlbyIsIiR0YXJnZXQiLCJpZCIsIiRzZWxlY3RlZFRodW1iIiwic2V0TWFpblZpZGVvIiwic2V0QWN0aXZlVGh1bWIiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwicGx1Z2luS2V5IiwiJHZpZGVvR2FsbGVyeSIsImVsZW1lbnQiLCIkZWwiLCJpc0luaXRpYWxpemVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBK0M7QUFDRDs7QUFFOUM7QUFDQTtBQUNBO0FBRkEsSUFJcUJBLFVBQVU7RUFDM0Isb0JBQVlDLE9BQU8sRUFBRTtJQUNqQixJQUFJLENBQUNBLE9BQU8sR0FBR0EsT0FBTztJQUV0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VCxJQUFJLENBQUNGLE9BQU8sQ0FBQ2xHLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDcUcsY0FBYyxDQUFDdkcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQzVELENBQUM7RUFBQTtBQUFBO0FBR1UsU0FBUzRFLFlBQVksR0FBRztFQUNuQyxJQUFNbUMsU0FBUyxHQUFHLGVBQWU7RUFDakMsSUFBTUMsYUFBYSxHQUFHL0csQ0FBQyxZQUFVOEcsU0FBUyxPQUFJO0VBRTlDQyxhQUFhLENBQUN0QixJQUFJLENBQUMsVUFBQzFDLEtBQUssRUFBRWlFLE9BQU8sRUFBSztJQUNuQyxJQUFNQyxHQUFHLEdBQUdqSCxDQUFDLENBQUNnSCxPQUFPLENBQUM7SUFDdEIsSUFBTUUsYUFBYSxHQUFHRCxHQUFHLENBQUN0RyxJQUFJLENBQUNtRyxTQUFTLENBQUMsWUFBWWQsWUFBWTtJQUVqRSxJQUFJa0IsYUFBYSxFQUFFO01BQ2Y7SUFDSjtJQUVBRCxHQUFHLENBQUN0RyxJQUFJLENBQUNtRyxTQUFTLEVBQUUsSUFBSWQsWUFBWSxDQUFDaUIsR0FBRyxDQUFDLENBQUM7RUFDOUMsQ0FBQyxDQUFDO0FBQ04sQyIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuMy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgc2NoZW1hdGljcyBmcm9tICcuLi9jdXN0b20vc2NoZW1hdGljcyc7XG5cbi8qKlxuICogSW50dWl0U29sdXRpb25zIC0gQ3VzdG9tIEpTIHRoYXQgZmlyZXMgb24gdGhlIFBEUFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElUU1Byb2R1Y3Qge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcblxuICAgICAgICBjb25zdCBzaG93TW9yZVJldmlld3MgPSB0aGlzLnNob3dNb3JlUmV2aWV3cy5iaW5kKHRoaXMpXG5cbiAgICAgICAgJCgnLmpzLWxvYWQtbW9yZS1yZXZpZXdzJykub24oJ2NsaWNrJywgc2hvd01vcmVSZXZpZXdzKTtcblxuICAgICAgICAvLyBzY2hlbWF0aWMgKyBwYXJ0cyBsaXN0IGJ1dHRvbnNcbiAgICAgICAgJCgnLnNjaGVtYXRpY19fY29udGVudCAuYnV0dG9uOm5vdCguYnV0dG9uLS1wZGYpJykub24oJ2NsaWNrJywgc2NoZW1hdGljcyk7XG5cbiAgICAgICAgJCgnLm1vcmUtaW5mby1zbGlkZXJfX3RleHQgYVtocmVmPVwiI3RhYi13YXJyYW50eVwiXScpLm9uKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkdGFyZ2V0VGFiSWQgPSAkKGUuY3VycmVudFRhcmdldCkuYXR0cignaHJlZicpO1xuICAgICAgICAgICAgJChgLnRhYi10aXRsZVtocmVmPVwiJHskdGFyZ2V0VGFiSWR9XCJdYCkudHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2hvd01vcmVSZXZpZXdzKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCAkc3RvcmUgPSAkKGUuY3VycmVudFRhcmdldCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRQYWdlID0gJHN0b3JlLmRhdGEoJ2N1cnJlbnQtcGFnZScpO1xuICAgICAgICBjb25zdCBwcm9kdWN0UGFnZVJldmlld3NDb3VudCA9IHRoaXMuY29udGV4dC5wcm9kdWN0cGFnZVJldmlld3NDb3VudCB8fCAzO1xuICAgICAgICBjb25zdCBwcm9kdWN0UGFnZVVSTCA9IHRoaXMuY29udGV4dC5wcm9kdWN0cGFnZVVSTDtcbiAgICAgICAgY29uc3QgbmV4dFBhZ2VVUkwgPSBgJHtwcm9kdWN0UGFnZVVSTH0/cmV2cGFnZT0ke2N1cnJlbnRQYWdlICsgMX1gO1xuXG4gICAgICAgICRzdG9yZS5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xuXG4gICAgICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgICAgcHJvZHVjdDoge1xuICAgICAgICAgICAgICAgICAgICByZXZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW1pdDogcHJvZHVjdFBhZ2VSZXZpZXdzQ291bnQsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ3Byb2R1Y3RzL2FqYXgtcmV2aWV3cycsXG4gICAgICAgIH07XG5cbiAgICAgICAgdXRpbHMuYXBpLmdldFBhZ2UobmV4dFBhZ2VVUkwsIHJlcXVlc3RPcHRpb25zLCAoZXJyLCByZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAkc3RvcmUuYXR0cignZGlzYWJsZScsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICQocmVzKS5oaWRlKCkuYXBwZW5kVG8oXCIjcHJvZHVjdFJldmlld3MtbGlzdFwiKS5zbGlkZURvd24oMjAwKTtcblxuICAgICAgICAgICAgJHN0b3JlLmRhdGEoJ2N1cnJlbnQtcGFnZScsIGN1cnJlbnRQYWdlICsgMSkuYXR0cignZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgIH0pXG4gICAgfVxufVxuIiwiaW1wb3J0IFBob3RvU3dpcGUgZnJvbSAncGhvdG9zd2lwZSc7XG5pbXBvcnQgUGhvdG9Td2lwZVVJRGVmYXVsdCBmcm9tICdwaG90b3N3aXBlL2Rpc3QvcGhvdG9zd2lwZS11aS1kZWZhdWx0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWFnZS5zcmMgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2hyZWYnKSB8fCAnJztcbiAgICBpbWFnZS5vbmxvYWQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IFt7XG4gICAgICAgICAgICBzcmM6IGV2ZW50LnRhcmdldC5zcmMsXG4gICAgICAgICAgICB3OiBldmVudC50YXJnZXQud2lkdGgsXG4gICAgICAgICAgICBoOiBldmVudC50YXJnZXQuaGVpZ2h0LFxuICAgICAgICB9XTtcblxuICAgICAgICBsb2FkR2FsbGVyeShkYXRhKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbG9hZEdhbGxlcnkoaW1hZ2VzKSB7XG4gICAgICAgIGNvbnN0IHBzd3BFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBzd3AnKVswXTtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGluZGV4OiAwLFxuICAgICAgICAgICAgYmdPcGFjaXR5OiAwLjgsXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgZ2FsbGVyeSA9IG5ldyBQaG90b1N3aXBlKHBzd3BFbGVtZW50LCBQaG90b1N3aXBlVUlEZWZhdWx0LCBpbWFnZXMsIG9wdGlvbnMpO1xuXG4gICAgICAgIGdhbGxlcnkuaW5pdCgpO1xuICAgIH1cbn1cbiIsIi8qXG4gSW1wb3J0IGFsbCBwcm9kdWN0IHNwZWNpZmljIGpzXG4gKi9cbmltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XG5pbXBvcnQgUmV2aWV3IGZyb20gJy4vcHJvZHVjdC9yZXZpZXdzJztcbmltcG9ydCBjb2xsYXBzaWJsZUZhY3RvcnkgZnJvbSAnLi9jb21tb24vY29sbGFwc2libGUnO1xuaW1wb3J0IFByb2R1Y3REZXRhaWxzIGZyb20gJy4vY29tbW9uL3Byb2R1Y3QtZGV0YWlscyc7XG5pbXBvcnQgdmlkZW9HYWxsZXJ5IGZyb20gJy4vcHJvZHVjdC92aWRlby1nYWxsZXJ5JztcbmltcG9ydCB7IGNsYXNzaWZ5Rm9ybSB9IGZyb20gJy4vY29tbW9uL3V0aWxzL2Zvcm0tdXRpbHMnO1xuaW1wb3J0IG1vZGFsRmFjdG9yeSBmcm9tICcuL2dsb2JhbC9tb2RhbCc7XG5pbXBvcnQgSVRTUHJvZHVjdCBmcm9tICcuL2N1c3RvbS9pdHMtcHJvZHVjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2R1Y3QgZXh0ZW5kcyBQYWdlTWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICBzdXBlcihjb250ZXh0KTtcbiAgICAgICAgdGhpcy51cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICAgICAgdGhpcy4kcmV2aWV3TGluayA9ICQoJ1tkYXRhLXJldmVhbC1pZD1cIm1vZGFsLXJldmlldy1mb3JtXCJdJyk7XG4gICAgICAgIHRoaXMuJGJ1bGtQcmljaW5nTGluayA9ICQoJ1tkYXRhLXJldmVhbC1pZD1cIm1vZGFsLWJ1bGstcHJpY2luZ1wiXScpO1xuICAgICAgICB0aGlzLnJldmlld01vZGFsID0gbW9kYWxGYWN0b3J5KCcjbW9kYWwtcmV2aWV3LWZvcm0nKVswXTtcbiAgICB9XG5cbiAgICBvblJlYWR5KCkge1xuICAgICAgICAvLyBMaXN0ZW4gZm9yIGZvdW5kYXRpb24gbW9kYWwgY2xvc2UgZXZlbnRzIHRvIHNhbml0aXplIFVSTCBhZnRlciByZXZpZXcuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbG9zZS5mbmR0bi5yZXZlYWwnLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy51cmwuaW5kZXhPZignI3dyaXRlX3JldmlldycpICE9PSAtMSAmJiB0eXBlb2Ygd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIGRvY3VtZW50LnRpdGxlLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgdmFsaWRhdG9yO1xuXG4gICAgICAgIC8vIEluaXQgY29sbGFwc2libGVcbiAgICAgICAgY29sbGFwc2libGVGYWN0b3J5KCk7XG5cbiAgICAgICAgdGhpcy5wcm9kdWN0RGV0YWlscyA9IG5ldyBQcm9kdWN0RGV0YWlscygkKCcucHJvZHVjdFZpZXcnKSwgdGhpcy5jb250ZXh0LCB3aW5kb3cuQkNEYXRhLnByb2R1Y3RfYXR0cmlidXRlcyk7XG4gICAgICAgIHRoaXMucHJvZHVjdERldGFpbHMuc2V0UHJvZHVjdFZhcmlhbnQoKTtcblxuICAgICAgICB2aWRlb0dhbGxlcnkoKTtcblxuICAgICAgICB0aGlzLmJ1bGtQcmljaW5nSGFuZGxlcigpO1xuXG4gICAgICAgIGNvbnN0ICRyZXZpZXdGb3JtID0gY2xhc3NpZnlGb3JtKCcud3JpdGVSZXZpZXctZm9ybScpO1xuXG4gICAgICAgIGlmICgkcmV2aWV3Rm9ybS5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgICAgICBjb25zdCByZXZpZXcgPSBuZXcgUmV2aWV3KHsgJHJldmlld0Zvcm0gfSk7XG5cbiAgICAgICAgJCgnYm9keScpLm9uKCdjbGljaycsICdbZGF0YS1yZXZlYWwtaWQ9XCJtb2RhbC1yZXZpZXctZm9ybVwiXScsICgpID0+IHtcbiAgICAgICAgICAgIHZhbGlkYXRvciA9IHJldmlldy5yZWdpc3RlclZhbGlkYXRpb24odGhpcy5jb250ZXh0KTtcbiAgICAgICAgICAgIHRoaXMuYXJpYURlc2NyaWJlUmV2aWV3SW5wdXRzKCRyZXZpZXdGb3JtKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHJldmlld0Zvcm0ub24oJ3N1Ym1pdCcsICgpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWxpZGF0b3IpIHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgdGhpcy5wcm9kdWN0UmV2aWV3SGFuZGxlcigpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnR1aXRTb2x1dGlvbnMgLSBDdXN0b20gUHJvZHVjdFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5JVFNQcm9kdWN0ID0gbmV3IElUU1Byb2R1Y3QodGhpcy5jb250ZXh0KTtcbiAgICB9XG5cbiAgICBhcmlhRGVzY3JpYmVSZXZpZXdJbnB1dHMoJGZvcm0pIHtcbiAgICAgICAgJGZvcm0uZmluZCgnW2RhdGEtaW5wdXRdJykuZWFjaCgoXywgaW5wdXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRpbnB1dCA9ICQoaW5wdXQpO1xuICAgICAgICAgICAgY29uc3QgbXNnU3BhbklkID0gYCR7JGlucHV0LmF0dHIoJ25hbWUnKX0tbXNnYDtcblxuICAgICAgICAgICAgJGlucHV0LnNpYmxpbmdzKCdzcGFuJykuYXR0cignaWQnLCBtc2dTcGFuSWQpO1xuICAgICAgICAgICAgJGlucHV0LmF0dHIoJ2FyaWEtZGVzY3JpYmVkYnknLCBtc2dTcGFuSWQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm9kdWN0UmV2aWV3SGFuZGxlcigpIHtcbiAgICAgICAgaWYgKHRoaXMudXJsLmluZGV4T2YoJyN3cml0ZV9yZXZpZXcnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuJHJldmlld0xpbmsudHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJ1bGtQcmljaW5nSGFuZGxlcigpIHtcbiAgICAgICAgaWYgKHRoaXMudXJsLmluZGV4T2YoJyNidWxrX3ByaWNpbmcnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuJGJ1bGtQcmljaW5nTGluay50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFZpZGVvR2FsbGVyeSB7XG4gICAgY29uc3RydWN0b3IoJGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy4kcGxheWVyID0gJGVsZW1lbnQuZmluZCgnW2RhdGEtdmlkZW8tcGxheWVyXScpO1xuICAgICAgICB0aGlzLiR2aWRlb3MgPSAkZWxlbWVudC5maW5kKCdbZGF0YS12aWRlby1pdGVtXScpO1xuICAgICAgICB0aGlzLmN1cnJlbnRWaWRlbyA9IHt9O1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB9XG5cbiAgICBzZWxlY3ROZXdWaWRlbyhlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCAkdGFyZ2V0ID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuXG4gICAgICAgIHRoaXMuY3VycmVudFZpZGVvID0ge1xuICAgICAgICAgICAgaWQ6ICR0YXJnZXQuZGF0YSgndmlkZW9JZCcpLFxuICAgICAgICAgICAgJHNlbGVjdGVkVGh1bWI6ICR0YXJnZXQsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5zZXRNYWluVmlkZW8oKTtcbiAgICAgICAgdGhpcy5zZXRBY3RpdmVUaHVtYigpO1xuICAgIH1cblxuICAgIHNldE1haW5WaWRlbygpIHtcbiAgICAgICAgdGhpcy4kcGxheWVyLmF0dHIoJ3NyYycsIGAvL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8ke3RoaXMuY3VycmVudFZpZGVvLmlkfWApO1xuICAgIH1cblxuICAgIHNldEFjdGl2ZVRodW1iKCkge1xuICAgICAgICB0aGlzLiR2aWRlb3MucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICB0aGlzLmN1cnJlbnRWaWRlby4kc2VsZWN0ZWRUaHVtYi5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgfVxuXG4gICAgYmluZEV2ZW50cygpIHtcbiAgICAgICAgdGhpcy4kdmlkZW9zLm9uKCdjbGljaycsIHRoaXMuc2VsZWN0TmV3VmlkZW8uYmluZCh0aGlzKSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2aWRlb0dhbGxlcnkoKSB7XG4gICAgY29uc3QgcGx1Z2luS2V5ID0gJ3ZpZGVvLWdhbGxlcnknO1xuICAgIGNvbnN0ICR2aWRlb0dhbGxlcnkgPSAkKGBbZGF0YS0ke3BsdWdpbktleX1dYCk7XG5cbiAgICAkdmlkZW9HYWxsZXJ5LmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICAgIGNvbnN0ICRlbCA9ICQoZWxlbWVudCk7XG4gICAgICAgIGNvbnN0IGlzSW5pdGlhbGl6ZWQgPSAkZWwuZGF0YShwbHVnaW5LZXkpIGluc3RhbmNlb2YgVmlkZW9HYWxsZXJ5O1xuXG4gICAgICAgIGlmIChpc0luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAkZWwuZGF0YShwbHVnaW5LZXksIG5ldyBWaWRlb0dhbGxlcnkoJGVsKSk7XG4gICAgfSk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9