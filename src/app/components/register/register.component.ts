import { Component, OnInit } from "@angular/core";
import { userModel } from "src/app/models/userModel";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  private signInURL: string = environment.backendUrl + "auth/signup";

  userDetails: userModel = {
    name: "",
    username: "",
    password: "",
    email: "",
    confirmPass: "",
  };

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    console.log(this.userDetails);
    const heading = document.querySelector(".signup-heading");

    if (heading) {
      heading.textContent = "Signing In..";
    }

    this.http.post(this.signInURL, this.userDetails).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem("UserName", (<any>res).userData.name);
        localStorage.setItem("uid", (<any>res).userData._id);
        localStorage.setItem("email", (<any>res).userData.email);
        this.router.navigate(["/home"]);
        // this.router.navigate(["/login"]);
      },
      (error) => {
        console.log("SUP");

        if (heading) {
          heading.textContent = "Try Again...";
          setTimeout(() => {
            heading.textContent = "Sign In";
          }, 900);
        }
      }
    );
  }
  ngOnInit(): void {}
}
