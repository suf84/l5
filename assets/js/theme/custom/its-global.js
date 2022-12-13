import kitchenSink from './kitchen-sink';
import imageSwapOnHover from './image-swap-on-hover';
import popupLoginWindow from './popup-login';
import CardAddToCart from './card-add-to-cart';
import SlideCart from './slide-cart';

export default function (context) {
    const { inDevelopment } = context;

    if (inDevelopment) {
        console.log('this.context ', context); // eslint-disable-line

        kitchenSink(context);
    }

    const slideCart = new SlideCart(context);

    imageSwapOnHover(context);
    popupLoginWindow(context);
    new CardAddToCart(context); // eslint-disable-line
}
