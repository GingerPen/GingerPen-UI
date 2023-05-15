import { Component, OnInit, HostListener, OnChanges } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-web-editor",
  templateUrl: "./web-editor.component.html",
  styleUrls: ["./web-editor.component.css"],
})
export class WebEditorComponent implements OnInit, OnChanges {
  title = "GingerPen-UI";
  htmlCode: string = "<!-- HTML Goes Here  -->";
  cssCode: string = "/* CSS Goes Here */";
  jsCode: string = "/* Javascript Goes here */";
  code: string = "";
  language: string = "html";

  editorButtons: boolean = true;
  htmlEditorOptions = { theme: "vs-dark", language: "html" };
  cssEditorOptions = { theme: "vs-dark", language: "css" };
  jsEditorOptions = { theme: "vs-dark", language: "javascript" };
  div1 = true;
  div2 = false;
  div3 = false;
  getScreenWidth: any;
  getScreenHeight: any;
  editor = true;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.onWindowResize();
    //  this.createHtml();
  }
  runWebCode() {
    let frame: any = document.getElementById("codeOutput");
    frame = frame.contentDocument || frame.contentWindow;
    frame.open();
    frame.writeln(
      this.htmlCode +
        "<style>" +
        this.cssCode +
        "</style>" +
        "<script>" +
        this.jsCode +
        "</script>"
    );
    
  }

  ngOnChanges() {
    this.runWebCode();
  }

  changeEditor(editortype: string) {
    switch (editortype) {
      case "HTML":
        this.div1 = true;
        this.div2 = false;
        this.div3 = false;
        break;
      case "CSS":
        this.div1 = false;
        this.div2 = true;
        this.div3 = false;
        break;
      case "JS":
        this.div1 = false;
        this.div2 = false;
        this.div3 = true;
        break;
    }
  }

  @HostListener("window:resize", ["$event"])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    if (this.getScreenWidth >= 768) {
      this.div1 = true;
      this.div2 = true;
      this.div3 = true;
      this.editorButtons = false;
    } else {
      this.div1 = true;
      this.div2 = false;
      this.div3 = false;
      this.editorButtons = true;
    }
  }
}
