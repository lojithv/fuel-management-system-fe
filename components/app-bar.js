import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { Text } from "@nextui-org/react";
import AddFuel from "./add-fuel";
import RequestFuel from "./request-fuel";
import {
  getSubStationCache,
  getUserCache,
  setSubStationCache,
  setTokenCache,
  setUserCache,
} from "../store/auth-store";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("substation");
    setSubStationCache("");
    setUserCache("");
    setTokenCache("");
    router.push("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#3B5364" }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Text style={{ color: "white" }}>
              {getSubStationCache()?.stationName}
            </Text>
          </Box>
          <AddFuel />
          {getUserCache()?.userType === "Admin" ? <RequestFuel /> : null}
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
