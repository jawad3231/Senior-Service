import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ element }) => {
  const { token } = useContext(AuthContext);
  const location = useLocation();

  const publicRoutes = [
    "/login",
    "/signup",
    "/service-type",
    "/availability",
    "/rate",
    "/qualification",
    "/language",
    "/availableDays",
    "/description",
    "/location",
    "/personal-details",
    "/membership-type",
    "/other-details",
    "/photo-upload"
  ];

  if (!token && !publicRoutes.includes(location.pathname)) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default PrivateRoute;
