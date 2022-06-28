import { Component, OnInit, HostListener } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-web-editor",
  templateUrl: "./web-editor.component.html",
  styleUrls: ["./web-editor.component.css"],
})
export class WebEditorComponent implements OnInit {
  title = "GingerPen-UI";
  htmlCode: string = "<!-- HTML Goes Here  -->";
  cssCode: string = "/* CSS Goes Here */";
  jsCode: string = "/* Javascript Goes here */";
  code: string = "";
  language: string = "html";
  output: string = "";
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
    this.createHtml();
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

    console.log(this.div1, this.div2, this.div3);
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
      console.log("this fired");
    } else {
      this.div1 = true;
      this.div2 = false;
      this.div3 = false;
      this.editorButtons = true;
    }
  }

  runCode() {
    // this.http.get("http://localhost:8080/").subscribe((data) => {
    //   console.log(data);
    // });

    this.output = "running...";
    this.code = this.htmlCode + "/$/" + this.cssCode + "/$/" + this.jsCode;
    try {
      this.http
        .post<any>("http://localhost:8080/code/runCode", {
          language: this.language,
          code: this.code,
        })
        .subscribe((data) => {
          console.log(data);
          this.output = data.message;
        });
    } catch (error) {
      console.log(error);
    }
  }

  createHtml = () => {
    const node = document.createElement("html");
    document.querySelector("#output")?.appendChild(node);
    console.log("ran");
  };
}
