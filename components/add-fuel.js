import React from "react";
import {
  Button,
  Modal,
  Text,
  Input,
  Radio,
} from "@nextui-org/react";
import Swal from "sweetalert2";
import { AdminService } from "@/services/adminServices";
import { SuperAdminService } from "@/services/superAdminService";

function AddFuel() {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const [fuelAmount, setFuelAmount] = React.useState(0);
  const [fuelType, setFuelType] = React.useState("Diesel");

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const addFuel = () => {
    console.log("fuelType", fuelType);
    console.log("fuelAmount", fuelAmount);
    const subStationAdmin = JSON.parse(localStorage.getItem("substation"));
    const user = JSON.parse(localStorage.getItem("user"));


    if (fuelType && fuelAmount) {
      const data = {
        dieselAmount: fuelType == "Diesel" ? fuelAmount : 0,
        petrolAmount: fuelType == "Petrol" ? fuelAmount : 0,
      };
      if (user == "super_admin") { // Check this
        SuperAdminService.addFuel(data)
        .then((res) => {
          console.log(res.data.data);
          
        })
        .catch((e) => {
          console.log(e);
          setVisible(false);
        });
      } else if (user == "admin") {
        AdminService.addFuel(data, subStationAdmin._id)
        .then((res) => {
          console.log(res.data.data);
          
        })
        .catch((e) => {
          console.log(e);
          setVisible(false);
        });
      }
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
        Add Fuel
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Add Fuel to Store
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
          <Button auto onPress={addFuel}>
            ADD
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddFuel;
