import { config } from "../../config";

export default class AuthService {
  public async login(body: { email: string; password: string }): Promise<any> {
    return fetch(config.apiUrl+"/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  public async getCurrentUser():Promise<any>{
    return fetch(config.apiUrl+"/api/currentUser",{
      headers:{
        "Authorization": "Bearer "+localStorage.getItem('token')
      }
    }).then((response) => response.json());
  }
}
