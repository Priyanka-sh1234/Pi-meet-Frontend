// Dashboard.jsx
import React from "react";
import { useAtomValue } from "jotai";
import { roleAtom } from "../store/atoms";
import AdminDashboard from "../components/Admin/AdminDashboard";
import TrainerDashboard from "../components/Trainer/TrainerDashboard";

const Dashboard = () => {
  const role = useAtomValue(roleAtom)?.toLowerCase(); // already lowercase

  if (role === "admin") return <AdminDashboard />;
  if (role === "trainer") return <TrainerDashboard />;

  return <div>Invalid role. Please login again.</div>;
};

export default Dashboard;
