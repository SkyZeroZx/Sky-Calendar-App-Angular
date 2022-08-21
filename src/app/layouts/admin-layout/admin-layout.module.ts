import {
  NgModule,
} from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CalendarAdminModule } from "../../pages/calendar-admin/calendar-admin.module";
import { CalendarViewModule } from "../../pages/calendar-view/calendar-view.module";
import { GestionUsuariosModule } from "../../pages/gestion-usuarios/gestion-usuarios.module";
 
@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    CalendarAdminModule,
    CalendarViewModule,
    GestionUsuariosModule
  ],
  providers: [DatePipe],
  declarations: [ ],
})
export class AdminLayoutModule {}
