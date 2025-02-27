import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../loading/Loading";

const PrivateRoute = ({ children }) => {
  let { user, loading } = useContext(AuthContext);
  let location = useLocation();

  if (loading) {
    return <Loading/>;
  }

  if (user && user.email) {
    return children;
  }

  return (
    <>
    {
        console.log("not logged in")
    }
      <Navigate state={location.pathname} to="/login"></Navigate>
    </>
  );
};

export default PrivateRoute;
