import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { CalendarAdminComponent } from "./calendar-admin.component";
import { EditTaskComponent } from "./components/edit-task/edit-task.component";
import { NewTaskComponent } from "./components/new-task/new-task.component";
import { FullCalendarModule } from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { defineLocale } from "ngx-bootstrap/chronos";
import { esLocale } from "ngx-bootstrap/locale";
import { NgSelectModule } from "@ng-select/ng-select";
import { ModalModule } from "ngx-bootstrap/modal";
import { ReactiveFormsModule } from "@angular/forms";
import { CalendarAdminRouter } from "./calendar-admin.routing";
import { RouterModule } from "@angular/router";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";

defineLocale("es", esLocale);
// Importaciones de FullCalendarModule
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
]);

@NgModule({
  declarations: [
    CalendarAdminComponent, 
    NewTaskComponent, 
    EditTaskComponent
  ],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    FullCalendarModule,
    ReactiveFormsModule,
    NgSelectModule,
    ModalModule.forRoot(),
    RouterModule.forChild(CalendarAdminRouter),
  ],
  providers: [DatePipe],
})
export class CalendarAdminModule {}
