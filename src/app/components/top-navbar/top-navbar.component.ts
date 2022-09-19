import { Component, Input, OnInit } from "@angular/core";
import { SaveModalComponent } from "src/app/components/save-modal/save-modal.component";
import { Router } from "@angular/router";
@Component({
  selector: "app-top-navbar",
  templateUrl: "./top-navbar.component.html",
  styleUrls: ["./top-navbar.component.css"],
})
export class TopNavbarComponent implements OnInit {
  constructor(private router: Router) {}
  showModal: boolean = false;
  @Input()
  editor: boolean = false;

  userName: any = localStorage.getItem("UserName")
    ? localStorage.getItem("UserName")
    : "Untitled";

  obj: SaveModalComponent = new SaveModalComponent();
  ngOnInit(): void {}

  logout() {
    localStorage.removeItem("UserName");
    this.router.navigate(["/home"]);
  }
  showSaveModal() {
    this.obj.showSignUpModal();
  }
}
