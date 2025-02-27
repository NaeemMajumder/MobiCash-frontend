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
import UseAxiosPublic from "../customHooks/UseAxiosPublic";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const axiosSecure = UseAxiosSecure();
  const [userData, setUserData] = useState();
  const [balance, setBalances] = useState(userData?.balance);
  const axiosPublic = UseAxiosPublic();

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
    toast.error(error.message);
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
    balance,
    setBalances,
  };

  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userInfo = { email: currentUser?.email };
        axiosPublic
          .post("/jwt", userInfo)
          .then((res) => {
            console.log(res.data.token);
            if (res.data.token) {
              localStorage.setItem("access-token", res.data.token);
            }
            axiosSecure
              .get(`/users?email=${currentUser.email}`)
              .then((res) => {
                setUserData(res.data);
              })
              .catch(handleError);
          })
          .catch(handleError);

        // // get data from database
        // axiosSecure
        //   .get(`/users?email=${currentUser.email}`)
        //   .then((res) => {
        //     setUserData(res.data);
        //   })
        //   .catch(handleError);
      } else {
        localStorage.removeItem("access-token");
        setUser(null);
        setUserData(null);
      }

      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [axiosPublic, axiosSecure]);

  return (
    <>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
