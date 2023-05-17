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

    this.auth.login(this.data, this.password).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem("UserName", res.data.name);
        localStorage.setItem("uid", res.data._id);
        localStorage.setItem("email", res.data.email);
        this.router.navigate(["/home"]);
        console.log("sup");
      },
      (error) => {
        console.log("error:" + error);

        if (heading) {
          heading.textContent = "Try Again...";
          setTimeout(() => {
            heading.textContent = "Login";
          }, 800);
        }
      }
    );
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: authService
  ) {}

  ngOnInit(): void {}
}
