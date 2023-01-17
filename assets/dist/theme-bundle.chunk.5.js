(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./assets/js/theme/blog.js":
/*!*********************************!*\
  !*** ./assets/js/theme/blog.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Blog; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/collapsible */ "./assets/js/theme/common/collapsible.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Blog = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Blog, _PageManager);
  function Blog() {
    return _PageManager.apply(this, arguments) || this;
  }
  var _proto = Blog.prototype;
  _proto.onReady = function onReady() {
    Object(_common_collapsible__WEBPACK_IMPORTED_MODULE_2__["default"])();
    this.fetchRecentPosts();
  };
  _proto.fetchRecentPosts = function fetchRecentPosts() {
    var $sidebarRecent = $('#blog-sidebar-recent');
    if (!$sidebarRecent.length) return;
    var requestOptions = {
      config: {
        blog: {
          recent_posts: {
            limit: 5
          }
        }
      },
      template: 'custom/blog/blog-recent-post-items'
    };
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.getPage('/', requestOptions, function (err, res) {
      $sidebarRecent.html(res);
    });
  };
  return Blog;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvYmxvZy5qcyJdLCJuYW1lcyI6WyJCbG9nIiwib25SZWFkeSIsImNvbGxhcHNpYmxlRmFjdG9yeSIsImZldGNoUmVjZW50UG9zdHMiLCIkc2lkZWJhclJlY2VudCIsIiQiLCJsZW5ndGgiLCJyZXF1ZXN0T3B0aW9ucyIsImNvbmZpZyIsImJsb2ciLCJyZWNlbnRfcG9zdHMiLCJsaW1pdCIsInRlbXBsYXRlIiwidXRpbHMiLCJhcGkiLCJnZXRQYWdlIiwiZXJyIiwicmVzIiwiaHRtbCIsIlBhZ2VNYW5hZ2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUF5QztBQUNNO0FBQ087QUFBQSxJQUVqQ0EsSUFBSTtFQUFBO0VBQUE7SUFBQTtFQUFBO0VBQUE7RUFBQSxPQUNyQkMsT0FBTyxHQUFQLG1CQUFVO0lBQ05DLG1FQUFrQixFQUFFO0lBRXBCLElBQUksQ0FBQ0MsZ0JBQWdCLEVBQUU7RUFDM0IsQ0FBQztFQUFBLE9BRURBLGdCQUFnQixHQUFoQiw0QkFBbUI7SUFDZixJQUFNQyxjQUFjLEdBQUdDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQztJQUVoRCxJQUFJLENBQUNELGNBQWMsQ0FBQ0UsTUFBTSxFQUFFO0lBRTVCLElBQU1DLGNBQWMsR0FBRztNQUNuQkMsTUFBTSxFQUFFO1FBQ0pDLElBQUksRUFBRTtVQUNGQyxZQUFZLEVBQUU7WUFDVkMsS0FBSyxFQUFFO1VBQ1g7UUFDSjtNQUNKLENBQUM7TUFDREMsUUFBUSxFQUFFO0lBQ2QsQ0FBQztJQUVEQyxrRUFBSyxDQUFDQyxHQUFHLENBQUNDLE9BQU8sQ0FBQyxHQUFHLEVBQUVSLGNBQWMsRUFBRSxVQUFDUyxHQUFHLEVBQUVDLEdBQUcsRUFBSztNQUNqRGIsY0FBYyxDQUFDYyxJQUFJLENBQUNELEdBQUcsQ0FBQztJQUM1QixDQUFDLENBQUM7RUFDTixDQUFDO0VBQUE7QUFBQSxFQTFCNkJFLHFEQUFXIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay41LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhZ2VNYW5hZ2VyIGZyb20gJy4vcGFnZS1tYW5hZ2VyJztcbmltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgY29sbGFwc2libGVGYWN0b3J5IGZyb20gJy4vY29tbW9uL2NvbGxhcHNpYmxlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmxvZyBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcbiAgICBvblJlYWR5KCkge1xuICAgICAgICBjb2xsYXBzaWJsZUZhY3RvcnkoKTtcblxuICAgICAgICB0aGlzLmZldGNoUmVjZW50UG9zdHMoKTtcbiAgICB9XG5cbiAgICBmZXRjaFJlY2VudFBvc3RzKCkge1xuICAgICAgICBjb25zdCAkc2lkZWJhclJlY2VudCA9ICQoJyNibG9nLXNpZGViYXItcmVjZW50Jyk7XG5cbiAgICAgICAgaWYgKCEkc2lkZWJhclJlY2VudC5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgICAgIGJsb2c6IHtcbiAgICAgICAgICAgICAgICAgICAgcmVjZW50X3Bvc3RzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW1pdDogNSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnY3VzdG9tL2Jsb2cvYmxvZy1yZWNlbnQtcG9zdC1pdGVtcycsXG4gICAgICAgIH07XG5cbiAgICAgICAgdXRpbHMuYXBpLmdldFBhZ2UoJy8nLCByZXF1ZXN0T3B0aW9ucywgKGVyciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAkc2lkZWJhclJlY2VudC5odG1sKHJlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=