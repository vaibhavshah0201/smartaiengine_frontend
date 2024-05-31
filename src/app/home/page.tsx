"use client";
import Dashboard from "@/components/Dashboard/Dashboard";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { getServerSession } from "next-auth";
import { useEffect } from "react";

const Home = () => {
  const { user }: any = useAuth();
  console.log(user?.id);

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
