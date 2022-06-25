import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ClipboardModule } from "ngx-clipboard";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { TramitesComponent } from "../../pages/tramites/tramites.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ChartsModule } from "ng2-charts";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { defineLocale } from "ngx-bootstrap/chronos";
import { esLocale } from "ngx-bootstrap/locale";
import { PieComponent } from "src/app/pages/dashboard/graficos/pie/pie.component";
import { DonutComponent } from "src/app/pages/dashboard/graficos/donut/donut.component";
import { BarComponent } from "src/app/pages/dashboard/graficos/bar/bar.component";
import { FilterPipe } from "src/app/pipes/filter.pipe";
import { ModalModule } from "ngx-bootstrap/modal";
import { TabsModule } from "ngx-bootstrap/tabs";
import { NgxPaginationModule } from "ngx-pagination";
import { UsersComponent } from "src/app/pages/users/users.component";
import { CrearUserComponent } from "src/app/pages/users/crear-user/crear-user.component";
import { EditUserComponent } from "src/app/pages/users/edit-user/edit-user.component";
import { FilterPipeUser } from "src/app/pipes/filterUsers.pipe";
import { FilterDocument } from "src/app/pipes/filterDocument.pipe";
import { DetalleTramiteComponent } from "src/app/pages/tramites/components/detalle-tramite/detalle-tramite.component";
import { EditTramiteComponent } from "src/app/pages/tramites/components/edit-tramite/edit-tramite.component";
import { CreateTramiteComponent } from "src/app/pages/tramites/components/create-tramite/create-tramite.component";
import { CalendarAdminComponent } from "src/app/pages/calendar-admin/calendar-admin.component";
import { FullCalendarModule } from "@fullcalendar/angular";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { NewTaskComponent } from "src/app/pages/calendar-admin/components/new-task/new-task.component";
import { DetailComponent } from "src/app/pages/calendar-view/detail/detail.component";
import { CalendarViewComponent } from "src/app/pages/calendar-view/calendar-view.component";
import { EditTaskComponent } from "src/app/pages/calendar-admin/components/edit-task/edit-task.component";
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";

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
    ClipboardModule,
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
    DashboardComponent,
    PieComponent,
    DonutComponent,
    BarComponent,
    TramitesComponent,
    DetalleTramiteComponent,
    EditTramiteComponent,
    CreateTramiteComponent,
    FilterPipe,
    FilterPipeUser,
    FilterDocument,
    UsersComponent,
    CrearUserComponent,
    EditUserComponent,
    CalendarAdminComponent,
    NewTaskComponent,
    EditTaskComponent,
    CalendarViewComponent, 
    DetailComponent
  ],
  bootstrap: [DashboardComponent],
})
export class AdminLayoutModule {}
