import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthProviderHook from "../../customHooks/AuthProviderHook";
import { HiEye, HiEyeOff } from "react-icons/hi"; // Import React Icons

const Nav = () => {
  const [showBalance, setShowBalance] = useState(false);
  const balance = 50000; // Example balance
  const { user } = AuthProviderHook();
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
            <Link to="/login" className="btn gradient-text gradient-border">
              SIGN IN
            </Link>

            <div className="font-bold bg-gray-200 border py-2 px-3 rounded-full flex justify-center items-center gap-2">
              {/* Taka Icon */}
              <img
                width="20"
                height="20"
                src="https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/external-Taka-currency-icongeek26-linear-colour-icongeek26-3.png"
                alt="Taka Icon"
              />

              {/* Balance Display (Hidden or Visible) */}
              <span>{showBalance ? `${balance}৳` : "****"}</span>

              {/* Toggle Eye Button */}
              <button onClick={() => setShowBalance(!showBalance)}>
                {showBalance ? <HiEyeOff size={17} /> : <HiEye size={17} />}
              </button>
            </div>

            {/* user profile */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
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
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 shadow"
              >
                <div className="card-body">
                  <span className="text-lg font-bold">{user.email}</span>
                  <span className="text-lg font-bold">{user.name}</span>
                  <span className="text-info">Subtotal: $999</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="h-[60px]"></div>
    </>
  );
};

export default Nav;
