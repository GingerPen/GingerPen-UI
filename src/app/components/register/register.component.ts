import { Component, OnInit } from "@angular/core";
import { userModel } from "src/app/models/userModel";
import { FormsModule } from "@angular/forms";
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
  constructor(private http: HttpClient) {}

  register() {
    console.log(this.userdetails);
    this.http
      .post("http://localhost:8080/auth/signup", this.userdetails)
      .subscribe((data) => {
        console.log(data);
      });
  }
  ngOnInit(): void {}
}
