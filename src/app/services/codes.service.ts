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

  private getCodesURL: string =
    this.BASE_URL + "code/getcodelist/6299b7358221f50b8bf37f59";
  private saveCodeURL = this.BASE_URL + "savecode";
  private runCodeURL = this.BASE_URL + "runCode";

  getCodes(): Observable<any> {
    return this.http.post(this.getCodesURL, {
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ isAuthorised: true }),
    });
  }

  saveCode(code: any): Observable<any> {
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
