import { Navigate } from "react-router-dom";

function PrivateRoute({ component: Component, token }) {
  return (
    token ? <Component /> : <Navigate to="/" />
  );
}export default PrivateRoute;