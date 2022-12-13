import graphQLFetch from "./graphql-utils";

const getProductData = () => {
    return $('[data-option-product-ids]').toArray().map(item => [`${item.id}`, $(item).data('option-product-ids').split(',')]);
}

const getProductIds = (data) => {
    return data.reduce((acc, opt) => [...acc, ...opt[1]], []).map(id => parseInt(id));
}

const getGraphQLProductsQuery = (productIds) => {
    return {
        query: `
                query PRODUCTS_QUERY($productIds: [Int!]) {
                    site {
                        products(first: 50, entityIds: $productIds) {
                            edges {
                                node {
                                    sku
                                    entityId
                                    path
                                    name
                                    defaultImage {
                                        url(width: 100, height: 100)
                                        altText
                                    }
                                    customFields {
                                        edges {
                                            node {
                                                name
                                                value
                                            }
                                        }
                                    }
                                    inventory {
                                        isInStock
                                    }
                                }
                            }
                        }
                    }
                }
            `,
        variables: {
            productIds: productIds
        },
    }
}

export default function (context) {
    const { storefrontToken } = context;
    const productData = getProductData();

    if (!productData.length) return;

    const productIds = getProductIds(productData);
    const body = getGraphQLProductsQuery(productIds);
    console.log(body);
    graphQLFetch(storefrontToken, body, (res) => {
        if (!res) return;

        const { products } = res;

        if (products === undefined || !products.length) return;

        products.map(product => {
            const $scope = $(`[data-option-product-id="${product.entityId}"]`);
            const $a = $('.js-fake-opt-link', $scope);
            const $img = $('.js-fake-opt-img', $scope);
            const $text = $('.js-fake-opt-title', $scope);

            const cfLabel = product?.customFields.find( cf => cf.name === '__product-label');
            const altText = product?.defaultImage?.altText || product?.name;
            const hasStock = product?.inventory?.isInStock;

            if(!hasStock) {
                $scope.addClass('pdp-fake-options__card-item--oos');
            }

            $a.attr('href', product.path).attr('title', product?.name).removeClass('skeleton-loading');
            $img.attr('src', product?.defaultImage?.url).attr('alt', altText);
            $text.text(cfLabel?.value || '');
        });

        console.log(productData);
        
        $('.pdp-fake-options__button-container li a').on('click', (event)=>{
            event.preventDefault();

        });
    });
}
