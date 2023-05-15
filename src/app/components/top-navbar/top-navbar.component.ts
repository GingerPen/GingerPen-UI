import { Component, Input, OnInit } from "@angular/core";
import { SaveModalComponent } from "src/app/components/save-modal/save-modal.component";
import { Router } from "@angular/router";
import { authService } from "src/app/services/auth.service";
@Component({
  selector: "app-top-navbar",
  templateUrl: "./top-navbar.component.html",
  styleUrls: ["./top-navbar.component.css"],
})
export class TopNavbarComponent implements OnInit {
  constructor(private router: Router, private auth: authService) {}
  showModal: boolean = false;
  @Input()
  editor: boolean = false;

  userName: string = localStorage.getItem("UserName") ?? "Untitled";

  private obj: SaveModalComponent = new SaveModalComponent();
  ngOnInit(): void {}

  logout() {
    this.auth.logout();
  }

  showSaveModal() {
    this.obj.showSignUpModal();
  }
}
