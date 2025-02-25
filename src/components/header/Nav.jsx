import React from "react";
import { Link, NavLink } from "react-router-dom";

const Nav = () => {
  let links = (
    <>
      <li>
        <NavLink to='/'>Home</NavLink>
      </li>
      <li>
        <NavLink to='/'>Home</NavLink>
      </li>
      <li>
        <NavLink to='/'>Home</NavLink>
      </li>
    </>
  );
  return (
    <>
      <section className="width">
        <div className="navbar bg-base-100">
          <div className="navbar-start">
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
                {/* This links for mobile devices */}
                {links}
              </ul>
            </div>
            <a className="flex justify-center items-center gap-2 text-xl">
              <img
                src="/images/logo.png"
                className="rounded-full w-[50px]"
                alt=""
              />
              <span className="plusJakarta font-black text-2xl gradient-text">MobiCash</span>
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu font-medium menu-horizontal px-1 gap-2">
              {/* This links for large devices */}
              {links}
            </ul>
          </div>
          <div className="navbar-end">
            <Link to={'/login'} className="btn gradient-text gradient-border">SIGN IN</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Nav;
