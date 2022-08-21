import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { CheckRole } from "./common/guards/checkRole.guard";
import { FirstLogin } from "./common/guards/FirstLogin.guard";
import { IsLogged } from "./common/guards/IsLogged.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "prefix",
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./layouts/auth-layout/auth-layout.module").then(
            (m) => m.AuthLayoutModule
          ),
      },
    ],
  },
  {
    path: "",
    component: AdminLayoutComponent,
    canActivate: [FirstLogin, CheckRole, IsLogged],
    children: [
      {
        path: "calendar-admin",
        loadChildren: () =>
          import("./pages/calendar-admin/calendar-admin.module").then(
            (m) => m.CalendarAdminModule
          ),
      },
      {
        path: "calendar-view",
        loadChildren: () =>
          import("./pages/calendar-view/calendar-view.module").then(
            (m) => m.CalendarViewModule
          ),
      },
      {
        path: "user-profile",
        loadChildren: () =>
          import("./pages/user-profile/user-profile.module").then(
            (m) => m.UserProfileModule
          ),
      },
      {
        path: "gestion-usuarios",
        loadChildren: () =>
          import("./pages/gestion-usuarios/gestion-usuarios.module").then(
            (m) => m.GestionUsuariosModule
          ),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "login",
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
