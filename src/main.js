import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxY2D_MDTHaQ7OuiaunqVzV_tixDy_4UI",
  authDomain: "readmynow-87dfb.firebaseapp.com",
  projectId: "readmynow-87dfb",
  storageBucket: "readmynow-87dfb.appspot.com",
  messagingSenderId: "725406438640",
  appId: "1:725406438640:web:9448fed0c2c053384f5e35",
  measurementId: "G-SQ9SD7ZB3H"
};

// Initialize Firebase
initializeApp(firebaseConfig);
 
const app = createApp(App)

app.use(router)

app.mount('#app')
