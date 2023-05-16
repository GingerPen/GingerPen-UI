import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
@Injectable()
export class authService {
  constructor(private router: Router, private http: HttpClient) {}
  // private BASE_URL: string = "https://gingerpen-backend.azurewebsites.net";
  private BASE_URL: string = environment.backendUrl;
  private loginURL = this.BASE_URL + "/auth/login";

  login(data: string, password: string) {
    return this.http.post<any>(
      this.loginURL,
      {
        data: data,
        password: password,
      }
      // this.httpOptions
    );
  }
  logout() {
    localStorage.removeItem("UserName");
    localStorage.removeItem("currentCode");
    localStorage.removeItem("uid");
    this.router.navigate(["/home"]);
  }
}
