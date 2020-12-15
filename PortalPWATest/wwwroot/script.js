
// https://web.dev/offline-fallback-page/#registering-the-service-worker
// register the service worker once the app has loaded
window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js');
    }
});