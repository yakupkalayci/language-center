import useAuthStore from "../../store/auth/authStore";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import DefaultLayout from "../../layouts/DefaultLayout";

function PrivateRoute({ children }) {
  const { userData } = useAuthStore();
  const location = useLocation();

  if (!userData || !userData.email) {
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
