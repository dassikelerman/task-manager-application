import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import {  computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  private authService = inject(Auth);
  private router = inject(Router);

  email = '';
  password = '';

  // ✅ signal ישיר מה־AuthService
  isLoggedIn = computed(() => this.authService.isLoggedInSignal());

  constructor() {
    // אם כבר מחובר, נווט מייד
    if (this.isLoggedIn()) {
      this.router.navigate(['/teams']);
    }
  }

  onSubmit() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
          // signal משתנה אוטומטית → Header יתעדכן
          this.router.navigate(['/teams']);
        },
        error: (err) => {
          alert('אופס! המייל או הסיסמה לא נכונים.');
        },
      });
    }
  }
}
