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

// output log to screen
// https://stackoverflow.com/questions/20256760/javascript-console-log-to-html
(function () {
    if (!console) {
        console = {};
    }
    var old = console.log;
    var logger = document.getElementById('log');
    console.log = function (message) {
        if (typeof message == 'object') {
            logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : String(message)) + '<br />';
        } else {
            logger.innerHTML += message + '<br />';
        }
    }
})();



// https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Add_to_home_screen
// **on old iOS browser (iPad) this will not work, so add button will be visible
let deferredPrompt;
const addBtn = document.querySelector('.add-button');
// by default turn off the add to home screen button
addBtn.style.display = 'none';

// on new iOS this doesn't work, so button will never display
window.addEventListener('beforeinstallprompt', (e) => {
    console.log("1. Display Add to home screen button for Chrome which will launch native prompt");
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
                console.log('1.1 User accepted the A2HS prompt');
            } else {
                console.log('1.2 User dismissed the A2HS prompt');
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

//if (isIos()) {
//    console.log("2.1 ios iphone/ipad/ipod detected");
//} else {
//    console.log("2.2 ios iphone/ipad/ipod NOT detected");
//}

//if (isInStandaloneMode()) {
//    console.log("3.1 in standalone mode");
//} else {
//    console.log("3.2 NOT in standalone mode");
//}

// Checks if should display install popup notification:
if (isIos() && !isInStandaloneMode()) {
    console.log("4.10 isIOS and NOT Standalone mode so display iOS notification banner now");
    console.log("4.11 Have you installed it already and opened in Safari on your iOS device?");
    console.log("4.12 Have you opened this on Chrome or Firefox on iOS?");
    //this.setState({ showInstallMessage: true });
    // want to render /a2hs/installPopup1.png and 2.png
} else {
    console.log("4.2 Do NOT display iOS install banner");
}