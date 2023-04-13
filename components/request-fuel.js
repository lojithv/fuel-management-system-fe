import React from "react";
import {
  Button,
  Modal,
  Text,
  Input,
  Row,
  Checkbox,
  Radio,
} from "@nextui-org/react";
import { AdminService } from "@/services/adminServices";
import Swal from "sweetalert2";

function RequestFuel() {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const [fuelAmount, setFuelAmount] = React.useState(0);
  const [fuelType, setFuelType] = React.useState("Diesel");

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const requestFuel = () => {
    console.log("fuelType", fuelType);
    console.log("fuelAmount", fuelAmount);
    if (fuelType && fuelAmount) {
      const data = {
        dieselAmount: fuelType == "Diesel" ? fuelAmount : 0,
        petrolAmount: fuelType == "Petrol" ? fuelAmount : 0,
      };

      const substationData = localStorage.getItem("substation");
      const substation = JSON.parse(substationData);

      AdminService.requestFuel(data, substation._id)
        .then((res) => {
          console.log(res.data);
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
    <div style={{ margin: "20px" }}>
      <Button auto onPress={handler} color="primary" size={"sm"}>
        Request Fuel
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Request Fuel
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Radio.Group
            orientation="horizontal"
            label="Select Fuel Type"
            defaultValue={fuelType}
            onChange={(e) => setFuelType(e)}
          >
            <Radio value="Diesel">Diesel</Radio>
            <Radio value="Petrol">Petrol</Radio>
          </Radio.Group>
          <Input
            clearable
            bordered
            fullWidth
            value={fuelAmount}
            onChange={(e) => setFuelAmount(e.target.value)}
            color="primary"
            size="lg"
            placeholder="Amount"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto onPress={requestFuel}>
            SEND
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RequestFuel;
