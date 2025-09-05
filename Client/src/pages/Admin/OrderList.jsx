import { useEffect, useState, useMemo } from "react";
import { CheckCircle, Truck, XCircle, Clock } from "lucide-react";
import customFetch from "../../utils/CustomFetch";

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchOrders = async () => {
    try {
      const res = await customFetch.get("/order");
      setOrders(res.data.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="text-green-500 w-5 h-5" />;
      case "Shipped":
      case "Out for Delivery":
        return <Truck className="text-blue-500 w-5 h-5" />;
      case "Pending":
      case "Processing":
        return <Clock className="text-yellow-500 w-5 h-5" />;
      case "Cancelled":
      case "Returned":
        return <XCircle className="text-red-500 w-5 h-5" />;
      default:
        return <Clock className="text-gray-500 w-5 h-5" />;
    }
  };

  // 🔎 Search
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchLower = search.toLowerCase();
      return (
        order.orderStatus?.toLowerCase().includes(searchLower) ||
        order.courier?.toLowerCase().includes(searchLower) ||
        order.trackingId?.toLowerCase().includes(searchLower) ||
        order.user?.name?.toLowerCase().includes(searchLower) ||
        order.user?.email?.toLowerCase().includes(searchLower)
      );
    });
  }, [orders, search]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading orders...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Orders</h1>

      {/* 🔎 Search */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded-lg px-4 py-2 w-full max-w-md"
        />
      </div>

      {/* 📊 Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Order ID</th>
              <th className="border p-2 text-left">User</th>
              <th className="border p-2 text-left">Courier</th>
              <th className="border p-2 text-left">Tracking ID</th>
              <th className="border p-2 text-left">Shipping</th>
              <th className="border p-2 text-left">Status</th>
              <th className="border p-2 text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="border p-2">{order._id}</td>
                  <td className="border p-2">
                    {order.user?.name} <br />
                    <span className="text-xs text-gray-500">
                      {order.user?.email}
                    </span>
                  </td>
                  <td className="border p-2">{order.courier || "-"}</td>
                  <td className="border p-2">{order.trackingId || "-"}</td>
                  <td className="border p-2">
                    {order.shippingCity}, {order.shippingState}
                  </td>
                  <td className="border p-2 flex items-center gap-2">
                    {getStatusIcon(order.orderStatus)}
                    {order.orderStatus}
                  </td>
                  <td className="border p-2">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center p-4 text-gray-500"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📌 Pagination */}
      <div className="flex justify-center items-center mt-4 gap-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg border bg-gray-100 disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg border bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
