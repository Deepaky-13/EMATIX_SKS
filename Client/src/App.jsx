import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import AdminOutlet from "./pages/Admin/AdminOutlet";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProductList from "./pages/Admin/ProductList";
import AddProduct from "./pages/Admin/AddProduct";
import SalesList from "./pages/Admin/SalesList";
import OrderList from "./pages/Admin/OrderList";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "admin",
        element: <AdminOutlet />,
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: "products", 
            element: <ProductList />,
          },
          {
            path: "add-product", 
            element: <AddProduct />,
          },
          {
            path: "add-product/:id", 
            element: <AddProduct />,
          },
           {
            path: "sales", 
            element: <SalesList />,
          },
           {
            path: "order", 
            element: <OrderList />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
