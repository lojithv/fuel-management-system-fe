import instance from "../config/api";

export class AuthService{
  static login(authData) {
    return instance.post("/login", authData);
  }
  
  static getUser() {
    return instance.get("/user");
  }
}


