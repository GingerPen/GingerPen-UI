import { Component, OnInit } from "@angular/core";
import { SaveModalComponent } from "src/app/components/save-modal/save-modal.component";
@Component({
  selector: "app-top-navbar",
  templateUrl: "./top-navbar.component.html",
  styleUrls: ["./top-navbar.component.css"],
})
export class TopNavbarComponent implements OnInit {
  constructor() {}
  showModal: boolean = false;
  obj: SaveModalComponent = new SaveModalComponent();
  ngOnInit(): void {}

  showSaveModal() {
    this.obj.showSignUpModal();
  }
}
