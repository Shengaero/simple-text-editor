const butInstall = document.getElementById('buttonInstall');
import { Workbox } from 'workbox-window';

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  console.log('beforeinstallprompt called');
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  if('serviceWorker' in navigator) {
    // register workbox service worker
    const workboxSW = new Workbox('/src-sw.js');
    workboxSW.register();
  } else {
    console.error('Service workers are not supported in this browser.');
  }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('beforeinstallprompt called');
});
