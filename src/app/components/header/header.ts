import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {
  private authService = inject(Auth);
  private router = inject(Router);
  
  userName: string = '';
  isAuthenticated: boolean = false;
  showUserMenu: boolean = false;
  
  ngOnInit() {
    this.isAuthenticated = this.authService.isLoggedInSignal();
    
    const currentUser = this.authService.currentUserValue();
    if (currentUser) {
      this.userName = currentUser.name || 'משתמש';
    }
  }
  
  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.showUserMenu = false;
  }
}
