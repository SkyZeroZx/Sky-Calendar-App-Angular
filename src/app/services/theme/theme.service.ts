import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  public darkTheme: boolean = this.getLocalStorageItem("darkTheme");
  public navBarPosition: boolean = this.getLocalStorageItem("navBar");
  public theme = new BehaviorSubject(this.darkTheme);
  public navBar = new BehaviorSubject(this.navBarPosition);

  constructor() {}

  setTheme(option: boolean) {
    localStorage.setItem("darkTheme", option.toString());
    this.theme.next(option);
  }

  setNavBar(option: boolean) {
    localStorage.setItem("navBar", option.toString());
    this.navBar.next(option);
  }

  getLocalStorageItem(item: string): boolean {
    if (
      localStorage.getItem(item) == null ||
      localStorage.getItem(item) == "null" ||
      localStorage.getItem(item) == "false"
    ) {
      return false;
    } else {
      return true;
    }
  }
}
