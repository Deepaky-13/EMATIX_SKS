import React from "react";
import { ShoppingBag, Users, DollarSign, BarChart3 } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    { title: "Total Products", value: 120, icon: <ShoppingBag size={28} />, color: "bg-pink-500" },
    { title: "Users", value: 450, icon: <Users size={28} />, color: "bg-blue-500" },
    { title: "Revenue", value: "$12,340", icon: <DollarSign size={28} />, color: "bg-green-500" },
    { title: "Analytics", value: "85%", icon: <BarChart3 size={28} />, color: "bg-purple-500" },
  ];

  return (
    <div className="m-11">
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4 hover:shadow-lg transition"
          >
            <div className={`${stat.color} text-white p-3 rounded-lg`}>{stat.icon}</div>
            <div>
              <h2 className="text-sm text-gray-500">{stat.title}</h2>
              <p className="text-lg font-semibold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Two-column section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white shadow-md rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-sm text-gray-600">
                <th className="p-2">Order ID</th>
                <th className="p-2">Customer</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-2">#1021</td>
                <td className="p-2">John Doe</td>
                <td className="p-2">$120</td>
                <td className="p-2 text-green-600 font-medium">Completed</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-2">#1022</td>
                <td className="p-2">Jane Smith</td>
                <td className="p-2">$90</td>
                <td className="p-2 text-yellow-600 font-medium">Pending</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-2">#1023</td>
                <td className="p-2">Mike Johnson</td>
                <td className="p-2">$200</td>
                <td className="p-2 text-red-600 font-medium">Cancelled</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Notifications / Activity */}
        <div className="bg-white shadow-md rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="p-3 bg-gray-50 rounded-lg shadow-sm">
              📦 New product <b>“Sneakers”</b> added.
            </li>
            <li className="p-3 bg-gray-50 rounded-lg shadow-sm">
              👤 User <b>Sarah</b> just signed up.
            </li>
            <li className="p-3 bg-gray-50 rounded-lg shadow-sm">
              💰 Order <b>#1021</b> completed successfully.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
