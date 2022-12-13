import { api } from '@bigcommerce/stencil-utils';
import urlUtils from '../common/utils/url-utils';

export default class ToggleCategoryListingView {
    constructor(context) {
        this.context = context;
        this.defaultViewType = this.context.defaultViewType;
        this.oppositeViewType = this.defaultViewType !== 'grid' ? 'grid' : 'list';
        this.productsPerPage = this.context.categoryProductsPerPage;
        this.loadingOverlay = $('.loadingOverlay.loadingOverlay--product-listing');

        $('body').on('facetedSearchRefresh', () => {
            this.addToggleEvents();
        });

        this.init();
    }

    getStoredViewType() {
        return sessionStorage.getItem('category-view-type') || null;
    }

    getRequestTemplateType(type) {
        const pageType = this.getStoredViewType();
        return !pageType ? `${type}/product-listing` : `custom/category-${pageType}-view`;
    }

    storeViewType(type) {
        sessionStorage.setItem('category-view-type', type);
    }

    getCategoryPage(pageType) {
        const config = {
            config: {
                category: {
                    shop_by_price: true,
                    products: {
                        limit: this.productsPerPage,
                    },
                },
            },
            template: `custom/category-${pageType}-view`,
        };

        this.loadingOverlay.show();

        api.getPage(urlUtils.getUrl(), config, (err, content) => {
            if (err) {
                throw new Error(err);
            }

            $('#product-listing-container').html(content);

            this.loadingOverlay.hide();

            this.storeViewType(pageType);

            this.addToggleEvents();

            $('body').triggerHandler('productViewModeChanged');
        });
    }

    addToggleEvents() {
        $('.js-category__toggle-view').on('click', (e) => {
            const type = $(e.currentTarget).data('view-type');

            if ($(e.currentTarget).hasClass('active-category-view')) return;

            this.getCategoryPage(type, this.addToggleEvents);
        });
    }

    init() {
        const storedViewType = this.getStoredViewType();

        if (storedViewType === this.defaultViewType || !storedViewType) {
            return this.addToggleEvents();
        }

        this.getCategoryPage(this.oppositeViewType);
    }
}
