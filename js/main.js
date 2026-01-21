(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-white shadow');
            } else {
                $('.fixed-top').removeClass('bg-white shadow');
            }
        } else {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-white shadow').css('top', -45);
            } else {
                $('.fixed-top').removeClass('bg-white shadow').css('top', 0);
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").each(function () {
        var isCita = $(this).attr("id") === "cita";
        $(this).owlCarousel({
            autoplay: true,
            smartSpeed: 1000,
            margin: 25,
            loop: true,
            center: true,
            dots: false,
            nav: !isCita,
            navText: [
                '<i class="bi bi-chevron-left"></i>',
                '<i class="bi bi-chevron-right"></i>'
            ],
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                }
            }
        });
    });

    // Update testimonial height for relative owl-nav positioning
    function updateTestimonialHeight() {
        $(".testimonial-carousel").each(function () {
            var $carousel = $(this);
            var $activeItem = $carousel.find(".owl-item.active .testimonial-item");
            if ($activeItem.length === 0) {
                $activeItem = $carousel.find(".testimonial-item").first();
            }
            if ($activeItem.length) {
                var height = $activeItem.outerHeight();
                $carousel.get(0).style.setProperty("--testimonial-height", height + "px");
            }
        });
    }

    $(window).on("load resize", function () {
        setTimeout(updateTestimonialHeight, 200); // Give OwlCarousel time to settle
    });
    
    $(".testimonial-carousel").on("translated.owl.carousel", updateTestimonialHeight);

    
})(jQuery);

