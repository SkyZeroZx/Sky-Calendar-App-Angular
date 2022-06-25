import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private router: Router){
    console.log('App COmponent');
 
  }


  ngOnInit() {
    this.router.navigate(["/login"]);
  }


}