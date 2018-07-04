$(document).ready(function () {
  console.log('test');
  $(window).scroll(function(){
  
    var wScroll = $(this).scrollTop();

    // console.log(wScroll)
    // calc how far i've scrolled from the top
    $('.logo').css({
      'transform' : 'translate(0px, '+ wScroll /2 +'%)'
    });

    $('.back-bird').css({
      'transform' : 'translate(0px, '+ wScroll /4 +'%)'
    });

  $('.fore-bird').css({
      'transform' : 'translate(0px, -'+ wScroll /100 +'%)'
    });

    if (wScroll > $('.clothes-pics').offset().top - ($(window).height() / 1.5)) {

      $('.clothes-pics figure').each(function(i){

        setTimeout(function(){
          $('.clothes-pics figure').eq(i).addClass('is-showing');
        }, 150 * (i+1));
      });
    }
    
    if (wScroll > $('.large-window').offset().top - $(window).height()){

        $('.large-window').css({'background-position':'center '+ (wScroll - $('.large-window').offset().top) +'px'});

        var opacity = (wScroll - $('.large-window').offset().top + 400) / (wScroll / 5)

        $('.window-tint').css({'opacity': opacity})
    }
  // wScroll is the scroll position youre at, how far have u scrolled down the page... 
  // if the scroll is further down than the large window offset top, (window in view)
  // .top - $(window).height made it so that the top of the periscope was when the console log msg "yo"...
  //  started instead of the circle hitting the top of the page
  // math.abs makes it absolute which is positive so its coming in from the right meeting in center
    if (wScroll > $('.blog-posts').offset().top - $(window).height()){

        var offset = Math.min(0, wScroll - $('.blog-posts').offset().top +$(window).height() - 350);
  
        $('.post-1').css({'transform': 'translate('+ offset +'px, '+ Math.abs(offset * 0.2) +'px)'});

        $('.post-3').css({'transform': 'translate('+ Math.abs(offset) +'px, '+ Math.abs(offset * 0.2) +'px)'});
    
    }
  });
});
