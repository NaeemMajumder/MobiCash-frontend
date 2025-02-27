import { useState } from "react";
import { FaBan } from "react-icons/fa";
import { FiEye, FiSearch, FiFilter, FiX, FiUserCheck } from "react-icons/fi";
import { TiTickOutline } from "react-icons/ti";
import { UseAllUsers } from "../../customHooks/tenStackQuery/UseTenSatack";
import Loading from "../../loading/Loading";

const AllUsers = () => {
  const [searchType, setSearchType] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [balanceRange, setBalanceRange] = useState([0, 100000]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // tenstack query data fetch
  const [allUsers] = UseAllUsers();
  console.log(allUsers);

  if (!allUsers) {
    return <Loading />; // Prevent filter from running on undefined data
  }

  // Filtering Users
  const filteredUsers = allUsers
    .filter((user) => {
      if (searchQuery) {
        if (searchType === "name")
          return user.name.toLowerCase().includes(searchQuery.toLowerCase());
        if (searchType === "email")
          return user.email.toLowerCase().includes(searchQuery.toLowerCase());
        if (searchType === "phone") return user.phone.includes(searchQuery);
      }
      return true;
    })
    .filter((user) =>
      statusFilter === "All" ? true : user.accountStatus === statusFilter
    )
    .filter(
      (user) =>
        user.currentBalance >= balanceRange[0] &&
        user.currentBalance <= balanceRange[1]
    );

  console.log(filteredUsers);

  // Pagination Logic
  const totalUsers = filteredUsers.length;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <>
      <section className="w-full bg-[#F2F6FE] inter">
        <div className="p-6 min-h-screen width">
          <h1 className="text-3xl font-bold text-[#164193] mb-4">
            Admin - User Management
          </h1>
          <p className="text-lg font-semibold">Total Users: {totalUsers}</p>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mt-4">
            {/* Search Filter */}
            <div className="relative">
              <select
                className="absolute left-2 top-2 bg-transparent text-gray-600 outline-none"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </select>
              <input
                type="text"
                placeholder="Search..."
                className="pl-20 pr-4 py-2 border rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <select
              className="p-2 border rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="active">Active</option>
              <option value="banned">Banned</option>
            </select>

            {/* Balance Range Filter */}
            <div className="flex items-center gap-2">
              <span>Balance:</span>
              <input
                type="number"
                className="p-2 border rounded-md w-20"
                value={balanceRange[0]}
                onChange={(e) =>
                  setBalanceRange([Number(e.target.value), balanceRange[1]])
                }
              />
              <span>-</span>
              <input
                type="number"
                className="p-2 border rounded-md w-20"
                value={balanceRange[1]}
                onChange={(e) =>
                  setBalanceRange([balanceRange[0], Number(e.target.value)])
                }
              />
            </div>
          </div>

          {/* User Table */}
          <div className="mt-6 bg-white shadow-lg rounded-lg p-4 overflow-auto">
            <table className="w-full border-collapse ">
              <thead>
                <tr className="bg-[#164193] text-white">
                  <th className="p-3">#</th>
                  <th className="p-3">Image</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Balance</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr key={user.id} className="border-b text-center">
                    <td className="p-3">{indexOfFirstUser + index + 1}</td>
                    <td className="p-3">
                      <img
                        src={user.image}
                        alt="User"
                        className="w-10 h-10 rounded-full mx-auto"
                      />
                    </td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.phone}</td>
                    <td className="p-3">{user.currentBalance} &#2547;</td>
                    <td className="p-3">{user.role}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-white flex flex-col justify-center items-center`}
                      >
                        {user.accountStatus === "active" ? (
                          <>
                            <img
                              width="15"
                              height="15"
                              src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/24/external-Burn-user-actions-those-icons-lineal-color-those-icons.png"
                              alt="external-Burn-user-actions-those-icons-lineal-color-those-icons"
                            />
                            <span className="text-green-500 text-sm">
                              {user.accountStatus}
                            </span>
                          </>
                        ) : (
                          <>
                            <img
                              width="19"
                              height="19"
                              src="https://img.icons8.com/pulsar-gradient/19/remove-user-female.png"
                              alt="remove-user-female"
                            />
                            <span className="text-red-500 text-sm">
                              {user.accountStatus}
                            </span>
                          </>
                        )}
                      </span>
                    </td>
                    <td className="p-3 flex justify-center gap-2">
                      <button className="p-2 bg-blue-500 text-white rounded-md">
                        <FiEye />
                      </button>
                      <button
                        className={`p-2 rounded-md ${
                          user.accountStatus === "active"
                            ? "bg-red-500"
                            : "bg-green-500"
                        } text-white`}
                      >
                        {user.accountStatus === "active" ? (
                          <FaBan />
                        ) : (
                          <TiTickOutline />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4 flex justify-center">
              {[...Array(Math.ceil(totalUsers / usersPerPage))].map((_, i) => (
                <button
                  key={i}
                  className={`p-2 mx-1 rounded-md ${
                    currentPage === i + 1
                      ? "bg-[#164193] text-white"
                      : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AllUsers;
