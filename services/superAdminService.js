import instance from "../config/api";

export class SuperAdminService {
  static getAllSubStations = () => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token.replace(/['"]+/g, "")}` };
    return instance.get("/get_sub_stations", { headers: headers });
  };

  static addSubStation(data) {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token.replace(/['"]+/g, "")}` };

    return instance.post("/add_sub_station", data, { headers: headers });
  }

  static updateSubStation(id,data) {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token.replace(/['"]+/g, "")}` };

    return instance.post("/update_sub_station/"+id, data, { headers: headers });
  }

  static updateSubStationFuelRequestStatus(requestId,data) {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token.replace(/['"]+/g, "")}` };

    return instance.post("/update_substation_fuel_request_status/"+requestId, data, { headers: headers });
  }

  static getFuelRequests(){
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token.replace(/['"]+/g, "")}` };
    return instance.get("/get_fuel_requests", { headers: headers });
  }

  static getFuelAmount(){
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token.replace(/['"]+/g, "")}` };
    return instance.get("/get_fuel_amount", { headers: headers });
  }

  static getChartDetails(){
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token.replace(/['"]+/g, "")}` };
    return instance.get("/get_fuel_quota_chart_main", { headers: headers });
  }

  static addFuel(data) {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token.replace(/['"]+/g, "")}` };

    return instance.post(`/add_fuel`, data, { headers: headers });
  }
}
