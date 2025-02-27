import React, { useContext, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { toast } from "react-toastify";

const AgentPrivateRoute = ({ children }) => {
  let { user, loading, userData, setUser, signOutUser, handleError } =
    useContext(AuthContext); // Assuming userData contains the role and account status
  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    if (user && user.email) {
      if (userData?.role !== "Agent") {
        signOutUser()
          .then(() => {
            setUser(null);
            toast.error("Login with an AGENT account");
          })
          .catch(handleError);
      } else if (userData?.accountStatus === "banned") {
        signOutUser()
          .then(() => {
            setUser(null);
            navigate('/login');
            toast.error("Your account is banned. Please contact support.");
          })
          .catch(handleError);
      }else if(userData?.accountStatus === "pending"){
        toast.info("You cannot access this page as your account is still pending approval. Please wait for verification or contact support for assistance.")
        navigate('/');
        
      }
    }
  }, [user, userData]);

  if (loading) {
    return <span className="loading loading-spinner text-info"></span>;
  }

  if (user && user.email && userData?.role === "Agent" && userData?.accountStatus !== "banned") {
    return children;
  }

  return (
    <>
      {console.log("Not an agent, banned, or not logged in")}
      <Navigate state={location.pathname} to="/login" />
    </>
  );
};

export default AgentPrivateRoute;
