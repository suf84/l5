import { hooks } from "@bigcommerce/stencil-utils";
import CatalogPage from "./catalog";
import compareProducts from "./global/compare-products";
import FacetedSearch from "./common/faceted-search";
import { createTranslationDictionary } from "../theme/common/utils/translations-utils";
import ITSCategory from "./custom/its-category";
import ToggleCategoryListingView from "./custom/toggle-category-listing-view";
import axios from "axios";
import Isotope from "isotope-layout";
import customGlobal from "./custom/its-global";

export default class Category extends CatalogPage {
  constructor(context) {
    super(context);
    this.validationDictionary = createTranslationDictionary(context);

    /**
     * IntuitSolutions - Custom Category
     */
    this.ITSCategory = new ITSCategory(context);
    this.toggleCategoryListingView = new ToggleCategoryListingView(context);
  }

  setLiveRegionAttributes($element, roleType, ariaLiveStatus) {
    $element.attr({
      role: roleType,
      "aria-live": ariaLiveStatus,
    });
  }

  makeShopByPriceFilterAccessible() {
    if (!$("[data-shop-by-price]").length) return;

    if ($(".navList-action").hasClass("is-active")) {
      $("a.navList-action.is-active").focus();
    }

    $("a.navList-action").on("click", () =>
      this.setLiveRegionAttributes(
        $("span.price-filter-message"),
        "status",
        "assertive"
      )
    );
  }

  setUpIsotopeAttribute() {
    let data = {};
    const products = this.context.productList;
    const body = this;
    axios
      .get("https://sufri.api.stdlib.com/l5t@dev/getItemAttr/")
      .then(function (response) {
        data = response.data;
        products.forEach((pr) => {
          const el = $(`#product-${pr.id}`);
          el.attr(
            "product-date-created",
            data[`product-${pr.id}`]["date_created"]
          );
          el.attr("product-is-featured", data[`product-${pr.id}`]["featured"]);
          el.attr(
            "product-best-selling",
            data[`product-${pr.id}`]["best_selling"]
          );
        });

        body.configureIsotope();
      });
  }

  configureIsotope() {
    $(".grid").css("display", "grid");
    let grid = document.getElementById("grid-block");
    let iso = new Isotope(grid, {
      // options...
      itemSelector: ".product",
      layoutMode: "fitRows",
      getSortData: {
        name: function (itemElem) {
          return itemElem.getAttribute("product-data-name");
        },
        price: function (itemElem) {
          return Number(itemElem.getAttribute("product-data-price"));
        },
        review: function (itemElem) {
          return itemElem.getAttribute("product-data-review");
        },
        category: function (itemElem) {
          return itemElem.getAttribute("product-data-category");
        },
        best_selling: function (itemElem) {
          return Number(itemElem.getAttribute("product-best-selling"));
        },
        newest: function (itemElem) {
          return itemElem.getAttribute("product-date-created");
        },
        rating_count: function (itemElem) {
          return itemElem.getAttribute("product-review-count");
        },
      },
    });

    $("#sort-select").change(function () {
      const val = $(this).val().split("-");
      console.log(val[0]);
      if (val[0] === "review") {
        console.log("rec");
        iso.arrange({
          sortBy: [val[0], "rating_count"],
          sortAscending: {
            review: false,
            rating_count: false,
          },
        });
      } else {
        iso.arrange({
          sortBy: val[0],
          sortAscending: val[1] === "asc",
        });
      }
    });

    $("#featured-checkbox").change(function () {
      if (this.checked) {
        iso.arrange({
          filter: function (itemElem) {
            return itemElem.getAttribute("product-is-featured") === "true";
          },
        });
      } else {
        iso.arrange({ filter: "*" });
      }
    });

    const filter_arr = [];

    $("[filter-checkbox]").change(function () {
      if (this.checked) {
        filter_arr.push($(this).attr("data-filter-value"));
      } else {
        const index = filter_arr.indexOf($(this).attr("data-filter-value"));
        if (index > -1) {
          // only splice array when item is found
          filter_arr.splice(index, 1); // 2nd parameter means remove one item only
        }
      }
      const temp = $(this);
      if (filter_arr.length > 0) {
        iso.arrange({
          // item element provided as argument
          filter: function (itemElem) {
            const val = itemElem.getAttribute("product-data-category");
            for (let i = 0; i < filter_arr.length; i++) {
              if (val.includes(filter_arr[i])) {
                return true;
              }
            }

            return false;
          },
        });
      } else {
        iso.arrange({ filter: "*" });
      }
    });
  }

  onReady() {
    this.populateGridProduct();
    this.arrangeFocusOnSortBy();

    $('[data-button-type="add-cart"]').on("click", (e) =>
      this.setLiveRegionAttributes(
        $(e.currentTarget).next(),
        "status",
        "polite"
      )
    );

    this.makeShopByPriceFilterAccessible();

    compareProducts(this.context);

    if ($("#facetedSearch").length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      hooks.on("sortBy-submitted", this.onSortBySubmit);
    }

    $("a.reset-btn").on("click", () =>
      this.setLiveRegionsAttributes($("span.reset-message"), "status", "polite")
    );

    this.ariaNotifyNoProducts();
    // this.setUpIsotopeAttribute();
  }

  ariaNotifyNoProducts() {
    const $noProductsMessage = $("[data-no-products-notification]");
    if ($noProductsMessage.length) {
      $noProductsMessage.focus();
    }
  }

  initFacetedSearch() {
    const {
      price_min_evaluation: onMinPriceError,
      price_max_evaluation: onMaxPriceError,
      price_min_not_entered: minPriceNotEntered,
      price_max_not_entered: maxPriceNotEntered,
      price_invalid_value: onInvalidPrice,
    } = this.validationDictionary;
    const $productListingContainer = $("#product-listing-container");
    const $facetedSearchContainer = $("#faceted-search-container");
    const productsPerPage = this.context.categoryProductsPerPage;
    const requestOptions = {
      config: {
        category: {
          shop_by_price: true,
          products: {
            limit: productsPerPage,
          },
        },
      },
      template: {
        productListing:
          this.toggleCategoryListingView.getRequestTemplateType("category"),
        sidebar: "category/sidebar",
      },
      showMore: "category/show-more",
    };

    this.facetedSearch = new FacetedSearch(
      requestOptions,
      (content) => {
        $productListingContainer.html(content.productListing);
        $facetedSearchContainer.html(content.sidebar);

        $("body").triggerHandler("compareReset");

        $("html, body").animate(
          {
            scrollTop: 0,
          },
          100
        );

        /**
         * IntuitSolutions - Category Update
         */
        this.ITSCategory.afterFacetUpdate();
      },
      {
        validationErrorMessages: {
          onMinPriceError,
          onMaxPriceError,
          minPriceNotEntered,
          maxPriceNotEntered,
          onInvalidPrice,
        },
      }
    );

    $("body").on("productViewModeChanged", () => {
      const NewOpts = {
        config: {
          category: {
            shop_by_price: true,
            products: {
              limit: productsPerPage,
            },
          },
        },
        template: {
          productListing:
            this.toggleCategoryListingView.getRequestTemplateType("category"),
          sidebar: "category/sidebar",
        },
        showMore: "category/show-more",
      };

      this.facetedSearch.updateRequestOptions(NewOpts);
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
  */

  populateGridProduct() {
    // this.requestProduct();
    const body = this;
    const UUIDcatc = this.context.UUIDcatc;
    axios
      .get("https://sufri.api.stdlib.com/l5t@dev/getAllProduct/")
      .then(function (response) {
        const gridAllProducts = $("#grid-all-product");
        const data = response.data.product;
        const category = response.data.category;

        console.log(UUIDcatc);
        data.forEach((pr) => {
          let img = {};

          for (let i = 0; i < pr["images"].length; i++) {
            if (pr["images"][i]["is_thumbnail"]) {
              img = pr["images"][i];
              break;
            }
          }
          let actionSection = "";
          if (pr["variants"].length > 1) {
            actionSection = `<button type="button" class="button button--primary quickview button--quickview" data-product-id="${pr["id"]}">View Options</button>`;
          } else {
            actionSection = `
            <div class="card-atc js-card-atc">
              <div class="card-atc__section card-atc__section--qty">
                <label for="card-atc__qty-${pr["id"]}-${UUIDcatc}" class="card-atc__label is-srOnly">Quantity:</label>
                <div class="card-atc-increment card-atc-increment--has-buttons js-card-atc-increment">

                  <input type="tel" class="form-input card-atc__input card-atc__input--total js-card-atc__input--total" name="card-atc__qty-${pr["id"]}-${UUIDcatc}" id="card-atc__qty-${pr["id"]}-${UUIDcatc}" value="1" min="1" pattern="[0-9]*" aria-live="polite">
                  <div class="card-atc-button-wrapper">
                    <button class="button button--icon" data-action="inc" type="button">
                      <span class="is-srOnly">Increase Quantity of undefined</span>
                      <span class="icon-wrapper" aria-hidden="true">
                        <svg class="icon">
                          <use xlink:href="#icon-add"></use>
                        </svg>
                      </span>
                    </button>
                    <button class="button button--icon" data-action="dec" type="button">
                      <span class="is-srOnly">Decrease Quantity of undefined</span>
                      <span class="icon-wrapper" aria-hidden="true">
                        <svg class="icon">
                          <use xlink:href="#icon-minus"></use>PP
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="card-atc__section card-atc__section--action">
                <button type="button" class="card-atc__button button button--primary js-card-atc__button" id="card-atc__add-${pr["id"]}-${UUIDcatc}" data-default-message="Add to Cart" data-wait-message="Adding to cart…" data-added-message="Add to Cart" value="Add to Cart" data-card-add-to-cart="/cart.php?action=add&amp;product_id=${pr["id"]}" data-event-type="product-click">Add to Cart</button>
                <span class="product-status-message aria-description--hidden">Adding to cart… The item has been added</span>
              </div>
          </div>`;
          }

          const template = `
    <div id="product-${pr["id"]}" class="product" product-data-category="${
            category[pr["categories"][0]] === undefined
              ? ""
              : category[pr["categories"][0]]["cat_id"].join(" ")
          }" 
                product-data-name="${pr["fake-heading"]}" 
                product-data-review="${
                  pr["reviews_count"] === 0
                    ? 0
                    : pr["reviews_rating_sum"] / pr["reviews_count"]
                }"
                product-review-count="${pr["reviews_count"]}" 
                product-data-price="${
                  pr["variants"].length > 1
                    ? pr["variants"][0]["calculated_price"].toFixed(2)
                    : pr["calculated_price"].toFixed(2)
                }" 
                product-date-created="${pr["date_created"]}" 
                product-is-featured="${
                  pr["is_featured"]
                }" product-best-selling="${pr["total_sold"]}">
  <div class="card-wrapper">
    <article class="card" data-test="card-${pr["id"]}">
      <figure class="card-figure">
        <a href="${
          pr["custom_url"]["url"]
        }" class="card-figure__link" aria-label="${pr["name"]}, $${
            pr["variants"].length > 1
              ? pr["variants"][0]["calculated_price"].toFixed(2)
              : pr["calculated_price"].toFixed(2)
          }">
          <div class=" card-img-container">
            <img src="
            ${img["url_thumbnail"]}" 
            alt="img["description"]" title="${
              pr["fake-heading"]
            }" data-sizes="auto" 
            srcset="
            ${img["url_standard"]} 80w, 
            ${img["url_standard"]} 160w, 
            ${img["url_standard"]} 320w, 
            ${img["url_standard"]} 640w, 
            ${img["url_standard"]} 960w, 
            ${img["url_standard"]} 1280w, 
            ${img["url_standard"]} 1920w, 
           ${img["url_standard"]} 2560w" 
            
            data-srcset="
            ${img["url_standard"]} 80w, 
            ${img["url_standard"]} 160w, 
            ${img["url_standard"]} 320w, 
            ${img["url_standard"]} 640w, 
            ${img["url_standard"]} 960w, 
            ${img["url_standard"]} 1280w, 
            ${img["url_standard"]} 1920w, 
            ${img["url_standard"]} 2560w" 
            
            class="card-image lazyautosizes lazyloaded" sizes="248px">
          </div>
        </a>

        <figcaption class="card-figcaption">
          <div class="card-figcaption-body">
          </div>
        </figcaption>
          </figure>
          <div class="card-body">
            <p class="productView-type-title h4" product-name="">${
              pr["fake-heading"]
            }</p>

            <h3 class="card-title ">
              <a aria-label="${pr["name"]}, $${
            pr["variants"].length > 1
              ? pr["variants"][0]["calculated_price"].toFixed(2)
              : pr["calculated_price"].toFixed(2)
          }" href="${pr["custom_url"]["url"]}">
                ${pr["name"]}
              </a>
            </h3>

            <p class="card-text card-text--sku">
              <span>
                SKU#: ${pr["sku"]}
              </span>
            </p>

            <div class="card-text card-text--price" data-test-info-type="price">

              <div class="price-section price-section--withoutTax rrp-price--withoutTax h4" style="display: none;">
                <span class="is-srOnly">
                  MSRP:
                </span>
                <span data-product-rrp-price-without-tax="" class="price price--rrp h5">

                </span>
              </div>
              <div class="price-section price-section--withoutTax non-sale-price--withoutTax h5" style="display: none;">
                <span class="is-srOnly">
                  Was:
                </span>
                <span data-product-non-sale-price-without-tax="" class="price price--non-sale">

                </span>
              </div>
              <div class="price-section price-section--withoutTax h4">
                <span class="price-label is-srOnly">

                </span>
                <span class="price-now-label is-srOnly" style="display: none;">
                  Now:
                </span>
                <span data-product-price-without-tax="" class="price price--withoutTax">$${
                  pr["variants"].length > 1
                    ? pr["variants"][0]["calculated_price"].toFixed(2)
                    : pr["calculated_price"].toFixed(2)
                }</span>
              </div>
            </div>

            <div class="card-action-wrapper">

              ${actionSection}
              <button type="button" class="button button--primary quickview button--quickview" data-product-id="${
                pr["id"]
              }">View Details</button>
            </div>

          </div>
        </article>
      </div>

    </div>`;
          gridAllProducts.append(template);
        });

        body.configureIsotopeForAll();
        body.startGlobal();
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  startGlobal() {
    customGlobal(this.context);
  }

  configureIsotopeForAll() {
    $(".grid").css("display", "grid");
    $(".lds-block").hide();
    let grid = document.getElementById("grid-all-product");
    let iso = new Isotope(grid, {
      // options...
      itemSelector: ".product",
      layoutMode: "fitRows",
      getSortData: {
        name: function (itemElem) {
          return itemElem.getAttribute("product-data-name");
        },
        price: function (itemElem) {
          return Number(itemElem.getAttribute("product-data-price"));
        },
        review: function (itemElem) {
          return itemElem.getAttribute("product-data-review");
        },
        category: function (itemElem) {
          return itemElem.getAttribute("product-data-category");
        },
        best_selling: function (itemElem) {
          return Number(itemElem.getAttribute("product-best-selling"));
        },
        newest: function (itemElem) {
          return itemElem.getAttribute("product-date-created");
        },
      },
    });

    $("#all-sort-select").change(function () {
      const val = $(this).val().split("-");

      if (val[0] === "review") {
        iso.arrange({
          sortBy: [val[0], "rating_count"],
          sortAscending: {
            review: false,
            rating_count: false,
          },
        });
      } else {
        iso.arrange({
          sortBy: val[0],
          sortAscending: val[1] === "asc",
        });
      }
    });

    const filter_arr = [];

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
      const isfeatured = $("#featured-checkbox:checked").length > 0;
      if ($(this).attr("id") !== "featured-checkbox") {
        if (this.checked) {
          filter_arr.push($(this).attr("filter-value"));
        } else {
          const index = filter_arr.indexOf($(this).attr("filter-value"));
          if (index > -1) {
            // only splice array when item is found
            filter_arr.splice(index, 1); // 2nd parameter means remove one item only
          }
        }
      }

      if (filter_arr.length > 0) {
        iso.arrange({
          // item element provided as argument
          filter: function (itemElem) {
            const val = itemElem.getAttribute("product-data-category");
            for (let i = 0; i < filter_arr.length; i++) {
              if (val.includes(filter_arr[i])) {
                if (isfeatured) {
                  return (
                    itemElem.getAttribute("product-is-featured") === "true"
                  );
                } else {
                  return true;
                }
              }
            }

            return false;
          },
        });
      } else if (isfeatured) {
        iso.arrange({
          filter: function (itemElem) {
            return itemElem.getAttribute("product-is-featured") === "true";
          },
        });
      } else {
        iso.arrange({ filter: "*" });
      }
    });

    iso.arrange({
      sortBy: "best_selling",
      sortAscending: false,
    });
  }
}
