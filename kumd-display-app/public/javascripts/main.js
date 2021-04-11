$(function() {
    $(".scroll-btn").on("click",function(){
        var element = $(this).attr("scroll-option");
        var position = $(element).offset().top-150;
        $('html, body').animate({
            'scrollTop': position
        },750);
    });

    var swiper = new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
});
