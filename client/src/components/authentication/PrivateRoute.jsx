import useAuthStore from "../../store/auth/authStore";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import DefaultLayout from "../../layouts/DefaultLayout";

function PrivateRoute({ children }) {
  const { token } = useAuthStore();
  const location = useLocation();

  if (!token) {
    // Preserve where the user wanted to go
    return <Navigate to="/uyelik-islemleri" state={{ from: location }} replace />;
  }

  return (
    <DefaultLayout>
      {children}
    </DefaultLayout>
  );
}

export default PrivateRoute;
