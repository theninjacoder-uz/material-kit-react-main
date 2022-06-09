import {Navigate, Route, Routes, useRoutes} from 'react-router-dom';
// layouts
import Cookies from "js-cookie";
import User from './pages/User';
import NotFound from './pages/Page404';
import Auth from "./auth/Auth";
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
import Logout from "./auth/Logout";


// ----------------------------------------------------------------------

export default function Router() {

  const isAuthenticated = () => {
    const jwtToken = Cookies.get("jwtToken");
    return jwtToken && jwtToken.startsWith("Bearer");
  }

    return useRoutes([
      {
        path: '/dashboard',
        element: isAuthenticated() ? <DashboardLayout /> : <Auth/>,
        children: [
          { path: '/dashboard/user', element: <User/> },
        ],
      },
      {
        path: '/',
        element: <LogoOnlyLayout />,
        children: [
          {path: '/', element: <Navigate to={isAuthenticated() ? "/dashboard/user" : "/login" }/>},
          { path: 'login', element: <Auth /> },
          { path: 'logout', element: <Logout /> },
          { path: '404', element: <NotFound /> },
          { path: '*', element: <Navigate to="/404" /> },
        ],
      },
      { path: '*', element: <Navigate to="/404" replace /> },
    ]);
}
