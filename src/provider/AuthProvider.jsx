import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase.config";
import UseAxiosSecure from "../customHooks/UseAxiosSecure";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const axiosSecure = UseAxiosSecure();
  const [userData, setUserData] = useState();

  // E-mail registration
  const registerWithEmail = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // SignIn / Login
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // SignOut / Logout
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // update user profile
  const updateUserProfile = (updatedData) => {
    setLoading(true);
    return updateProfile(auth.currentUser, updatedData);
  };

  const handleError = (error) => {
    alert(error.message);
  };

  let authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    registerWithEmail,
    signInUser,
    signOutUser,
    updateUserProfile,
    handleError,
    userData,
    setUserData,
  };

  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // get data from database
        axiosSecure
          .get("/users")
          .then((res) => {
            setUserData(res.data);
          })
          .catch(handleError);
      }else{
        setUser(null)
        setUserData(null);
      }

      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
