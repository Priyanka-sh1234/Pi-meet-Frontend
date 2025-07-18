import React from "react";
import { Navigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { secretKeyAtom, roleAtom } from "../../store/atoms";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = useAtomValue(secretKeyAtom);
  const role = useAtomValue(roleAtom);

  if (!token) return <Navigate to="/" />;
  if (allowedRoles && !allowedRoles.includes(role))
    return <Navigate to="/unauthorized" />;

  return children;
}
