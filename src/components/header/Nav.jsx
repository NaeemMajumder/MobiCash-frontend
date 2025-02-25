import React from "react";
import { Link, NavLink } from "react-router-dom";

const Nav = () => {
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/">About</NavLink>
      </li>
      <li>
        <NavLink to="/">Contact</NavLink>
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
          <div className="navbar-end">
            <Link to="/login" className="btn gradient-text gradient-border">
              SIGN IN
            </Link>
          </div>
        </div>
      </section>
      <div className="h-[60px]"></div>
    </>
  );
};

export default Nav;
