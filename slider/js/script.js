$(document).ready(function () {    
    $('.gallery-sec').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        draggable: false,
        arrows: true,
        dots: false,
        touchMove: false,
        autoplay: true,
        responsive: [{
            breakpoint: 1025,
            settings: {
                slidesToShow: 3,
                infinite: true,
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
            }
        }]
    });


    $('.prew-img-block').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: false,
        arrows: true,
        dots: false,
        touchMove: false,
        autoplay: true,
        responsive: [{
            breakpoint: 1025,
            settings: {
                slidesToShow: 1,
                infinite: true,
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
            }
        }]
    });
    
    $('.img-prew-sec .prew-cls').click(function(){
        $('.gray-shade').removeClass('active');
           
      })

      $('.gallery-sec .slider-child').click(function(){
        $('.gray-shade').addClass('active');
           
      })
});