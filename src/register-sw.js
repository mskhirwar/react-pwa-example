// Initiate Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js').then((reg) => {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', reg.scope);
      }, (err) => {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      }).catch((err) => {
        console.log(err);
      });
    });
  } else {
    console.log('service worker is not supported');
  }