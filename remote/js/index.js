$(function() {
  var $list = $('#list');

  $list.on('click', 'a', function(evt) {
    evt.preventDefault();

    $list.find('.active').removeClass('active');
    $(evt.target).addClass('active');

    var hash = (evt.target.hash || '#').substring(1);
    fetch('/api/navigate?hash=' + hash);
  });
});
