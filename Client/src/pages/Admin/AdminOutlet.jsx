// import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";

// export default function AdminOutlet() {
//   return (
//     <div className="h-screen flex">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// * creating the First component

import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const HomeLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar (responsive with hamburger) */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 min-h-screen bg-gray-50 p-4 lg:ml-64 transition-all duration-300">
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
