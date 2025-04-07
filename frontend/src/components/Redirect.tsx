import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Redirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.history.length > 2) {
        navigate(-1);
      } else {
        navigate("/sequence", { replace: true });
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return <></>;
}
