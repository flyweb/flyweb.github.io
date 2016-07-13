$(function() {
  var $navbar = $('#navbar');

  $(window).on('activate.bs.scrollspy', function(evt) {
    $navbar.toggleClass('overlay', $navbar.find('.nav-link.active').length > 0);
  });
});
