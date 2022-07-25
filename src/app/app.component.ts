import { Component, HostListener } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
import { ThemeService } from "./services/theme/theme.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(private swUpdate: SwUpdate, private themeService: ThemeService) {
    this.swUpdate.versionUpdates.subscribe({
      next: (res: any) => {
        console.log("Mi data res init PWA ->", res);
      },
      error: (_err) => {
        console.log("Version Update is ERROR ", _err);
      },
    });
  }
//TODO HostListener FOR UPDATE PWA ->
  @HostListener("window:beforeinstallprompt", ["$event"])
  onbeforeinstallprompt(e) {
    e.preventDefault();
    this.themeService.promptEvent = e;
  }


  @HostListener("window:isUpdateAvailable", ["$event"])
  updatePWAListener(e) {
    e.preventDefault();
    console.log("Update PWA is" , e)
  }
}
