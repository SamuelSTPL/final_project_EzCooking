import React, { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase";
import { db } from "../../firebase";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUserId, setCurrentUserId] = useState();
  const [loading, setLoading] = useState(true);

  // console.log(currentUserId);

  const signUp = async (email, password, name) => {
    // addUserToDB(email, name);
    const userCredentials = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    await db.collection("users").doc(userCredentials.user.uid).set({
      email: email,
      name: name,
      favortires: [],
    });
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUserId(user.uid);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{ signUp, currentUserId, login, resetPassword }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
