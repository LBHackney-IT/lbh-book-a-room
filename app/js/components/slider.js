const Slick = require('slick-carousel/slick/slick');


module.exports = {

    init: () => {
        const sliderSelector = '.js-slider';

        $(sliderSelector).slick({
            autoplay: false,
            dots: true,
            adaptiveHeight: false,
            infinite: false
        });
    }
}

