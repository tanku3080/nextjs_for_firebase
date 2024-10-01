import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrCwTntNgG_doAoN38254QUhsRtRdCzdA",
  authDomain: "my-website-for-firebase.firebaseapp.com",
  databaseURL:
    "https://my-website-for-firebase-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "my-website-for-firebase",
  storageBucket: "my-website-for-firebase.appspot.com",
  messagingSenderId: "712889021472",
  appId: "1:712889021472:web:1a64620f975ca2e18eb845",
};

/**
 * firebaseと通信する際に初期化する
 */
export const initConfig = () => {
  // Initialize Firebase
  /*他のfirebaseコンポーネントを使用する際には必要だが、現状hostingのみなのでコメントアウト */
  const app = initializeApp(firebaseConfig);
  getDatabase(app);
};

export const initApp = getDatabase(initializeApp(firebaseConfig));
export const initAppBase = getFirestore();

export const auth = getAuth();
