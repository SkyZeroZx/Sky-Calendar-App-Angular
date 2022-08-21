import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
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
import { RouterModule } from "@angular/router";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CalendarViewComponent } from "./calendar-view.component";
import { CalendarViewDetailComponent } from "./detail/calendar-view-detail..component";
import { CalendarViewRouter } from "./calendar-view.routing";

defineLocale("es", esLocale);
// Importaciones de FullCalendarModule
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
]);

@NgModule({
  declarations: [CalendarViewComponent, CalendarViewDetailComponent],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forChild(CalendarViewRouter),
    FullCalendarModule,
    ReactiveFormsModule,
    NgSelectModule,
    ModalModule.forRoot(),
  ],
  providers: [DatePipe],
})
export class CalendarViewModule {}
