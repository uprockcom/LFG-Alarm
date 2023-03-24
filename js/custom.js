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
         
         const targetDate = new Date("June 15, 2023");

         // Get the current date
         const currentDate = new Date();
         
         // Calculate the difference in days between the target date and the current date
         const timeDiff = targetDate.getTime() - currentDate.getTime();
         const daysLeft = Math.floor(timeDiff / (1000 * 3600 * 24));
         
         // Update the HTML element with the result
         $('.bitsignal-deadline').html(daysLeft + " days left");
         

         $('.video-wrapper').click(function() {
          $(this).find('.play-button, .video-placeholder').fadeOut(500);
          $(this).find('.video-embed').fadeIn(500).attr('src', $(this).find('.video-embed').attr('src') + '?autoplay=1').css('z-index', '0');
        });
        
    });


})(jQuery);