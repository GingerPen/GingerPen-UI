import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  data: string = "";
  password: string = "";

  login() {
    try {
      this.http
        .post<any>("https://gingerpen-backend.azurewebsites.net/auth/login", {
          data: this.data,
          password: this.password,
        })
        .subscribe((res) => {
          console.log(res);
          localStorage.setItem("UserName", res.data.name);
          localStorage.setItem("uid", res.data._id);
          this.router.navigate(["/home"]);
        });
    } catch (error) {
      console.log(error);
    }
  }

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}
}
