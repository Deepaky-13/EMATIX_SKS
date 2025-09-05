import { useEffect, useState, useMemo } from "react";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import customFetch from "../../utils/CustomFetch";

export default function SalesList() {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; 

    const fetchItems = async () => {
        try {
            const res = await customFetch.get("/sales");
            setSales(res.data.data || []);
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Failed to load items.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const getStatusIcon = (status) => {
        switch (status) {
            case "Paid":
                return <CheckCircle className="text-green-500 w-5 h-5" />;
            case "Pending":
                return <Clock className="text-yellow-500 w-5 h-5" />;
            default:
                return <XCircle className="text-red-500 w-5 h-5" />;
        }
    };

    // 🔎 Search
    const filteredSales = useMemo(() => {
        return sales.filter((sale) => {
            const searchLower = search.toLowerCase();
            return (
                sale.paymentStatus?.toLowerCase().includes(searchLower) ||
                sale.paymentMethod?.toLowerCase().includes(searchLower) ||
                sale.items.some(
                    (item) =>
                        item.productName.toLowerCase().includes(searchLower) ||
                        item.productBrand.toLowerCase().includes(searchLower) ||
                        item.productColor.toLowerCase().includes(searchLower)
                )
            );
        });
    }, [sales, search]);

    const totalPages = Math.ceil(filteredSales.length / itemsPerPage);
    const paginatedSales = filteredSales.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (loading) {
        return <p className="text-center mt-10 text-gray-500">Loading sales...</p>;
    }

    if (error) {
        return <p className="text-center mt-10 text-red-500">{error}</p>;
    }

    return (
        <div className="p-4 md:p-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Sales Records</h1>

            {/* 🔎 Search */}
            <div className="mb-4 flex justify-center">
                <input
                    type="text"
                    placeholder="Search sales..."
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
                            <th className="border p-2 text-left">Product</th>
                            <th className="border p-2 text-left">Brand</th>
                            <th className="border p-2 text-left">Color</th>
                            <th className="border p-2 text-right">Qty</th>
                            <th className="border p-2 text-right">Item Total</th>
                            <th className="border p-2 text-right">Subtotal</th>
                            <th className="border p-2 text-right">Discount</th>
                            <th className="border p-2 text-right">GST</th>
                            <th className="border p-2 text-right">Grand Total</th>
                            <th className="border p-2 text-left">Status</th>
                            <th className="border p-2 text-left">Payment Method</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedSales.length > 0 ? (
                            paginatedSales.map((sale) =>
                                sale.items.map((item, idx) => (
                                    <tr key={`${sale._id}-${idx}`} className="hover:bg-gray-50">
                                        {/* Item-level data */}
                                        <td className="border p-2">{item.productName}</td>
                                        <td className="border p-2">{item.productBrand}</td>
                                        <td className="border p-2">{item.productColor}</td>
                                        <td className="border p-2 text-right">{item.quantity}</td>
                                        <td className="border p-2 text-right">
                                            ₹{item.total.toLocaleString()}
                                        </td>

                                        {/* Only show subtotal/discount/gst/grandtotal/status/payment once per sale */}
                                        {idx === 0 ? (
                                            <>
                                                <td
                                                    rowSpan={sale.items.length}
                                                    className="border p-2 text-right align-top"
                                                >
                                                    ₹{sale.subtotal.toLocaleString()}
                                                </td>
                                                <td
                                                    rowSpan={sale.items.length}
                                                    className="border p-2 text-right align-top"
                                                >
                                                    ₹{sale.discount.toLocaleString()}
                                                </td>
                                                <td
                                                    rowSpan={sale.items.length}
                                                    className="border p-2 text-right align-top"
                                                >
                                                    {sale.gst}%
                                                </td>
                                                <td
                                                    rowSpan={sale.items.length}
                                                    className="border p-2 text-right font-bold align-top"
                                                >
                                                    ₹{sale.totalAmount.toLocaleString()}
                                                </td>
                                                <td
                                                    rowSpan={sale.items.length}
                                                    className="border p-2 align-top flex items-center gap-2"
                                                >
                                                    {getStatusIcon(sale.paymentStatus)}
                                                    {sale.paymentStatus}
                                                </td>
                                                <td
                                                    rowSpan={sale.items.length}
                                                    className="border p-2 align-top"
                                                >
                                                    {sale.paymentMethod}
                                                </td>
                                            </>
                                        ) : null}
                                    </tr>
                                ))
                            )
                        ) : (
                            <tr>
                                <td colSpan="11" className="text-center p-4 text-gray-500">
                                    No records found.
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
