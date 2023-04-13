import { SuperAdminService } from "@/services/superAdminService";
import { Button, Container, Table, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function ManageFuelRequestsTable({ onChange }) {
  const columns = [
    {
      key: "subStationId",
      label: "ID",
    },
    {
      key: "stationName",
      label: "Station Name",
    },
    {
      key: "dieselAmount",
      label: "Diesel Amount",
    },
    {
      key: "petrolAmount",
      label: "Petrol Amount",
    },
    {
      key: "requestedDate",
      label: "Requested Date",
    },
    {
      key: "expectedDate",
      label: "Expected Date",
    },
  ];
  const rows = [];

  const [fuelRequests, setFuelRequests] = useState([]);

  useEffect(() => {
    SuperAdminService.getFuelRequests().then((res) => {
      console.log(res.data.data);
      setFuelRequests(res.data.data);
    });
  }, [onChange]);

  const handleFuelRequestStatusChange = (request, status) => {
    SuperAdminService.updateSubStationFuelRequestStatus(request._id, {
      status: status,
    })
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          icon: "success",
          title: res.message,
        }).then(() => {
          const updatedRequests = fuelRequests.map((r) => {
            if (r._id === request._id) {
              return { ...r, status: status };
            }
            return r;
          });
          setFuelRequests(updatedRequests);
        });
      })
      .catch((e) => {
        console.log(e);
        Swal.fire({
          icon: "error",
          title: e,
        });
      });
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
          {fuelRequests.map((request, ri) => (
            <Table.Row key={ri}>
              <Table.Cell>{request.subStationId}</Table.Cell>
              <Table.Cell>{request.stationName}</Table.Cell>
              <Table.Cell>{request.dieselAmount}</Table.Cell>
              <Table.Cell>{request.petrolAmount}</Table.Cell>
              <Table.Cell>
                {request.requestedDate
                  .toString()
                  .split(".")[0]
                  .replace("T", " ")}
              </Table.Cell>
              <Table.Cell>
                {request.expectedDate
                  .toString()
                  .split(".")[0]
                  .replace("T", " ")}
              </Table.Cell>

              <Table.Cell
                css={{
                  gap: "10px",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
                key={ri + "btn"}
              >
                {request.status === "Pending" && (
                  <>
                    <Button
                      css={{ width: "fit-content", alignSelf: "center" }}
                      size={"xs"}
                      onClick={() =>
                        handleFuelRequestStatusChange(request, "Approved")
                      }
                    >
                      Approve
                    </Button>

                    <Button
                      css={{ width: "fit-content", alignSelf: "center" }}
                      size={"xs"}
                      onClick={() =>
                        handleFuelRequestStatusChange(request, "Rejected")
                      }
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
