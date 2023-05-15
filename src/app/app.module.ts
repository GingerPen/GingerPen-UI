import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { MonacoEditorModule } from "ngx-monaco-editor";
import { HomepageComponent } from "./views/homepage/homepage/homepage.component";
import { CodeEditorComponent } from "./views/code-editor/code-editor.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { WebEditorComponent } from "./views/webeditor/web-editor/web-editor.component";
import { TopNavbarComponent } from "./components/top-navbar/top-navbar.component";
import { SaveModalComponent } from "./components/save-modal/save-modal.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { CodeWidget } from "./components/codeWidget/codeWidget.component";
import { authService } from "./services/auth.service";
import { codesService } from "./services/codes.service";

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CodeEditorComponent,
    WebEditorComponent,
    TopNavbarComponent,
    SaveModalComponent,
    LoginComponent,
    RegisterComponent,
    CodeWidget,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MonacoEditorModule.forRoot(),
    FontAwesomeModule, //
  ],
  providers: [{ provide: Window, useValue: window }, codesService, authService],
  bootstrap: [AppComponent],
})
export class AppModule {}
