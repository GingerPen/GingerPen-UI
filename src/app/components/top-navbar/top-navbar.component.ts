import { Component, Input, OnInit } from "@angular/core";
import { SaveModalComponent } from "src/app/components/save-modal/save-modal.component";
@Component({
  selector: "app-top-navbar",
  templateUrl: "./top-navbar.component.html",
  styleUrls: ["./top-navbar.component.css"],
})
export class TopNavbarComponent implements OnInit {
  constructor() {}
  showModal: boolean = false;
  @Input()
  editor: boolean = false;

  userName: any = localStorage.getItem("UserName")
    ? localStorage.getItem("UserName")
    : "Untitled";

  obj: SaveModalComponent = new SaveModalComponent();
  ngOnInit(): void {}

  showSaveModal() {
    this.obj.showSignUpModal();
  }
}
