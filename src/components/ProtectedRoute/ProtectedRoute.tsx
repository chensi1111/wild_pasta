import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const userInfo = localStorage.getItem("userInfo");
  if (!userInfo) {
    const redirectPath = encodeURIComponent(
      location.pathname + location.search
    );
    return (
      <Navigate
        to={{
          pathname: "/login",
          search: `?redirect=${redirectPath}`,
        }}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
