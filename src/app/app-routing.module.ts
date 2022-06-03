import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { CodeEditorComponent } from "./views/code-editor/code-editor.component";
import { HomepageComponent } from "./views/homepage/homepage/homepage.component";
import { WebEditorComponent } from "./views/webeditor/web-editor/web-editor.component";

const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  // { path: 'codeEditor', component: CodeEditorComponent },
  { path: "home", component: HomepageComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "code", component: CodeEditorComponent },
  { path: "web", component: WebEditorComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
