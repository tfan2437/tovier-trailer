import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "neoflick-9e414.firebaseapp.com",
  projectId: "neoflick-9e414",
  storageBucket: "neoflick-9e414.appspot.com",
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Authentication Function

const signup = async (name, email, password) => {
  try {
    const respose = await createUserWithEmailAndPassword(auth, email, password);
    const user = respose.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      profileImage:
        "https://live.staticflickr.com/65535/53818372241_08c548fb4b_s.jpg",
    });
  } catch (error) {
    console.error(error);
    // alert(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    // alert(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const loginWithGoogle = async () => {
  try {
    const respose = await signInWithPopup(auth, provider);
    const user = respose.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: user.displayName,
      authProvider: "google",
      email: user.email,
      profileImage: user.photoURL,
    });
  } catch (error) {
    console.error(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, signup, login, loginWithGoogle, logout };
