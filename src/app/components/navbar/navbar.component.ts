import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isPushMenuOpen = false;

  closePushMenu() {
    this.isPushMenuOpen = !this.isPushMenuOpen;
  
  } 
  localStrogeClean(){
    localStorage.clear();
  }
}
