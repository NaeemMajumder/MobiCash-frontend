import { useLoaderData } from "react-router-dom";
import AllTransactions from "../allTransaction/AllTransactions";

const UserDetails = () => {
  const user = useLoaderData();
  console.log(user);

  return (
    <section className="w-full bg-[#F2F6FE] inter p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <h1 className="text-3xl font-bold text-[#164193] mb-6">
          User Details - {user.name}
        </h1>

        {/* User Information Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Side User Info */}
            <div className="w-full md:w-1/2">
              <h2 className="text-xl font-semibold text-[#164193] mb-4">
                User Info
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Username:</span>
                  <span className="text-gray-600 flex items-center gap-2">
                    {user.name}
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        user.accountStatus === "active"
                          ? "bg-green-100 text-green-600"
                          : user.accountStatus === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {user.accountStatus}
                    </span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Email:</span>
                  <span className="text-gray-600">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">
                    Phone Number:
                  </span>
                  <span className="text-gray-600">{user.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">
                    NID Number:
                  </span>
                  <span className="text-gray-600">{user.nid}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">
                    Current Balance:
                  </span>
                  <span className="text-gray-600">
                    {user.currentBalance} &#2547;
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side (Avatar or Additional Info) */}
            <div className="w-full md:w-1/2 flex justify-center items-center">
              <img
                src={user.image}
                alt="User Avatar"
                className="rounded-full border-4 border-[#164193] p-2 w-32 h-32"
              />
            </div>
          </div>
        </div>

        {/* User Transactions */}
        {user?.transactions.length > 0 && (
          <>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-[#164193] mb-4">
                User Transactions
              </h2>
              <AllTransactions allTransactions={user?.transactions} />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default UserDetails;
