import instance from "../config/api";

export class AdminService {
  static getAllCustomerVehicles = (subStaionId) => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token.replace(/['"]+/g, "")}` };
    return instance.get(`/get_vehicles/${subStaionId}`, { headers: headers });
  };

  static getAllTokens = () => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token.replace(/['"]+/g, "")}` };
    return instance.get("/get_tokens/''/''", { headers: headers });
  };

  static getAllFuelRequests = (subStaionId) => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token.replace(/['"]+/g, "")}` };
    return instance.get(`/get_fuel_requests/''/''/${subStaionId}`, { headers: headers });
  };

  static getFuelRequestCharts = (subStaionId) => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token.replace(/['"]+/g, "")}` };
    return instance.get(`/get_fuel_quota_chart_data/${subStaionId}`, { headers: headers });
  };


  static vehicleApproval(data, vehicleId) {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token.replace(/['"]+/g, "")}` };

    return instance.post(`/vehicle_approval/${vehicleId}`, data, { headers: headers });
  }

  static fuelRequestApproval(data, requestId) {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token.replace(/['"]+/g, "")}` };

    return instance.post(`/update_fuel_request_status/${requestId}`, data, { headers: headers });
  }

  static tokenIssued(data, tokenId) {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token.replace(/['"]+/g, "")}` };

    return instance.post(`/update_token_status/${tokenId}`, data, { headers: headers });
  }

  static addFuel(data, subStationId) {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token.replace(/['"]+/g, "")}` };

    return instance.post(`/add_fuel/${subStationId}`, data, { headers: headers });
  }

  static requestFuel(data, subStationId) {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token.replace(/['"]+/g, "")}` };

    return instance.post(`/request_fuel_for_substation/${subStationId}`, data, { headers: headers });
  }
}
