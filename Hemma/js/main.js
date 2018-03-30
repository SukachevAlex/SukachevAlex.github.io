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
        if ($("#map").length) {
            var myMap = new ymaps.Map('map', {
                    center: [55.751574, 37.573856],
                    zoom: 7,
                    type: 'yandex#hybrid',
                    controls: []
                }, {
                    suppressMapOpenBlock: true
                }),

                myPlacemark = new ymaps.Placemark(myMap.getCenter(), {}, {});

            myMap.geoObjects
                .add(myPlacemark);
        }
        if ($("#map_scotland").length) {
            var myMap = new ymaps.Map('map_scotland', {
                    center: [56.879663, -4.589376],
                    zoom: 9,
                    type: 'yandex#hybrid',
                    controls: []
                }, {
                    suppressMapOpenBlock: true
                }),

                myPlacemark = new ymaps.Placemark(myMap.getCenter(), {}, {});

            myMap.geoObjects
                .add(myPlacemark);
        }

        if ($("#map_norway").length) {
            var myMap = new ymaps.Map('map_norway', {
                    center: [64.570968, 11.966377],
                    zoom: 9,
                    type: 'yandex#hybrid',
                    controls: []
                }, {
                    suppressMapOpenBlock: true
                }),

                myPlacemark = new ymaps.Placemark(myMap.getCenter(), {}, {});

            myMap.geoObjects
                .add(myPlacemark);
        }


    });


    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });

});


$(window).on('load', function() {
    var counter = 0;
    var i = setInterval(function(){
        $('.percentage').html(counter + '%');
        $('.progress-bar').css('width', counter + '%');
        counter++;
        if(counter === 101) {
            clearInterval(i);
            $('.preloader__wrapper').fadeOut('slow');
        }
    }, 10);
});