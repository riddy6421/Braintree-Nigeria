import firebase from 'firebase';


firebase.initializeApp({
  apiKey: 'AIzaSyBin7mWDZumhuJPSs_XIe-KwB3A0DX6TQ0',
  authDomain: 'matmatiks-6b999.firebaseapp.com',
  projectId: 'matmatiks-6b999',
  storageBucket: "matmatiks-6b999.appspot.com"
});




export const auth = firebase.auth;//for firebase UI
export const onAuth = firebase.auth();// for user signIn/signOut
export const db = firebase.firestore();
export const storage = firebase.storage();
