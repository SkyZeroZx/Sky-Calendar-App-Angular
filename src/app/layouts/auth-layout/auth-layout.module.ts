import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { LoginComponent } from '../../pages/login/login.component';
import { ChangePasswordComponent } from '../../pages/change-password/change-password.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from "ngx-bootstrap/modal";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
 

@NgModule({
  imports: [ 
    CommonModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SweetAlert2Module.forRoot(),
    BsDropdownModule.forRoot(),
  ],
  declarations: [
    LoginComponent,
    ChangePasswordComponent
  ]
 
})
export class AuthLayoutModule { }
