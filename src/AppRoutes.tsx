import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import AuthCallBackPage from "./auth/AuthCallBackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import ManageRestaurantFormPage from "./pages/ManageRestaurantFormPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero={true}>
            <HomePage />
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
          path="/manage-restaurant"
          element={
            <Layout>
              <ManageRestaurantFormPage />
            </Layout>
          }
        />
      </Route>

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
