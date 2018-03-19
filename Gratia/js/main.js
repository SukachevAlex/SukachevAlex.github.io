$(document).ready(function() {

    $(".header-slider-js").slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '.header-slider__prev',
        nextArrow: '.header-slider__next',
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: false
                }
            }
        ]
    });


    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });

    $('.popup__link').magnificPopup({
        type:'inline',
        midClick: true
    });

    $('.popup__close').on('click', function() {
        $.magnificPopup.close();
    })

});

$(window).on('load', function() {
    $('.preloader__wrapper').delay(1000).fadeOut('slow');
});