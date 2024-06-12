"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }: any) => {
  const { user, token }: any = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log(token, "token");

    if (!token) {
      router.push("/"); // Redirect to login if not authenticated
    }
  }, [router, token]);

  if (!token) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
