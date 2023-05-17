import { Component, OnInit } from "@angular/core";
import { ObjectUnsubscribedError } from "rxjs";
import { v4 as uuidv4 } from "uuid";
import { HttpClient } from "@angular/common/http";
import { codesService } from "src/app/services/codes.service";
import { Codes } from "src/app/models/codesModel";
import { Router } from "@angular/router";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"],
})
export class HomepageComponent implements OnInit {
  uniqueId: string;
  isLoggedIn: boolean;
  userName: string = localStorage.getItem("UserName") ?? "Untitled";
  codes: Codes[] = [];
  codesLength: number = 0;

  array = [
    { type: "C", code: "public static void main" },
    { type: "C", code: "public static void main" },
    { type: "C", code: "public static void main" },
  ];

  constructor(
    private http: HttpClient,
    private codesService: codesService,
    private router: Router
  ) {
    this.uniqueId = uuidv4();
    this.isLoggedIn = this.userName === "Untitled" ? false : true;
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.codesService.getCodes().subscribe((data) => {
        this.codes = data.codes.reverse();
        this.codesLength = data.codes.length;
      });
    }
  }

  openCodeEditor(e: any) {
    if (this.isLoggedIn) {
      const code = e.target.innerText;

      localStorage.setItem("currentCode", code);
      localStorage.setItem("currentLanguage", "java");
      this.router.navigate([`/code/:${this.uniqueId}`]);
    }
  }
}
