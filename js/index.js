$(function() {
  var $navbar = $('#navbar');

  $(window).on('activate.bs.scrollspy', function(evt) {
    $navbar.toggleClass('overlay', $navbar.find('.nav-link.active').length > 0);
  });
});


navigator.publishServer('HelloFlyWeb').then((srv) => {
  (window.srv = srv).onfetch = (evt) => {
    evt.respondWith(new Response('<h1>Hello FlyWeb!!!</h1>', {
      headers: { 'Content-Type': 'text/html' }
    }));
  };
});
