
$( document ).ready(function() {
    $('.menu').on('click', function() {
       $('.hamburger__inner').toggleClass('is-active');
       $('.nav').toggleClass('is-visible');
    });

    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });

    $(".feedback-slider-js").slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 1,
        prevArrow: '.feedback-slider__prev',
        nextArrow: '.feedback-slider__next',
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false
                }
            }
        ]
    });

    $('.consultation-form').on('submit', function() {
        $(this).hide();
        $(this).parent().find('.consultation-form_success').show();

        return false;
    });

    $('.consultation-form__close').on('click', function() {
        $('.consultation-form_success').hide();
        $('.consultation-form').show();
        if ($(this).parent('.consultation-form__wrapper').length) {
            $.magnificPopup.close();
        }

    });

    $('.popup-link').magnificPopup({
        type:'inline',
        midClick: true
    });

    $('#popup__close').on('click', function() {
        $.magnificPopup.close();
    })
});

$(window).on('load', function() {
   $('#preloader').delay(1000).fadeOut('slow');
});