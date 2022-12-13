import _ from 'lodash';
export default function ($scope) {
    const dataTabs = $('[data-its-tab]').toArray();

    dataTabs.forEach((tab, i) => {
        const title = $(tab).data('itsTab');
        $('.tabs', $scope).append(`
            <li class="tab tab--custom tab--${_.kebabcase(title)}" role="presentation">
                <a class="tab-title" href="#itsTab-${i}" aria-controls="itsTab-${i}" role="tab" tabindex="0" aria-selected="false">${title}</a>
            </li>
        `);

        $('.tabs-contents', $scope).append(`
            <div class="container tab-content tab-content--custom tab-content--${_.kebabcase(title)}" id="itsTab-${i}" aria-hidden="true" role="tabpanel">
                ${$(tab).html()}
            </div>
        `);

        tab.remove();
    });
    
}
