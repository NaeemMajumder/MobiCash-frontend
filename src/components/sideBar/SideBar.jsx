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
import { RiPassPendingLine } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

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
        className={`fixed inset-0 w-[350px] h-full p-6 text-white shadow-2xl transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-50`}
      >
        {/* Sidebar Header with Close Button */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold gradient-text">
            <Link to={"/"}>MobiCash</Link>
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
              <Link
                href="/profile"
                className="flex items-center p-4 text-gray-700 hover:bg-gray-200 rounded-md"
              >
                <FiUser className="mr-3" size={24} /> My Profile
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="flex items-center p-4 text-gray-700 hover:bg-gray-200 rounded-md"
              >
                <FiHome className="mr-3" size={24} /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/transactions"
                className="flex items-center p-4 text-gray-700 hover:bg-gray-200 rounded-md"
              >
                <FiCreditCard className="mr-3" size={24} /> Transactions
              </Link>
            </li>

            <>
              {/* admin routes */}
              <li>
                <Link
                  to="/allUsers"
                  className="flex items-center p-4 text-gray-700 hover:bg-gray-200 rounded-md"
                >
                  <FaUsers className="mr-3" size={24} /> All Users
                </Link>
              </li>
              <li>
                <Link
                  href="/transactions"
                  className="flex items-center p-4 text-gray-700 hover:bg-gray-200 rounded-md"
                >
                  <RiPassPendingLine className="mr-3" size={24} /> New Agent
                  (Pending)
                </Link>
              </li>
              <li>
                <Link
                  href="/transactions"
                  className="flex items-center p-4 text-gray-700 hover:bg-gray-200 rounded-md"
                >
                  <BiMoneyWithdraw className="mr-3" size={24} /> WithDraw Requests
                </Link>
              </li>
            </>

            <li>
              <button className="flex items-center p-4 text-red-600 hover:bg-red-100 rounded-md w-full">
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
