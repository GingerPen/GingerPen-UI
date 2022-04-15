import { Component } from '@angular/core';
import { OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GingerPen-UI';
  code: string = "";

  
constructor(private http:HttpClient) {

}
  runCode() {
    this.http.get('http://localhost:8080/').subscribe(data=>{
      console.warn(data);
    });

    this.http.post<any>('http://localhost:8080/runCode', { language:"java" , code: this.code }).subscribe(data => {
      console.log(data);
  })
    
  }





}


