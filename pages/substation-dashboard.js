import AddFuel from "@/components/add-fuel";
import Navbar from "@/components/app-bar";
import CustomerFuelRequestsManagementTable from "@/components/customerFuelRequestManagementTable";
import FuelQuotaChart from "@/components/fuelQuotaChart";
import ManageCustomersTable from "@/components/manageCustomersTable";
import ManageTokensTable from "@/components/manageTokensTable";
import { Spacer } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function SubStationDashboard() {
  const router = useRouter();

  const [onChange, setChange] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;
    if (user && user.userType !== "Admin") {
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
  }, [])

  return (
    <div>
      <Navbar />
      <Spacer y={2} />
      <FuelQuotaChart />
      <div style={{ display: "flex" }}>
      </div>

      <ManageTokensTable onChange={onChange} setChange={setChange} />
      <Spacer y={1} />
      <ManageCustomersTable onChange={onChange} setChange={setChange} />
      <Spacer y={1} />
      <CustomerFuelRequestsManagementTable
        onChange={onChange}
        setChange={setChange}
      />
      <Spacer y={2} />
    </div>
  );
}

export default SubStationDashboard;
