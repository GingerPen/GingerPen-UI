import { Component, Input } from "@angular/core";

@Component({
  selector: "app-codeWidget",
  templateUrl: "./codeWidget.component.html",
  styleUrls: ["./codeWidget.component.css"],
})
export class CodeWidget {
  @Input() language: string = "hello";
  @Input() code: string = "hello";
  constructor() {}
}
