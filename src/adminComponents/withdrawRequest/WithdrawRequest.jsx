import { useState } from "react";
import { FaBan, FaCheck, FaTimes } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { TiTickOutline } from "react-icons/ti";
import { UseAllWithdrawsReq } from "../../customHooks/tenStackQuery/UseTenSatack";
import Loading from "../../loading/Loading";
import moment from "moment";
import UseAxiosSecure from "../../customHooks/UseAxiosSecure";
import AuthProviderHook from "../../customHooks/AuthProviderHook";
import { toast } from "react-toastify";


const WithdrawRequest = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [withdrawRange, setWithdrawRange] = useState([0, 50000]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const axiosSecure = UseAxiosSecure();
  const {handleError} = AuthProviderHook();

  const [withdrawsReq, refetch] = UseAllWithdrawsReq();
  console.log(withdrawsReq);

  if (!withdrawsReq) {
    return <Loading/>; 
  }

  // Filtering Withdraw Requests
  const filteredRequests = withdrawsReq
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.includes(searchQuery)
    )
    .filter(
      (user) =>
        user.withdrawBalance >= withdrawRange[0] &&
        user.withdrawBalance <= withdrawRange[1]
    );
    

  // Pagination Logic
  const totalRequests = filteredRequests.length;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredRequests.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  let handleWithdraw = (id, withdrawStatus, currentRevenueBalance, withdrawBalance, name, email)=>{
    axiosSecure.put(`/withdrawsReq/${id}`,{id,withdrawStatus,currentRevenueBalance, withdrawBalance, email})
    .then(res=>{
      refetch();
      toast.success(`${name}'s withdraw request ${withdrawStatus}`);
      console.log(res.data);
    }).catch(handleError);
  }

  return (
    <>
      <section className="w-full bg-[#F2F6FE] inter p-6 min-h-screen">
        <div className=" width">
          <h1 className="text-3xl font-bold text-[#164193] mb-4 ">
            Admin - Withdraw Requests
          </h1>
          <p className="text-lg font-semibold">
            Total Requests: {totalRequests}
          </p>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mt-4">
            {/* Search Filter */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-3 text-gray-600" />
              <input
                type="text"
                placeholder="Search by name, email, phone..."
                className="pl-10 pr-4 py-2 border rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Withdraw Amount Range Filter */}
            <div className="flex items-center gap-2">
              <span>Withdraw Amount:</span>
              <input
                type="number"
                className="p-2 border rounded-md w-20"
                value={withdrawRange[0]}
                onChange={(e) =>
                  setWithdrawRange([Number(e.target.value), withdrawRange[1]])
                }
              />
              <span>-</span>
              <input
                type="number"
                className="p-2 border rounded-md w-20"
                value={withdrawRange[1]}
                onChange={(e) =>
                  setWithdrawRange([withdrawRange[0], Number(e.target.value)])
                }
              />
            </div>
          </div>

          {/* Table */}
          <div className="mt-6 bg-white shadow-lg rounded-lg p-4 overflow-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#164193] text-white">
                  <th className="p-3">#</th>
                  <th className="p-3">Image</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Date & Time</th>
                  <th className="p-3">Current Revenue</th>
                  <th className="p-3">Withdraw Amount</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr key={user._id} className="border-b text-center">
                    <td className="p-3">{indexOfFirstUser + index + 1}</td>
                    <td className="p-3">
                      <img
                        src={user.image}
                        alt="Agent"
                        className="w-10 h-10 rounded-full mx-auto"
                      />
                    </td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.phone}</td>
                    <td className="p-3">{moment(user.createdAt).format('DD/MM/YYYY, hh:mm A')}</td>
                    <td className="p-3">{user.currentRevenueBalance} &#2547;</td>
                    <td className="p-3 font-semibold text-red-500">
                      {user.withdrawBalance} &#2547;
                    </td>
                    <td className="p-3 flex justify-center gap-2">
                      <button onClick={()=>handleWithdraw(user._id, "approved", user.currentRevenueBalance, user.withdrawBalance, user.name, user.email)} className="cursor-pointer p-2 bg-green-500 text-white rounded-md">
                        <TiTickOutline />
                      </button>
                      <button onClick={()=>handleWithdraw(user._id, "rejected",user.currentRevenueBalance, user.withdrawBalance, user.name, user.email)} className="cursor-pointer p-2 bg-red-500 text-white rounded-md">
                        <FaBan />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4 flex justify-center">
              {[...Array(Math.ceil(totalRequests / usersPerPage))].map(
                (_, i) => (
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
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WithdrawRequest;
