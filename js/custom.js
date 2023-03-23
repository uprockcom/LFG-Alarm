(function ($) {
    'use strict';

    $(document).on('ready', function () {
        // -----------------------------
        //  On Scroll Resize Nav
        // -----------------------------
        $(document).on('scroll', function() {
            if($(document).scrollTop()>100) {
                $('.main-nav').removeClass('large').addClass('small');
            } else {
                $('.main-nav').removeClass('small').addClass('large');
            }
        });
        // -----------------------------
        //  On Click Smooth Scroll
        // -----------------------------
         $('.scrollTo').on('click', function(e) {
             e.preventDefault();
             var target = $(this).attr('href');
             $('html, body').animate({
               scrollTop: ($(target).offset().top)
             }, 500);
          });
        // -----------------------------
        //  Alarms Slider
        // -----------------------------
         $('.alarm-slider').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 3000,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
              },
              {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
              },
              {
                breakpoint: 768,
                settings: {
                    arrows:false,
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
              }
            ]
         });
        // -----------------------------
        //  Video Replace
        // -----------------------------
        $('.video-box span.icon').click(function() {
            var video = '<iframe allowfullscreen src="' + $(this).attr('data-video') + '"></iframe>';
            $(this).replaceWith(video);
        });

    });


})(jQuery);