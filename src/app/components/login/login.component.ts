import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  data: string = "";
  password: string = "";

  login() {
    this.http
      .post(
        "http://localhost:8080/auth/login",
        {
          data: this.data,
          password: this.password,
        },
        { withCredentials: true }
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
}
