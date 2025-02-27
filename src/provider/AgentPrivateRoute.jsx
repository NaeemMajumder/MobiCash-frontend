import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { toast } from "react-toastify";

const AgentPrivateRoute = ({ children }) => {
  let { user, loading, userData, setUser, signOutUser, handleError } =
    useContext(AuthContext); // Assuming userData contains the role
  let location = useLocation();

  useEffect(() => {
    if (user && user.email && userData?.role !== "Agent") {
      signOutUser()
        .then(() => {
          setUser(null);
          toast.error("login in an AGENT account");
        })
        .catch(handleError);
    }
  }, [user, userData]);

  if (loading) {
    return <span className="loading loading-spinner text-info"></span>;
  }

  if (user && user.email && userData?.role === "Agent") {
    return children;
  }

  return (
    <>
      {console.log("not an agent or not logged in")}
      <Navigate state={location.pathname} to="/login" />
    </>
  );
};

export default AgentPrivateRoute;
