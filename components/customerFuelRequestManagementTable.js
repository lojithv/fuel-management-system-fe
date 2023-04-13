import { Button, Container, Table, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { AdminService } from "@/services/adminServices";
import Swal from "sweetalert2";

export default function CustomerFuelRequestsManagementTable({
  onChange,
  setChange,
}) {
  const [customerFuelRequests, setCustomerFuelRequests] = useState([]);

  const columns = [
    {
      key: "id",
      label: "ID",
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
      key: "requestedFuelAmount",
      label: "Requested Fuel Amount",
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
      getAllCustomerFuelRequests(subStationAdmin._id);
    }
  }, []);

  const getAllCustomerFuelRequests = (subStaionId) => {
    AdminService.getAllFuelRequests(subStaionId)
      .then((res) => {
        setCustomerFuelRequests(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onChangeStatus = (request, status) => {
    console.log("request", request);
    AdminService.fuelRequestApproval({ status: status }, request._id).then(
      (res) => {
        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: res.data.message,
          })
            .then(() => {
              setChange(!onChange);
              const updatedRequests = customerFuelRequests.map((v) => {
                if (v._id === request._id) {
                  return { ...v, status: status };
                }
                return v;
              });
              setCustomerFuelRequests(updatedRequests);
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
          Manage Fuel Requests
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
          {columns.map((column, i) => (
            <Table.Column key={i}>{column?.label}</Table.Column>
          ))}
          <Table.Column width={"fit-content"}></Table.Column>
        </Table.Header>
        <Table.Body>
          {customerFuelRequests.map((request, ri) => (
            <Table.Row key={ri}>
              <Table.Cell>{request._id}</Table.Cell>
              <Table.Cell>{request.customerId.phone}</Table.Cell>
              <Table.Cell>{request.customerId.email}</Table.Cell>
              <Table.Cell>{request.vehicleId.vehicleNumber}</Table.Cell>
              <Table.Cell>{request.vehicleId.vehicleType}</Table.Cell>
              <Table.Cell>{request.requestedFuelAmount}</Table.Cell>
              <Table.Cell>{request.vehicleId.fuelType}</Table.Cell>
              <Table.Cell
                css={{
                  gap: "10px",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                {request.status === "Pending" && (
                  <>
                    <Button
                      css={{ width: "fit-content", alignSelf: "center" }}
                      size={"xs"}
                      onClick={() => onChangeStatus(request, "Approved")}
                    >
                      Approve
                    </Button>

                    <Button
                      css={{ width: "fit-content", alignSelf: "center" }}
                      size={"xs"}
                      onClick={() => onChangeStatus(request, "Rejected")}
                    >
                      Reject
                    </Button>
                  </>
                )}
                {request.status !== "Pending" && <>{request.status}</>}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
}
