import { useState, useEffect } from "react";
import { FiUsers, FiUserCheck, FiDollarSign, FiBarChart2 } from "react-icons/fi";

const AdminDash = () => {
  const [dashboardData, setDashboardData] = useState({
    totalAmount: 0,
    totalRevenue: 0,
    totalUsers: 0,
    totalAgents: 0,
  });

  useEffect(() => {
    // Simulated API Call
    setTimeout(() => {
      setDashboardData({
        totalAmount: 5000000, // Example total balance in the system
        totalRevenue: 150000, // Example admin revenue
        totalUsers: 1200, // Example total users count
        totalAgents: 300, // Example total agents count
      });
    }, 1000);
  }, []);

  return (
    <section className="w-full p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 mt-20">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Amount in System */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <FiDollarSign size={32} className="text-green-600" />
          <div>
            <p className="text-gray-500">Total Amount in System</p>
            <h2 className="text-xl font-bold">৳{dashboardData.totalAmount.toLocaleString()}</h2>
          </div>
        </div>

        {/* Admin Revenue */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <FiBarChart2 size={32} className="text-purple-600" />
          <div>
            <p className="text-gray-500">Admin Total Revenue</p>
            <h2 className="text-xl font-bold">৳{dashboardData.totalRevenue.toLocaleString()}</h2>
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <FiUsers size={32} className="text-blue-600" />
          <div>
            <p className="text-gray-500">Total Users</p>
            <h2 className="text-xl font-bold">{dashboardData.totalUsers}</h2>
          </div>
        </div>

        {/* Total Agents */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <FiUserCheck size={32} className="text-orange-600" />
          <div>
            <p className="text-gray-500">Total Agents</p>
            <h2 className="text-xl font-bold">{dashboardData.totalAgents}</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDash;