import { useEffect } from "react";
import useAuthStore from "../../store/auth/authStore";
import { useLocation, useNavigate } from "react-router";
import DefaultLayout from "../../layouts/DefaultLayout";
import AuthPage from "../../pages/auth/AuthPage";

function PrivateRoute({ component: Component, ...rest }) {
  const { userData } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/uyelik-islemleri" && userData) {
      navigate("/");
    }
  }, [location, userData, navigate]);

  if (location.pathname === "/uyelik-islemleri" && userData) {
    navigate("/");
    return null;
  }
  return (
    <DefaultLayout>
      {userData ? <Component {...rest} /> : <AuthPage />}
    </DefaultLayout>
  );
}

export default PrivateRoute;
