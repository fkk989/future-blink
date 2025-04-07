import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export default function AuthenticatedRoute({ children }: Props) {
  //

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem("user-token");

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    setIsAuthenticated(true);
  }, []);
  //
  useEffect(() => {
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <> </>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
