$( document ).ready(function() {
    $('.second-line').on('click', function () {
        $('.hamburger__inner').toggleClass('is-active');
        $('.menu').toggleClass('is-visible');
    });

    $('.tabs__link').click(function () {
       var tab_id = $(this).attr('data-tab');

       $('.tabs__link').removeClass('tab_active');
       $('.fragment').removeClass('fragment_active');

       $(this).addClass('tab_active');
       $(tab_id).addClass('fragment_active');
    });


    $(".gallery-slider-js").slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '.gallery-slider__prev',
        nextArrow: '.gallery-slider__next',
        adaptiveHeight: true
    });


    var filter_btn = $('.filter__btn').click(function() {
        var article = $('.article');
        if (this.id === 'article_all') {
            article.fadeIn(450);
        } else {
            var $el = $('.' + this.id).fadeIn(450);
            article.not($el).hide();
        }
        filter_btn.removeClass('filter__btn_active');
        $(this).addClass('filter__btn_active');
    });

    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });

});

$(window).on('load', function() {
    $('.preloader__wrapper').delay(500).fadeOut('slow');
});
