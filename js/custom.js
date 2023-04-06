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
                    slidesToScroll: 1
                }
              },
              {
                breakpoint: 480,
                settings: {
                    arrows:false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
              }
            ]
         });

         $('.bitsignal-slider').slick({
          dots: true,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: false,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                  slidesToShow: 1,
                  slidesToScroll: 3,
                  infinite: true,
                  dots: true
              }
            },
            {
              breakpoint: 992,
              settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
              }
            },
            {
              breakpoint: 768,
              settings: {
                  arrows:false,
                  slidesToShow: 1,
                  slidesToScroll: 1
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
         $('.bitsignal-deadline').html(daysLeft);
         

         $('.video-wrapper').click(function() {
          $(this).find('.play-button, .video-placeholder').fadeOut(500);
          $(this).find('.video-embed').fadeIn(500).attr('src', $(this).find('.video-embed').attr('src') + '?autoplay=1').css('z-index', '0');
        });

        $('.subscribe-btn').click(function() {
          $(this).toggleClass('active');
          if ($(this).hasClass('active')) {
            $(this).html('SUBSCRIBED');
          } else {
            $(this).html('$' + $(this).text());
          }
        });

        $("#copy-btn").click(function() {
          // Copy URL to clipboard
          var url = "https://lfgalarm.com";
          var tempInput = $("<input>");
          $("body").append(tempInput);
          tempInput.val(url).select();
          document.execCommand("copy");
          tempInput.remove();
          
          // Show pillbox and fade out after 1 second
          var pillbox = $("<div>");
          pillbox.addClass("pillbox");
          pillbox.text("Copied!");
          $(this).append(pillbox);
          pillbox.fadeIn(100).delay(1000).fadeOut(100, function() {
            $(this).remove();
          });
        });

        
        
    });


})(jQuery);

$(document).ready(function() {
	// check if the user is already subscribed
	var isSubscribed = getCookie('isSubscribed');

	if (isSubscribed == 'true') {
		// change the button text to "Unsubscribe"
		$('#subscribeButton').text('Unsubscribe');
	} else {
		// change the button text to "Subscribe"
		$('#subscribeButton').text('Subscribe');
	}

	// handle button click event
	$('#subscribeButton').click(function() {
		if (isSubscribed == 'true') {
			// unsubscribe the user
			setCookie('isSubscribed', 'false', 365);
			$('#subscribeButton').text('Subscribe');
			alert('You have unsubscribed from Bitcoin price alerts.');
		} else {
			// subscribe the user
			setCookie('isSubscribed', 'true', 365);
			$('#subscribeButton').text('Unsubscribe');
			alert('You have subscribed to Bitcoin price alerts.');

			// check the price of Bitcoin every 30 seconds
			setInterval(function() {
				$.getJSON('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd', function(data) {
					var price = data.bitcoin.usd;
					if (price >= 1000000) {
						// play the custom notification sound
						var audio = new Audio('notification-sound.mp3');
						audio.play();

						// show the notification
						var notification = new Notification('Bitcoin Price Alert', {
							body: 'Bitcoin price has reached $1,000,000!'
						});
					}
				});
			}, 30000); // 30 seconds
		}
	});

  // Total Subscribers
  $.ajax({
    url: 'http://api.lfgalarm.com/count_subscribe',
    method: 'GET',
    contentType: "application/json",
    dataType: "json",
    success: function(response){
      console.log(response);
      $('#total-subscribers').html(response.count);
    }
  });

});

// set a cookie
function setCookie(name, value, days) {
	var expires = '';
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = '; expires=' + date.toUTCString();
	}
	document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

// get a cookie
function getCookie(name) {
	var nameEQ = name + '=';
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

const subscribeButton = document.getElementById('subscribe-button');
const countDisplay = document.getElementById('count-display');
let isSubscribed = false;

function updateSubscriberCount() {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/subscribe', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = () => {
    const response = JSON.parse(xhr.responseText);
    countDisplay.innerHTML = response.count;
  };
  xhr.send(`subscribed=${isSubscribed}`);
}

subscribeButton.addEventListener('click', () => {
  isSubscribed = !isSubscribed;

  if (isSubscribed) {
    subscribeButton.textContent = 'Unsubscribe';
  } else {
    subscribeButton.textContent = 'Subscribe';
  }

  updateSubscriberCount();
});



// server TODO

// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');

// let subscriberCount = 0;

// app.use(bodyParser.urlencoded({ extended: true }));

// app.post('/subscribe', (req, res) => {
//   const isSubscribed = req.body.subscribed === 'true';

//   if (isSubscribed) {
//     subscriberCount++;
//   } else {
//     subscriberCount--;
//   }

//   res.send({ count: subscriberCount });
// });

// app.listen(3000, () => {
//   console.log('Server is listening on port 3000');
// });