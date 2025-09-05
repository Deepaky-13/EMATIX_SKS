// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import customFetch from "../../utils/CustomFetch";

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const fetchProducts = async () => {
//     try {
//       const res = await customFetch.get("/products");
//       console.log("API response:", res.data);
//       setProducts(res.data.data || []);
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError("Failed to load products.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;
//     try {
//       await customFetch.delete(`/products/${id}`);
//       setProducts(products.filter((p) => p._id !== id));
//     } catch (err) {
//       console.error("Delete error:", err);
//       alert("Failed to delete product");
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   if (loading) return <div className="p-6 text-gray-500">Loading products...</div>;
//   if (error) return <div className="p-6 text-red-500">{error}</div>;

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">Dresses List</h2>
//         <button
//           onClick={() => navigate("/admin/add-product")}
//           className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow cursor-pointer"
//         >
//           ➕ Add Dress
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full border text-left text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2">Dress Name</th>
//               <th className="p-2">Category</th>
//               <th className="p-2">Price</th>
//               <th className="p-2">Quantity</th>
//               <th className="p-2">Status</th>
//               <th className="p-2 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="text-center text-gray-500 py-4">
//                   No products available
//                 </td>
//               </tr>
//             ) : (
//               products.map((p) => (
//                 <tr key={p._id} className="border-t hover:bg-gray-50 transition">
//                   <td className="p-2">{p.productName}</td>
//                   <td className="p-2">{p.productCategory}</td>
//                   <td className="p-2">₹{p.productPrice}</td>
//                   <td className="p-2">{p.quantity}</td>
//                   <td className="p-2">
//                     <span
//                       className={`px-2 py-1 rounded text-xs font-semibold ${
//                         p.status === "in-stock"
//                           ? "bg-green-100 text-green-700"
//                           : p.status === "out-of-stock"
//                           ? "bg-red-100 text-red-700"
//                           : "bg-gray-200 text-gray-600"
//                       }`}
//                     >
//                       {p.status}
//                     </span>
//                   </td>
//                   <td className="p-2 text-center space-x-2">
//                     <button
//                       onClick={() => navigate(`/admin/add-product/${p._id}`)}
//                       className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs cursor-pointer"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(p._id)}
//                       className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs cursor-pointer"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ProductList;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2, Package, AlertCircle, Loader2 } from "lucide-react";
import customFetch from "../../utils/CustomFetch";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await customFetch.get("/products");
      console.log("API response:", res.data);
      setProducts(res.data.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await customFetch.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex items-center space-x-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="text-xl font-medium text-gray-700">Loading dresses...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex items-center space-x-4">
          <AlertCircle className="h-8 w-8 text-red-500" />
          <span className="text-xl font-medium text-red-600">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Dress Management
                </h1>
                <p className="text-gray-500 text-sm mt-1">Manage your dress items</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/admin/add-product")}
              className="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2 font-medium"
            >
              <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-200" />
              <span>Add New Dress</span>
            </button>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">Dress Name</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">Category</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">Price</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">Quantity</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">Status</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12">
                      <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg font-medium">No dresses available</p>
                      <p className="text-gray-400 text-sm mt-2">Start by adding your first dress to the menu</p>
                    </td>
                  </tr>
                ) : (
                  products.map((p, index) => (
                    <tr 
                      key={p._id} 
                      className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="py-4 px-6">
                        <div className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                          {p.productName}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {p.productCategory}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-bold text-green-600 text-lg">₹{p.productPrice}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-medium text-gray-700">{p.quantity}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-2 rounded-full text-sm font-semibold ${
                            p.status === "in-stock"
                              ? "bg-green-100 text-green-700 border border-green-200"
                              : p.status === "out-of-stock"
                              ? "bg-red-100 text-red-700 border border-red-200"
                              : "bg-gray-100 text-gray-600 border border-gray-200"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => navigate(`/admin/add-product/${p._id}`)}
                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 group/btn"
                            title="Edit dress"
                          >
                            <Edit className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                          </button>
                          <button
                            onClick={() => handleDelete(p._id)}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 group/btn"
                            title="Delete dress"
                          >
                            <Trash2 className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile/Tablet Card View */}
        <div className="lg:hidden space-y-4">
          {products.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-xl font-medium">No dresses available</p>
              <p className="text-gray-400 text-sm mt-2">Start by adding your first dress to the menu</p>
            </div>
          ) : (
            products.map((p, index) => (
              <div
                key={p._id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{p.productName}</h3>
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {p.productCategory}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          p.status === "in-stock"
                            ? "bg-green-100 text-green-700"
                            : p.status === "out-of-stock"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {p.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-green-50 rounded-xl p-3">
                    <p className="text-sm text-green-600 font-medium mb-1">Price</p>
                    <p className="text-2xl font-bold text-green-700">₹{p.productPrice}</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-3">
                    <p className="text-sm text-blue-600 font-medium mb-1">Quantity</p>
                    <p className="text-2xl font-bold text-blue-700">{p.quantity}</p>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => navigate(`/admin/add-product/${p._id}`)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 font-medium"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 font-medium"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Stats */}
        {products.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{products.length}</div>
                <div className="text-sm text-gray-500">Total Dresses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {products.filter(p => p.status === "in-stock").length}
                </div>
                <div className="text-sm text-gray-500">In Stock</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {products.filter(p => p.status === "out-of-stock").length}
                </div>
                <div className="text-sm text-gray-500">Out of Stock</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
