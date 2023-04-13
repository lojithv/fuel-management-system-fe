import { CChart } from "@coreui/react-chartjs";
import { Container } from "@nextui-org/react";
import React from "react";
import { useEffect, useState } from "react";
import { AdminService } from "@/services/adminServices";

function FuelQuotaChart() {
  const [issuedDieselAmount, setIssuedDieselAmount] = useState(0);
  const [issuedPetrolAmount, setIssuedPetrolAmount] = useState(0);
  const [
    customerFuelPendingDiesealRequests,
    setCustomerFuelPendingDiesealRequests,
  ] = useState(0);
  const [
    customerFuelPendingPetrolRequests,
    setCustomerFuelPendingPetrolRequests,
  ] = useState(0);
  const [
    customerFuelIssuedDiesealRequests,
    setCustomerFuelIssuedDiesealRequests,
  ] = useState(0);
  const [
    customerFuelIssuedPetrolRequests,
    setCustomerFuelIssuedPetrolRequests,
  ] = useState(0);

  useEffect(() => {
    const subStationAdmin = JSON.parse(localStorage.getItem("substation"));
    if (subStationAdmin) {
      getFuelRequestCharts(subStationAdmin._id);
    }
  }, []);

  const getFuelRequestCharts = async (subStationId) => {
    await AdminService.getFuelRequestCharts(subStationId)
      .then(async (res) => {
        if (res.data.success) {
          console.log('LLLL', res.data.data)
          if (res.data.data.issuedFuelAmount.issuedDieselAmount) {
            setIssuedDieselAmount(
              res.data.data.issuedFuelAmount.issuedDieselAmount
            );
          }
          if (res.data.data.issuedFuelAmount.issuedPetrolAmount) {
            setIssuedPetrolAmount(
              res.data.data.issuedFuelAmount.issuedPetrolAmount
            );
          }
          if (res.data.data.customerFuelReq.customerPendingDieselAmount) {
            setCustomerFuelPendingDiesealRequests(
              res.data.data.customerFuelReq.customerPendingDieselAmount
            );
          }
          if (res.data.data.customerFuelReq.customerPendingPetrolAmount) {
            setCustomerFuelPendingPetrolRequests(
              res.data.data.customerFuelReq.customerPendingPetrolAmount
            );
          }
          if (res.data.data.customerFuelReq.customerIssuedPetrolAmount) {
            setCustomerFuelIssuedPetrolRequests(
              res.data.data.customerFuelReq.customerIssuedPetrolAmount
            );
          }
          if (res.data.data.customerFuelReq.customerIssuedDieselAmount) {
            setCustomerFuelIssuedDiesealRequests(
              res.data.data.customerFuelReq.customerIssuedDieselAmount
            );
          }
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
          labels: ["Petrol", "Diesal"],
          datasets: [
            {
              label: "Current Fuel Amount",
              backgroundColor: "#81B9E8",
              data: [issuedPetrolAmount, issuedDieselAmount],
            },
            {
              label: "Requested Fuel Amount",
              backgroundColor: "#5F5F62",
              data: [
                customerFuelPendingPetrolRequests,
                customerFuelPendingDiesealRequests,
              ],
            },
            {
              label: "Issued Fuel Ammount",
              backgroundColor: "#5F5FD8",
              data: [
                customerFuelIssuedPetrolRequests,
                customerFuelIssuedDiesealRequests,
              ],
            },
          ],
        }}
        options={{
          scales: {
            y: {
              title: {
                display: true,
                text: "Amount (L)",
              },
            },
          },
        }}
        labels="months"
      />
    </Container>
  );
}

export default FuelQuotaChart;
