// Initialize Firebase
var config = {
  apiKey: 'AIzaSyAO2VwwODyRYYT_sWAKA2E5v4XMi_jg4Nk',
  authDomain: 'calendar-34a19.firebaseapp.com',
  databaseURL: 'https://calendar-34a19.firebaseio.com',
  projectId: 'calendar-34a19',
  storageBucket: 'calendar-34a19.appspot.com',
  messagingSenderId: '303303504934'
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
