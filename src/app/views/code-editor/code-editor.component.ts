import { Component, HostListener, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WebsocketService } from "src/app/websocket.service";
import { ActivatedRoute } from "@angular/router";
import { style } from "@angular/animations";
import { codesService } from "src/app/services/codes.service";

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
  sessionid: string = "";
  param: string = "";
  outputWindow: boolean = true;
  editorWindow: boolean = true;
  uid: any = localStorage.getItem("uid");
  editorOptions = { theme: "vs-dark", language: this.lang };
  userName: any = localStorage.getItem("UserName") ?? "Untitled";
  check: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private window: Window,
    private WebsocketService: WebsocketService,
    private codeService: codesService
  ) {}

  changeEditor() {
    this.editorOptions = { theme: "vs-dark", language: this.lang };
  }

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
    this.route.params.subscribe((params) => {
      // console.log(this.route);
      this.sessionid = params["id"];
      // console.log(params); //log the entire params object
      // console.log(params["id"]); //log the value of id
    });

    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.onWindowResize();
    this.WebsocketService.listen("typed").subscribe((data) => {
      // console.log(data.sessionid);
      // console.log(this.sessionid);
      console.log(data.lang);

      if (this.sessionid == data.sessionid) {
        this.code = data.data;
        this.lang = data.lang;
      }
    });

    if (localStorage.getItem("currentCode")) {
      this.code = localStorage.getItem("currentCode") ?? this.code;
      this.lang = localStorage?.getItem("currentLanguage") ?? this.lang;
    }
  }

  copyToClipboard() {
    navigator.clipboard.writeText(window.location.href);
    const elem = document.getElementById("clipboardButton")!;
    elem.innerText = "copied";
    setTimeout(() => {
      elem.innerText = "Copy Shareable Link";
    }, 300);
  }

  saveCode() {
    this.codeService
      .saveCode({
        userId: this.uid,
        codes: [{ format: this.lang, code: this.code }],
        isAuthorised: true,
      })
      .subscribe((data) => {
        this.output = data.message;
      });
  }

  syncCode() {
    if (this.check == true) {
      //console.log("worked");
      setTimeout(() => {
        this.WebsocketService.emit("typed", {
          code: this.code,
          lang: this.lang,
          sessionid: this.sessionid,
        });
        this.check = true;
      }, 300);
    }
    this.check = false;
  }

  runCode() {
    this.WebsocketService.emit("sup", this.sessionid);

    if (window.innerWidth <= 768) {
      this.editorWindow = false;
      this.outputWindow = true;
    }

    this.output = "running...";
    this.lang = this.lang === "python" ? "py" : this.lang;

    try {
      this.codeService.runCode(this.lang, this.code).subscribe((data) => {
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
      //console.log(buttons);
      buttons?.parentNode?.removeChild(buttons);
      //console.log("this fired");
    } else {
      this.editorWindow = true;
      this.outputWindow = false;
    }
  }

  ngOnDestroy() {}
}
