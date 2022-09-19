import { Component, OnInit } from "@angular/core";
import { userModel } from "src/app/models/userModel";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  userdetails: userModel = {
    name: "",
    username: "",
    password: "",
    email: "",
    confirmPass: "",
  };
  constructor(private http: HttpClient, private router: Router) {}

  register() {
    console.log(this.userdetails);
    this.http
      .post(
        "https://gingerpen-backend.azurewebsites.net/auth/signup",
        this.userdetails
      )
      .subscribe((data) => {
        console.log(data);
        this.router.navigate(["/login"]);
      });
  }
  ngOnInit(): void {}
}
