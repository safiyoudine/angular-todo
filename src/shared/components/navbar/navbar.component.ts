import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { StorageService } from '../../../app/auth/services/storage/storage.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isAdminLoggedIn:boolean=StorageService.isAdminLoggedIn();
  constructor(private router:Router){}

  ngOnInit(){
    this.router.events.subscribe(event=>{
      this.isAdminLoggedIn=StorageService.isAdminLoggedIn();
    })
  }

  logout(){
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }
}
