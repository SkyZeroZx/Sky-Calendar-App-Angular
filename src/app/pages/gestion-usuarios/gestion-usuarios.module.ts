import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { FilterPipeUser } from "../../common/pipes/filterUsers.pipe";
import { CrearUserComponent } from "./components/crear-user/crear-user.component";
import { EditUserComponent } from "./components/edit-user/edit-user.component";
import { GestionUsuariosComponent } from "./gestion-usuarios.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";
import { NgSelectModule } from "@ng-select/ng-select";
import { ModalModule } from "ngx-bootstrap/modal";
import { TabsModule } from "ngx-bootstrap/tabs";
import { RouterModule } from "@angular/router";
import { GestionUsuariosRouter } from "./gestion-usuarios.routing";

@NgModule({
  declarations: [
    GestionUsuariosComponent,
    CrearUserComponent,
    EditUserComponent,
    FilterPipeUser,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgSelectModule,
    ModalModule.forRoot(),
 
    RouterModule.forChild(GestionUsuariosRouter),
  ],
  providers: [DatePipe],
})
export class GestionUsuariosModule {}
