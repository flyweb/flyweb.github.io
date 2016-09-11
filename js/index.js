$(function() {
  var $navbar = $('#navbar');

  $(window).on('activate.bs.scrollspy', function(evt) {
    $navbar.toggleClass('overlay', $navbar.find('.nav-link.active').length > 0);
  });
});

if (navigator.publishServer) {
  navigator.publishServer('flyweb.github.io Remote Control')
    .then(function(server) {
      server.onfetch = function(evt) {
        var urlParts = evt.request.url.split('?');
        
        var url = urlParts[0];
        var params = new URLSearchParams(urlParts[1]);

        switch (url) {
          /**
           * If the requested URL is '/api/navigate', get the `hash` query param
           * and set the page's current `location.hash` to its value to navigate
           * to the specified section.
           */
          case '/api/navigate':
            window.location.hash = params.get('hash') || '';
            evt.respondWith(new Response('', { status: 200, statusText: 'OK' }));
            break;

          /**
           * Otherwise, assume that a static asset for the remote FlyWeb page
           * has been requested. In order to serve the request, we re-fetch
           * the requested URL prepended with "/remote" from our own host
           * since all static assets for the remote FlyWeb page are stored
           * under the "/remote" path.
           */
          default:
            // XXX: Ideally, we should be able to just pass the result of the
            // `fetch()` call directly to `respondWith()`. However, this will
            // not work if the page hosting the FlyWeb server is on a host
            // using HTTP compression (e.g. GitHub Pages). Once HTTP
            // compression is supported, this can all be reduced to a single
            // line of code:
            //
            // evt.respondWith(fetch('/remote' + url));
            //

            var contentType;
            fetch('/remote' + url)
              .then(function(response) {
                contentType = response.headers.get('Content-Type');
                return response.blob();
              })
              .then(function(blob) {
                evt.respondWith(new Response(blob, {
                  headers: {
                    'Content-Type': contentType
                  }
                }));
              });
            break;
        }
      };
    })
    .catch(function(error) {
      console.error(error);
    });
} else {
  console.warn('FlyWeb not supported or enabled in this browser');
}
