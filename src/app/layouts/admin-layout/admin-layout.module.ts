import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
 
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSliderModule } from "@angular/material/slider";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { FullCalendarModule } from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

import { defineLocale } from "ngx-bootstrap/chronos";
import { esLocale } from "ngx-bootstrap/locale";
import { NgSelectModule } from "@ng-select/ng-select";
import { ModalModule } from "ngx-bootstrap/modal";
import { TabsModule } from "ngx-bootstrap/tabs";
import { CalendarAdminComponent } from "src/app/pages/calendar-admin/calendar-admin.component";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { EditTaskComponent } from "src/app/pages/calendar-admin/components/edit-task/edit-task.component";
import { NewTaskComponent } from "src/app/pages/calendar-admin/components/new-task/new-task.component";
import { GestionUsuariosComponent } from "src/app/pages/gestion-usuarios/gestion-usuarios.component";
import { CrearUserComponent } from "src/app/pages/gestion-usuarios/components/crear-user/crear-user.component";
import { EditUserComponent } from "src/app/pages/gestion-usuarios/components/edit-user/edit-user.component";
import { NgxPaginationModule } from "ngx-pagination";
import { FilterPipeUser } from "src/app/common/pipes/filterUsers.pipe";
import { DetailComponent } from "src/app/pages/calendar-view/detail/detail.component";
import { CalendarViewComponent } from "src/app/pages/calendar-view/calendar-view.component";
import { UserComponent } from "src/app/pages/user-profile/user.component";
defineLocale("es", esLocale);
// Importaciones de FullCalendarModule
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
]);
@NgModule({
  imports: [
    CommonModule,
    NgSelectModule, // Ng-select
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),

    RouterModule.forChild(AdminLayoutRoutes),
    HttpClientModule,
    NgbModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatRippleModule,
    MatSlideToggleModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FullCalendarModule,
  ],
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  declarations: [
    DashboardComponent,
    UserComponent,
    TablesComponent,
    IconsComponent,
    TypographyComponent,
    NotificationsComponent,
    MapComponent,
    CalendarAdminComponent,
    NewTaskComponent,
    EditTaskComponent,
    GestionUsuariosComponent,
    CrearUserComponent,
    EditUserComponent,
    FilterPipeUser,
    CalendarViewComponent,
    DetailComponent
  ],
})
export class AdminLayoutModule {}
