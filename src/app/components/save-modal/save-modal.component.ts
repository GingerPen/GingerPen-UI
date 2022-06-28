import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-save-modal",
  templateUrl: "./save-modal.component.html",
  styleUrls: ["./save-modal.component.css"],
})
export class SaveModalComponent implements AfterViewInit {
  @ViewChild("signup", { static: false }) signupModal: any;
  constructor() {}

  ngAfterViewInit() {
    console.log(this.showSignUpModal); // results in -> ElementRef {nativeElement: p}
  }

  public showSignUpModal() {
    console.log(this.signupModal.nativeElement);
  }
}
