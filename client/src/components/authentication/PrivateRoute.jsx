import { useEffect } from "react";
import useAuthStore from "../../store/auth/authStore";
import { useLocation, useNavigate } from "react-router";
import DefaultLayout from "../../layouts/DefaultLayout";
import AuthPage from "../../pages/auth/AuthPage";

function PrivateRoute({ component: Component, ...rest }) {
  const { token } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/uyelik-islemleri" && token) {
      navigate("/");
    }
  }, [location, token, navigate]);

  return (
    <DefaultLayout>
      {token ? <Component {...rest} /> : <AuthPage />}
    </DefaultLayout>
  );
}

export default PrivateRoute;
