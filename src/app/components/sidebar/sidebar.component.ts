import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES_VIEWER: RouteInfo[] = [
  {
    path: "/calendar-view",
    title: "Calendario",
    icon: "ni-tv-2 text-primary",
    class: "",
  }
];

export const ROUTES_ADMINISTRADOR: RouteInfo[] = [
  {
    path: "/users",
    title: "Usuarios",
    icon: "fa fa-users",
    class: "",
  },
  {
    path: "/calendar-admin",
    title: "Calendario",
    icon: "ni-bullet-list-67 text-red",
    class: "",
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;
  usuarioLogeado: string;
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    switch (this.auth.getItemToken("role")) {
      case "admin":
        this.menuItems = ROUTES_ADMINISTRADOR.filter((menuItem) => menuItem);
        break;
      case "viewer":
        this.menuItems = ROUTES_VIEWER.filter((menuItem) => menuItem);
        break;
      default:
        break;
    }
    this.usuarioLogeado = JSON.parse(localStorage.getItem("user")).username;
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
    localStorage.removeItem("user");
  }

  changePassword() {
    this.router.navigate(["/change-password"]);
  }
}
