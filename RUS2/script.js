

const slick = (selector, speed) => {
    $(selector).slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: speed,
        prevArrow: false,
        nextArrow: false,
        infinite: true,
        variableWidth: true
    });


}


window.addEventListener('load', () => {
    slick('.gallery__one', 1000);
    slick('.gallery__two', 800)
})