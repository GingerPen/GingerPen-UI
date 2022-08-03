import { Component, HostListener, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-code-editor",
  templateUrl: "./code-editor.component.html",
  styleUrls: ["./code-editor.component.css"],
})
export class CodeEditorComponent implements OnInit {
  lang = "java";
  title = "GingerPen-UI";
  code: string = `
  class GingerPen {
      public static void main(String[] args) {
          System.out.println("Hello, World!"); 
      }
  }`;
  output: string = "";
  outputWindow: boolean = true;
  editorWindow: boolean = true;
  uid: any = localStorage.getItem("uid");
  editorOptions = { theme: "vs-dark", language: this.lang };
  userName: any = localStorage.getItem("UserName")
    ? localStorage.getItem("UserName")
    : "Untitled";
  constructor(private http: HttpClient, private window: Window) {}

  changeView(editortype: string) {
    switch (editortype) {
      case "code":
        this.editorWindow = true;
        this.outputWindow = false;
        break;
      case "output":
        this.editorWindow = false;
        this.outputWindow = true;
        break;
    }
  }
  getScreenWidth: any;
  getScreenHeight: any;

  ngOnInit() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.onWindowResize();
  }

  saveCode() {
    try {
      this.http
        .post<any>(
          "https://gingerpen-backend.azurewebsites.net/code/savecode",
          {
            userId: this.uid,
            codes: [{ format: "java", code: this.code }],
          }
        )
        .subscribe((data) => {
          this.output = data.message;
        });
    } catch (error) {
      console.log(error);
    }
  }

  runCode() {
    // this.http.get("http://localhost:8080/").subscribe((data) => {
    //   console.log(data);
    // });

    this.output = "running...";
    try {
      this.http
        .post<any>("https://gingerpen-backend.azurewebsites.net/code/runCode", {
          language: this.lang,
          code: this.code,
        })
        .subscribe((data) => {
          this.output = data.message;
        });
    } catch (error) {
      console.log(error);
    }
  }

  @HostListener("window:resize", ["$event"])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    if (this.getScreenWidth >= 768) {
      this.editorWindow = true;
      this.outputWindow = true;
      const buttons = document.querySelector(".changeViewButtons");
      console.log(buttons);
      buttons?.parentNode?.removeChild(buttons);
      console.log("this fired");
    } else {
      this.editorWindow = true;
      this.outputWindow = false;
    }
  }
}
