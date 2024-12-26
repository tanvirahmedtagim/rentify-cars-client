import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import axios from "axios";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const handleLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const handleGoogleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const handleRegister = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const handleLogout = () => {
    return signOut(auth);
  };
  const manageProfile = (name, photo) => {
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
      .then(() => {
        setUser({ ...auth.currentUser });
      })
      .catch((error) => {
        console.error("Error updating profile:", error.message);
      });
  };

  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        setUser(currentUser);
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/jwt`,
          {
            email: currentUser?.email,
          },
          { withCredentials: true }
        );
      } else {
        setUser(currentUser);
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/logout`,
          { withCredentials: true }
        );
      }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    handleGoogleLogin,
    handleLogin,
    handleLogout,
    handleRegister,
    manageProfile,
    user,
    setUser,
    loading,
    setLoading,
  };

  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
