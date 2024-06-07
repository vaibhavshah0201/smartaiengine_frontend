"use client";
import Dashboard from "@/components/Dashboard/Dashboard";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { getServerSession } from "next-auth";
import { useEffect } from "react";

const Home = () => {
  const { user }: any = useAuth();
  console.log('home called',user?.id);

  return (
    <>
    <AuthProvider>
      <ProtectedRoute>
        <DefaultLayout>
          <Dashboard />
        </DefaultLayout>
      </ProtectedRoute>
      </AuthProvider>
    </>
  );
};

export default Home;
