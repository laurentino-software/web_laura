(function ($) {
    "use strict";

    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    new WOW().init();

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
                    items: 1,
                    margin: 0
                },
                768: {
                    items: 2,
                    margin: 25
                },
                992: {
                    items: 3,
                    margin: 25
                }
            }
        });
    });

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
        setTimeout(updateTestimonialHeight, 200);
    });
    
    $(".testimonial-carousel").on("translated.owl.carousel", updateTestimonialHeight);

    function loadDoctoralia() {
        if ($("#zl-widget-container").length && !$("#zl-widget-s").length) {
            var isEnglish = $("html").attr("lang") === "en";
            var widgetTitle = isEnglish ? "Medical appointment booking widget" : "Widget de reserva de citas médicas";
            
            $("#zl-widget-container").html('<a id="zl-url" class="zl-url" href="https://www.doctoralia.es/laura-rebollo/psicologo/alcala-de-henares" rel="nofollow" data-zlw-doctor="laura-rebollo" data-zlw-type="big_with_calendar" data-zlw-opinion="false" data-zlw-hide-branding="true" data-zlw-saas-only="true" data-zlw-a11y-title="' + widgetTitle + '">Laura Rebollo - Doctoralia.es</a>');
            
            (function($_x, _s, id) {
                var js, fjs = $_x.getElementsByTagName(_s)[0];
                if (!$_x.getElementById(id)) {
                    js = $_x.createElement(_s);
                    js.id = id;
                    js.src = "//platform.docplanner.com/js/widget.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }
            }(document, "script", "zl-widget-s"));
        }
    }

    function checkCookieConsent() {
        var consent = localStorage.getItem("cookie-consent");
        if (consent === "accepted") {
            $("#cookie-banner").hide();
            loadDoctoralia();
        } else if (consent === "rejected") {
            $("#cookie-banner").hide();
            showPlaceholder();
        } else {
            $("#cookie-banner").show();
            showPlaceholder();
        }
    }

    function showPlaceholder() {
        if ($("#zl-widget-container").length) {
            var isEnglish = $("html").attr("lang") === "en";
            var title = isEnglish ? "Privacy Guarantee" : "Garantía de privacidad";
            var text = isEnglish ? "To book your appointment through the Doctoralia widget, you must accept third-party cookies." : "Para reservar tu cita a través del widget de Doctoralia, debes aceptar las cookies de terceros.";
            var btn = isEnglish ? "Accept cookies and access Doctoralia" : "Aceptar cookies y acceder a Doctoralia";
            var direct = isEnglish ? "Or you can book directly at" : "O puedes reservar directamente en";
            
            $("#zl-widget-container").html(`
                <div class="doctoralia-placeholder">
                    <i class="fa fa-cookie-bite fa-3x text-primary mb-3"></i>
                    <h5>${title}</h5>
                    <p>${text}</p>
                    <button class="btn btn-primary rounded-pill px-4 accept-cookies-btn">${btn}</button>
                    <p class="mt-2 small">${direct} <a href="https://www.doctoralia.es/laura-rebollo/psicologo/alcala-de-henares" target="_blank">Doctoralia.es</a></p>
                </div>
            `);
        }
    }

    $(document).on("click", ".accept-cookies-btn", function() {
        localStorage.setItem("cookie-consent", "accepted");
        $("#cookie-banner").fadeOut();
        loadDoctoralia();
    });

    $(document).on("click", ".reject-cookies-btn", function() {
        localStorage.setItem("cookie-consent", "rejected");
        $("#cookie-banner").fadeOut();
    });

    checkCookieConsent();

})(jQuery);

