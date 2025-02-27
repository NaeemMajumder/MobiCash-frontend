import { FiDollarSign, FiTrendingUp, FiDownload, FiPieChart } from "react-icons/fi";
import AuthProviderHook from "../../customHooks/AuthProviderHook";

const AgentDash = () => {

  const {userData} = AuthProviderHook();

  const stats = [
    { title: "Current Balance", value: userData?.currentAgentSystemAmount, icon: <FiDollarSign size={30} /> },
    { title: "Total Revenue", value: userData?.totalRevenue, icon: <FiTrendingUp size={30} /> },
    { title: "Total Withdrawn", value: userData?.totalAgentWithdraw, icon: <FiDownload size={30} /> },
    { title: "Current Revenue", value: userData?.currentAgentRevenueAmount, icon: <FiPieChart size={30} /> },
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
