import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { UserProfileComponent } from "./user-profile.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSliderModule } from "@angular/material/slider";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from "@angular/router";
import { UserProfileRouter } from "./user-profile.routing";
import { ModalModule } from "ngx-bootstrap/modal";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    NgbModule,
    ModalModule.forRoot(),
    NgbModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatRippleModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(UserProfileRouter),
  ],
  providers: [DatePipe],
})
export class UserProfileModule {}
