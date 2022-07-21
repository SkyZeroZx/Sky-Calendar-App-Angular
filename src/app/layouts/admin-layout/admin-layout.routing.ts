import { Routes } from "@angular/router";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { CalendarAdminComponent } from "../../pages/calendar-admin/calendar-admin.component";
import { GestionUsuariosComponent } from "src/app/pages/gestion-usuarios/gestion-usuarios.component";
import { CalendarViewComponent } from "src/app/pages/calendar-view/calendar-view.component";
import { CheckRole } from "src/app/common/guards/checkRole.guard";
import { FirstLogin } from "src/app/common/guards/FirstLogin.guard";
import { IsLogged } from "src/app/common/guards/IsLogged.guard";

export const AdminLayoutRoutes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [FirstLogin, CheckRole, IsLogged],
  },
  {
    path: "icons",
    component: IconsComponent,
    canActivate: [FirstLogin, CheckRole, IsLogged],
  },
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
  },
  {
    path: "tables",
    component: NotificationsComponent,
    canActivate: [FirstLogin, CheckRole, IsLogged],
  },
  {
    path: "typography",
    component: TypographyComponent,
    canActivate: [FirstLogin, CheckRole, IsLogged],
  },
];
