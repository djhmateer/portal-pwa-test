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

//window.addEventListener('beforeinstallprompt', (event) => {
//    console.log('👍', 'beforeinstallprompt', event);
//    // Stash the event so it can be triggered later.
//    window.deferredPrompt = event;
//    // Remove the 'hidden' class from the install button container
//    divInstall.classList.toggle('hidden', false);
//});


// https://web.dev/customize-install/

//let deferredPrompt;

//window.addEventListener('beforeinstallprompt', (e) => {
//    console.log('beforeinstallprompt fired');
//    // Prevent the mini-infobar from appearing on mobile
//    e.preventDefault();
//    // Stash the event so it can be triggered later.
//    deferredPrompt = e;
//    // Update UI notify the user they can install the PWA
//    showInstallPromotion();
//});

//buttonInstall.addEventListener('click', (e) => {
//    // Hide the app provided install promotion
//    hideMyInstallPromotion();
//    // Show the install prompt
//    deferredPrompt.prompt();
//    // Wait for the user to respond to the prompt
//    deferredPrompt.userChoice.then((choiceResult) => {
//        if (choiceResult.outcome === 'accepted') {
//            console.log('User accepted the install prompt');
//        } else {
//            console.log('User dismissed the install prompt');
//        }
//    });
//});


// https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Add_to_home_screen
let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

// if app is installed, this event will not fire
// on iOS this doesn't work, so button will never display
window.addEventListener('beforeinstallprompt', (e) => {
    console.log("beforeinstallprompt");
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    addBtn.style.display = 'block';

    addBtn.addEventListener('click', (e) => {
        // hide our user interface that shows our A2HS button
        addBtn.style.display = 'none';
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
    });
});


// https://www.netguru.com/codestories/pwa-ios
// Detects if device is on iOS 
const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
}
// Detects if device is in standalone mode
const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

// Checks if should display install popup notification:
if (isIos() && !isInStandaloneMode()) {
    this.setState({ showInstallMessage: true });
}