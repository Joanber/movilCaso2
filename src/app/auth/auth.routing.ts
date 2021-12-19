import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginPage } from "../pages/login/login.page";

const routes: Routes = [
  {
    path: "login",
    component: LoginPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
