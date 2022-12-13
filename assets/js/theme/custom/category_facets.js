import urlUtils from '../common/utils/url-utils';
import Url from 'url';
export default function () {
    const button = $('.button--facet');
    
    button.on('click', (e) => {        
        e.stopImmediatePropagation();
        e.preventDefault();
        const url = Url.parse(window.location.href, true);
        const currentTarget = (e.currentTarget.getAttribute('data-value'));
        const queryParams = currentTarget.split('=');;
        url.query[queryParams[0]] = queryParams[1];
        delete url.query.page;
        if(queryParams[1] === 'all') {
            delete url.query[queryParams[0]] 
        }
        window.location = Url.format({ pathname: url.pathname, search: urlUtils.buildQueryString(url.query)});
    });
};
