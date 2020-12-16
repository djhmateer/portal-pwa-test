// https://web.dev/offline-fallback-page/#registering-the-service-worker
// register the service worker once the page has loaded
window.addEventListener('load', () => {
    // is the serviceWorker API available?
    if ('serviceWorker' in navigator) {
        // https://developers.google.com/web/fundamentals/primers/service-workers#register_a_service_worker
        // no problem to call each time - the browser will figure out
        // if the service worker is already registered or not and handle accoridingly
        navigator.serviceWorker.register('service-worker.js');
    }
});