import { Component, OnInit } from "@angular/core";
import { ThemeService } from "src/app/services/theme/theme.service";

@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"]
})
export class AdminLayoutComponent implements OnInit {
  public sidebarColor: string = "red";
  public enableNavBar : boolean
  
  constructor(private themeService :ThemeService) {

  }
  changeSidebarColor(color){
    var sidebar = document.getElementsByClassName('sidebar')[0];
    var mainPanel = document.getElementsByClassName('main-panel')[0];

    this.sidebarColor = color;

    if(sidebar != undefined){
        sidebar.setAttribute('data',color);
    }
    if(mainPanel != undefined){
        mainPanel.setAttribute('data',color);
    }
  }
  changeDashboardColor(){
 
  }
  ngOnInit() {
    let body = document.getElementsByTagName('body')[0];
    this.themeService.theme.subscribe({
      next: (res) => {
         if ( res){
         body.classList.remove('white-content');
         body.classList.add('dark-content');
         } else {
          body.classList.remove('dark-content');
          body.classList.add('white-content');
         }
      }
    })
    this.themeService.navBar.subscribe({
      next: (res) => {
         if ( res){
        this.enableNavBar = true;
         } else {
          this.enableNavBar = false;
         }
      }
    })

  }
}
