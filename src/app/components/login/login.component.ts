import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { authService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  data: string = "";
  password: string = "";
  private loginURL: string =
    "https://gingerpen-backend.azurewebsites.net/auth/login";
  // private loginURL: string = "http://localhost:8080/"; // test URL

  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     "Access-Control-Allow-Origin": "*",
  //     Authorization: "authkey",
  //     userid: "1",
  //   }),
  // };

  login() {
    const heading = document.querySelector(".login-heading");

    if (heading) {
      heading.textContent = "Signing In..";
    }
    try {
      this.auth.login(this.data, this.password).subscribe((res) => {
        console.log(res);
        localStorage.setItem("UserName", res.data.name);
        localStorage.setItem("uid", res.data._id);
        this.router.navigate(["/home"]);
      });
    } catch (error) {
      console.log("error:" + error);
    }

    // localStorage.setItem("UserName", this.data);
    // localStorage.setItem("uid", this.password);
    // this.router.navigate(["/home"]);
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: authService
  ) {}

  ngOnInit(): void {}
}
