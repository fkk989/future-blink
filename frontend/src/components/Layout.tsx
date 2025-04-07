import AuthenticatedRoute from "./AuthenticatedRoute";
import Navbar from "./Navbar";
import React from "react";
export const Layout: React.FC<{
  children: React.ReactNode;
  isAuthenticatedRoute?: boolean;
}> = ({ children, isAuthenticatedRoute }) => {
  if (isAuthenticatedRoute) {
    return (
      <AuthenticatedRoute>
        <div>
          <Navbar />
          <div>{children}</div>
        </div>
      </AuthenticatedRoute>
    );
  }
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};
