jQuery(function($) {

  var hash = window.location.hash;
  if (hash.trim()) window.location = window.location.href.replace(hash, "");

  var $win = $(window);
  var $doc = $(document);
  var $html = $('html');
  var $body = $('body');

  //
  // TOP BAR
  //
  var $topbar = $('.topbar');
  var topbar_height = $topbar.outerHeight();
  var $footer = $('#footer');

  $win.on('scroll.topbar', topBar);
  $win.on('resize.topbar', topBar);
  topBar();

  function topBar() {
    var scroll_distance = $win.scrollTop();
    var footer_offset = $footer.offset().top;
    if (scroll_distance + topbar_height >= footer_offset) {
      $topbar.css({ position: "absolute", top: (footer_offset - topbar_height) + "px" });
    } else {
      $topbar.css({ position: "", top: "" });
    }
  }

  //
  // HOMEPAGE LANDING
  //
  var cycle = setInterval(function() {
    var $active = $('#landing .cycle.active');
    if ($active.next('.cycle').length) {
      $active.removeClass('active').next().addClass('active');
    } else {
      clearInterval(cycle);
    }
  }, 3000);

  //
  // HOMEPAGE SIDESCROLL
  //
  var $sidescroll = $('#sidescroll');
  var $slider_wrap = $('.slider-wrapper', $sidescroll);
  var $slider = $('.slider', $slider_wrap);

  if ($sidescroll.length) {
    $win.on('scroll.sidescroll', sideScroll);
    $win.on('resize.sidescroll', sideScroll);
    sideScroll();
  }

  function sideScroll() {

    var scroll_distance = $win.scrollTop();
    var ss_offset = $sidescroll.offset().top;
    var ss_height = $sidescroll.height();
    var ss_width = $sidescroll.width();

    if (scroll_distance >= ss_offset && scroll_distance + $win.height() < ss_offset + ss_height) {
      // console.log('scrolling inside');
      $slider_wrap.removeClass("docked").addClass("fixed").css({width: ss_width+"px"});

      // Slide left half way down
      if (scroll_distance >= ss_offset + ($win.height()/2)) $slider.addClass('slide-left');
      else $slider.removeClass('slide-left');

    } else if (scroll_distance + $win.height() >= ss_offset + ss_height) {
      // console.log('scrolling past');
      $slider_wrap.removeClass("fixed").addClass("docked");

    } else {
      // console.log('scrolling before');
      $slider_wrap.removeClass("fixed").removeClass("docked").css({width: ""});
    }
  }

  //
  // HOME HOW WE HELP
  //
  var $howwework = $('#how-we-work');
  if ($howwework.length) {
    $win.on('scroll.howwework', howWeWork);
    $win.on('resize.howwework', howWeWork);
    howWeWork();
  }

  function howWeWork() {
    var scroll_distance = $win.scrollTop();
    var $el = $howwework;
    if (scroll_distance + ($win.height()/2) >= $el.offset().top) $el.addClass('in-view');
    else $el.removeClass('in-view');
  };
});