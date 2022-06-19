import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { TramitesComponent } from "../../pages/tramites/tramites.component";
import { IsLogged } from "src/app/guards/IsLogged.guard";
 
import { CheckRole } from "src/app/guards/checkRole.guard";
import { UsersComponent } from "src/app/pages/users/users.component";
import { FirstLogin } from "src/app/guards/FirstLogin.guard";
import { CalendarAdminComponent } from "src/app/pages/calendar-admin/calendar-admin.component";

export const AdminLayoutRoutes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [FirstLogin, CheckRole, IsLogged],
  },
  {
    path: "tramites",
    component: TramitesComponent,
    canActivate: [FirstLogin, CheckRole, IsLogged],
  },
  {
    path: "calendar-admin",
    component: CalendarAdminComponent,
    canActivate: [FirstLogin, CheckRole, IsLogged],
  },
  {
    path: "users",
    component: UsersComponent,
    canActivate: [FirstLogin, CheckRole, IsLogged],
  },
];
