import { Component, inject, computed } from '@angular/core';
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
export class Header {
  private authService = inject(Auth);
  private router = inject(Router);

  // ✅ ריאקטיבי לחלוטין
  isAuthenticated = computed(() => this.authService.isLoggedInSignal());
  userName = computed(() => this.authService.currentUserValue()?.name || 'משתמש');

  showUserMenu = false;

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.showUserMenu = false;
  }
}
