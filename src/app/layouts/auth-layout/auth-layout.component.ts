import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
 import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ThemeService } from "src/app/services/theme/theme.service";

@Component({
  selector: "app-auth-layout",
  templateUrl: "./auth-layout.component.html",
  styleUrls: ["./auth-layout.component.scss"],
})
export class AuthLayoutComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private themeService: ThemeService
  ) {}
  ngOnDestroy(): void {

  }
  ngOnInit(): void {
    let body = document.getElementsByTagName("body")[0];
    this.themeService.theme.subscribe({
      next: (res) => {
        if (res) {
          body.classList.remove("white-content");
        } else {
          body.classList.add("white-content");
        }
      },
    });
  }
}
