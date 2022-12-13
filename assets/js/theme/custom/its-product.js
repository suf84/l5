import utils from '@bigcommerce/stencil-utils';
import schematics from '../custom/schematics';

/**
 * IntuitSolutions - Custom JS that fires on the PDP
 */

export default class ITSProduct {
    constructor(context) {
        this.context = context;

        const showMoreReviews = this.showMoreReviews.bind(this)

        $('.js-load-more-reviews').on('click', showMoreReviews);

        // schematic + parts list buttons
        $('.schematic__content .button:not(.button--pdf)').on('click', schematics);

        $('.more-info-slider__text a[href="#tab-warranty"]').on('click', (e) => {
            const $targetTabId = $(e.currentTarget).attr('href');
            $(`.tab-title[href="${$targetTabId}"]`).trigger('click');
        });
    }

    showMoreReviews(e) {
        e.preventDefault();
        const $store = $(e.currentTarget);
        const currentPage = $store.data('current-page');
        const productPageReviewsCount = this.context.productpageReviewsCount || 3;
        const productPageURL = this.context.productpageURL;
        const nextPageURL = `${productPageURL}?revpage=${currentPage + 1}`;

        $store.attr('disabled', true);

        const requestOptions = {
            config: {
                product: {
                    reviews: {
                        limit: productPageReviewsCount,
                    },
                },
            },
            template: 'products/ajax-reviews',
        };

        utils.api.getPage(nextPageURL, requestOptions, (err, res) => {
            if (err) {
                $store.attr('disable', false);
                return;
            }

            $(res).hide().appendTo("#productReviews-list").slideDown(200);

            $store.data('current-page', currentPage + 1).attr('disabled', false);
        })
    }
}
