import { Component } from '@angular/core';
import { OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  lang = "java";
  title = 'GingerPen-UI';
  code: string = "";
  output: string = "";
  editorOptions = {theme: 'vs-dark', language: this.lang};
 

  
constructor(private http:HttpClient) {

}
  runCode() {
    this.http.get('http://localhost:8080/').subscribe(data=>{
      console.warn(data);
    });

    this.http.post<any>('http://localhost:8080/runCode', { language:this.lang , code: this.code }).subscribe(data => {
      console.log(data);
      this.output = data.output;
    })
  }
}


