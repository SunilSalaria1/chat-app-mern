import { config } from "../../config";
import { RegisterSchema } from "../../pages/auth/register/Register";

export default class AuthService {
  public async login(body: { email: string; password: string }): Promise<any> {
    return fetch(config.apiUrl + "/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  public async getCurrentUser(): Promise<any> {
    return fetch(config.apiUrl + "/api/auth/currentUser", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => response.json());
  }

  public async logout(): Promise<any> {
    return fetch(config.apiUrl + "/api/auth/logout", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) =>{
      console.log(response)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }).catch((error) => {
      console.error('Error during logout:', error);
    });
  }

  public async register(body: RegisterSchema): Promise<any> {
    return fetch(config.apiUrl + "/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => {
     if (response.status === 204) {
        return null;
      }
      return response.json();
    });
  }
}
