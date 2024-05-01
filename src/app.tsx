import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthStorageService } from "./common/storages/authStorage.service";
import { LogoText } from "./assets/icons";

export default function Root() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const checkAuthentication = () => {
      const isAuthenticated = AuthStorageService.checkAuthentication();

      const currentRoute = location.pathname;
      if (!isAuthenticated && currentRoute !== "/login") {
        navigate("/login");
      } else if (isAuthenticated && currentRoute === "/") {
        navigate("/dashboard");
      }
    };
    checkAuthentication();
  }, []);
  return (
    <div className="flex items-center justify-center">
      <img src={LogoText} alt="logo" />
    </div>
  );
}
