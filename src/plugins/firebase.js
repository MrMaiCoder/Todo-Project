import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDpm_SkFjzoG307E8FZqzc5ifWDEC7JDnY',
  authDomain: 'todos-41ac5.firebaseapp.com',
  projectId: 'todos-41ac5',
  storageBucket: 'todos-41ac5.appspot.com',
  messagingSenderId: '850130379321',
  appId: '1:850130379321:web:4153fff653ba78ca5e23e8',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
