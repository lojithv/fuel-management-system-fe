import React, { useEffect } from "react";
import { Spacer } from "@nextui-org/react";
import Navbar from "@/components/app-bar";
import ManageFuelRequestsTable from "@/components/manageFuelRequestsTable";
import ManageSubStations from "@/components/subStationManageTable";
import AddFuel from "@/components/add-fuel";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import FuelQuotaChartSuperAdmin from "@/components/fuelQuotaChartSuperAdmin";

function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;
    if (user && user.userType !== "Super_Admin") {
      localStorage.removeItem("user");
      router.push("/login");
      Swal.fire({
        title: "Error!",
        text: "Access Denied",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else if (!user) {
      router.push("/login");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Spacer y={2} />
      <FuelQuotaChartSuperAdmin />
      <ManageFuelRequestsTable />
      <Spacer y={1} />
      <ManageSubStations />
      <Spacer y={2} />
    </div>
  );
}

export default Dashboard;
