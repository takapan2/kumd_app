$(function() {
    $(".scroll-btn").on("click",function(){
        var element = $(this).attr("scroll-option");
        var position = $(element).offset().top;
        $('html, body').animate({
            'scrollTop': position
        },750);
    });
});
