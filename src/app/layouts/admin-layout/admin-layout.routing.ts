import { Routes } from "@angular/router";
import { CalendarAdminComponent } from "../../pages/calendar-admin/calendar-admin.component";
import { GestionUsuariosComponent } from "src/app/pages/gestion-usuarios/gestion-usuarios.component";
import { CalendarViewComponent } from "src/app/pages/calendar-view/calendar-view.component";
import { CheckRole } from "src/app/common/guards/checkRole.guard";
import { FirstLogin } from "src/app/common/guards/FirstLogin.guard";
import { IsLogged } from "src/app/common/guards/IsLogged.guard";
import { UserComponent } from "src/app/pages/user-profile/user.component";

export const AdminLayoutRoutes: Routes = [
  {
    path: "gestion-usuarios",
    component: GestionUsuariosComponent,
    canActivate: [FirstLogin, CheckRole, IsLogged],
  },
  {
    path: "user",
    component: UserComponent,
    canActivate: [FirstLogin, CheckRole, IsLogged],
  },
  {
    path: "calendar-admin",
    component: CalendarAdminComponent,
    canActivate: [FirstLogin, CheckRole, IsLogged],
  },
  {
    path: "calendar-view",
    component: CalendarViewComponent,
    canActivate: [FirstLogin, CheckRole, IsLogged],
  }
];
