import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import LandingPage from "./pages/LandingPage";
import AuthCallBackPage from "./auth/AuthCallBackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import ManageRestaurantFormPage from "./pages/ManageRestaurantFormPage";
import StorePage from "./pages/StorePage";
import { AccountProvider } from "./context/AccountProvider";
import ManageMenuFormPage from "./pages/ManageMenuFormPage";
import ManageMenuItemPage from "./pages/ManageMenuItemPage";

const AppRoutes = () => {
  return (
    <AccountProvider>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <LandingPage />
            </Layout>
          }
        />
        <Route path="/auth-callback" element={<AuthCallBackPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route
            path="/user-profile"
            element={
              <Layout>
                <UserProfilePage />
              </Layout>
            }
          />
          <Route
            path="/restaurant/*"
            element={
              <Layout>
                <StorePage />
              </Layout>
            }
          />

          {/* admin account */}
          <Route
            path="/manage-restaurant"
            element={
              <Layout>
                <ManageRestaurantFormPage />
              </Layout>
            }
          />
          <Route
            path="/add-menu/:restaurantId"
            element={
              <Layout>
                <ManageMenuFormPage />
              </Layout>
            }
          />
          <Route
            path="/menu-item/:menuId"
            element={
              <Layout>
                <ManageMenuItemPage />
              </Layout>
            }
          />
        </Route>

        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </AccountProvider>
  );
};

export default AppRoutes;
