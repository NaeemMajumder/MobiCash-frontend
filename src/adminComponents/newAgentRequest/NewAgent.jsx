import { useState } from "react";
import { FiEye } from "react-icons/fi";
import { TiTickOutline } from "react-icons/ti";
import { FaBan } from "react-icons/fa";
import { UseNewUserRequest } from "../../customHooks/tenStackQuery/UseTenSatack";
import Loading from "../../loading/Loading";

const agentRequests = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+880123456789",
    status: "Pending",
    image: "demo",
  },
  {
    id: 2,
    name: "Bob Williams",
    email: "bob@example.com",
    phone: "+8801987654321",
    status: "Pending",
    image: "demo",
  },
  // Add more agent requests here
];

const NewAgent = () => {
  const [searchType, setSearchType] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const agentsPerPage = 10;

  // tenstack query data fetch
  const [newUsersRequest] = UseNewUserRequest();
  console.log(newUsersRequest);

  if (!newUsersRequest) {
    return <Loading/>; // Prevent filter from running on undefined data
  }

  // Filtering Agents
  const filteredAgents = newUsersRequest.filter((agent) => {
    if (searchQuery) {
      if (searchType === "name")
        return agent.name.toLowerCase().includes(searchQuery.toLowerCase());
      if (searchType === "email")
        return agent.email.toLowerCase().includes(searchQuery.toLowerCase());
      if (searchType === "phone") return agent.phone.includes(searchQuery);
    }
    return true;
  });

  // Pagination Logic
  const totalAgents = filteredAgents.length;
  const indexOfLastAgent = currentPage * agentsPerPage;
  const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;
  const currentAgents = filteredAgents.slice(
    indexOfFirstAgent,
    indexOfLastAgent
  );

  return (
    <section className="w-full bg-[#F2F6FE] inter">
      <div className="p-6 min-h-screen width">
        <h1 className="text-3xl font-bold text-[#164193] mb-4">
          Admin - New Agent Requests
        </h1>
        <p className="text-lg font-semibold">Total Requests: {totalAgents}</p>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mt-4">
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
        </div>

        {/* Agent Requests Table */}
        <div className="mt-6 bg-white shadow-lg rounded-lg p-4 overflow-auto">
          <table className="w-full border-collapse text-center">
            <thead>
              <tr className="bg-[#164193] text-white">
                <th className="p-3">#</th>
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentAgents.map((agent, index) => (
                <tr key={agent.id} className="border-b">
                  <td className="p-3">{indexOfFirstAgent + index + 1}</td>
                  <td className="p-3">
                    <img
                      src={agent.image}
                      alt="User"
                      className="w-10 h-10 rounded-full mx-auto"
                    />
                  </td>
                  <td className="p-3">{agent.name}</td>
                  <td className="p-3">{agent.email}</td>
                  <td className="p-3">{agent.phone}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        agent.accountStatus === "pending"
                          ? "bg-yellow-500"
                          : agent.accountStatus === "approved"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {agent.accountStatus}
                    </span>
                  </td>
                  <td className="p-3 flex justify-center gap-2">
                    <button className="p-2 bg-blue-500 text-white rounded-md">
                      <FiEye />
                    </button>
                    <button className="p-2 bg-green-500 text-white rounded-md">
                      <TiTickOutline />
                    </button>
                    <button className="p-2 bg-red-500 text-white rounded-md">
                      <FaBan />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="mt-4 flex justify-center">
            {[...Array(Math.ceil(totalAgents / agentsPerPage))].map((_, i) => (
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
  );
};

export default NewAgent;
