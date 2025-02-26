import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AuthProviderHook from "../../customHooks/AuthProviderHook";
import { HiEye, HiEyeOff } from "react-icons/hi"; // Import React Icons

const Nav = () => {
  const [showBalance, setShowBalance] = useState(false);
  const balance = 50000; // Example balance
  const { user, userData, setUser, signOutUser, handleError } = AuthProviderHook();
  const navigate = useNavigate();
  
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/services">Services</NavLink>
      </li>
      <li>
        <NavLink to="/cashRequest">Cash Request</NavLink>
      </li>
    </>
  );

  let handleLogOut = ()=>{
    signOutUser()
      .then(() => {
        setUser(null);
        navigate("/login");
        alert("signout successful");
      })
      .catch(handleError);
  }

  return (
    <>
      <section className="fixed bg-base-100 z-50 w-full">
        {/* Navbar container */}
        <div className="navbar width bg-transparent">
          {/* Navbar start section */}
          <div className="navbar-start">
            {/* Dropdown for mobile */}
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow gap-2"
              >
                {links}
              </ul>
            </div>
            {/* Logo and Brand Name */}
            <a className="flex justify-center items-center gap-2 text-xl">
              <img
                src="/images/logo.png"
                className="rounded-full w-[50px]"
                alt="logo"
              />
              <span className="plusJakarta font-black text-2xl gradient-text">
                MobiCash
              </span>
            </a>
          </div>

          {/* Navbar center for large screens */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu font-medium menu-horizontal px-1 gap-2">
              {links}
            </ul>
          </div>

          {/* Navbar end for Sign In Button */}
          <div className="navbar-end gap-2">
            {user && user?.email ? (
              <>
                <div className="font-bold bg-gray-200 border py-2 px-3 rounded-full flex justify-center items-center gap-2">
                  {/* Taka Icon */}
                  <img
                    width="20"
                    height="20"
                    src="https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/external-Taka-currency-icongeek26-linear-colour-icongeek26-3.png"
                    alt="Taka Icon"
                  />

                  {/* Balance Display (Hidden or Visible) */}
                  <span>
                    {userData?.role === "Admin"
                      ? `${balance}৳`
                      : showBalance
                      ? `${balance}৳`
                      : "****"}
                  </span>

                  {/* Toggle Eye Button */}
                  {userData?.role !== "Admin" && (
                    <button onClick={() => setShowBalance(!showBalance)}>
                      {showBalance ? (
                        <HiEyeOff size={17} />
                      ) : (
                        <HiEye size={17} />
                      )}
                    </button>
                  )}
                </div>

                {/* user profile */}
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={user.photoURL}
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                  >
                    <li>
                      <Link to="/profile" className="justify-between">
                        DashBoard
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogOut}>Logout</button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn gradient-text gradient-border">
                  SIGN IN
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
      <div className="h-[60px]"></div>
    </>
  );
};

export default Nav;
