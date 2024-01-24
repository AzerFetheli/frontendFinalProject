import React, { useContext, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import MainLayouts from "./Layouts/Website/Main/MainLayouts";
import Home from "./Layouts/Website/Main/pages/Home/Home";
import Shop from "./Layouts/Website/Main/pages/Shop/Shop";
import ViewCart from "./Layouts/Website/Main/pages/Viewcart/ViewCart";
import CheckOut from "./Layouts/Website/Main/pages/CehckOut/CheckOut";
import Details from "./Layouts/Website/Main/pages/Details/Details";
import MainDashboard from "./Layouts/Dashboard/MainLayout/MainDashboard";
import DashboardHome from "./Layouts/Dashboard/MainLayout/pages/DashboardHome/DashboardHome";
import Orders from "./Layouts/Dashboard/MainLayout/pages/Orders/Orders";
import OurStaf from "./Layouts/Dashboard/MainLayout/pages/OurStaff/OurStaf";

import Brends from "./Layouts/Dashboard/MainLayout/pages/Catalog/Brends";
import Login from "./Layouts/Dashboard/Auth/pages/Login/Login";
import AuthRoute from "./helpers/AuthRoute";
import { userContext } from "./context/AuthContext";
import { ProfileCall } from "./Services/Auth";
import ProtectRoute from "./helpers/ProtectRoute";
import Products from "./Layouts/Dashboard/MainLayout/pages/Catalog/products/Products";
import AuthLayouts from "./Layouts/Website/Auth/AuthLayouts";
import SiteRegister from "./Layouts/Website/Auth/pages/SiteRegister";
import SiteLogin from "./Layouts/Website/Auth/pages/SiteLogin";
import AuthSiteRoute from "./helpers/AuthSiteRoute";
import SuperAdminRoute from "./helpers/SuperAdminRoute";
import Card from "./Layouts/Website/Main/pages/Home/components/SectionThree/components/Card";
import Search from "./Layouts/Website/Main/pages/Search/Search";
import OrderDetails from "./Layouts/Dashboard/MainLayout/pages/Orders/OrderDetails";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/home",
        element: <Home />,
      },

      {
        path: "/home/:_id",
        element: <Details />,
      },

      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "ViewCart",
        element: <ViewCart />,
      },
      {
        path: "checkout",
        element: (
          <AuthSiteRoute>
            <CheckOut />
          </AuthSiteRoute>
        ),
      },
      {
        path: "Details",
        element: <Details />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayouts />,
    children: [
      {
        path: "sitelogin",
        element: <SiteLogin />,
      },
      {
        path: "siteregister",
        element: <SiteRegister />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <AuthRoute>
        <ProtectRoute>
          <MainDashboard />
        </ProtectRoute>
      </AuthRoute>
    ),
    children: [
      {
        path: "",
        element: <DashboardHome />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "orders/orders/:_id",
        element: <OrderDetails />,
      },
      {
        path: "ourstaf",
        element: (
          <SuperAdminRoute>
            <OurStaf />
          </SuperAdminRoute>
        ),
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "brends",
        element: <Brends />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);

export const MainRouter = () => {
  const { setUser, user } = useContext(userContext);

  useEffect(() => {
    if (!user) {
      ProfileCall()
        .then(({ data }) => {
          setUser(data.data.user);
        })
        .catch(() => {
          setUser(false);
        });
    }
  }, []);

  return <RouterProvider router={router} />;
};
