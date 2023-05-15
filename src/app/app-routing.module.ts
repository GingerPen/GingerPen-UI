import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { CodeEditorComponent } from "./views/code-editor/code-editor.component";
import { HomepageComponent } from "./views/homepage/homepage/homepage.component";
import { WebEditorComponent } from "./views/webeditor/web-editor/web-editor.component";

const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  // { path: 'codeEditor', component: CodeEditorComponent },
  { path: "home", component: HomepageComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "code/:id", component: CodeEditorComponent, pathMatch: "prefix" },
  { path: "web", component: WebEditorComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
