import { Component, HostListener } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
import { ThemeService } from "./services/theme/theme.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "sky-calendar-pwa";
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

  @HostListener("window:beforeinstallprompt", ["$event"])
  onbeforeinstallprompt(e) {
    e.preventDefault();
    this.themeService.promptEvent = e;
  }
}
