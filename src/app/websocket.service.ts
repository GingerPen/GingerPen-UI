import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as io from "socket.io-client";

@Injectable({
  providedIn: "root",
})
export class WebsocketService {
  private socket: any;
  private socketURL = "http://localhost:8080/";

  constructor() {
    this.socket = io.connect(this.socketURL);
  }

  listen(eventname: string): Observable<any> {
    return new Observable((subscribe) => {
      this.socket.on(eventname, (data: any) => {
        subscribe.next(data);
      });
    });
  }

  emit(eventname: string, data: any) {
    // console.log("triggered" + eventname);
    this.socket.emit(eventname, data);
  }

  removeSocket() {
    this.socket.removeSocket();
  }
}
