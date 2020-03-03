import $ from 'jquery';
global.$ = $;

const Carousel = require('./components/slider');

window.addEventListener('DOMContentLoaded', (event) => {
    Carousel.init();
});