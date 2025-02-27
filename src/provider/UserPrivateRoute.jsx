import React, { useContext, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { toast } from "react-toastify";
import Loading from "../loading/Loading";

const UserPrivateRoute = ({ children }) => {
  let { user, loading, userData, setUser, signOutUser, handleError } =
    useContext(AuthContext); // Assuming userData contains the role and account status
  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    if (user && user.email) {
      if (userData?.role !== "User") {
        signOutUser()
          .then(() => {
            setUser(null);
            toast.error("Login with an ADMIN account");
          })
          .catch(handleError);
      } else if (userData?.accountStatus === "banned") {
        signOutUser()
          .then(() => {
            setUser(null);
            navigate('/login')
            toast.error("Your account is banned. Please contact support.");
          })
          .catch(handleError);
      }
    }
  }, [user, userData?.accountStatus]);

  if (loading) {
    return <Loading/>;
  }

  if (user && user.email && userData?.role === "User" && userData?.accountStatus !== "banned") {
    return children;
  }

  return (
    <>
      {console.log("Not an admin, banned, or not logged in")}
      <Navigate state={location.pathname} to="/login" />
    </>
  );
};

export default UserPrivateRoute;
