import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ChartsModule } from "ng2-charts";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { defineLocale } from "ngx-bootstrap/chronos";
import { esLocale } from "ngx-bootstrap/locale";
import { ModalModule } from "ngx-bootstrap/modal";
import { TabsModule } from "ngx-bootstrap/tabs";
import { UsersComponent } from "src/app/pages/users/users.component";
import { CrearUserComponent } from "src/app/pages/users/crear-user/crear-user.component";
import { EditUserComponent } from "src/app/pages/users/edit-user/edit-user.component";
import { FilterPipeUser } from "src/app/pipes/filterUsers.pipe";
import { CalendarAdminComponent } from "src/app/pages/calendar-admin/calendar-admin.component";
import { FullCalendarModule } from "@fullcalendar/angular";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NewTaskComponent } from "src/app/pages/calendar-admin/components/new-task/new-task.component";
import { DetailComponent } from "src/app/pages/calendar-view/detail/detail.component";
import { CalendarViewComponent } from "src/app/pages/calendar-view/calendar-view.component";
import { EditTaskComponent } from "src/app/pages/calendar-admin/components/edit-task/edit-task.component";
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDropdownModule } from "ngx-bootstrap/dropdown";

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { NgxPaginationModule } from "ngx-pagination";
defineLocale("es", esLocale);
// Importaciones de FullCalendarModule
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])

@NgModule({
  imports: [
    BsDropdownModule.forRoot(),
    NgSelectModule, // Ng-select
    CommonModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ChartsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    NgxPaginationModule,
    SweetAlert2Module.forRoot(),
    FullCalendarModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [DatePipe],
  declarations: [
    FilterPipeUser,
    UsersComponent,
    CrearUserComponent,
    EditUserComponent,
    CalendarAdminComponent,
    NewTaskComponent,
    EditTaskComponent,
    CalendarViewComponent, 
    DetailComponent
  ] 
})
export class AdminLayoutModule {}
