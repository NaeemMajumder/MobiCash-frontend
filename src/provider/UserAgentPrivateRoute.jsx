import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const UserAgentPrivateRoute = ({ children }) => {
  let { user, loading, userData, setUser, signOutUser, handleError } =
    useContext(AuthContext); // Assuming userData contains the role
  let location = useLocation();

  useEffect(() => {
    if ((user && user.email && userData?.role !== "Agent") && (user && user.email && userData?.role !== "User")) {
      signOutUser()
        .then(() => {
          setUser(null);
          alert("login in an ADMIN account");
        })
        .catch(handleError);
    }
  }, [user, userData]);

  if (loading) {
    return <span className="loading loading-spinner text-info"></span>;
  }

  if ((user && user.email && userData?.role === "Agent") || (user && user.email && userData?.role === "User")) {
    return children;
  }

  return (
    <>
      {console.log("not an admin or not logged in")}
      <Navigate state={location.pathname} to="/login" />
    </>
  );
};

export default UserAgentPrivateRoute;
