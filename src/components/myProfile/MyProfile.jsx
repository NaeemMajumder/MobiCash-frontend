import React from "react";
import AdminDash from "../../adminComponents/adminDash/AdminDash";
import AgentDash from "../../agentComponents/agentDash/AgentDash";
import UserDash from "../userDash/UserDash";
import AuthProviderHook from "../../customHooks/AuthProviderHook";

const MyProfile = () => {
  const {userData} = AuthProviderHook();
  console.log(userData);
  // Example user data
  const user = {
    name: "John Doe",
    phone: "+880123456789",
    email: "john@example.com",
    role: "User",
    image: "https://via.placeholder.com/100",
  };
  return (
    <>
      <section className="w-full bg-[#F2F6FE]">
        <div className="width">
          {
            userData?.role === "Admin"? <AdminDash/>: userData?.role === "Agent"? <AgentDash/>:<UserDash/>
          }
          {/* <AdminDash></AdminDash>
          <AgentDash></AgentDash>
          <UserDash></UserDash> */}
        </div>

        {/* my profile information */}
        <div>
          <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
              {/* Profile Image */}
              <div className="relative w-24 h-24 mx-auto mb-4">
                <img
                  src={userData?.image}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
                />
              </div>

              <h2 className="text-2xl font-semibold text-gray-800">
                My Profile
              </h2>
              <p className="text-gray-600">View your account details</p>

              {/* User Info Form */}
              <form className="mt-6 space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold">
                    Name
                  </label>
                  <input
                    type="text"
                    value={userData?.name}
                    disabled
                    className="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={userData?.phone}
                    disabled
                    className="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    value={userData?.email}
                    disabled
                    className="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">
                    Role
                  </label>
                  <input
                    type="text"
                    value={userData?.role}
                    disabled
                    className="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </form>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default MyProfile;
