import firebase from 'firebase';


firebase.initializeApp({
  apiKey: 'AIzaSyBin7mWDZumhuJPSs_XIe-KwB3A0DX6TQ0',
  authDomain: 'matmatiks-6b999.firebaseapp.com',
  projectId: 'matmatiks-6b999'
});



export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const db = firebase.firestore();
export default firebase;