import React from "react";

const Nav = () => {
  let links = (
    <>
      <li>
        <a>Item 1</a>
      </li>
      <li>
        <a>Parent</a>
      </li>
      <li>
        <a>Item 3</a>
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
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
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
              <span className="plusJakarta font-black text-2xl logo">MobiCash</span>
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu font-medium menu-horizontal px-1">
              {/* This links for large devices */}
              {links}
            </ul>
          </div>
          <div className="navbar-end">
            <a className="btn">Button</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Nav;
