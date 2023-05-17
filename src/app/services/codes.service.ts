import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable()
export class codesService {
  constructor(private http: HttpClient) {}

  // private BASE_URL = "https://gingerpen-backend.azurewebsites.net/code";
  private BASE_URL: string = environment.backendUrl;
  // private BASE_URL = "http://localhost:8080/code";
  private email = localStorage.getItem("email");
  private getCodesURL: string =
    this.BASE_URL + `code/getcodelist/${this.email}`;
  private saveCodeURL = this.BASE_URL + "code/savecode";
  private runCodeURL = this.BASE_URL + "code/runcode";

  getCodes(): Observable<any> {
    return this.http.post(this.getCodesURL, {
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ isAuthorised: true }),
    });
  }

  saveCode(code: any): Observable<any> {
    console.log("wating");
    return this.http.post<any>(this.saveCodeURL, {
      body: code,
    });
  }

  runCode(lang: string, code: string): Observable<any> {
    return this.http.post<any>(this.runCodeURL, {
      language: lang,
      code: code,
    });
  }
}
