import React from "react";
import { Text, Button, Modal } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { SuperAdminService } from "@/services/superAdminService";

export default function EditSubStationForm({
  substation,
  handleSubstationUpdate,
}) {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  const [stationName, setStationName] = React.useState(substation.stationName);
  const [address, setAddress] = React.useState(substation.address);
  const [ownerName, setOwnerName] = React.useState(substation.ownerName);
  const [ownerMobile, setOwnerMobile] = React.useState(substation.ownerMobile);
  const [ownerEmail, setOwnerEmail] = React.useState(substation.ownerEmail);
  const [eligibleFuelAmount, setEligibleFuelAmount] = React.useState(
    substation.eligibleFuelAmount
  );

  const updateSubStation = () => {
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

      SuperAdminService.updateSubStation(substation._id, data)
        .then((res) => {
          handleSubstationUpdate(res.data.data);
          setVisible(false);
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
      <Button auto onPress={handler} color="primary" size={"sm"}>
        Edit Substation
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Edit Sub Station
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
            placeholder="Enter eligible fuel amount"
            id="fuelAmount"
            type="number"
            fullWidth
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto onPress={closeHandler}>
            Cancel
          </Button>
          <Button auto onPress={updateSubStation}>
            EDIT
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
