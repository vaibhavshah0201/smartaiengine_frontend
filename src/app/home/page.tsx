"use client";
import Dashboard from "@/components/Dashboard/Dashboard";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { getServerSession } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const { user, token }: any = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log(token, "token3");

    if (!token) {
      router.push("/"); // Redirect to login if not authenticated
    }
  }, [router, token]);
  return (
    <>
      <ProtectedRoute>
        <DefaultLayout>
          <Dashboard />
        </DefaultLayout>
      </ProtectedRoute>
    </>
  );
};

export default Home;
