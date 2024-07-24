import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "tovier-trailer.firebaseapp.com",
  projectId: "tovier-trailer",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Authentication Function
const signUp = async (name, email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = response.user;

    // Update displayName in the Firebase Auth user profile
    await updateProfile(user, {
      displayName: name,
      photoURL:
        "https://live.staticflickr.com/65535/53877310476_44a5125bd1_c.jpg",
    });

    // Set user document in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: name,
      email: email,
      authProvider: "Tovier",
      profileImage:
        "https://live.staticflickr.com/65535/53877310476_44a5125bd1_c.jpg",
    });

    console.log("Signed up successfully! User: " + user.displayName);
  } catch (error) {
    console.error("Error during Sign Up:", error.message);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  try {
    const respose = await signInWithEmailAndPassword(auth, email, password);
    const user = respose.user;
    console.log("Login successfully! User: " + user.displayName);
  } catch (error) {
    console.error("Error during Sign Up:", error.message);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const loginWithGoogle = async () => {
  try {
    const respose = await signInWithPopup(auth, provider);
    const user = respose.user;

    const userDoc = doc(db, "users", user.uid);
    const userSnapshot = await getDoc(userDoc);

    if (!userSnapshot.exists()) {
      await setDoc(userDoc, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        authProvider: "Google",
        profileImage: user.photoURL,
      });
    }
    console.log("Google login successfully! User: " + user.displayName);
  } catch (error) {
    console.error("Error during Sign Up:", error.message);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, signUp, login, loginWithGoogle, logout };

// O
// L
// D
// Authentication Function

// const signup = async (name, email, password) => {
//   try {
//     const respose = await createUserWithEmailAndPassword(auth, email, password);
//     const user = respose.user;

//     await addDoc(collection(db, "users"), {
//       uid: user.uid,
//       name,
//       authProvider: "local",
//       email,
//       profileImage:
//         "https://live.staticflickr.com/65535/53818372241_08c548fb4b_s.jpg",
//     });
//   } catch (error) {
//     console.error(error);
//     // alert(error);
//     toast.error(error.code.split("/")[1].split("-").join(" "));
//   }
// };

// const login = async (email, password) => {
//   try {
//     await signInWithEmailAndPassword(auth, email, password);
//   } catch (error) {
//     console.error(error);
//     // alert(error);
//     toast.error(error.code.split("/")[1].split("-").join(" "));
//   }
// };

// const loginWithGoogle = async () => {
//   try {
//     const respose = await signInWithPopup(auth, provider);
//     const user = respose.user;

//     await addDoc(collection(db, "users"), {
//       uid: user.uid,
//       name: user.displayName,
//       authProvider: "google",
//       email: user.email,
//       profileImage: user.photoURL,
//     });
//   } catch (error) {
//     console.error(error);
//     toast.error(error.code.split("/")[1].split("-").join(" "));
//   }
// };

// const logout = () => {
//   signOut(auth);
// };

// export { auth, db, signup, login, loginWithGoogle, logout };
