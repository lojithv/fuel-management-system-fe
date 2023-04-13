import { Button, Container, Table, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { AdminService } from "@/services/adminServices";
import Swal from "sweetalert2";

export default function ManageCustomersTable({ onChange, setChange }) {
  const [vehicles, setVehicles] = useState([]);

  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "customerName",
      label: "Customer Name",
    },
    {
      key: "mobileNumber",
      label: "Mobile Number",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "vehicleRegistrationNumber",
      label: "Vehicle Registration Number",
    },
    {
      key: "vehicleType",
      label: "Vehicle Type",
    },
    {
      key: "eligibleFuelAmount",
      label: "Eligible Fuel Amount",
    },
    {
      key: "fuelType",
      label: "Fuel Type",
    },
  ];
  const rows = [];

  useEffect(() => {
    const subStationAdmin = JSON.parse(localStorage.getItem("substation"));
    if (subStationAdmin) {
      getAllVehicles(subStationAdmin._id);
    }
  }, []);

  const getAllVehicles = (subStationId) => {
    AdminService.getAllCustomerVehicles(subStationId)
      .then((res) => {
        setVehicles(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onChangeStatus = (vehicle, status) => {
    AdminService.vehicleApproval({ status: status }, vehicle._id).then(
      (res) => {
        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: res.data.message,
          })
            .then(() => {
              setChange(!onChange);
              const updatedVehicles = vehicles.map((v) => {
                if (v._id === vehicle._id) {
                  return { ...v, status: status };
                }
                return v;
              });
              setVehicles(updatedVehicles);
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error occured! Please try again.",
          });
        }
      }
    );
  };

  return (
    <Container>
      <Container display="flex" justify="space-between">
        <Text h4 style={{ margin: "0" }}>
          Customer Management
        </Text>
      </Container>
      <Table
        aria-label="table"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header>
          {columns.map((column) => (
            <Table.Column key={column?.key}>{column?.label}</Table.Column>
          ))}
          <Table.Column width={"fit-content"}></Table.Column>
        </Table.Header>
        <Table.Body>
          {vehicles.map((vehicle, ri) => (
            <Table.Row key={ri}>
              <Table.Cell>{vehicle.user_id._id}</Table.Cell>
              <Table.Cell>{vehicle.user_id.username}</Table.Cell>
              <Table.Cell>{vehicle.user_id.phone}</Table.Cell>
              <Table.Cell>{vehicle.user_id.email}</Table.Cell>
              <Table.Cell>{vehicle.vehicleNumber}</Table.Cell>
              <Table.Cell>{vehicle.vehicleType}</Table.Cell>
              <Table.Cell>{vehicle.vehicleQuota}</Table.Cell>
              <Table.Cell>{vehicle.fuelType}</Table.Cell>
              <Table.Cell
                css={{
                  gap: "10px",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                {vehicle.status === "Pending" && (
                  <>
                    <Button
                      css={{ width: "fit-content", alignSelf: "center" }}
                      size={"xs"}
                      onClick={() => onChangeStatus(vehicle, "Approved")}
                    >
                      Approve
                    </Button>

                    <Button
                      css={{ width: "fit-content", alignSelf: "center" }}
                      size={"xs"}
                      onClick={() => onChangeStatus(vehicle, "Rejected")}
                    >
                      Reject
                    </Button>
                  </>
                )}
                {vehicle.status !== "Pending" && (
                  <>
                    {vehicle.status == "Approved" && "Approved"}
                    {vehicle.status == "Rejected" && "Rejected"}
                  </>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
}
