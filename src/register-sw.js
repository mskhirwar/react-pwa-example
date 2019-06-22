
const applicationServerPublicKey = 'BEyyOdTG7KT_o90Gsl1HteXPsU8JvvrvO4iKLfX5y6_FdQipIWrZ8Vfb41t47dgYq7xvFodIzImsBKuEfbEeb7c';

let isSubscribed = false;
let swRegistration = null;

const urlB64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

// Update User Push Notification Subscription on Server
const updateSubscriptionOnServer = (subscription) => {
  // TODO: Send subscription to application server
  // const subscriptionJson = document.querySelector('.js-subscription-json');
  // const subscriptionDetails = document.querySelector('.js-subscription-details');

  if (subscription) {
    console.log('User subscribed successfully --- ', JSON.stringify(subscription));
    // subscriptionJson.textContent = JSON.stringify(subscription);
    // subscriptionDetails.classList.remove('is-invisible');
  } else {
    // subscriptionDetails.classList.add('is-invisible');
    console.log('Failed to subscribe --- ', JSON.stringify(subscription));
  }
};

// Subscribe User for Push Notifications
const subscribeUser = () => {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey,
  })
    .then((subscription) => {
      console.log('[Push Messaging] user is subscribed.');

      updateSubscriptionOnServer(subscription);

      isSubscribed = true;
      // updateBtn();
    })
    .catch((err) => {
      console.log('[Push Messaging] user failed to subscribe ', err);
      // updateBtn();
    });
};

// Initiate User Push Notification
const initPushNotifications = () => {
  // serviceWorkerReg.pushManager.subscribe();
  swRegistration.pushManager.getSubscription()
    .then((subscription) => {
      isSubscribed = !(subscription === null);
      if (isSubscribed) {
        console.log('[Push Messaging] user is subscribed.');
      } else {
        console.log('[Push Messaging] user is not subscribed.');
        subscribeUser(swRegistration);
      }
    });
};

// Initiate Service Worker
if ('serviceWorker' in navigator && 'PushManager' in window) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').then((swReg) => {
      // Registration was successful
      console.log('[Service Worker] registration successful with scope: ', swReg);
      swRegistration = swReg;
      initPushNotifications();
    }, (err) => {
      // registration failed :(
      console.log('[Service Worker] registration failed: ', err);
    }).catch((err) => {
      console.log(err);
    });
  });
} else {
  console.log('[Service Worker] not supported');
  console.log('[Push Messaging] not supported');
}
