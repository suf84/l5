(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./assets/js/theme/category.js":
/*!*************************************!*\
  !*** ./assets/js/theme/category.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Category; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
/* harmony import */ var _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/faceted-search */ "./assets/js/theme/common/faceted-search.js");
/* harmony import */ var _theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../theme/common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _custom_its_category__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./custom/its-category */ "./assets/js/theme/custom/its-category.js");
/* harmony import */ var _custom_toggle_category_listing_view__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./custom/toggle-category-listing-view */ "./assets/js/theme/custom/toggle-category-listing-view.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var isotope_layout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! isotope-layout */ "./node_modules/isotope-layout/js/isotope.js");
/* harmony import */ var isotope_layout__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(isotope_layout__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _custom_its_global__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./custom/its-global */ "./assets/js/theme/custom/its-global.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }










var Category = /*#__PURE__*/function (_CatalogPage) {
  _inheritsLoose(Category, _CatalogPage);
  function Category(context) {
    var _this;
    _this = _CatalogPage.call(this, context) || this;
    _this.validationDictionary = Object(_theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__["createTranslationDictionary"])(context);

    /**
     * IntuitSolutions - Custom Category
     */
    _this.ITSCategory = new _custom_its_category__WEBPACK_IMPORTED_MODULE_5__["default"](context);
    _this.toggleCategoryListingView = new _custom_toggle_category_listing_view__WEBPACK_IMPORTED_MODULE_6__["default"](context);
    return _this;
  }
  var _proto = Category.prototype;
  _proto.setLiveRegionAttributes = function setLiveRegionAttributes($element, roleType, ariaLiveStatus) {
    $element.attr({
      role: roleType,
      "aria-live": ariaLiveStatus
    });
  };
  _proto.makeShopByPriceFilterAccessible = function makeShopByPriceFilterAccessible() {
    var _this2 = this;
    if (!$("[data-shop-by-price]").length) return;
    if ($(".navList-action").hasClass("is-active")) {
      $("a.navList-action.is-active").focus();
    }
    $("a.navList-action").on("click", function () {
      return _this2.setLiveRegionAttributes($("span.price-filter-message"), "status", "assertive");
    });
  };
  _proto.setUpIsotopeAttribute = function setUpIsotopeAttribute() {
    var data = {};
    var products = this.context.productList;
    var body = this;
    axios__WEBPACK_IMPORTED_MODULE_7__["default"].get("https://sufri.api.stdlib.com/l5t@dev/getItemAttr/").then(function (response) {
      data = response.data;
      products.forEach(function (pr) {
        var el = $("#product-" + pr.id);
        el.attr("product-date-created", data["product-" + pr.id]["date_created"]);
        el.attr("product-is-featured", data["product-" + pr.id]["featured"]);
        el.attr("product-best-selling", data["product-" + pr.id]["best_selling"]);
      });
      body.configureIsotope();
    });
  };
  _proto.configureIsotope = function configureIsotope() {
    $(".grid").css("display", "grid");
    var grid = document.getElementById("grid-block");
    var iso = new isotope_layout__WEBPACK_IMPORTED_MODULE_8___default.a(grid, {
      // options...
      itemSelector: ".product",
      layoutMode: "fitRows",
      getSortData: {
        name: function name(itemElem) {
          return itemElem.getAttribute("product-data-name");
        },
        price: function price(itemElem) {
          return Number(itemElem.getAttribute("product-data-price"));
        },
        review: function review(itemElem) {
          return itemElem.getAttribute("product-data-review");
        },
        category: function category(itemElem) {
          return itemElem.getAttribute("product-data-category");
        },
        best_selling: function best_selling(itemElem) {
          return Number(itemElem.getAttribute("product-best-selling"));
        },
        newest: function newest(itemElem) {
          return itemElem.getAttribute("product-date-created");
        },
        rating_count: function rating_count(itemElem) {
          return itemElem.getAttribute("product-review-count");
        }
      }
    });
    $("#sort-select").change(function () {
      var val = $(this).val().split("-");
      console.log(val[0]);
      if (val[0] === "review") {
        console.log("rec");
        iso.arrange({
          sortBy: [val[0], "rating_count"],
          sortAscending: {
            review: false,
            rating_count: false
          }
        });
      } else {
        iso.arrange({
          sortBy: val[0],
          sortAscending: val[1] === "asc"
        });
      }
    });
    $("#featured-checkbox").change(function () {
      if (this.checked) {
        iso.arrange({
          filter: function filter(itemElem) {
            return itemElem.getAttribute("product-is-featured") === "true";
          }
        });
      } else {
        iso.arrange({
          filter: "*"
        });
      }
    });
    var filter_arr = [];
    $("[filter-checkbox]").change(function () {
      if (this.checked) {
        filter_arr.push($(this).attr("data-filter-value"));
      } else {
        var index = filter_arr.indexOf($(this).attr("data-filter-value"));
        if (index > -1) {
          // only splice array when item is found
          filter_arr.splice(index, 1); // 2nd parameter means remove one item only
        }
      }

      var temp = $(this);
      if (filter_arr.length > 0) {
        iso.arrange({
          // item element provided as argument
          filter: function filter(itemElem) {
            var val = itemElem.getAttribute("product-data-category");
            for (var i = 0; i < filter_arr.length; i++) {
              if (val.includes(filter_arr[i])) {
                return true;
              }
            }
            return false;
          }
        });
      } else {
        iso.arrange({
          filter: "*"
        });
      }
    });
  };
  _proto.onReady = function onReady() {
    var _this3 = this;
    this.populateGridProduct();
    this.arrangeFocusOnSortBy();
    $('[data-button-type="add-cart"]').on("click", function (e) {
      return _this3.setLiveRegionAttributes($(e.currentTarget).next(), "status", "polite");
    });
    this.makeShopByPriceFilterAccessible();
    Object(_global_compare_products__WEBPACK_IMPORTED_MODULE_2__["default"])(this.context);
    if ($("#facetedSearch").length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["hooks"].on("sortBy-submitted", this.onSortBySubmit);
    }
    $("a.reset-btn").on("click", function () {
      return _this3.setLiveRegionsAttributes($("span.reset-message"), "status", "polite");
    });
    this.ariaNotifyNoProducts();
    // this.setUpIsotopeAttribute();
  };
  _proto.ariaNotifyNoProducts = function ariaNotifyNoProducts() {
    var $noProductsMessage = $("[data-no-products-notification]");
    if ($noProductsMessage.length) {
      $noProductsMessage.focus();
    }
  };
  _proto.initFacetedSearch = function initFacetedSearch() {
    var _this4 = this;
    var _this$validationDicti = this.validationDictionary,
      onMinPriceError = _this$validationDicti.price_min_evaluation,
      onMaxPriceError = _this$validationDicti.price_max_evaluation,
      minPriceNotEntered = _this$validationDicti.price_min_not_entered,
      maxPriceNotEntered = _this$validationDicti.price_max_not_entered,
      onInvalidPrice = _this$validationDicti.price_invalid_value;
    var $productListingContainer = $("#product-listing-container");
    var $facetedSearchContainer = $("#faceted-search-container");
    var productsPerPage = this.context.categoryProductsPerPage;
    var requestOptions = {
      config: {
        category: {
          shop_by_price: true,
          products: {
            limit: productsPerPage
          }
        }
      },
      template: {
        productListing: this.toggleCategoryListingView.getRequestTemplateType("category"),
        sidebar: "category/sidebar"
      },
      showMore: "category/show-more"
    };
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__["default"](requestOptions, function (content) {
      $productListingContainer.html(content.productListing);
      $facetedSearchContainer.html(content.sidebar);
      $("body").triggerHandler("compareReset");
      $("html, body").animate({
        scrollTop: 0
      }, 100);

      /**
       * IntuitSolutions - Category Update
       */
      _this4.ITSCategory.afterFacetUpdate();
    }, {
      validationErrorMessages: {
        onMinPriceError: onMinPriceError,
        onMaxPriceError: onMaxPriceError,
        minPriceNotEntered: minPriceNotEntered,
        maxPriceNotEntered: maxPriceNotEntered,
        onInvalidPrice: onInvalidPrice
      }
    });
    $("body").on("productViewModeChanged", function () {
      var NewOpts = {
        config: {
          category: {
            shop_by_price: true,
            products: {
              limit: productsPerPage
            }
          }
        },
        template: {
          productListing: _this4.toggleCategoryListingView.getRequestTemplateType("category"),
          sidebar: "category/sidebar"
        },
        showMore: "category/show-more"
      };
      _this4.facetedSearch.updateRequestOptions(NewOpts);
    });
  }
  /** 
  getToken() {
    return {
      TOKEN: "l6zrmhmyv9b86pm61sm8hampmk57zgr",
      API_PATH: "https://api.bigcommerce.com/stores/89a9ntp16/v3/",
    };
  }
   requestProduct() {
    const BASE = this.getToken();
    const categoryId = this.context.categoryId;
    const endpoint = "catalog/products";
    console.log("requesting");
    console.log(BASE);
    const options = {
      method: "GET",
      url: `${BASE.API_PATH}${endpoint}`,
      params: { limit: "20" },
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": `${BASE.TOKEN}`,
        "Access-Control-Allow-Origin": "*",
      },
    };
     axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  */;
  _proto.populateGridProduct = function populateGridProduct() {
    // this.requestProduct();
    var body = this;
    var UUIDcatc = this.context.UUIDcatc;
    axios__WEBPACK_IMPORTED_MODULE_7__["default"].get("https://sufri.api.stdlib.com/l5t@dev/getAllProduct/").then(function (response) {
      var gridAllProducts = $("#grid-all-product");
      var data = response.data.product;
      var category = response.data.category;
      console.log(UUIDcatc);
      data.forEach(function (pr) {
        var img = {};
        for (var i = 0; i < pr["images"].length; i++) {
          if (pr["images"][i]["is_thumbnail"]) {
            img = pr["images"][i];
            break;
          }
        }
        var actionSection = "";
        if (pr["variants"].length > 1) {
          actionSection = "<button type=\"button\" class=\"button button--primary quickview button--quickview\" data-product-id=\"" + pr["id"] + "\">View Options</button>";
        } else {
          actionSection = "\n            <div class=\"card-atc js-card-atc\">\n              <div class=\"card-atc__section card-atc__section--qty\">\n                <label for=\"card-atc__qty-" + pr["id"] + "-" + UUIDcatc + "\" class=\"card-atc__label is-srOnly\">Quantity:</label>\n                <div class=\"card-atc-increment card-atc-increment--has-buttons js-card-atc-increment\">\n\n                  <input type=\"tel\" class=\"form-input card-atc__input card-atc__input--total js-card-atc__input--total\" name=\"card-atc__qty-" + pr["id"] + "-" + UUIDcatc + "\" id=\"card-atc__qty-" + pr["id"] + "-" + UUIDcatc + "\" value=\"1\" min=\"1\" pattern=\"[0-9]*\" aria-live=\"polite\">\n                  <div class=\"card-atc-button-wrapper\">\n                    <button class=\"button button--icon\" data-action=\"inc\" type=\"button\">\n                      <span class=\"is-srOnly\">Increase Quantity of undefined</span>\n                      <span class=\"icon-wrapper\" aria-hidden=\"true\">\n                        <svg class=\"icon\">\n                          <use xlink:href=\"#icon-add\"></use>\n                        </svg>\n                      </span>\n                    </button>\n                    <button class=\"button button--icon\" data-action=\"dec\" type=\"button\">\n                      <span class=\"is-srOnly\">Decrease Quantity of undefined</span>\n                      <span class=\"icon-wrapper\" aria-hidden=\"true\">\n                        <svg class=\"icon\">\n                          <use xlink:href=\"#icon-minus\"></use>PP\n                        </svg>\n                      </span>\n                    </button>\n                  </div>\n                </div>\n              </div>\n              <div class=\"card-atc__section card-atc__section--action\">\n                <button type=\"button\" class=\"card-atc__button button button--primary js-card-atc__button\" id=\"card-atc__add-" + pr["id"] + "-" + UUIDcatc + "\" data-default-message=\"Add to Cart\" data-wait-message=\"Adding to cart\u2026\" data-added-message=\"Add to Cart\" value=\"Add to Cart\" data-card-add-to-cart=\"/cart.php?action=add&amp;product_id=" + pr["id"] + "\" data-event-type=\"product-click\">Add to Cart</button>\n                <span class=\"product-status-message aria-description--hidden\">Adding to cart\u2026 The item has been added</span>\n              </div>\n          </div>";
        }
        var template = "\n    <div id=\"product-" + pr["id"] + "\" class=\"product\" product-data-category=\"" + (category[pr["categories"][0]] === undefined ? "" : category[pr["categories"][0]]["cat_id"].join(" ")) + "\" \n                product-data-name=\"" + pr["fake-heading"] + "\" \n                product-data-review=\"" + (pr["reviews_count"] === 0 ? 0 : pr["reviews_rating_sum"] / pr["reviews_count"]) + "\"\n                product-review-count=\"" + pr["reviews_count"] + "\" \n                product-data-price=\"" + (pr["variants"].length > 1 ? pr["variants"][0]["calculated_price"].toFixed(2) : pr["calculated_price"].toFixed(2)) + "\" \n                product-date-created=\"" + pr["date_created"] + "\" \n                product-is-featured=\"" + pr["is_featured"] + "\" product-best-selling=\"" + pr["total_sold"] + "\">\n  <div class=\"card-wrapper\">\n    <article class=\"card\" data-test=\"card-" + pr["id"] + "\">\n      <figure class=\"card-figure\">\n        <a href=\"" + pr["custom_url"]["url"] + "\" class=\"card-figure__link\" aria-label=\"" + pr["name"] + ", $" + (pr["variants"].length > 1 ? pr["variants"][0]["calculated_price"].toFixed(2) : pr["calculated_price"].toFixed(2)) + "\">\n          <div class=\" card-img-container\">\n            <img src=\"\n            " + img["url_thumbnail"] + "\" \n            alt=\"img[\"description\"]\" title=\"" + pr["fake-heading"] + "\" data-sizes=\"auto\" \n            srcset=\"\n            " + img["url_standard"] + " 80w, \n            " + img["url_standard"] + " 160w, \n            " + img["url_standard"] + " 320w, \n            " + img["url_standard"] + " 640w, \n            " + img["url_standard"] + " 960w, \n            " + img["url_standard"] + " 1280w, \n            " + img["url_standard"] + " 1920w, \n           " + img["url_standard"] + " 2560w\" \n            \n            data-srcset=\"\n            " + img["url_standard"] + " 80w, \n            " + img["url_standard"] + " 160w, \n            " + img["url_standard"] + " 320w, \n            " + img["url_standard"] + " 640w, \n            " + img["url_standard"] + " 960w, \n            " + img["url_standard"] + " 1280w, \n            " + img["url_standard"] + " 1920w, \n            " + img["url_standard"] + " 2560w\" \n            \n            class=\"card-image lazyautosizes lazyloaded\" sizes=\"248px\">\n          </div>\n        </a>\n\n        <figcaption class=\"card-figcaption\">\n          <div class=\"card-figcaption-body\">\n          </div>\n        </figcaption>\n          </figure>\n          <div class=\"card-body\">\n            <p class=\"productView-type-title h4\" product-name=\"\">" + pr["fake-heading"] + "</p>\n\n            <h3 class=\"card-title \">\n              <a aria-label=\"" + pr["name"] + ", $" + (pr["variants"].length > 1 ? pr["variants"][0]["calculated_price"].toFixed(2) : pr["calculated_price"].toFixed(2)) + "\" href=\"" + pr["custom_url"]["url"] + "\">\n                " + pr["name"] + "\n              </a>\n            </h3>\n\n            <p class=\"card-text card-text--sku\">\n              <span>\n                SKU#: " + pr["sku"] + "\n              </span>\n            </p>\n\n            <div class=\"card-text card-text--price\" data-test-info-type=\"price\">\n\n              <div class=\"price-section price-section--withoutTax rrp-price--withoutTax h4\" style=\"display: none;\">\n                <span class=\"is-srOnly\">\n                  MSRP:\n                </span>\n                <span data-product-rrp-price-without-tax=\"\" class=\"price price--rrp h5\">\n\n                </span>\n              </div>\n              <div class=\"price-section price-section--withoutTax non-sale-price--withoutTax h5\" style=\"display: none;\">\n                <span class=\"is-srOnly\">\n                  Was:\n                </span>\n                <span data-product-non-sale-price-without-tax=\"\" class=\"price price--non-sale\">\n\n                </span>\n              </div>\n              <div class=\"price-section price-section--withoutTax h4\">\n                <span class=\"price-label is-srOnly\">\n\n                </span>\n                <span class=\"price-now-label is-srOnly\" style=\"display: none;\">\n                  Now:\n                </span>\n                <span data-product-price-without-tax=\"\" class=\"price price--withoutTax\">$" + (pr["variants"].length > 1 ? pr["variants"][0]["calculated_price"].toFixed(2) : pr["calculated_price"].toFixed(2)) + "</span>\n              </div>\n            </div>\n\n            <div class=\"card-action-wrapper\">\n\n              " + actionSection + "\n              <button type=\"button\" class=\"button button--primary quickview button--quickview\" data-product-id=\"" + pr["id"] + "\">View Details</button>\n            </div>\n\n          </div>\n        </article>\n      </div>\n\n    </div>";
        gridAllProducts.append(template);
      });
      body.configureIsotopeForAll();
      body.startGlobal();
    })["catch"](function (error) {
      console.error(error);
    });
  };
  _proto.startGlobal = function startGlobal() {
    Object(_custom_its_global__WEBPACK_IMPORTED_MODULE_9__["default"])(this.context);
  };
  _proto.configureIsotopeForAll = function configureIsotopeForAll() {
    $(".grid").css("display", "grid");
    $(".lds-block").hide();
    var grid = document.getElementById("grid-all-product");
    var iso = new isotope_layout__WEBPACK_IMPORTED_MODULE_8___default.a(grid, {
      // options...
      itemSelector: ".product",
      layoutMode: "fitRows",
      getSortData: {
        name: function name(itemElem) {
          return itemElem.getAttribute("product-data-name");
        },
        price: function price(itemElem) {
          return Number(itemElem.getAttribute("product-data-price"));
        },
        review: function review(itemElem) {
          return itemElem.getAttribute("product-data-review");
        },
        category: function category(itemElem) {
          return itemElem.getAttribute("product-data-category");
        },
        best_selling: function best_selling(itemElem) {
          return Number(itemElem.getAttribute("product-best-selling"));
        },
        newest: function newest(itemElem) {
          return itemElem.getAttribute("product-date-created");
        }
      }
    });
    $("#all-sort-select").change(function () {
      var val = $(this).val().split("-");
      if (val[0] === "review") {
        iso.arrange({
          sortBy: [val[0], "rating_count"],
          sortAscending: {
            review: false,
            rating_count: false
          }
        });
      } else {
        iso.arrange({
          sortBy: val[0],
          sortAscending: val[1] === "asc"
        });
      }
    });
    var filter_arr = [];

    // $("#featured-checkbox").change(function () {
    //   if (this.checked) {
    //     if (filter_arr.length > 0) {
    //       iso.arrange({
    //         // item element provided as argument
    //         filter: function (itemElem) {
    //           const val = itemElem.getAttribute("product-data-category");
    //           for (let i = 0; i < filter_arr.length; i++) {
    //             if (val.includes(filter_arr[i])) {
    //               if (isfeatured) {
    //                 return (
    //                   itemElem.getAttribute("product-is-featured") === "true"
    //                 );
    //               } else {
    //                 return true;
    //               }
    //             }
    //           }

    //           return false;
    //         },
    //       });
    //     } else {
    //       iso.arrange({
    //         filter: function (itemElem) {
    //           return itemElem.getAttribute("product-is-featured") === "true";
    //         },
    //       });
    //     }
    //   } else {
    //     if (filter_arr.length > 0) {
    //       iso.arrange({
    //         // item element provided as argument
    //         filter: function (itemElem) {
    //           const val = itemElem.getAttribute("product-data-category");
    //           for (let i = 0; i < filter_arr.length; i++) {
    //             if (val.includes(filter_arr[i])) {
    //               return true;
    //             }
    //           }

    //           return false;
    //         },
    //       });
    //     } else {
    //       iso.arrange({ filter: "*" });
    //     }
    //   }
    // });

    $("[checkbox-filter-all]").change(function () {
      var isfeatured = $("#featured-checkbox:checked").length > 0;
      if ($(this).attr("id") !== "featured-checkbox") {
        if (this.checked) {
          filter_arr.push($(this).attr("filter-value"));
        } else {
          var index = filter_arr.indexOf($(this).attr("filter-value"));
          if (index > -1) {
            // only splice array when item is found
            filter_arr.splice(index, 1); // 2nd parameter means remove one item only
          }
        }
      }

      if (filter_arr.length > 0) {
        iso.arrange({
          // item element provided as argument
          filter: function filter(itemElem) {
            var val = itemElem.getAttribute("product-data-category");
            for (var i = 0; i < filter_arr.length; i++) {
              if (val.includes(filter_arr[i])) {
                if (isfeatured) {
                  return itemElem.getAttribute("product-is-featured") === "true";
                } else {
                  return true;
                }
              }
            }
            return false;
          }
        });
      } else if (isfeatured) {
        iso.arrange({
          filter: function filter(itemElem) {
            return itemElem.getAttribute("product-is-featured") === "true";
          }
        });
      } else {
        iso.arrange({
          filter: "*"
        });
      }
    });
    iso.arrange({
      sortBy: "best_selling",
      sortAscending: false
    });
  };
  return Category;
}(_catalog__WEBPACK_IMPORTED_MODULE_1__["default"]);

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

/***/ "./assets/js/theme/custom/its-category.js":
/*!************************************************!*\
  !*** ./assets/js/theme/custom/its-category.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ITSCategory; });
var ITSCategory = /*#__PURE__*/function () {
  function ITSCategory(context) {
    this.context = context;
  }
  var _proto = ITSCategory.prototype;
  _proto.afterFacetUpdate = function afterFacetUpdate() {};
  return ITSCategory;
}();


/***/ }),

/***/ "./assets/js/theme/custom/toggle-category-listing-view.js":
/*!****************************************************************!*\
  !*** ./assets/js/theme/custom/toggle-category-listing-view.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ToggleCategoryListingView; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");


var ToggleCategoryListingView = /*#__PURE__*/function () {
  function ToggleCategoryListingView(context) {
    var _this = this;
    this.context = context;
    this.defaultViewType = this.context.defaultViewType;
    this.oppositeViewType = this.defaultViewType !== 'grid' ? 'grid' : 'list';
    this.productsPerPage = this.context.categoryProductsPerPage;
    this.loadingOverlay = $('.loadingOverlay.loadingOverlay--product-listing');
    $('body').on('facetedSearchRefresh', function () {
      _this.addToggleEvents();
    });
    this.init();
  }
  var _proto = ToggleCategoryListingView.prototype;
  _proto.getStoredViewType = function getStoredViewType() {
    return sessionStorage.getItem('category-view-type') || null;
  };
  _proto.getRequestTemplateType = function getRequestTemplateType(type) {
    var pageType = this.getStoredViewType();
    return !pageType ? type + "/product-listing" : "custom/category-" + pageType + "-view";
  };
  _proto.storeViewType = function storeViewType(type) {
    sessionStorage.setItem('category-view-type', type);
  };
  _proto.getCategoryPage = function getCategoryPage(pageType) {
    var _this2 = this;
    var config = {
      config: {
        category: {
          shop_by_price: true,
          products: {
            limit: this.productsPerPage
          }
        }
      },
      template: "custom/category-" + pageType + "-view"
    };
    this.loadingOverlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["api"].getPage(_common_utils_url_utils__WEBPACK_IMPORTED_MODULE_1__["default"].getUrl(), config, function (err, content) {
      if (err) {
        throw new Error(err);
      }
      $('#product-listing-container').html(content);
      _this2.loadingOverlay.hide();
      _this2.storeViewType(pageType);
      _this2.addToggleEvents();
      $('body').triggerHandler('productViewModeChanged');
    });
  };
  _proto.addToggleEvents = function addToggleEvents() {
    var _this3 = this;
    $('.js-category__toggle-view').on('click', function (e) {
      var type = $(e.currentTarget).data('view-type');
      if ($(e.currentTarget).hasClass('active-category-view')) return;
      _this3.getCategoryPage(type, _this3.addToggleEvents);
    });
  };
  _proto.init = function init() {
    var storedViewType = this.getStoredViewType();
    if (storedViewType === this.defaultViewType || !storedViewType) {
      return this.addToggleEvents();
    }
    this.getCategoryPage(this.oppositeViewType);
  };
  return ToggleCategoryListingView;
}();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2N1c3RvbS9pdHMtY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2N1c3RvbS90b2dnbGUtY2F0ZWdvcnktbGlzdGluZy12aWV3LmpzIl0sIm5hbWVzIjpbIkNhdGVnb3J5IiwiY29udGV4dCIsInZhbGlkYXRpb25EaWN0aW9uYXJ5IiwiY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IiwiSVRTQ2F0ZWdvcnkiLCJ0b2dnbGVDYXRlZ29yeUxpc3RpbmdWaWV3IiwiVG9nZ2xlQ2F0ZWdvcnlMaXN0aW5nVmlldyIsInNldExpdmVSZWdpb25BdHRyaWJ1dGVzIiwiJGVsZW1lbnQiLCJyb2xlVHlwZSIsImFyaWFMaXZlU3RhdHVzIiwiYXR0ciIsInJvbGUiLCJtYWtlU2hvcEJ5UHJpY2VGaWx0ZXJBY2Nlc3NpYmxlIiwiJCIsImxlbmd0aCIsImhhc0NsYXNzIiwiZm9jdXMiLCJvbiIsInNldFVwSXNvdG9wZUF0dHJpYnV0ZSIsImRhdGEiLCJwcm9kdWN0cyIsInByb2R1Y3RMaXN0IiwiYm9keSIsImF4aW9zIiwiZ2V0IiwidGhlbiIsInJlc3BvbnNlIiwiZm9yRWFjaCIsInByIiwiZWwiLCJpZCIsImNvbmZpZ3VyZUlzb3RvcGUiLCJjc3MiLCJncmlkIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImlzbyIsIklzb3RvcGUiLCJpdGVtU2VsZWN0b3IiLCJsYXlvdXRNb2RlIiwiZ2V0U29ydERhdGEiLCJuYW1lIiwiaXRlbUVsZW0iLCJnZXRBdHRyaWJ1dGUiLCJwcmljZSIsIk51bWJlciIsInJldmlldyIsImNhdGVnb3J5IiwiYmVzdF9zZWxsaW5nIiwibmV3ZXN0IiwicmF0aW5nX2NvdW50IiwiY2hhbmdlIiwidmFsIiwic3BsaXQiLCJjb25zb2xlIiwibG9nIiwiYXJyYW5nZSIsInNvcnRCeSIsInNvcnRBc2NlbmRpbmciLCJjaGVja2VkIiwiZmlsdGVyIiwiZmlsdGVyX2FyciIsInB1c2giLCJpbmRleCIsImluZGV4T2YiLCJzcGxpY2UiLCJ0ZW1wIiwiaSIsImluY2x1ZGVzIiwib25SZWFkeSIsInBvcHVsYXRlR3JpZFByb2R1Y3QiLCJhcnJhbmdlRm9jdXNPblNvcnRCeSIsImUiLCJjdXJyZW50VGFyZ2V0IiwibmV4dCIsImNvbXBhcmVQcm9kdWN0cyIsImluaXRGYWNldGVkU2VhcmNoIiwib25Tb3J0QnlTdWJtaXQiLCJiaW5kIiwiaG9va3MiLCJzZXRMaXZlUmVnaW9uc0F0dHJpYnV0ZXMiLCJhcmlhTm90aWZ5Tm9Qcm9kdWN0cyIsIiRub1Byb2R1Y3RzTWVzc2FnZSIsIm9uTWluUHJpY2VFcnJvciIsInByaWNlX21pbl9ldmFsdWF0aW9uIiwib25NYXhQcmljZUVycm9yIiwicHJpY2VfbWF4X2V2YWx1YXRpb24iLCJtaW5QcmljZU5vdEVudGVyZWQiLCJwcmljZV9taW5fbm90X2VudGVyZWQiLCJtYXhQcmljZU5vdEVudGVyZWQiLCJwcmljZV9tYXhfbm90X2VudGVyZWQiLCJvbkludmFsaWRQcmljZSIsInByaWNlX2ludmFsaWRfdmFsdWUiLCIkcHJvZHVjdExpc3RpbmdDb250YWluZXIiLCIkZmFjZXRlZFNlYXJjaENvbnRhaW5lciIsInByb2R1Y3RzUGVyUGFnZSIsImNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlIiwicmVxdWVzdE9wdGlvbnMiLCJjb25maWciLCJzaG9wX2J5X3ByaWNlIiwibGltaXQiLCJ0ZW1wbGF0ZSIsInByb2R1Y3RMaXN0aW5nIiwiZ2V0UmVxdWVzdFRlbXBsYXRlVHlwZSIsInNpZGViYXIiLCJzaG93TW9yZSIsImZhY2V0ZWRTZWFyY2giLCJGYWNldGVkU2VhcmNoIiwiY29udGVudCIsImh0bWwiLCJ0cmlnZ2VySGFuZGxlciIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJhZnRlckZhY2V0VXBkYXRlIiwidmFsaWRhdGlvbkVycm9yTWVzc2FnZXMiLCJOZXdPcHRzIiwidXBkYXRlUmVxdWVzdE9wdGlvbnMiLCJVVUlEY2F0YyIsImdyaWRBbGxQcm9kdWN0cyIsInByb2R1Y3QiLCJpbWciLCJhY3Rpb25TZWN0aW9uIiwidW5kZWZpbmVkIiwiam9pbiIsInRvRml4ZWQiLCJhcHBlbmQiLCJjb25maWd1cmVJc290b3BlRm9yQWxsIiwic3RhcnRHbG9iYWwiLCJlcnJvciIsImN1c3RvbUdsb2JhbCIsImhpZGUiLCJpc2ZlYXR1cmVkIiwiQ2F0YWxvZ1BhZ2UiLCJUUkFOU0xBVElPTlMiLCJpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5IiwiZGljdGlvbmFyeSIsIk9iamVjdCIsImtleXMiLCJjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5IiwiSlNPTiIsInBhcnNlIiwidmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIiwiYWN0aXZlRGljdGlvbmFyeSIsImxvY2FsaXphdGlvbnMiLCJ2YWx1ZXMiLCJ0cmFuc2xhdGlvbktleXMiLCJtYXAiLCJrZXkiLCJwb3AiLCJyZWR1Y2UiLCJhY2MiLCJkZWZhdWx0Vmlld1R5cGUiLCJvcHBvc2l0ZVZpZXdUeXBlIiwibG9hZGluZ092ZXJsYXkiLCJhZGRUb2dnbGVFdmVudHMiLCJpbml0IiwiZ2V0U3RvcmVkVmlld1R5cGUiLCJzZXNzaW9uU3RvcmFnZSIsImdldEl0ZW0iLCJ0eXBlIiwicGFnZVR5cGUiLCJzdG9yZVZpZXdUeXBlIiwic2V0SXRlbSIsImdldENhdGVnb3J5UGFnZSIsInNob3ciLCJhcGkiLCJnZXRQYWdlIiwidXJsVXRpbHMiLCJnZXRVcmwiLCJlcnIiLCJFcnJvciIsInN0b3JlZFZpZXdUeXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQW1E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TyxDQUFDO01BRTdDLE1BQUksQ0FBQytDLGNBQWMsQ0FBQ3pCLElBQUksRUFBRTtNQUUxQixNQUFJLENBQUNpQyxhQUFhLENBQUNELFFBQVEsQ0FBQztNQUU1QixNQUFJLENBQUNOLGVBQWUsRUFBRTtNQUV0Qi9JLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQ2lHLGNBQWMsQ0FBQyx3QkFBd0IsQ0FBQztJQUN0RCxDQUFDLENBQUM7RUFDTixDQUFDO0VBQUEsT0FFRDhDLGVBQWUsR0FBZiwyQkFBa0I7SUFBQTtJQUNkL0ksQ0FBQyxDQUFDLDJCQUEyQixDQUFDLENBQUNJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQ3VELENBQUMsRUFBSztNQUM5QyxJQUFNeUYsSUFBSSxHQUFHcEosQ0FBQyxDQUFDMkQsQ0FBQyxDQUFDQyxhQUFhLENBQUMsQ0FBQ3RELElBQUksQ0FBQyxXQUFXLENBQUM7TUFFakQsSUFBSU4sQ0FBQyxDQUFDMkQsQ0FBQyxDQUFDQyxhQUFhLENBQUMsQ0FBQzFELFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO01BRXpELE1BQUksQ0FBQ3NKLGVBQWUsQ0FBQ0osSUFBSSxFQUFFLE1BQUksQ0FBQ0wsZUFBZSxDQUFDO0lBQ3BELENBQUMsQ0FBQztFQUNOLENBQUM7RUFBQSxPQUVEQyxJQUFJLEdBQUosZ0JBQU87SUFDSCxJQUFNZ0IsY0FBYyxHQUFHLElBQUksQ0FBQ2YsaUJBQWlCLEVBQUU7SUFFL0MsSUFBSWUsY0FBYyxLQUFLLElBQUksQ0FBQ3BCLGVBQWUsSUFBSSxDQUFDb0IsY0FBYyxFQUFFO01BQzVELE9BQU8sSUFBSSxDQUFDakIsZUFBZSxFQUFFO0lBQ2pDO0lBRUEsSUFBSSxDQUFDUyxlQUFlLENBQUMsSUFBSSxDQUFDWCxnQkFBZ0IsQ0FBQztFQUMvQyxDQUFDO0VBQUE7QUFBQSIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuMTEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBob29rcyB9IGZyb20gXCJAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlsc1wiO1xuaW1wb3J0IENhdGFsb2dQYWdlIGZyb20gXCIuL2NhdGFsb2dcIjtcbmltcG9ydCBjb21wYXJlUHJvZHVjdHMgZnJvbSBcIi4vZ2xvYmFsL2NvbXBhcmUtcHJvZHVjdHNcIjtcbmltcG9ydCBGYWNldGVkU2VhcmNoIGZyb20gXCIuL2NvbW1vbi9mYWNldGVkLXNlYXJjaFwiO1xuaW1wb3J0IHsgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IH0gZnJvbSBcIi4uL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHNcIjtcbmltcG9ydCBJVFNDYXRlZ29yeSBmcm9tIFwiLi9jdXN0b20vaXRzLWNhdGVnb3J5XCI7XG5pbXBvcnQgVG9nZ2xlQ2F0ZWdvcnlMaXN0aW5nVmlldyBmcm9tIFwiLi9jdXN0b20vdG9nZ2xlLWNhdGVnb3J5LWxpc3Rpbmctdmlld1wiO1xuaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuaW1wb3J0IElzb3RvcGUgZnJvbSBcImlzb3RvcGUtbGF5b3V0XCI7XG5pbXBvcnQgY3VzdG9tR2xvYmFsIGZyb20gXCIuL2N1c3RvbS9pdHMtZ2xvYmFsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhdGVnb3J5IGV4dGVuZHMgQ2F0YWxvZ1BhZ2Uge1xuICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgc3VwZXIoY29udGV4dCk7XG4gICAgdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeSA9IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeShjb250ZXh0KTtcblxuICAgIC8qKlxuICAgICAqIEludHVpdFNvbHV0aW9ucyAtIEN1c3RvbSBDYXRlZ29yeVxuICAgICAqL1xuICAgIHRoaXMuSVRTQ2F0ZWdvcnkgPSBuZXcgSVRTQ2F0ZWdvcnkoY29udGV4dCk7XG4gICAgdGhpcy50b2dnbGVDYXRlZ29yeUxpc3RpbmdWaWV3ID0gbmV3IFRvZ2dsZUNhdGVnb3J5TGlzdGluZ1ZpZXcoY29udGV4dCk7XG4gIH1cblxuICBzZXRMaXZlUmVnaW9uQXR0cmlidXRlcygkZWxlbWVudCwgcm9sZVR5cGUsIGFyaWFMaXZlU3RhdHVzKSB7XG4gICAgJGVsZW1lbnQuYXR0cih7XG4gICAgICByb2xlOiByb2xlVHlwZSxcbiAgICAgIFwiYXJpYS1saXZlXCI6IGFyaWFMaXZlU3RhdHVzLFxuICAgIH0pO1xuICB9XG5cbiAgbWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSgpIHtcbiAgICBpZiAoISQoXCJbZGF0YS1zaG9wLWJ5LXByaWNlXVwiKS5sZW5ndGgpIHJldHVybjtcblxuICAgIGlmICgkKFwiLm5hdkxpc3QtYWN0aW9uXCIpLmhhc0NsYXNzKFwiaXMtYWN0aXZlXCIpKSB7XG4gICAgICAkKFwiYS5uYXZMaXN0LWFjdGlvbi5pcy1hY3RpdmVcIikuZm9jdXMoKTtcbiAgICB9XG5cbiAgICAkKFwiYS5uYXZMaXN0LWFjdGlvblwiKS5vbihcImNsaWNrXCIsICgpID0+XG4gICAgICB0aGlzLnNldExpdmVSZWdpb25BdHRyaWJ1dGVzKFxuICAgICAgICAkKFwic3Bhbi5wcmljZS1maWx0ZXItbWVzc2FnZVwiKSxcbiAgICAgICAgXCJzdGF0dXNcIixcbiAgICAgICAgXCJhc3NlcnRpdmVcIlxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBzZXRVcElzb3RvcGVBdHRyaWJ1dGUoKSB7XG4gICAgbGV0IGRhdGEgPSB7fTtcbiAgICBjb25zdCBwcm9kdWN0cyA9IHRoaXMuY29udGV4dC5wcm9kdWN0TGlzdDtcbiAgICBjb25zdCBib2R5ID0gdGhpcztcbiAgICBheGlvc1xuICAgICAgLmdldChcImh0dHBzOi8vc3VmcmkuYXBpLnN0ZGxpYi5jb20vbDV0QGRldi9nZXRJdGVtQXR0ci9cIilcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICBkYXRhID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgcHJvZHVjdHMuZm9yRWFjaCgocHIpID0+IHtcbiAgICAgICAgICBjb25zdCBlbCA9ICQoYCNwcm9kdWN0LSR7cHIuaWR9YCk7XG4gICAgICAgICAgZWwuYXR0cihcbiAgICAgICAgICAgIFwicHJvZHVjdC1kYXRlLWNyZWF0ZWRcIixcbiAgICAgICAgICAgIGRhdGFbYHByb2R1Y3QtJHtwci5pZH1gXVtcImRhdGVfY3JlYXRlZFwiXVxuICAgICAgICAgICk7XG4gICAgICAgICAgZWwuYXR0cihcInByb2R1Y3QtaXMtZmVhdHVyZWRcIiwgZGF0YVtgcHJvZHVjdC0ke3ByLmlkfWBdW1wiZmVhdHVyZWRcIl0pO1xuICAgICAgICAgIGVsLmF0dHIoXG4gICAgICAgICAgICBcInByb2R1Y3QtYmVzdC1zZWxsaW5nXCIsXG4gICAgICAgICAgICBkYXRhW2Bwcm9kdWN0LSR7cHIuaWR9YF1bXCJiZXN0X3NlbGxpbmdcIl1cbiAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBib2R5LmNvbmZpZ3VyZUlzb3RvcGUoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgY29uZmlndXJlSXNvdG9wZSgpIHtcbiAgICAkKFwiLmdyaWRcIikuY3NzKFwiZGlzcGxheVwiLCBcImdyaWRcIik7XG4gICAgbGV0IGdyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdyaWQtYmxvY2tcIik7XG4gICAgbGV0IGlzbyA9IG5ldyBJc290b3BlKGdyaWQsIHtcbiAgICAgIC8vIG9wdGlvbnMuLi5cbiAgICAgIGl0ZW1TZWxlY3RvcjogXCIucHJvZHVjdFwiLFxuICAgICAgbGF5b3V0TW9kZTogXCJmaXRSb3dzXCIsXG4gICAgICBnZXRTb3J0RGF0YToge1xuICAgICAgICBuYW1lOiBmdW5jdGlvbiAoaXRlbUVsZW0pIHtcbiAgICAgICAgICByZXR1cm4gaXRlbUVsZW0uZ2V0QXR0cmlidXRlKFwicHJvZHVjdC1kYXRhLW5hbWVcIik7XG4gICAgICAgIH0sXG4gICAgICAgIHByaWNlOiBmdW5jdGlvbiAoaXRlbUVsZW0pIHtcbiAgICAgICAgICByZXR1cm4gTnVtYmVyKGl0ZW1FbGVtLmdldEF0dHJpYnV0ZShcInByb2R1Y3QtZGF0YS1wcmljZVwiKSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJldmlldzogZnVuY3Rpb24gKGl0ZW1FbGVtKSB7XG4gICAgICAgICAgcmV0dXJuIGl0ZW1FbGVtLmdldEF0dHJpYnV0ZShcInByb2R1Y3QtZGF0YS1yZXZpZXdcIik7XG4gICAgICAgIH0sXG4gICAgICAgIGNhdGVnb3J5OiBmdW5jdGlvbiAoaXRlbUVsZW0pIHtcbiAgICAgICAgICByZXR1cm4gaXRlbUVsZW0uZ2V0QXR0cmlidXRlKFwicHJvZHVjdC1kYXRhLWNhdGVnb3J5XCIpO1xuICAgICAgICB9LFxuICAgICAgICBiZXN0X3NlbGxpbmc6IGZ1bmN0aW9uIChpdGVtRWxlbSkge1xuICAgICAgICAgIHJldHVybiBOdW1iZXIoaXRlbUVsZW0uZ2V0QXR0cmlidXRlKFwicHJvZHVjdC1iZXN0LXNlbGxpbmdcIikpO1xuICAgICAgICB9LFxuICAgICAgICBuZXdlc3Q6IGZ1bmN0aW9uIChpdGVtRWxlbSkge1xuICAgICAgICAgIHJldHVybiBpdGVtRWxlbS5nZXRBdHRyaWJ1dGUoXCJwcm9kdWN0LWRhdGUtY3JlYXRlZFwiKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmF0aW5nX2NvdW50OiBmdW5jdGlvbiAoaXRlbUVsZW0pIHtcbiAgICAgICAgICByZXR1cm4gaXRlbUVsZW0uZ2V0QXR0cmlidXRlKFwicHJvZHVjdC1yZXZpZXctY291bnRcIik7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgJChcIiNzb3J0LXNlbGVjdFwiKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgdmFsID0gJCh0aGlzKS52YWwoKS5zcGxpdChcIi1cIik7XG4gICAgICBjb25zb2xlLmxvZyh2YWxbMF0pO1xuICAgICAgaWYgKHZhbFswXSA9PT0gXCJyZXZpZXdcIikge1xuICAgICAgICBjb25zb2xlLmxvZyhcInJlY1wiKTtcbiAgICAgICAgaXNvLmFycmFuZ2Uoe1xuICAgICAgICAgIHNvcnRCeTogW3ZhbFswXSwgXCJyYXRpbmdfY291bnRcIl0sXG4gICAgICAgICAgc29ydEFzY2VuZGluZzoge1xuICAgICAgICAgICAgcmV2aWV3OiBmYWxzZSxcbiAgICAgICAgICAgIHJhdGluZ19jb3VudDogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpc28uYXJyYW5nZSh7XG4gICAgICAgICAgc29ydEJ5OiB2YWxbMF0sXG4gICAgICAgICAgc29ydEFzY2VuZGluZzogdmFsWzFdID09PSBcImFzY1wiLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICQoXCIjZmVhdHVyZWQtY2hlY2tib3hcIikuY2hhbmdlKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgaXNvLmFycmFuZ2Uoe1xuICAgICAgICAgIGZpbHRlcjogZnVuY3Rpb24gKGl0ZW1FbGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbUVsZW0uZ2V0QXR0cmlidXRlKFwicHJvZHVjdC1pcy1mZWF0dXJlZFwiKSA9PT0gXCJ0cnVlXCI7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpc28uYXJyYW5nZSh7IGZpbHRlcjogXCIqXCIgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBmaWx0ZXJfYXJyID0gW107XG5cbiAgICAkKFwiW2ZpbHRlci1jaGVja2JveF1cIikuY2hhbmdlKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgZmlsdGVyX2Fyci5wdXNoKCQodGhpcykuYXR0cihcImRhdGEtZmlsdGVyLXZhbHVlXCIpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gZmlsdGVyX2Fyci5pbmRleE9mKCQodGhpcykuYXR0cihcImRhdGEtZmlsdGVyLXZhbHVlXCIpKTtcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAvLyBvbmx5IHNwbGljZSBhcnJheSB3aGVuIGl0ZW0gaXMgZm91bmRcbiAgICAgICAgICBmaWx0ZXJfYXJyLnNwbGljZShpbmRleCwgMSk7IC8vIDJuZCBwYXJhbWV0ZXIgbWVhbnMgcmVtb3ZlIG9uZSBpdGVtIG9ubHlcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgdGVtcCA9ICQodGhpcyk7XG4gICAgICBpZiAoZmlsdGVyX2Fyci5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlzby5hcnJhbmdlKHtcbiAgICAgICAgICAvLyBpdGVtIGVsZW1lbnQgcHJvdmlkZWQgYXMgYXJndW1lbnRcbiAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIChpdGVtRWxlbSkge1xuICAgICAgICAgICAgY29uc3QgdmFsID0gaXRlbUVsZW0uZ2V0QXR0cmlidXRlKFwicHJvZHVjdC1kYXRhLWNhdGVnb3J5XCIpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWx0ZXJfYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIGlmICh2YWwuaW5jbHVkZXMoZmlsdGVyX2FycltpXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpc28uYXJyYW5nZSh7IGZpbHRlcjogXCIqXCIgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBvblJlYWR5KCkge1xuICAgIHRoaXMucG9wdWxhdGVHcmlkUHJvZHVjdCgpO1xuICAgIHRoaXMuYXJyYW5nZUZvY3VzT25Tb3J0QnkoKTtcblxuICAgICQoJ1tkYXRhLWJ1dHRvbi10eXBlPVwiYWRkLWNhcnRcIl0nKS5vbihcImNsaWNrXCIsIChlKSA9PlxuICAgICAgdGhpcy5zZXRMaXZlUmVnaW9uQXR0cmlidXRlcyhcbiAgICAgICAgJChlLmN1cnJlbnRUYXJnZXQpLm5leHQoKSxcbiAgICAgICAgXCJzdGF0dXNcIixcbiAgICAgICAgXCJwb2xpdGVcIlxuICAgICAgKVxuICAgICk7XG5cbiAgICB0aGlzLm1ha2VTaG9wQnlQcmljZUZpbHRlckFjY2Vzc2libGUoKTtcblxuICAgIGNvbXBhcmVQcm9kdWN0cyh0aGlzLmNvbnRleHQpO1xuXG4gICAgaWYgKCQoXCIjZmFjZXRlZFNlYXJjaFwiKS5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmluaXRGYWNldGVkU2VhcmNoKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub25Tb3J0QnlTdWJtaXQgPSB0aGlzLm9uU29ydEJ5U3VibWl0LmJpbmQodGhpcyk7XG4gICAgICBob29rcy5vbihcInNvcnRCeS1zdWJtaXR0ZWRcIiwgdGhpcy5vblNvcnRCeVN1Ym1pdCk7XG4gICAgfVxuXG4gICAgJChcImEucmVzZXQtYnRuXCIpLm9uKFwiY2xpY2tcIiwgKCkgPT5cbiAgICAgIHRoaXMuc2V0TGl2ZVJlZ2lvbnNBdHRyaWJ1dGVzKCQoXCJzcGFuLnJlc2V0LW1lc3NhZ2VcIiksIFwic3RhdHVzXCIsIFwicG9saXRlXCIpXG4gICAgKTtcblxuICAgIHRoaXMuYXJpYU5vdGlmeU5vUHJvZHVjdHMoKTtcbiAgICAvLyB0aGlzLnNldFVwSXNvdG9wZUF0dHJpYnV0ZSgpO1xuICB9XG5cbiAgYXJpYU5vdGlmeU5vUHJvZHVjdHMoKSB7XG4gICAgY29uc3QgJG5vUHJvZHVjdHNNZXNzYWdlID0gJChcIltkYXRhLW5vLXByb2R1Y3RzLW5vdGlmaWNhdGlvbl1cIik7XG4gICAgaWYgKCRub1Byb2R1Y3RzTWVzc2FnZS5sZW5ndGgpIHtcbiAgICAgICRub1Byb2R1Y3RzTWVzc2FnZS5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIGluaXRGYWNldGVkU2VhcmNoKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHByaWNlX21pbl9ldmFsdWF0aW9uOiBvbk1pblByaWNlRXJyb3IsXG4gICAgICBwcmljZV9tYXhfZXZhbHVhdGlvbjogb25NYXhQcmljZUVycm9yLFxuICAgICAgcHJpY2VfbWluX25vdF9lbnRlcmVkOiBtaW5QcmljZU5vdEVudGVyZWQsXG4gICAgICBwcmljZV9tYXhfbm90X2VudGVyZWQ6IG1heFByaWNlTm90RW50ZXJlZCxcbiAgICAgIHByaWNlX2ludmFsaWRfdmFsdWU6IG9uSW52YWxpZFByaWNlLFxuICAgIH0gPSB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5O1xuICAgIGNvbnN0ICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciA9ICQoXCIjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lclwiKTtcbiAgICBjb25zdCAkZmFjZXRlZFNlYXJjaENvbnRhaW5lciA9ICQoXCIjZmFjZXRlZC1zZWFyY2gtY29udGFpbmVyXCIpO1xuICAgIGNvbnN0IHByb2R1Y3RzUGVyUGFnZSA9IHRoaXMuY29udGV4dC5jYXRlZ29yeVByb2R1Y3RzUGVyUGFnZTtcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICAgIGNvbmZpZzoge1xuICAgICAgICBjYXRlZ29yeToge1xuICAgICAgICAgIHNob3BfYnlfcHJpY2U6IHRydWUsXG4gICAgICAgICAgcHJvZHVjdHM6IHtcbiAgICAgICAgICAgIGxpbWl0OiBwcm9kdWN0c1BlclBhZ2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZToge1xuICAgICAgICBwcm9kdWN0TGlzdGluZzpcbiAgICAgICAgICB0aGlzLnRvZ2dsZUNhdGVnb3J5TGlzdGluZ1ZpZXcuZ2V0UmVxdWVzdFRlbXBsYXRlVHlwZShcImNhdGVnb3J5XCIpLFxuICAgICAgICBzaWRlYmFyOiBcImNhdGVnb3J5L3NpZGViYXJcIixcbiAgICAgIH0sXG4gICAgICBzaG93TW9yZTogXCJjYXRlZ29yeS9zaG93LW1vcmVcIixcbiAgICB9O1xuXG4gICAgdGhpcy5mYWNldGVkU2VhcmNoID0gbmV3IEZhY2V0ZWRTZWFyY2goXG4gICAgICByZXF1ZXN0T3B0aW9ucyxcbiAgICAgIChjb250ZW50KSA9PiB7XG4gICAgICAgICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5odG1sKGNvbnRlbnQucHJvZHVjdExpc3RpbmcpO1xuICAgICAgICAkZmFjZXRlZFNlYXJjaENvbnRhaW5lci5odG1sKGNvbnRlbnQuc2lkZWJhcik7XG5cbiAgICAgICAgJChcImJvZHlcIikudHJpZ2dlckhhbmRsZXIoXCJjb21wYXJlUmVzZXRcIik7XG5cbiAgICAgICAgJChcImh0bWwsIGJvZHlcIikuYW5pbWF0ZShcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzY3JvbGxUb3A6IDAsXG4gICAgICAgICAgfSxcbiAgICAgICAgICAxMDBcbiAgICAgICAgKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogSW50dWl0U29sdXRpb25zIC0gQ2F0ZWdvcnkgVXBkYXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLklUU0NhdGVnb3J5LmFmdGVyRmFjZXRVcGRhdGUoKTtcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHZhbGlkYXRpb25FcnJvck1lc3NhZ2VzOiB7XG4gICAgICAgICAgb25NaW5QcmljZUVycm9yLFxuICAgICAgICAgIG9uTWF4UHJpY2VFcnJvcixcbiAgICAgICAgICBtaW5QcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgbWF4UHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgIG9uSW52YWxpZFByaWNlLFxuICAgICAgICB9LFxuICAgICAgfVxuICAgICk7XG5cbiAgICAkKFwiYm9keVwiKS5vbihcInByb2R1Y3RWaWV3TW9kZUNoYW5nZWRcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgTmV3T3B0cyA9IHtcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgY2F0ZWdvcnk6IHtcbiAgICAgICAgICAgIHNob3BfYnlfcHJpY2U6IHRydWUsXG4gICAgICAgICAgICBwcm9kdWN0czoge1xuICAgICAgICAgICAgICBsaW1pdDogcHJvZHVjdHNQZXJQYWdlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAgIHByb2R1Y3RMaXN0aW5nOlxuICAgICAgICAgICAgdGhpcy50b2dnbGVDYXRlZ29yeUxpc3RpbmdWaWV3LmdldFJlcXVlc3RUZW1wbGF0ZVR5cGUoXCJjYXRlZ29yeVwiKSxcbiAgICAgICAgICBzaWRlYmFyOiBcImNhdGVnb3J5L3NpZGViYXJcIixcbiAgICAgICAgfSxcbiAgICAgICAgc2hvd01vcmU6IFwiY2F0ZWdvcnkvc2hvdy1tb3JlXCIsXG4gICAgICB9O1xuXG4gICAgICB0aGlzLmZhY2V0ZWRTZWFyY2gudXBkYXRlUmVxdWVzdE9wdGlvbnMoTmV3T3B0cyk7XG4gICAgfSk7XG4gIH1cbiAgLyoqIFxuICBnZXRUb2tlbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgVE9LRU46IFwibDZ6cm1obXl2OWI4NnBtNjFzbThoYW1wbWs1N3pnclwiLFxuICAgICAgQVBJX1BBVEg6IFwiaHR0cHM6Ly9hcGkuYmlnY29tbWVyY2UuY29tL3N0b3Jlcy84OWE5bnRwMTYvdjMvXCIsXG4gICAgfTtcbiAgfVxuXG4gIHJlcXVlc3RQcm9kdWN0KCkge1xuICAgIGNvbnN0IEJBU0UgPSB0aGlzLmdldFRva2VuKCk7XG4gICAgY29uc3QgY2F0ZWdvcnlJZCA9IHRoaXMuY29udGV4dC5jYXRlZ29yeUlkO1xuICAgIGNvbnN0IGVuZHBvaW50ID0gXCJjYXRhbG9nL3Byb2R1Y3RzXCI7XG4gICAgY29uc29sZS5sb2coXCJyZXF1ZXN0aW5nXCIpO1xuICAgIGNvbnNvbGUubG9nKEJBU0UpO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICB1cmw6IGAke0JBU0UuQVBJX1BBVEh9JHtlbmRwb2ludH1gLFxuICAgICAgcGFyYW1zOiB7IGxpbWl0OiBcIjIwXCIgfSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIFwiWC1BdXRoLVRva2VuXCI6IGAke0JBU0UuVE9LRU59YCxcbiAgICAgICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIjogXCIqXCIsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBheGlvc1xuICAgICAgLnJlcXVlc3Qob3B0aW9ucylcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5kYXRhKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cbiAgKi9cblxuICBwb3B1bGF0ZUdyaWRQcm9kdWN0KCkge1xuICAgIC8vIHRoaXMucmVxdWVzdFByb2R1Y3QoKTtcbiAgICBjb25zdCBib2R5ID0gdGhpcztcbiAgICBjb25zdCBVVUlEY2F0YyA9IHRoaXMuY29udGV4dC5VVUlEY2F0YztcbiAgICBheGlvc1xuICAgICAgLmdldChcImh0dHBzOi8vc3VmcmkuYXBpLnN0ZGxpYi5jb20vbDV0QGRldi9nZXRBbGxQcm9kdWN0L1wiKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGNvbnN0IGdyaWRBbGxQcm9kdWN0cyA9ICQoXCIjZ3JpZC1hbGwtcHJvZHVjdFwiKTtcbiAgICAgICAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLmRhdGEucHJvZHVjdDtcbiAgICAgICAgY29uc3QgY2F0ZWdvcnkgPSByZXNwb25zZS5kYXRhLmNhdGVnb3J5O1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFVVSURjYXRjKTtcbiAgICAgICAgZGF0YS5mb3JFYWNoKChwcikgPT4ge1xuICAgICAgICAgIGxldCBpbWcgPSB7fTtcblxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJbXCJpbWFnZXNcIl0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwcltcImltYWdlc1wiXVtpXVtcImlzX3RodW1ibmFpbFwiXSkge1xuICAgICAgICAgICAgICBpbWcgPSBwcltcImltYWdlc1wiXVtpXTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGxldCBhY3Rpb25TZWN0aW9uID0gXCJcIjtcbiAgICAgICAgICBpZiAocHJbXCJ2YXJpYW50c1wiXS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBhY3Rpb25TZWN0aW9uID0gYDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi0tcHJpbWFyeSBxdWlja3ZpZXcgYnV0dG9uLS1xdWlja3ZpZXdcIiBkYXRhLXByb2R1Y3QtaWQ9XCIke3ByW1wiaWRcIl19XCI+VmlldyBPcHRpb25zPC9idXR0b24+YDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWN0aW9uU2VjdGlvbiA9IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWF0YyBqcy1jYXJkLWF0Y1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1hdGNfX3NlY3Rpb24gY2FyZC1hdGNfX3NlY3Rpb24tLXF0eVwiPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjYXJkLWF0Y19fcXR5LSR7cHJbXCJpZFwiXX0tJHtVVUlEY2F0Y31cIiBjbGFzcz1cImNhcmQtYXRjX19sYWJlbCBpcy1zck9ubHlcIj5RdWFudGl0eTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWF0Yy1pbmNyZW1lbnQgY2FyZC1hdGMtaW5jcmVtZW50LS1oYXMtYnV0dG9ucyBqcy1jYXJkLWF0Yy1pbmNyZW1lbnRcIj5cblxuICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZWxcIiBjbGFzcz1cImZvcm0taW5wdXQgY2FyZC1hdGNfX2lucHV0IGNhcmQtYXRjX19pbnB1dC0tdG90YWwganMtY2FyZC1hdGNfX2lucHV0LS10b3RhbFwiIG5hbWU9XCJjYXJkLWF0Y19fcXR5LSR7cHJbXCJpZFwiXX0tJHtVVUlEY2F0Y31cIiBpZD1cImNhcmQtYXRjX19xdHktJHtwcltcImlkXCJdfS0ke1VVSURjYXRjfVwiIHZhbHVlPVwiMVwiIG1pbj1cIjFcIiBwYXR0ZXJuPVwiWzAtOV0qXCIgYXJpYS1saXZlPVwicG9saXRlXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1hdGMtYnV0dG9uLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBidXR0b24tLWljb25cIiBkYXRhLWFjdGlvbj1cImluY1wiIHR5cGU9XCJidXR0b25cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlzLXNyT25seVwiPkluY3JlYXNlIFF1YW50aXR5IG9mIHVuZGVmaW5lZDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImljb24td3JhcHBlclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzcz1cImljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPVwiI2ljb24tYWRkXCI+PC91c2U+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi0taWNvblwiIGRhdGEtYWN0aW9uPVwiZGVjXCIgdHlwZT1cImJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaXMtc3JPbmx5XCI+RGVjcmVhc2UgUXVhbnRpdHkgb2YgdW5kZWZpbmVkPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaWNvbi13cmFwcGVyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzPVwiaWNvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1taW51c1wiPjwvdXNlPlBQXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1hdGNfX3NlY3Rpb24gY2FyZC1hdGNfX3NlY3Rpb24tLWFjdGlvblwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2FyZC1hdGNfX2J1dHRvbiBidXR0b24gYnV0dG9uLS1wcmltYXJ5IGpzLWNhcmQtYXRjX19idXR0b25cIiBpZD1cImNhcmQtYXRjX19hZGQtJHtwcltcImlkXCJdfS0ke1VVSURjYXRjfVwiIGRhdGEtZGVmYXVsdC1tZXNzYWdlPVwiQWRkIHRvIENhcnRcIiBkYXRhLXdhaXQtbWVzc2FnZT1cIkFkZGluZyB0byBjYXJ04oCmXCIgZGF0YS1hZGRlZC1tZXNzYWdlPVwiQWRkIHRvIENhcnRcIiB2YWx1ZT1cIkFkZCB0byBDYXJ0XCIgZGF0YS1jYXJkLWFkZC10by1jYXJ0PVwiL2NhcnQucGhwP2FjdGlvbj1hZGQmYW1wO3Byb2R1Y3RfaWQ9JHtwcltcImlkXCJdfVwiIGRhdGEtZXZlbnQtdHlwZT1cInByb2R1Y3QtY2xpY2tcIj5BZGQgdG8gQ2FydDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZHVjdC1zdGF0dXMtbWVzc2FnZSBhcmlhLWRlc2NyaXB0aW9uLS1oaWRkZW5cIj5BZGRpbmcgdG8gY2FydOKApiBUaGUgaXRlbSBoYXMgYmVlbiBhZGRlZDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+YDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGBcbiAgICA8ZGl2IGlkPVwicHJvZHVjdC0ke3ByW1wiaWRcIl19XCIgY2xhc3M9XCJwcm9kdWN0XCIgcHJvZHVjdC1kYXRhLWNhdGVnb3J5PVwiJHtcbiAgICAgICAgICAgIGNhdGVnb3J5W3ByW1wiY2F0ZWdvcmllc1wiXVswXV0gPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICA/IFwiXCJcbiAgICAgICAgICAgICAgOiBjYXRlZ29yeVtwcltcImNhdGVnb3JpZXNcIl1bMF1dW1wiY2F0X2lkXCJdLmpvaW4oXCIgXCIpXG4gICAgICAgICAgfVwiIFxuICAgICAgICAgICAgICAgIHByb2R1Y3QtZGF0YS1uYW1lPVwiJHtwcltcImZha2UtaGVhZGluZ1wiXX1cIiBcbiAgICAgICAgICAgICAgICBwcm9kdWN0LWRhdGEtcmV2aWV3PVwiJHtcbiAgICAgICAgICAgICAgICAgIHByW1wicmV2aWV3c19jb3VudFwiXSA9PT0gMFxuICAgICAgICAgICAgICAgICAgICA/IDBcbiAgICAgICAgICAgICAgICAgICAgOiBwcltcInJldmlld3NfcmF0aW5nX3N1bVwiXSAvIHByW1wicmV2aWV3c19jb3VudFwiXVxuICAgICAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgICAgIHByb2R1Y3QtcmV2aWV3LWNvdW50PVwiJHtwcltcInJldmlld3NfY291bnRcIl19XCIgXG4gICAgICAgICAgICAgICAgcHJvZHVjdC1kYXRhLXByaWNlPVwiJHtcbiAgICAgICAgICAgICAgICAgIHByW1widmFyaWFudHNcIl0ubGVuZ3RoID4gMVxuICAgICAgICAgICAgICAgICAgICA/IHByW1widmFyaWFudHNcIl1bMF1bXCJjYWxjdWxhdGVkX3ByaWNlXCJdLnRvRml4ZWQoMilcbiAgICAgICAgICAgICAgICAgICAgOiBwcltcImNhbGN1bGF0ZWRfcHJpY2VcIl0udG9GaXhlZCgyKVxuICAgICAgICAgICAgICAgIH1cIiBcbiAgICAgICAgICAgICAgICBwcm9kdWN0LWRhdGUtY3JlYXRlZD1cIiR7cHJbXCJkYXRlX2NyZWF0ZWRcIl19XCIgXG4gICAgICAgICAgICAgICAgcHJvZHVjdC1pcy1mZWF0dXJlZD1cIiR7XG4gICAgICAgICAgICAgICAgICBwcltcImlzX2ZlYXR1cmVkXCJdXG4gICAgICAgICAgICAgICAgfVwiIHByb2R1Y3QtYmVzdC1zZWxsaW5nPVwiJHtwcltcInRvdGFsX3NvbGRcIl19XCI+XG4gIDxkaXYgY2xhc3M9XCJjYXJkLXdyYXBwZXJcIj5cbiAgICA8YXJ0aWNsZSBjbGFzcz1cImNhcmRcIiBkYXRhLXRlc3Q9XCJjYXJkLSR7cHJbXCJpZFwiXX1cIj5cbiAgICAgIDxmaWd1cmUgY2xhc3M9XCJjYXJkLWZpZ3VyZVwiPlxuICAgICAgICA8YSBocmVmPVwiJHtcbiAgICAgICAgICBwcltcImN1c3RvbV91cmxcIl1bXCJ1cmxcIl1cbiAgICAgICAgfVwiIGNsYXNzPVwiY2FyZC1maWd1cmVfX2xpbmtcIiBhcmlhLWxhYmVsPVwiJHtwcltcIm5hbWVcIl19LCAkJHtcbiAgICAgICAgICAgIHByW1widmFyaWFudHNcIl0ubGVuZ3RoID4gMVxuICAgICAgICAgICAgICA/IHByW1widmFyaWFudHNcIl1bMF1bXCJjYWxjdWxhdGVkX3ByaWNlXCJdLnRvRml4ZWQoMilcbiAgICAgICAgICAgICAgOiBwcltcImNhbGN1bGF0ZWRfcHJpY2VcIl0udG9GaXhlZCgyKVxuICAgICAgICAgIH1cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiIGNhcmQtaW1nLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGltZyBzcmM9XCJcbiAgICAgICAgICAgICR7aW1nW1widXJsX3RodW1ibmFpbFwiXX1cIiBcbiAgICAgICAgICAgIGFsdD1cImltZ1tcImRlc2NyaXB0aW9uXCJdXCIgdGl0bGU9XCIke1xuICAgICAgICAgICAgICBwcltcImZha2UtaGVhZGluZ1wiXVxuICAgICAgICAgICAgfVwiIGRhdGEtc2l6ZXM9XCJhdXRvXCIgXG4gICAgICAgICAgICBzcmNzZXQ9XCJcbiAgICAgICAgICAgICR7aW1nW1widXJsX3N0YW5kYXJkXCJdfSA4MHcsIFxuICAgICAgICAgICAgJHtpbWdbXCJ1cmxfc3RhbmRhcmRcIl19IDE2MHcsIFxuICAgICAgICAgICAgJHtpbWdbXCJ1cmxfc3RhbmRhcmRcIl19IDMyMHcsIFxuICAgICAgICAgICAgJHtpbWdbXCJ1cmxfc3RhbmRhcmRcIl19IDY0MHcsIFxuICAgICAgICAgICAgJHtpbWdbXCJ1cmxfc3RhbmRhcmRcIl19IDk2MHcsIFxuICAgICAgICAgICAgJHtpbWdbXCJ1cmxfc3RhbmRhcmRcIl19IDEyODB3LCBcbiAgICAgICAgICAgICR7aW1nW1widXJsX3N0YW5kYXJkXCJdfSAxOTIwdywgXG4gICAgICAgICAgICR7aW1nW1widXJsX3N0YW5kYXJkXCJdfSAyNTYwd1wiIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBkYXRhLXNyY3NldD1cIlxuICAgICAgICAgICAgJHtpbWdbXCJ1cmxfc3RhbmRhcmRcIl19IDgwdywgXG4gICAgICAgICAgICAke2ltZ1tcInVybF9zdGFuZGFyZFwiXX0gMTYwdywgXG4gICAgICAgICAgICAke2ltZ1tcInVybF9zdGFuZGFyZFwiXX0gMzIwdywgXG4gICAgICAgICAgICAke2ltZ1tcInVybF9zdGFuZGFyZFwiXX0gNjQwdywgXG4gICAgICAgICAgICAke2ltZ1tcInVybF9zdGFuZGFyZFwiXX0gOTYwdywgXG4gICAgICAgICAgICAke2ltZ1tcInVybF9zdGFuZGFyZFwiXX0gMTI4MHcsIFxuICAgICAgICAgICAgJHtpbWdbXCJ1cmxfc3RhbmRhcmRcIl19IDE5MjB3LCBcbiAgICAgICAgICAgICR7aW1nW1widXJsX3N0YW5kYXJkXCJdfSAyNTYwd1wiIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBjbGFzcz1cImNhcmQtaW1hZ2UgbGF6eWF1dG9zaXplcyBsYXp5bG9hZGVkXCIgc2l6ZXM9XCIyNDhweFwiPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2E+XG5cbiAgICAgICAgPGZpZ2NhcHRpb24gY2xhc3M9XCJjYXJkLWZpZ2NhcHRpb25cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1maWdjYXB0aW9uLWJvZHlcIj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9maWdjYXB0aW9uPlxuICAgICAgICAgIDwvZmlndXJlPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwicHJvZHVjdFZpZXctdHlwZS10aXRsZSBoNFwiIHByb2R1Y3QtbmFtZT1cIlwiPiR7XG4gICAgICAgICAgICAgIHByW1wiZmFrZS1oZWFkaW5nXCJdXG4gICAgICAgICAgICB9PC9wPlxuXG4gICAgICAgICAgICA8aDMgY2xhc3M9XCJjYXJkLXRpdGxlIFwiPlxuICAgICAgICAgICAgICA8YSBhcmlhLWxhYmVsPVwiJHtwcltcIm5hbWVcIl19LCAkJHtcbiAgICAgICAgICAgIHByW1widmFyaWFudHNcIl0ubGVuZ3RoID4gMVxuICAgICAgICAgICAgICA/IHByW1widmFyaWFudHNcIl1bMF1bXCJjYWxjdWxhdGVkX3ByaWNlXCJdLnRvRml4ZWQoMilcbiAgICAgICAgICAgICAgOiBwcltcImNhbGN1bGF0ZWRfcHJpY2VcIl0udG9GaXhlZCgyKVxuICAgICAgICAgIH1cIiBocmVmPVwiJHtwcltcImN1c3RvbV91cmxcIl1bXCJ1cmxcIl19XCI+XG4gICAgICAgICAgICAgICAgJHtwcltcIm5hbWVcIl19XG4gICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvaDM+XG5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZC10ZXh0IGNhcmQtdGV4dC0tc2t1XCI+XG4gICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgIFNLVSM6ICR7cHJbXCJza3VcIl19XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtdGV4dCBjYXJkLXRleHQtLXByaWNlXCIgZGF0YS10ZXN0LWluZm8tdHlwZT1cInByaWNlXCI+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByaWNlLXNlY3Rpb24gcHJpY2Utc2VjdGlvbi0td2l0aG91dFRheCBycnAtcHJpY2UtLXdpdGhvdXRUYXggaDRcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpcy1zck9ubHlcIj5cbiAgICAgICAgICAgICAgICAgIE1TUlA6XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtcHJvZHVjdC1ycnAtcHJpY2Utd2l0aG91dC10YXg9XCJcIiBjbGFzcz1cInByaWNlIHByaWNlLS1ycnAgaDVcIj5cblxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcmljZS1zZWN0aW9uIHByaWNlLXNlY3Rpb24tLXdpdGhvdXRUYXggbm9uLXNhbGUtcHJpY2UtLXdpdGhvdXRUYXggaDVcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpcy1zck9ubHlcIj5cbiAgICAgICAgICAgICAgICAgIFdhczpcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1wcm9kdWN0LW5vbi1zYWxlLXByaWNlLXdpdGhvdXQtdGF4PVwiXCIgY2xhc3M9XCJwcmljZSBwcmljZS0tbm9uLXNhbGVcIj5cblxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcmljZS1zZWN0aW9uIHByaWNlLXNlY3Rpb24tLXdpdGhvdXRUYXggaDRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByaWNlLWxhYmVsIGlzLXNyT25seVwiPlxuXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJpY2Utbm93LWxhYmVsIGlzLXNyT25seVwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj5cbiAgICAgICAgICAgICAgICAgIE5vdzpcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1wcm9kdWN0LXByaWNlLXdpdGhvdXQtdGF4PVwiXCIgY2xhc3M9XCJwcmljZSBwcmljZS0td2l0aG91dFRheFwiPiQke1xuICAgICAgICAgICAgICAgICAgcHJbXCJ2YXJpYW50c1wiXS5sZW5ndGggPiAxXG4gICAgICAgICAgICAgICAgICAgID8gcHJbXCJ2YXJpYW50c1wiXVswXVtcImNhbGN1bGF0ZWRfcHJpY2VcIl0udG9GaXhlZCgyKVxuICAgICAgICAgICAgICAgICAgICA6IHByW1wiY2FsY3VsYXRlZF9wcmljZVwiXS50b0ZpeGVkKDIpXG4gICAgICAgICAgICAgICAgfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYWN0aW9uLXdyYXBwZXJcIj5cblxuICAgICAgICAgICAgICAke2FjdGlvblNlY3Rpb259XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi0tcHJpbWFyeSBxdWlja3ZpZXcgYnV0dG9uLS1xdWlja3ZpZXdcIiBkYXRhLXByb2R1Y3QtaWQ9XCIke1xuICAgICAgICAgICAgICAgIHByW1wiaWRcIl1cbiAgICAgICAgICAgICAgfVwiPlZpZXcgRGV0YWlsczwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9hcnRpY2xlPlxuICAgICAgPC9kaXY+XG5cbiAgICA8L2Rpdj5gO1xuICAgICAgICAgIGdyaWRBbGxQcm9kdWN0cy5hcHBlbmQodGVtcGxhdGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBib2R5LmNvbmZpZ3VyZUlzb3RvcGVGb3JBbGwoKTtcbiAgICAgICAgYm9keS5zdGFydEdsb2JhbCgpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuXG4gIHN0YXJ0R2xvYmFsKCkge1xuICAgIGN1c3RvbUdsb2JhbCh0aGlzLmNvbnRleHQpO1xuICB9XG5cbiAgY29uZmlndXJlSXNvdG9wZUZvckFsbCgpIHtcbiAgICAkKFwiLmdyaWRcIikuY3NzKFwiZGlzcGxheVwiLCBcImdyaWRcIik7XG4gICAgJChcIi5sZHMtYmxvY2tcIikuaGlkZSgpO1xuICAgIGxldCBncmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJncmlkLWFsbC1wcm9kdWN0XCIpO1xuICAgIGxldCBpc28gPSBuZXcgSXNvdG9wZShncmlkLCB7XG4gICAgICAvLyBvcHRpb25zLi4uXG4gICAgICBpdGVtU2VsZWN0b3I6IFwiLnByb2R1Y3RcIixcbiAgICAgIGxheW91dE1vZGU6IFwiZml0Um93c1wiLFxuICAgICAgZ2V0U29ydERhdGE6IHtcbiAgICAgICAgbmFtZTogZnVuY3Rpb24gKGl0ZW1FbGVtKSB7XG4gICAgICAgICAgcmV0dXJuIGl0ZW1FbGVtLmdldEF0dHJpYnV0ZShcInByb2R1Y3QtZGF0YS1uYW1lXCIpO1xuICAgICAgICB9LFxuICAgICAgICBwcmljZTogZnVuY3Rpb24gKGl0ZW1FbGVtKSB7XG4gICAgICAgICAgcmV0dXJuIE51bWJlcihpdGVtRWxlbS5nZXRBdHRyaWJ1dGUoXCJwcm9kdWN0LWRhdGEtcHJpY2VcIikpO1xuICAgICAgICB9LFxuICAgICAgICByZXZpZXc6IGZ1bmN0aW9uIChpdGVtRWxlbSkge1xuICAgICAgICAgIHJldHVybiBpdGVtRWxlbS5nZXRBdHRyaWJ1dGUoXCJwcm9kdWN0LWRhdGEtcmV2aWV3XCIpO1xuICAgICAgICB9LFxuICAgICAgICBjYXRlZ29yeTogZnVuY3Rpb24gKGl0ZW1FbGVtKSB7XG4gICAgICAgICAgcmV0dXJuIGl0ZW1FbGVtLmdldEF0dHJpYnV0ZShcInByb2R1Y3QtZGF0YS1jYXRlZ29yeVwiKTtcbiAgICAgICAgfSxcbiAgICAgICAgYmVzdF9zZWxsaW5nOiBmdW5jdGlvbiAoaXRlbUVsZW0pIHtcbiAgICAgICAgICByZXR1cm4gTnVtYmVyKGl0ZW1FbGVtLmdldEF0dHJpYnV0ZShcInByb2R1Y3QtYmVzdC1zZWxsaW5nXCIpKTtcbiAgICAgICAgfSxcbiAgICAgICAgbmV3ZXN0OiBmdW5jdGlvbiAoaXRlbUVsZW0pIHtcbiAgICAgICAgICByZXR1cm4gaXRlbUVsZW0uZ2V0QXR0cmlidXRlKFwicHJvZHVjdC1kYXRlLWNyZWF0ZWRcIik7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgJChcIiNhbGwtc29ydC1zZWxlY3RcIikuY2hhbmdlKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHZhbCA9ICQodGhpcykudmFsKCkuc3BsaXQoXCItXCIpO1xuXG4gICAgICBpZiAodmFsWzBdID09PSBcInJldmlld1wiKSB7XG4gICAgICAgIGlzby5hcnJhbmdlKHtcbiAgICAgICAgICBzb3J0Qnk6IFt2YWxbMF0sIFwicmF0aW5nX2NvdW50XCJdLFxuICAgICAgICAgIHNvcnRBc2NlbmRpbmc6IHtcbiAgICAgICAgICAgIHJldmlldzogZmFsc2UsXG4gICAgICAgICAgICByYXRpbmdfY291bnQ6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXNvLmFycmFuZ2Uoe1xuICAgICAgICAgIHNvcnRCeTogdmFsWzBdLFxuICAgICAgICAgIHNvcnRBc2NlbmRpbmc6IHZhbFsxXSA9PT0gXCJhc2NcIixcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBmaWx0ZXJfYXJyID0gW107XG5cbiAgICAvLyAkKFwiI2ZlYXR1cmVkLWNoZWNrYm94XCIpLmNoYW5nZShmdW5jdGlvbiAoKSB7XG4gICAgLy8gICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgLy8gICAgIGlmIChmaWx0ZXJfYXJyLmxlbmd0aCA+IDApIHtcbiAgICAvLyAgICAgICBpc28uYXJyYW5nZSh7XG4gICAgLy8gICAgICAgICAvLyBpdGVtIGVsZW1lbnQgcHJvdmlkZWQgYXMgYXJndW1lbnRcbiAgICAvLyAgICAgICAgIGZpbHRlcjogZnVuY3Rpb24gKGl0ZW1FbGVtKSB7XG4gICAgLy8gICAgICAgICAgIGNvbnN0IHZhbCA9IGl0ZW1FbGVtLmdldEF0dHJpYnV0ZShcInByb2R1Y3QtZGF0YS1jYXRlZ29yeVwiKTtcbiAgICAvLyAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWx0ZXJfYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gICAgICAgICAgICAgaWYgKHZhbC5pbmNsdWRlcyhmaWx0ZXJfYXJyW2ldKSkge1xuICAgIC8vICAgICAgICAgICAgICAgaWYgKGlzZmVhdHVyZWQpIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAvLyAgICAgICAgICAgICAgICAgICBpdGVtRWxlbS5nZXRBdHRyaWJ1dGUoXCJwcm9kdWN0LWlzLWZlYXR1cmVkXCIpID09PSBcInRydWVcIlxuICAgIC8vICAgICAgICAgICAgICAgICApO1xuICAgIC8vICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgLy8gICAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgICB9XG5cbiAgICAvLyAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIC8vICAgICAgICAgfSxcbiAgICAvLyAgICAgICB9KTtcbiAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICBpc28uYXJyYW5nZSh7XG4gICAgLy8gICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIChpdGVtRWxlbSkge1xuICAgIC8vICAgICAgICAgICByZXR1cm4gaXRlbUVsZW0uZ2V0QXR0cmlidXRlKFwicHJvZHVjdC1pcy1mZWF0dXJlZFwiKSA9PT0gXCJ0cnVlXCI7XG4gICAgLy8gICAgICAgICB9LFxuICAgIC8vICAgICAgIH0pO1xuICAgIC8vICAgICB9XG4gICAgLy8gICB9IGVsc2Uge1xuICAgIC8vICAgICBpZiAoZmlsdGVyX2Fyci5sZW5ndGggPiAwKSB7XG4gICAgLy8gICAgICAgaXNvLmFycmFuZ2Uoe1xuICAgIC8vICAgICAgICAgLy8gaXRlbSBlbGVtZW50IHByb3ZpZGVkIGFzIGFyZ3VtZW50XG4gICAgLy8gICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIChpdGVtRWxlbSkge1xuICAgIC8vICAgICAgICAgICBjb25zdCB2YWwgPSBpdGVtRWxlbS5nZXRBdHRyaWJ1dGUoXCJwcm9kdWN0LWRhdGEtY2F0ZWdvcnlcIik7XG4gICAgLy8gICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsdGVyX2Fyci5sZW5ndGg7IGkrKykge1xuICAgIC8vICAgICAgICAgICAgIGlmICh2YWwuaW5jbHVkZXMoZmlsdGVyX2FycltpXSkpIHtcbiAgICAvLyAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICAgfVxuXG4gICAgLy8gICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAvLyAgICAgICAgIH0sXG4gICAgLy8gICAgICAgfSk7XG4gICAgLy8gICAgIH0gZWxzZSB7XG4gICAgLy8gICAgICAgaXNvLmFycmFuZ2UoeyBmaWx0ZXI6IFwiKlwiIH0pO1xuICAgIC8vICAgICB9XG4gICAgLy8gICB9XG4gICAgLy8gfSk7XG5cbiAgICAkKFwiW2NoZWNrYm94LWZpbHRlci1hbGxdXCIpLmNoYW5nZShmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBpc2ZlYXR1cmVkID0gJChcIiNmZWF0dXJlZC1jaGVja2JveDpjaGVja2VkXCIpLmxlbmd0aCA+IDA7XG4gICAgICBpZiAoJCh0aGlzKS5hdHRyKFwiaWRcIikgIT09IFwiZmVhdHVyZWQtY2hlY2tib3hcIikge1xuICAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgZmlsdGVyX2Fyci5wdXNoKCQodGhpcykuYXR0cihcImZpbHRlci12YWx1ZVwiKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgaW5kZXggPSBmaWx0ZXJfYXJyLmluZGV4T2YoJCh0aGlzKS5hdHRyKFwiZmlsdGVyLXZhbHVlXCIpKTtcbiAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgLy8gb25seSBzcGxpY2UgYXJyYXkgd2hlbiBpdGVtIGlzIGZvdW5kXG4gICAgICAgICAgICBmaWx0ZXJfYXJyLnNwbGljZShpbmRleCwgMSk7IC8vIDJuZCBwYXJhbWV0ZXIgbWVhbnMgcmVtb3ZlIG9uZSBpdGVtIG9ubHlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbHRlcl9hcnIubGVuZ3RoID4gMCkge1xuICAgICAgICBpc28uYXJyYW5nZSh7XG4gICAgICAgICAgLy8gaXRlbSBlbGVtZW50IHByb3ZpZGVkIGFzIGFyZ3VtZW50XG4gICAgICAgICAgZmlsdGVyOiBmdW5jdGlvbiAoaXRlbUVsZW0pIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbCA9IGl0ZW1FbGVtLmdldEF0dHJpYnV0ZShcInByb2R1Y3QtZGF0YS1jYXRlZ29yeVwiKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsdGVyX2Fyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBpZiAodmFsLmluY2x1ZGVzKGZpbHRlcl9hcnJbaV0pKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzZmVhdHVyZWQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1FbGVtLmdldEF0dHJpYnV0ZShcInByb2R1Y3QtaXMtZmVhdHVyZWRcIikgPT09IFwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChpc2ZlYXR1cmVkKSB7XG4gICAgICAgIGlzby5hcnJhbmdlKHtcbiAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIChpdGVtRWxlbSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW1FbGVtLmdldEF0dHJpYnV0ZShcInByb2R1Y3QtaXMtZmVhdHVyZWRcIikgPT09IFwidHJ1ZVwiO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXNvLmFycmFuZ2UoeyBmaWx0ZXI6IFwiKlwiIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaXNvLmFycmFuZ2Uoe1xuICAgICAgc29ydEJ5OiBcImJlc3Rfc2VsbGluZ1wiLFxuICAgICAgc29ydEFzY2VuZGluZzogZmFsc2UsXG4gICAgfSk7XG4gIH1cbn1cbiIsImNvbnN0IFRSQU5TTEFUSU9OUyA9ICd0cmFuc2xhdGlvbnMnO1xuY29uc3QgaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSA9IChkaWN0aW9uYXJ5KSA9PiAhIU9iamVjdC5rZXlzKGRpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubGVuZ3RoO1xuY29uc3QgY2hvb3NlQWN0aXZlRGljdGlvbmFyeSA9ICguLi5kaWN0aW9uYXJ5SnNvbkxpc3QpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpY3Rpb25hcnlKc29uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkaWN0aW9uYXJ5ID0gSlNPTi5wYXJzZShkaWN0aW9uYXJ5SnNvbkxpc3RbaV0pO1xuICAgICAgICBpZiAoaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eShkaWN0aW9uYXJ5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGRpY3Rpb25hcnk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIGRlZmluZXMgVHJhbnNsYXRpb24gRGljdGlvbmFyeSB0byB1c2VcbiAqIEBwYXJhbSBjb250ZXh0IHByb3ZpZGVzIGFjY2VzcyB0byAzIHZhbGlkYXRpb24gSlNPTnMgZnJvbSBlbi5qc29uOlxuICogdmFsaWRhdGlvbl9tZXNzYWdlcywgdmFsaWRhdGlvbl9mYWxsYmFja19tZXNzYWdlcyBhbmQgZGVmYXVsdF9tZXNzYWdlc1xuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSA9IChjb250ZXh0KSA9PiB7XG4gICAgY29uc3QgeyB2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIH0gPSBjb250ZXh0O1xuICAgIGNvbnN0IGFjdGl2ZURpY3Rpb25hcnkgPSBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5KHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04pO1xuICAgIGNvbnN0IGxvY2FsaXphdGlvbnMgPSBPYmplY3QudmFsdWVzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSk7XG4gICAgY29uc3QgdHJhbnNsYXRpb25LZXlzID0gT2JqZWN0LmtleXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5tYXAoa2V5ID0+IGtleS5zcGxpdCgnLicpLnBvcCgpKTtcblxuICAgIHJldHVybiB0cmFuc2xhdGlvbktleXMucmVkdWNlKChhY2MsIGtleSwgaSkgPT4ge1xuICAgICAgICBhY2Nba2V5XSA9IGxvY2FsaXphdGlvbnNbaV07XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xufTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIElUU0NhdGVnb3J5IHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgfVxuXG4gICAgYWZ0ZXJGYWNldFVwZGF0ZSgpIHtcblxuICAgIH1cbn1cbiIsImltcG9ydCB7IGFwaSB9IGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCB1cmxVdGlscyBmcm9tICcuLi9jb21tb24vdXRpbHMvdXJsLXV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9nZ2xlQ2F0ZWdvcnlMaXN0aW5nVmlldyB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLmRlZmF1bHRWaWV3VHlwZSA9IHRoaXMuY29udGV4dC5kZWZhdWx0Vmlld1R5cGU7XG4gICAgICAgIHRoaXMub3Bwb3NpdGVWaWV3VHlwZSA9IHRoaXMuZGVmYXVsdFZpZXdUeXBlICE9PSAnZ3JpZCcgPyAnZ3JpZCcgOiAnbGlzdCc7XG4gICAgICAgIHRoaXMucHJvZHVjdHNQZXJQYWdlID0gdGhpcy5jb250ZXh0LmNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlO1xuICAgICAgICB0aGlzLmxvYWRpbmdPdmVybGF5ID0gJCgnLmxvYWRpbmdPdmVybGF5LmxvYWRpbmdPdmVybGF5LS1wcm9kdWN0LWxpc3RpbmcnKTtcblxuICAgICAgICAkKCdib2R5Jykub24oJ2ZhY2V0ZWRTZWFyY2hSZWZyZXNoJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZGRUb2dnbGVFdmVudHMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgZ2V0U3RvcmVkVmlld1R5cGUoKSB7XG4gICAgICAgIHJldHVybiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdjYXRlZ29yeS12aWV3LXR5cGUnKSB8fCBudWxsO1xuICAgIH1cblxuICAgIGdldFJlcXVlc3RUZW1wbGF0ZVR5cGUodHlwZSkge1xuICAgICAgICBjb25zdCBwYWdlVHlwZSA9IHRoaXMuZ2V0U3RvcmVkVmlld1R5cGUoKTtcbiAgICAgICAgcmV0dXJuICFwYWdlVHlwZSA/IGAke3R5cGV9L3Byb2R1Y3QtbGlzdGluZ2AgOiBgY3VzdG9tL2NhdGVnb3J5LSR7cGFnZVR5cGV9LXZpZXdgO1xuICAgIH1cblxuICAgIHN0b3JlVmlld1R5cGUodHlwZSkge1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdjYXRlZ29yeS12aWV3LXR5cGUnLCB0eXBlKTtcbiAgICB9XG5cbiAgICBnZXRDYXRlZ29yeVBhZ2UocGFnZVR5cGUpIHtcbiAgICAgICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvcF9ieV9wcmljZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0OiB0aGlzLnByb2R1Y3RzUGVyUGFnZSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiBgY3VzdG9tL2NhdGVnb3J5LSR7cGFnZVR5cGV9LXZpZXdgLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMubG9hZGluZ092ZXJsYXkuc2hvdygpO1xuXG4gICAgICAgIGFwaS5nZXRQYWdlKHVybFV0aWxzLmdldFVybCgpLCBjb25maWcsIChlcnIsIGNvbnRlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJCgnI3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXInKS5odG1sKGNvbnRlbnQpO1xuXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmdPdmVybGF5LmhpZGUoKTtcblxuICAgICAgICAgICAgdGhpcy5zdG9yZVZpZXdUeXBlKHBhZ2VUeXBlKTtcblxuICAgICAgICAgICAgdGhpcy5hZGRUb2dnbGVFdmVudHMoKTtcblxuICAgICAgICAgICAgJCgnYm9keScpLnRyaWdnZXJIYW5kbGVyKCdwcm9kdWN0Vmlld01vZGVDaGFuZ2VkJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFkZFRvZ2dsZUV2ZW50cygpIHtcbiAgICAgICAgJCgnLmpzLWNhdGVnb3J5X190b2dnbGUtdmlldycpLm9uKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0eXBlID0gJChlLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ3ZpZXctdHlwZScpO1xuXG4gICAgICAgICAgICBpZiAoJChlLmN1cnJlbnRUYXJnZXQpLmhhc0NsYXNzKCdhY3RpdmUtY2F0ZWdvcnktdmlldycpKSByZXR1cm47XG5cbiAgICAgICAgICAgIHRoaXMuZ2V0Q2F0ZWdvcnlQYWdlKHR5cGUsIHRoaXMuYWRkVG9nZ2xlRXZlbnRzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgY29uc3Qgc3RvcmVkVmlld1R5cGUgPSB0aGlzLmdldFN0b3JlZFZpZXdUeXBlKCk7XG5cbiAgICAgICAgaWYgKHN0b3JlZFZpZXdUeXBlID09PSB0aGlzLmRlZmF1bHRWaWV3VHlwZSB8fCAhc3RvcmVkVmlld1R5cGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFkZFRvZ2dsZUV2ZW50cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZXRDYXRlZ29yeVBhZ2UodGhpcy5vcHBvc2l0ZVZpZXdUeXBlKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9