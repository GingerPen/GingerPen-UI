import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-code-editor",
  templateUrl: "./code-editor.component.html",
  styleUrls: ["./code-editor.component.css"],
})
export class CodeEditorComponent implements OnInit {
  lang = "java";
  title = "GingerPen-UI";
  code: string = "";
  output: string = "";
  editorOptions = { theme: "vs-dark", language: this.lang };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.code = `
    class GingerPen {
        public static void main(String[] args) {
            System.out.println("Hello, World!"); 
        }
    }`;
  }

  runCode() {
    this.http.get("http://localhost:8080/").subscribe((data) => {
      console.warn(data);
    });

    this.output = "running...";
    this.http
      .post<any>("http://localhost:8080/code/runcode", {
        language: this.lang,
        code: this.code,
      })
      .subscribe((data) => {
        console.log(this.code);
        console.log(data);
        this.output = data.message;
      });
  }
}
