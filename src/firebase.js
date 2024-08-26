import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import auth module

const firebaseConfig = {
  apiKey: "AIzaSyCMO1BXsi9Whg4RxdbCVKp8stko7ZGkrr8",
  authDomain: "expensetracket-55b0e.firebaseapp.com",
  projectId: "expensetracket-55b0e",
  storageBucket: "expensetracket-55b0e.appspot.com",
  messagingSenderId: "374406729338",
  appId: "1:374406729338:web:48714c203c7738d8f035c3",
  measurementId: "G-M739MW4V4H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };
