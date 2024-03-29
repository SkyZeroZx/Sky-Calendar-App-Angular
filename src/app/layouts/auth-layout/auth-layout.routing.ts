import { Routes } from "@angular/router";
import { CheckLogin } from "src/app/common/guards/CheckLogin.guard";
import { IsLogged } from "src/app/common/guards/IsLogged.guard";
import { ChangePasswordComponent } from "src/app/pages/change-password/change-password.component";
import { LoginComponent } from "src/app/pages/login/login.component";

export const AuthLayoutRoutes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [CheckLogin] },
  {
    path: "change-password",
    component: ChangePasswordComponent,
    canActivate: [IsLogged]
  },
];
