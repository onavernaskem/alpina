  $( function() {
    $( "#slider" ).slider();
  } );

  $(document).ready(function() {
    $("body").css({
      "opacity": "1",
      "transition": "opacity 1s ease-in-out"
    });

    $(window).on("backstretch.show", function (e, instance, index) {
        syncBg()
        $('.overlay').removeClass('show');
    }); 
    createBg();
  });

  /* old
  $('.list-indicator').fixer({
    gap: 100
  });*/


  //if(!detectmob()) {
    $('.menu-bg').fixer({
      gap: 0
    });
  //}

  $( "#show_more" ).click(function() {     
   $('#another-element').slideToggle('slow');
 });

  $(function(){

    $('.code-wrapper').on( "mousemove", function(e) {
      var offsets = $(this).offset();
      var fullWidth = $(this).width();
      var mouseX = e.pageX - offsets.left;

      if (mouseX < 0) { mouseX = 0; }
      else if (mouseX > fullWidth) { mouseX = fullWidth }


      $(this).parent().find('.divider-bar').css({
        left: mouseX,
        transition: 'none'
      });
      $(this).find('.design-wrapper').css({
        transform: 'translateX(' + (mouseX) + 'px)',
        transition: 'none'
      });
      $(this).find('.design-image').css({
        transform: 'translateX(' + (-1*mouseX) + 'px)',
        transition: 'none'
      });
    });
    $('.divider-wrapper').on( "mouseleave", function() {
      $(this).parent().find('.divider-bar').css({
        left: '50%',
        transition: 'all .3s'
      });
      $(this).find('.design-wrapper').css({
        transform: 'translateX(50%)',
        transition: 'all .3s'
      });
      $(this).find('.design-image').css({
        transform: 'translateX(-50%)',
        transition: 'all .3s'
      });
    });

    $('.user-feedback').click(function(e){
      e.preventDefault();
      var to = $('.contact').offset().top;
      $('html, body').animate({scrollTop: to - 90}, 'slow');  
      $('.contact form input').eq(0).focus();
    })
  
}); // end of document ready


(function($) {
    document.addEventListener("touchmove", syncBg, true);
    window.addEventListener("scroll", syncBg, true);
    window.addEventListener("scroll", listIndicate, true);
    $('[data-bg]').click(function (e) {
        e.preventDefault();
        changeBg( $(this) );
    });   
}(jQuery));

function createBg() {
  // if no mobile not use alg
  if(!detectmob()) {
    return false;
  }

   // set bstretch vs bg
  $.each( $('.menu-bg.img-bg'), function(i) {
    var $bg = $(this);
    var $section = $bg.parent();
    if( $bg.hasClass('empty-bg') ) {
        $bg.css({opacity: 0});
    }
    else {
        var src = 'img/bg-'+$section.attr('id')+'.png';
        $bg.backstretch({url: src, alignY: 0});
        $section.backstretch({url: src, alignY: 0});
    }
  })
}

function changeBg(j) {
  var $section = j.parents('.section');     
  var $bg = $section.find('.menu-bg'); 
  // set active li
  var $li = j.parent().siblings();
  $li.removeClass('active');
  j.parent().addClass('active');
  // change effect
  $('.overlay').addClass('show');
  var img = new Image();  
  img.src = 'img/' + j.data('bg');  
  // if no mobile not use alg
  if(!detectmob()) {
    img.onload = function() {
      if($section.length) {
        $section.css({'background-image': 'url('+img.src+')'});
      }
      if($bg.length) {
        $bg.css({'background-image': 'url('+img.src+')'});
      } 
      syncBg();
      $('.overlay').removeClass('show');
    }
  }
  // if mobile
  else {
    $section.backstretch({url: img.src, alignY: 0});
    $bg.backstretch({url: img.src, alignY: 0});
  }
}


function syncBg() {
  // if no mobile not use alg
  if(!detectmob()) {
    return false;
  }

  $.each( $('.menu-bg.img-bg'), function(i) {
    var $bg = $(this);
    var $section = $bg.parent();
    var s = getScroll();
    var is_top = ($section.offset().top - s.top); 

    // for empty bgbg
    if( $bg.hasClass('empty-bg') ) {
        if ( is_top < 0 ) {
            $bg.css({opacity: 1});
        }
        else {
            $bg.css({opacity: 0});
        }  
    }
    // for bg
    else {
        if ( is_top < 0 ) {
          $section.children('.backstretch').css({position: 'fixed'});
          $section.find('.menu-bg').css({position: 'fixed'});
        }
        else {
          $section.children('.backstretch').css({position: 'absolute'});
          $section.find('.menu-bg').css({position: 'absolute',top: 0});
        }   
    }

  })
}

function listIndicate() {
    var $section = $('.faq');
    if( !$section.length ) return false;

    var $i = $('.faq .list');
    var $pointer = $('.list-indicator');
    var s = getScroll();
    var is_top = ($section.offset().top - s.top);
    var faq_height = ($section.height() - 100); 
    var faq_nav_height = $i.height() ;
    var faq_pointer_height = $pointer.height() ;

    console.log(faq_height + ' '  +is_top)

    if ( is_top < 0 && is_top > -640 ) {
      $i.css({position: 'fixed', 'top': 120, 'width': $section.width() / 4});
      console.log( (faq_height + is_top) / faq_height )
      $pointer.css({position: 'fixed', 'top': 120 + faq_nav_height * ( 1 - (faq_height + is_top) / faq_height )});
    }
    else if(is_top < -640) {
      $i.css({position: 'absolute', 'top': faq_nav_height + 80});
      var ptop = faq_nav_height + 80 + faq_nav_height * ( 1 - (faq_height + is_top) / faq_height );
      if(ptop > 2*faq_nav_height + 80 - faq_pointer_height) {
        ptop = 2*faq_nav_height + 80 - faq_pointer_height;
      }
      $pointer.css({position: 'absolute',top: ptop });
    }
    else {
      $i.css({position: 'absolute', 'top': 0});
      $pointer.css({position: 'absolute',top: 0});
    }  
}

function test(text) {
  $('.test').text(text);
}

function detectmob() { 
  return true;
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}
function getScroll() {
       var data, scrOfX = 0, scrOfY = 0;
       if( typeof( window.pageYOffset ) == 'number' ) {
               //Netscape compliant
               scrOfY = window.pageYOffset;
               scrOfX = window.pageXOffset;
       } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
               //DOM compliant
               scrOfY = document.body.scrollTop;
               scrOfX = document.body.scrollLeft;
       } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
               //IE6 Strict
               scrOfY = document.documentElement.scrollTop;
               scrOfX = document.documentElement.scrollLeft;
       }
       data = {'left': scrOfX, 'top' : scrOfY};
       return data;
}



function load(){

  var point = new google.maps.LatLng(55.774210, 37.520200);

  var myMapOptions = {
    zoom: 16,
    center: point,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };

  var map = new google.maps.Map(document.getElementById("map_canvas"),myMapOptions);

  var image = new google.maps.MarkerImage(
    'img/map-image.png',
    new google.maps.Size(61,82),
    new google.maps.Point(0,0),
    new google.maps.Point(31,82)
  );

  var shadow = new google.maps.MarkerImage(
    'img/map-shadow.png',
    new google.maps.Size(106,82),
    new google.maps.Point(0,0),
    new google.maps.Point(31,82)
  );

  var shape = {
    coord: [37,1,40,2,43,3,45,4,46,5,48,6,49,7,50,8,51,9,52,10,53,11,54,12,54,13,55,14,56,15,56,16,57,17,57,18,57,19,58,20,58,21,58,22,59,23,60,24,60,25,60,26,60,27,60,28,60,29,60,30,60,31,60,32,60,33,60,34,59,35,59,36,59,37,59,38,59,39,58,40,58,41,58,42,57,43,57,44,57,45,56,46,56,47,55,48,54,49,54,50,53,51,52,52,52,53,51,54,50,55,50,56,49,57,48,58,48,59,47,60,46,61,45,62,45,63,44,64,43,65,43,66,43,67,42,68,41,69,40,70,40,71,39,72,38,73,37,74,36,75,36,76,35,77,34,78,33,79,32,80,31,81,30,81,29,80,28,79,27,78,26,77,25,76,25,75,24,74,23,73,22,72,22,71,21,70,20,69,20,68,19,67,18,66,17,65,17,64,17,63,16,62,15,61,14,60,14,59,13,58,12,57,11,56,11,55,10,54,9,53,9,52,8,51,7,50,7,49,6,48,6,47,5,46,4,45,4,44,3,43,3,42,2,41,2,40,2,39,2,38,1,37,1,36,1,35,1,34,1,33,1,32,1,31,1,30,1,29,1,28,1,27,1,26,1,25,1,24,1,23,2,22,2,21,2,20,3,19,3,18,3,17,4,16,4,15,5,14,6,13,6,12,7,11,8,10,9,9,10,8,11,7,12,6,14,5,15,4,17,3,20,2,23,1,37,1],
    type: 'poly'
  };

  var marker = new google.maps.Marker({
    draggable: true,
    raiseOnDrag: false,
    icon: image,
    shadow: shadow,
    shape: shape,
    map: map,
    position: point
  });

}
