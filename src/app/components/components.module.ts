import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HamburguerComponent } from './hamburguer/hamburguer.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    HamburguerComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    HamburguerComponent
  ]
})
export class ComponentsModule { }
