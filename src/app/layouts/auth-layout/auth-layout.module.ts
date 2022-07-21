import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from "@angular/common/http";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

 import { LoginComponent } from 'src/app/pages/login/login.component';
import { ChangePasswordComponent } from 'src/app/pages/change-password/change-password.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
  ],
  declarations: [
    ChangePasswordComponent,
    LoginComponent,
  ]
})
export class AuthLayoutModule { }
