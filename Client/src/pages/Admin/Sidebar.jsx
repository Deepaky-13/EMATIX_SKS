// import { useState } from "react";
// import { LayoutDashboard, ShoppingBag, Menu, X } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";

// export default function Sidebar() {
//   const location = useLocation();
//   const [active, setActive] = useState(location.pathname);
//   const [open, setOpen] = useState(false);

//   const menuItems = [
//     { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
//     { name: "Product List", icon: <ShoppingBag size={20} />, path: "/admin/products" },
//   ];

//   return (
//     <>
//       {/* Top Navbar (visible only on mobile) */}
//       <div className="lg:hidden fixed top-0 left-0 w-full flex items-center justify-between bg-pink-600 text-white px-4 py-3 shadow-md z-50">
//         <button onClick={() => setOpen(true)} className="focus:outline-none">
//           <Menu size={26} />
//         </button>
//         <h1 className="text-lg font-bold">Admin Panel</h1>
//         <div className="w-8"></div>
//       </div>

//       {/* Sidebar */}
//       <div
//         className={`h-full w-64 bg-gradient-to-b from-pink-600 to-pink-400 text-white flex flex-col shadow-xl border-r border-white/20 transform transition-transform duration-300 z-50
//           ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:static"}
//         `}
//       >
//         {/* Header */}
//         <div className="p-6 border-b border-white/20 flex items-center justify-between">
//           <h1 className="text-xl font-bold text-white">Admin Panel</h1>
//           <button className="lg:hidden text-white" onClick={() => setOpen(false)}>
//             <X size={22} />
//           </button>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 overflow-y-auto p-4 space-y-3">
//           {menuItems.map((item) => (
//             <Link
//               key={item.name}
//               to={item.path}
//               onClick={() => {
//                 setActive(item.path);
//                 setOpen(false);
//               }}
//               className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
//                 active === item.path
//                   ? "bg-white text-pink-600 font-semibold shadow-md"
//                   : "text-white/80 hover:bg-white/20 hover:text-white"
//               }`}
//             >
//               <div
//                 className={`transition-all duration-300 ${
//                   active === item.path ? "text-pink-600" : "text-white"
//                 }`}
//               >
//                 {item.icon}
//               </div>
//               <span>{item.name}</span>
//             </Link>
//           ))}
//         </nav>

//         {/* Footer */}
//         <div className="p-4 border-t border-white/20 text-center text-xs text-white/70">
//           <div className="flex items-center justify-center gap-1">
//             <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
//             <span>System Online</span>
//           </div>
//         </div>
//       </div>

//       {/* Dark Overlay on mobile */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40 lg:hidden"
//           onClick={() => setOpen(false)}
//         ></div>
//       )}
//     </>
//   );
// }


// import { useState } from "react";
// import { LayoutDashboard, ShoppingBag } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";

// export default function Sidebar() {
//   const location = useLocation();
//   const [active, setActive] = useState(location.pathname);

//   const menuItems = [
//     { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
//     { name: "Product List", icon: <ShoppingBag size={20} />, path: "/admin/products" },
//   ];

//   return (
//     <div className="h-screen w-64 bg-gradient-to-b from-pink-600 to-pink-400 text-white flex flex-col shadow-xl border-r border-white/20">
//       {/* Header */}
//       <div className="p-6 border-b border-white/20 flex items-center justify-center">
//         <h1 className="text-xl font-bold text-white">Admin Panel</h1>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 overflow-y-auto p-4 space-y-3">
//         {menuItems.map((item) => (
//           <Link
//             key={item.name}
//             to={item.path}
//             onClick={() => setActive(item.path)}
//             className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
//               active === item.path
//                 ? "bg-white text-pink-600 font-semibold shadow-md"
//                 : "text-white/80 hover:bg-white/20 hover:text-white"
//             }`}
//           >
//             <div
//               className={`transition-all duration-300 ${
//                 active === item.path ? "text-pink-600" : "text-white"
//               }`}
//             >
//               {item.icon}
//             </div>
//             <span>{item.name}</span>
//           </Link>
//         ))}
//       </nav>

//       {/* Footer */}
//       <div className="p-4 border-t border-white/20 text-center text-xs text-white/70">
//         <div className="flex items-center justify-center gap-1">
//           <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
//           <span>System Online</span>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { LayoutDashboard, ShoppingBag, Menu, X, Receipt, Package } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
    { name: "Product List", icon: <ShoppingBag size={20} />, path: "/admin/products" },
    { name: "Sales List", icon: <Receipt size={20} />, path: "/admin/sales" },
    { name: "Order List", icon: <Package size={20} />, path: "/admin/order" },

  ];

  return (
    <div className="flex">
      {/* Mobile Hamburger Button */}
      <button
        className="lg:hidden p-4 text-pink-600 fixed top-2 left-2 z-50 bg-white rounded-lg shadow-md"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-pink-600 to-pink-400 text-white flex flex-col shadow-xl border-r border-white/20 transform transition-transform duration-300 z-40
        ${open ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/20 flex items-center justify-center">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-3">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => {
                setActive(item.path);
                setOpen(false); // auto-close on mobile
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${active === item.path
                  ? "bg-white text-pink-600 font-semibold shadow-md"
                  : "text-white/80 hover:bg-white/20 hover:text-white"
                }`}
            >
              <div
                className={`transition-all duration-300 ${active === item.path ? "text-pink-600" : "text-white"
                  }`}
              >
                {item.icon}
              </div>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/20 text-center text-xs text-white/70">
          <div className="flex items-center justify-center gap-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>System Online</span>
          </div>
        </div>
      </div>

      {/* Overlay (for mobile when sidebar is open) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 lg:hidden z-30"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </div>
  );
}
