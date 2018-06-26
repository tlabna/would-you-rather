import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyAq3Y-K_1lqk-dQ9o8lBxsZ8MYP6D_qaOo',
  authDomain: 'wd-you-rather.firebaseapp.com',
  databaseURL: 'https://wd-you-rather.firebaseio.com',
  projectId: 'wd-you-rather',
  storageBucket: 'wd-you-rather.appspot.com',
  messagingSenderId: '398738982495',
}
firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth

export const decisionsExpirationLength = 50000
