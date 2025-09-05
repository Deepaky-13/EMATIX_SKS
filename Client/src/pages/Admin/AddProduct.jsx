// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import customFetch from "../../utils/CustomFetch";

// const ProductForm = () => {
//   const { id } = useParams(); // for edit
//   const [form, setForm] = useState({
//     productName: "",
//     productDescription: "",
//     productPrice: "",
//     quantity: "",
//     productCategory: "",
//     status: "in-stock",
//   });
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Fetch existing product if editing
//   useEffect(() => {
//     if (id) {
//       const fetchProduct = async () => {
//         try {
//           const res = await customFetch.get(`/products/${id}`);
//           setForm(res.data.data);
//         } catch (err) {
//           console.error("Failed to fetch product:", err);
//         }
//       };
//       fetchProduct();
//     }
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       if (id) {
//         // Update existing product
//         await customFetch.put(`/products/${id}`, form);
//       } else {
//         // Create new product
//         await customFetch.post("/products", form);
//       }
//       navigate("/admin/products");
//     } catch (err) {
//       console.error("Save product error:", err);
//       alert("Failed to save product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">
//         {id ? "Edit Dress" : "Add Dress"}
//       </h2>

//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block mb-2">Dress Name</label>
//           <input
//             name="productName"
//             value={form.productName}
//             onChange={handleChange}
//             className="border p-2 w-full"
//             required
//           />

//           <label className="block mt-4 mb-2">Category</label>
//           <input
//             name="productCategory"
//             value={form.productCategory}
//             onChange={handleChange}
//             className="border p-2 w-full"
//           />

//           <label className="block mt-4 mb-2">Price</label>
//           <input
//             name="productPrice"
//             type="number"
//             value={form.productPrice}
//             onChange={handleChange}
//             className="border p-2 w-full"
//           />

//           <label className="block mt-4 mb-2">Quantity</label>
//           <input
//             name="quantity"
//             type="number"
//             value={form.quantity}
//             onChange={handleChange}
//             className="border p-2 w-full"
//           />

//           {!id && (
//             <>
//               <label className="block mt-4 mb-2">Upload Image</label>
//               <input type="file" onChange={(e) => setImage(e.target.files[0])} />
//             </>
//           )}
//         </div>

//         <div>
//           <label className="block mb-2">Description</label>
//           <textarea
//             name="productDescription"
//             value={form.productDescription}
//             onChange={handleChange}
//             className="border p-2 w-full h-24"
//           />

//           <label className="block mt-4 mb-2">Status</label>
//           <select
//             name="status"
//             value={form.status}
//             onChange={handleChange}
//             className="border p-2 w-full"
//           >
//             <option value="in-stock">In Stock</option>
//             <option value="out-of-stock">Out of Stock</option>
//             <option value="discontinued">Discontinued</option>
//           </select>

//           <div className="mt-6 flex gap-4">
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
//             >
//               {loading ? "Saving..." : "Save"}
//             </button>
//             <button
//               type="button"
//               onClick={() => navigate("/admin/products")}
//               className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProductForm;





// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import customFetch from "../../utils/CustomFetch";

// const ProductForm = () => {
//   const { id } = useParams(); // for edit
//   const [form, setForm] = useState({
//     productName: "",
//     productDescription: "",
//     productPrice: "",
//     quantity: "",
//     productCategory: "",
//     status: "in-stock",
//   });
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Fetch existing product if editing
//   useEffect(() => {
//     if (id) {
//       const fetchProduct = async () => {
//         try {
//           const res = await customFetch.get(`/products/${id}`);
//           setForm(res.data.data);
//         } catch (err) {
//           console.error("Failed to fetch product:", err);
//         }
//       };
//       fetchProduct();
//     }
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       if (id) {
//         // Update existing product
//         await customFetch.put(`/products/${id}`, form);
//       } else {
//         // Create new product
//         await customFetch.post("/products", form);
//       }
//       navigate("/admin/products");
//     } catch (err) {
//       console.error("Save product error:", err);
//       alert("Failed to save product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 p-4 md:p-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-orange-400 to-amber-500 p-6 text-white">
//           <h1 className="text-3xl font-bold mb-2">dress Fantasy</h1>
//           <h2 className="text-xl">
//             {id ? "Edit Dress Details" : "Add New Dress"}
//           </h2>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6">
//           {/* Single Section Form */}
//           <div className="space-y-6">
//             {/* Dress Name & Category */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Dress Name</label>
//                 <input
//                   name="productName"
//                   value={form.productName}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
//                   placeholder="Enter Dress Name"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
//                 <input
//                   name="productCategory"
//                   value={form.productCategory}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
//                   placeholder="Enter Category"
//                 />
//               </div>
//             </div>

//             {/* Description */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//               <textarea
//                 name="productDescription"
//                 value={form.productDescription}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
//                 placeholder="Description..."
//                 rows="3"
//               />
//             </div>

//             {/* Status & Ratings */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
//                 <select
//                   name="status"
//                   value={form.status}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
//                 >
//                   <option value="in-stock">In Stock</option>
//                   <option value="out-of-stock">Out of Stock</option>
//                   <option value="discontinued">Discontinued</option>
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Ratings</label>
//                 <div className="flex items-center space-x-1 bg-gray-50 px-4 py-3 rounded-lg border border-gray-300">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <svg key={star} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                     </svg>
//                   ))}
//                   <span className="ml-2 text-gray-600">5.0</span>
//                 </div>
//               </div>
//             </div>

//             {/* Selling Price & Cost Price */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Selling Price</label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-3 text-gray-500">$</span>
//                   <input
//                     name="productPrice"
//                     type="number"
//                     value={form.productPrice}
//                     onChange={handleChange}
//                     className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
//                     placeholder="0.00"
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Cost Price</label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-3 text-gray-500">$</span>
//                   <input
//                     type="number"
//                     className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
//                     placeholder="0.00"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Quantity & Customer Info */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
//                 <input
//                   name="quantity"
//                   type="number"
//                   value={form.quantity}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
//                   placeholder="Enter Quantity"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Customer</label>
//                 <input
//                   type="text"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
//                   placeholder="Customer Name"
//                 />
//               </div>
//             </div>

//             {/* Image Upload (only for new dresses) */}
//             {!id && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Dress Image</label>
//                 <div className="flex items-center justify-center w-full">
//                   <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-400 transition bg-gray-50">
//                     <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                       <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
//                       </svg>
//                       <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
//                       <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 5MB)</p>
//                     </div>
//                     <input 
//                       type="file" 
//                       onChange={(e) => setImage(e.target.files[0])} 
//                       className="hidden" 
//                     />
//                   </label>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Action Buttons */}
//           <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end">
//             <button
//               type="button"
//               onClick={() => navigate("/admin/products")}
//               className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition font-medium disabled:opacity-50 flex items-center justify-center"
//             >
//               {loading ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Saving...
//                 </>
//               ) : id ? "Update Dress" : "Add Dress"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProductForm;


import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import customFetch from "../../utils/CustomFetch";

const ProductForm = () => {
  const { id } = useParams(); // for edit
  const [form, setForm] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    quantity: "",
    productCategory: "",
    status: "in-stock",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Fetch existing product if editing
  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const res = await customFetch.get(`/products/${id}`);
          setForm(res.data.data);
          // Set image preview if exists
          if (res.data.data.imageUrl) {
            setImagePreview(res.data.data.imageUrl);
          }
        } catch (err) {
          console.error("Failed to fetch product:", err);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        // Update existing product
        await customFetch.put(`/products/${id}`, form);
      } else {
        // Create new product
        await customFetch.post("/products", form);
      }
      navigate("/admin/products");
    } catch (err) {
      console.error("Save product error:", err);
      alert("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-400 to-amber-500 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Dress Fantasy</h1>
          <h2 className="text-xl">
            {id ? "Edit Dress Details" : "Add New Dress"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Image Section */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 h-full">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Dress Image</h3>
                
                {/* Image Preview */}
                <div className="mb-6">
                  {imagePreview ? (
                    <div className="relative group">
                      <img 
                        src={imagePreview} 
                        alt="Dress preview" 
                        className="w-full h-64 object-cover rounded-lg shadow-md"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg">
                        <label htmlFor="image-upload" className="cursor-pointer bg-white bg-opacity-80 rounded-full p-2">
                          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                        </label>
                      </div>
                    </div>
                  ) : (
                    <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-400 transition bg-white">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-12 h-12 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 text-center">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 text-center">SVG, PNG, JPG or GIF<br />(MAX. 5MB)</p>
                      </div>
                    </label>
                  )}
                  <input 
                    id="image-upload"
                    type="file" 
                    onChange={handleImageChange} 
                    className="hidden" 
                    accept="image/*"
                  />
                </div>
                
                {/* Image Actions */}
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => document.getElementById('image-upload').click()}
                    className="w-full py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-medium"
                  >
                    {imagePreview ? "Change Image" : "Upload Image"}
                  </button>
                  
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setImage(null);
                      }}
                      className="w-full py-2 px-4 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition font-medium"
                    >
                      Remove Image
                    </button>
                  )}
                </div>
                
                {/* Image Tips */}
                <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h4 className="text-sm font-medium text-amber-800 mb-2">Image Guidelines</h4>
                  <ul className="text-xs text-amber-600 space-y-1">
                    <li>• Use high-quality images</li>
                    <li>• Show the full dress</li>
                    <li>• Use neutral background</li>
                    <li>• Recommended size: 800x1000px</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column - Form Fields */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {/* Dress Name & Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dress Name *</label>
                    <input
                      name="productName"
                      value={form.productName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                      placeholder="Enter Dress Name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      name="productCategory"
                      value={form.productCategory}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                    >
                      <option value="">Select Category</option>
                      <option value="casual">Casual Dresses</option>
                      <option value="evening">Evening Dresses</option>
                      <option value="wedding">Wedding Dresses</option>
                      <option value="summer">Summer Dresses</option>
                      <option value="formal">Formal Dresses</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    name="productDescription"
                    value={form.productDescription}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                    placeholder="Describe the dress features, material, style, etc..."
                    rows="3"
                  />
                </div>

                {/* Status & Ratings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                    >
                      <option value="in-stock">In Stock</option>
                      <option value="out-of-stock">Out of Stock</option>
                      <option value="discontinued">Discontinued</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ratings</label>
                    <div className="flex items-center space-x-1 bg-gray-50 px-4 py-3 rounded-lg border border-gray-300">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-gray-600">5.0</span>
                    </div>
                  </div>
                </div>

                {/* Selling Price & Cost Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Selling Price *</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500">$</span>
                      <input
                        name="productPrice"
                        type="number"
                        value={form.productPrice}
                        onChange={handleChange}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                        placeholder="0.00"
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cost Price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500">$</span>
                      <input
                        type="number"
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>

                {/* Quantity & Customer Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
                    <input
                      name="quantity"
                      type="number"
                      value={form.quantity}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                      placeholder="Enter Quantity"
                      required
                      min="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Customer</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                      placeholder="Customer Name"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => navigate("/admin/products")}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition font-medium disabled:opacity-50 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : id ? "Update Dress" : "Add Dress"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;



