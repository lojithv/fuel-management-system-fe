import React from "react";
import { Text, Button, Modal } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { SuperAdminService } from "@/services/superAdminService";
import Swal from "sweetalert2";
import { cachedSubstations, setCachedSubstations } from "@/store/substation-store";

export default function AddSubStationForm() {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const [stationName, setStationName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [ownerName, setOwnerName] = React.useState("");
  const [ownerMobile, setOwnerMobile] = React.useState("");
  const [ownerEmail, setOwnerEmail] = React.useState("");
  const [eligibleFuelAmount, setEligibleFuelAmount] = React.useState(0);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const addSubStation = () => {
    if (
      stationName &&
      address &&
      ownerEmail &&
      ownerMobile &&
      eligibleFuelAmount &&
      ownerName
    ) {
      const data = {
        stationName: stationName,
        address: address,
        ownerName: ownerName,
        ownerMobile: ownerMobile,
        ownerEmail: ownerEmail,
        eligibleFuelAmount: eligibleFuelAmount,
      };

      SuperAdminService.addSubStation(data)
        .then((res) => {
          console.log(res.data.data);
          setVisible(false);
          const substationsData = cachedSubstations.value
          setCachedSubstations({stations:[...substationsData.stations,res.data.data],refresh:true})
        })
        .catch((e) => {
          console.log(e);
          setVisible(false);
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Please fill all details",
      });
    }
  };

  return (
    <div>
      <Button auto onPress={handler} color="primary" light size={"sm"}>
        Add Substation
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Add Sub Station
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            label="Station name:"
            placeholder="Enter station name"
            id="stationName"
            size="lg"
            fullWidth
            value={stationName}
            onChange={(e) => setStationName(e.target.value)}
            width="80%"
            type="text"
          />

          <Input
            label="Station Address:"
            placeholder="Enter station address"
            id="stationAddress"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            size="lg"
            width="80%"
            type="text"
            fullWidth
          />

          <Input
            label="Owner name:"
            placeholder="Enter owner name"
            id="ownerName"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            size="lg"
            width="80%"
            type="text"
            fullWidth
          />

          <Input
            label="Owner email:"
            placeholder="Enter owner email"
            id="ownerEmail"
            value={ownerEmail}
            onChange={(e) => setOwnerEmail(e.target.value)}
            size="lg"
            width="80%"
            type="text"
            fullWidth
          />

          <Input
            label="Owner mobile:"
            placeholder="Enter owner mobile"
            id="mobile"
            value={ownerMobile}
            onChange={(e) => setOwnerMobile(e.target.value)}
            size="lg"
            width="80%"
            type="tel"
            fullWidth
          />

          <Input
            label="Eligible Fuel Amount:"
            width="80%"
            size="lg"
            value={eligibleFuelAmount}
            onChange={(e) => setEligibleFuelAmount(e.target.value)}
            placeholder="Enter eligible fuel amount (L)"
            id="fuelAmount"
            type="number"
            fullWidth
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto onPress={closeHandler}>
            Cancel
          </Button>
          <Button auto onPress={addSubStation}>
            ADD
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
