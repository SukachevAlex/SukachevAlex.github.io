$(document).ready(function() {

    $('.hamburger').on('click', function() {
        $('.hamburger__inner').toggleClass('is-active');
        $('.nav').toggleClass('visible');
    });

    $(".guestbook-slider-js").slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: true,
        arrows : false,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    dots: false
                }
            }
        ]
    });

    ymaps.ready(function () {
        var myMap = new ymaps.Map('map', {
                center: [55.751574, 37.573856],
                zoom: 7,
                type: 'yandex#hybrid',
                controls: []
            }, {
                suppressMapOpenBlock: true
            }),

            myPlacemark = new ymaps.Placemark(myMap.getCenter(), {}, {})

        myMap.geoObjects
            .add(myPlacemark);
    });

    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });

});