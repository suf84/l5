import PhotoSwipe from 'photoswipe';
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';

export default function(event) {
    event.preventDefault();

    const image = new Image();
    image.src = $(event.currentTarget).attr('href') || '';
    image.onload = (event) => {
        const data = [{
            src: event.target.src,
            w: event.target.width,
            h: event.target.height,
        }];

        loadGallery(data);
    };

    function loadGallery(images) {
        const pswpElement = document.querySelectorAll('.pswp')[0];
        const options = {
            index: 0,
            bgOpacity: 0.8,
        };

        const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUIDefault, images, options);

        gallery.init();
    }
}
