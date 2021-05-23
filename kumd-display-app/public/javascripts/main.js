$(function() {
    $(".scroll-btn").on("click",function(){
        var element = $(this).attr("scroll-option");
        var position = $(element).offset().top;
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

//ヘッダー部分の挙動
$(()=>{
  const height = 200;

  let offset =0;
  let lastPosition = 0;
  let ticking = false;

  function onScroll(){
    //console.log(lastPosition+' '+" "+offset);
    if(Math.abs(lastPosition - offset) > height){
      if(lastPosition > offset){
        $('.header-content').addClass('head-animation');
      }else{
        $('.header-content').removeClass('head-animation');
      }
      offset = lastPosition;
    }
  }

  window.addEventListener('scroll', ()=>{
    lastPosition = window.scrollY;
    if(!ticking){
      window.requestAnimationFrame(()=>{
        onScroll(lastPosition);
        ticking = false;
      });
      ticking = true;
    }
  });
});
//ヘッダー部分の挙動