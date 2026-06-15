import useAuthStore from "../../store/auth/authStore";
import { useLocation, Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { userData } = useAuthStore();
  const location = useLocation();

  if (!userData || !userData.email) {
    // Preserve where the user wanted to go
    return <Navigate to="/uyelik-islemleri" state={{ from: location }} replace />;
  }
  return (
    <>
      {children}
    </>
  );
}

export default PrivateRoute;
