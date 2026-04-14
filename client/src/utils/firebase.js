
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "interviewai-37207.firebaseapp.com",
  projectId: "interviewai-37207",
  storageBucket: "interviewai-37207.firebasestorage.app",
  messagingSenderId: "828420594898",
  appId: "1:828420594898:web:8d27ef291a98b44cb8610b"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);

const provider = new GoogleAuthProvider;

export { auth, provider };