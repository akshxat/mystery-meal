"use client";
import { Metadata } from "next";
import StatsCards from "@/components/StatsCards";
import SalesChart from "@/components/SalesChart";
import WorldMap from "@/components/WorldMap";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

// export const metadata: Metadata = {
//   title: "Admin Dashboard | Mystery Meals",
//   description: "Overview of Mystery Meals app usage and analytics.",
// };

const DashboardPage = () => {
  const { data: session } = useSession();
  //console.log("🚀 ~ DashboardPage ~ session:", session)

  if (session === undefined || session['user']['isAdmin'] === false) {
    return redirect("/");
  }
  return (
    <>
      <StatsCards />
      <SalesChart />
      <WorldMap />
    </>
  );
};

export default DashboardPage;
