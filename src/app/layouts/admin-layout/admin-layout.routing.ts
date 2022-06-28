import { Routes } from "@angular/router";
import { IsLogged } from "src/app/guards/IsLogged.guard";
 
import { CheckRole } from "src/app/guards/checkRole.guard";
import { UsersComponent } from "src/app/pages/users/users.component";
import { FirstLogin } from "src/app/guards/FirstLogin.guard";
import { CalendarAdminComponent } from "src/app/pages/calendar-admin/calendar-admin.component";
import { CalendarViewComponent } from "src/app/pages/calendar-view/calendar-view.component";

export const AdminLayoutRoutes: Routes = [
  {
    path: "calendar-view",
    component: CalendarViewComponent,
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
