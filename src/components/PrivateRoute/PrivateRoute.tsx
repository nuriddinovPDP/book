// src/components/PrivateRoute/PrivateRoute.tsx

import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface PrivateRouteProps {
  auth: boolean;
  children: ReactNode;
}

export const PrivateRoute = ({ auth, children }: PrivateRouteProps) => {
  return auth ? <>{children}</> : <Navigate to="/signin" />;
};
