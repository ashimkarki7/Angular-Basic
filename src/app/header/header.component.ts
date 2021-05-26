import { Component, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router ) { }

  getItem ( item ) {
    let myName: { email: any };
    myName =  JSON.parse(localStorage.getItem(item));
    return myName.email;
  }

  logOut() {
    this.router.navigate(['/login']);
    localStorage.clear();
    // window.location.reload();
    setTimeout(function() { window.location.reload(); }, 1000);
  }

}
