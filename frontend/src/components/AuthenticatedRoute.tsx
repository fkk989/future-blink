import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export default function AuthenticatedRoute({ children }: Props) {
  //

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("user-token");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    try {
      const data = (
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).data;
      if (data.success) {
        setIsAuthenticated(true);
        return;
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  }, []);
  //
  useEffect(() => {
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <> </>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
}
