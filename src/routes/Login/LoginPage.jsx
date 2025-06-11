import { useLocation } from "react-router-dom";
import LoginModal from "../../components/Login/LoginModal";

export default function LoginPage() {
  const location = useLocation();

  return (
    <LoginModal key={location.key} onClose={() => window.history.back()} />
  );
}
