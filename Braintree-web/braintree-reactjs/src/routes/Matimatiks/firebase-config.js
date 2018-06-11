import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBin7mWDZumhuJPSs_XIe-KwB3A0DX6TQ0",
    authDomain: "matmatiks-6b999.firebaseapp.com",
    databaseURL: "https://matmatiks-6b999.firebaseio.com",
    projectId: "matmatiks-6b999",
    storageBucket: "matmatiks-6b999.appspot.com",
    messagingSenderId: "802946512222"
 };

firebase.initializeApp(config);


export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;