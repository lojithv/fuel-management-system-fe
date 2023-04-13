import { SuperAdminService } from "@/services/superAdminService";
import { useEffect, useState } from "react";
import AddSubStationForm from "./add-sub-station";
import EditSubStationForm from "./edit-sub-station";
import { Button, Container, Table, Text } from "@nextui-org/react";
import { cachedSubstations, setCachedSubstations } from "@/store/substation-store";

function ManageSubStations() {
  const [subStations, setSubStations] = useState([]);

  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "stationName",
      label: "Station Name",
    },
    {
      key: "address",
      label: "Address",
    },
    {
      key: "ownerName",
      label: "Owner name",
    },
    {
      key: "ownerMobile",
      label: "Owner Mobile",
    },
    {
      key: "ownerEmail",
      label: "Owner Email",
    },
    {
      key: "eligibleFuelAmount",
      label: "Eligible fuel amount (L)",
    },
  ];
  const rows = [
    {
      id: "Tony Reichert",
      stationName: "CEO",
      address: "Active",
      ownerName: "Tony Reichert",
      ownerMobile: "CEO",
      ownerEmail: "Active",
      eligibleFuelAmount: "20",
    },
  ];

  useEffect(() => {
    getSubStations();
    cachedSubstations.subscribe((data)=>{
      console.log(data)
      if(data?.refresh)
      setSubStations(data.stations)
    })
  }, []);

  const getSubStations = () => {
    SuperAdminService.getAllSubStations()
      .then((res) => {
        console.log(res.data);
        setSubStations(res.data.data);
        setCachedSubstations({stations:res.data.data,refresh:false})
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSubstationUpdate = (updatedSubstation) => {
    const updatedSubstations = subStations.map((s) => {
      if (s._id === updatedSubstation._id) {
        return updatedSubstation;
      }
      return s;
    });
    setSubStations(updatedSubstations);
    setCachedSubstations({stations:updatedSubstations,refresh:false})
  };

  return (
    <Container>
      <Container display="flex" justify="space-between">
        <Text h4 style={{ margin: "0" }}>
          Sub-station management
        </Text>
        <AddSubStationForm />
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
          {subStations.map((item, ri) => (
            <Table.Row key={ri}>
              <Table.Cell>{item._id}</Table.Cell>
              <Table.Cell>{item.stationName}</Table.Cell>
              <Table.Cell>{item.address}</Table.Cell>
              <Table.Cell>{item.ownerName}</Table.Cell>
              <Table.Cell>{item.ownerMobile}</Table.Cell>
              <Table.Cell>{item.ownerEmail}</Table.Cell>
              <Table.Cell>{item.eligibleFuelAmount}</Table.Cell>

              <Table.Cell
                css={{
                  gap: "10px",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <EditSubStationForm
                  substation={item}
                  handleSubstationUpdate={handleSubstationUpdate}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
}

export default ManageSubStations;
