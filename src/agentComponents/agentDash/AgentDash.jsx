import { FiDollarSign, FiTrendingUp, FiDownload, FiPieChart } from "react-icons/fi";

const AgentDash = () => {
  const agentTotalAmount = 1500000; // Total amount in the system
  const agentTotalRevenue = 800000; // Total revenue earned
  const totalWithdrawn = 500000; // Total withdrawn amount
  const currentRevenue = agentTotalRevenue - totalWithdrawn; // Revenue after withdrawal

  const stats = [
    { title: "Total Amount in System", value: agentTotalAmount, icon: <FiDollarSign size={30} /> },
    { title: "Total Revenue", value: agentTotalRevenue, icon: <FiTrendingUp size={30} /> },
    { title: "Total Withdrawn", value: totalWithdrawn, icon: <FiDownload size={30} /> },
    { title: "Current Revenue", value: currentRevenue, icon: <FiPieChart size={30} /> },
  ];

  return (
    <section className="w-full p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-700 mt-20">Agent Dashboard</h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center text-center">
            <div className="text-blue-500 mb-2">{stat.icon}</div>
            <p className="text-xl font-semibold">{stat.title}</p>
            <p className="text-2xl font-bold text-gray-800">৳{stat.value.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AgentDash;
