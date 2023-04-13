import { SuperAdminService } from "@/services/superAdminService";
import { CChart } from "@coreui/react-chartjs";
import { Container } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

function FuelQuotaChartSuperAdmin() {
  const [issuedDieselAmount, setIssuedDieselAmount] = useState(5000);
  const [issuedPetrolAmount, setIssuedIssuedPetrolAmount] = useState(8000);
  const [availableDiesalAmount, setAvailableDiesalAmount] = useState(0);
  const [availablePetrolAmount, setAvailablePetrolAmount] = useState(0);
  const [requestedDiesalAmount, setRequestedDiesalAmount] = useState(0);
  const [requestedPetrolAmount, setRequestedPetrolAmount] = useState(0);

  useEffect(() => {
    getFuelRequestCharts();
  }, []);

  const getFuelRequestCharts = async () => {
    await SuperAdminService.getChartDetails()
      .then(async (res) => {
        if (res.data.success) {
          setAvailableDiesalAmount(res.data.data.totalAvailaleDiesalAmount);
          setAvailablePetrolAmount(res.data.data.totalAvailalePetrolAmount);
          setRequestedDiesalAmount(res.data.data.totalRequestedDiesalAmount);
          setRequestedPetrolAmount(res.data.data.totalRequestedPetrolAmount);
          setIssuedDieselAmount(res.data.data.totalIssuedDiesalAmount);
          setIssuedIssuedPetrolAmount(res.data.data.totalIssuedPetrolAmount);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container sm>
      <CChart
        type="bar"
        data={{
          labels: ["Diesal", "Petrol"],
          datasets: [
            {
              label: "Available Fuel Amount",
              backgroundColor: "#81B9E8",
              data: [availableDiesalAmount, availablePetrolAmount],
            },
            {
              label: "Total Requested Fuel Amount",
              backgroundColor: "#5F5F62",
              data: [requestedDiesalAmount, requestedPetrolAmount],
            },
            {
              label: "Total Issued Fuel Amount",
              backgroundColor: "#5F5FD8",
              data: [issuedDieselAmount, issuedPetrolAmount],
            },
          ],
        }}
        options={{
          scales: {
            y: {
              title: {
                display: true,
                text: "Amount",
              },
            },
          },
        }}
        labels="months"
      />
    </Container>
  );
}

export default FuelQuotaChartSuperAdmin;
