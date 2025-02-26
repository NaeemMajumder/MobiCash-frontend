import { useState } from "react";
import {
  FiMenu,
  FiX,
  FiUser,
  FiHome,
  FiCreditCard,
  FiLogOut,
} from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { PiHandWithdrawBold } from "react-icons/pi";
import { RiPassPendingLine } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { GiCash } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";
import AuthProviderHook from "../../customHooks/AuthProviderHook";
import { toast } from "react-toastify";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { userData, setUser, signOutUser, handleError } = AuthProviderHook();
  const navigate = useNavigate();

  let handleLogOut = () => {
    signOutUser()
      .then(() => {
        setUser(null);
        navigate("/login");
        toast.success("signout successful");
      })
      .catch(handleError);
  };

  return (
    <div className="inter">
      {/* Menu Button (Hidden when Sidebar is Open) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 left-4 z-50 p-3 bg-[#164193] text-white rounded-full shadow-lg"
        >
          <FiMenu size={24} />
        </button>
      )}

      {/* Full-Screen Sidebar */}
      <div
        className={`fixed overflow-auto inset-0 w-[350px] h-full bg-[#F2F6FE] p-6 text-white shadow-2xl transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-50`}
      >
        {/* Sidebar Header with Close Button */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold gradient-text">
            <NavLink to={"/"}>MobiCash</NavLink>
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-600 p-2"
          >
            <FiX size={32} />
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="mt-10">
          <ul className="space-y-6 text-lg font-semibold">
            <li>
              <NavLink
                href="/profile"
                className="flex items-center p-4 text-gray-700 hover:bg-gray-200 rounded-md"
              >
                <FiUser className="mr-3" size={24} /> My Profile
              </NavLink>
            </li>

            <>
              {userData?.role !== "Admin" && (
                <li>
                  <NavLink
                    to="/profile/userTransactions"
                    className="flex items-center p-4 text-gray-700 hover:bg-gray-200 rounded-md"
                  >
                    <FiCreditCard className="mr-3" size={24} /> My All
                    Transactions
                  </NavLink>
                </li>
              )}
              {/* user route and agent */}
            </>

            {userData?.role === "Agent" && (
              <>
                {/* agent route */}
                <li>
                  <NavLink
                    to="/profile/withdrawHistory"
                    className="flex items-center p-4 text-gray-700 hover:bg-gray-200 rounded-md"
                  >
                    <BiMoneyWithdraw className="mr-3" size={24} /> Withdraw
                    History
                  </NavLink>
                </li>
              </>
            )}

            {userData?.role == "Admin" && (
              <>
                <>
                  {/* admin routes */}
                  <li>
                    <NavLink
                      to="/profile/transactions"
                      className="flex items-center p-4 text-gray-700 hover:bg-gray-200 rounded-md"
                    >
                      <FiCreditCard className="mr-3" size={24} />
                      All Transactions
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/profile/allUsers"
                      className="flex items-center p-4 text-gray-700 hover:bg-gray-200 rounded-md"
                    >
                      <FaUsers className="mr-3" size={24} /> All Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/profile/newAgents"
                      className="flex items-center p-4 text-gray-700 hover:bg-gray-200 rounded-md"
                    >
                      <RiPassPendingLine className="mr-3" size={24} /> New Agent
                      (Pending)
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/profile/withdrawRequests"
                      className="flex items-center p-4 text-gray-700 hover:bg-gray-200 rounded-md"
                    >
                      <BiMoneyWithdraw className="mr-3" size={24} /> WithDraw
                      Requests
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/profile/allWithdraws"
                      className="flex items-center p-4 text-gray-700 hover:bg-gray-200 rounded-md"
                    >
                      <PiHandWithdrawBold className="mr-3" size={24} /> All
                      WithDraws
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/profile/cashRequest"
                      className="flex items-center p-4 text-gray-700 hover:bg-gray-200 rounded-md"
                    >
                      <GiCash className="mr-3" size={24} /> Cash Request
                    </NavLink>
                  </li>
                </>
              </>
            )}

            <li>
              <button
                onClick={handleLogOut}
                className="flex items-center p-4 text-red-600 hover:bg-red-100 rounded-md w-full"
              >
                <FiLogOut className="mr-3" size={24} /> Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
