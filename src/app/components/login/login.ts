import { Component, inject, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
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
  isLoading = false; // חיווי טעינה

  isLoggedIn = computed(() => this.authService.isLoggedInSignal());

  constructor() {
    if (this.isLoggedIn()) {
      this.router.navigate(['/teams']);
    }
  }

  onSubmit() {
    if (this.email && this.password) {
      this.isLoading = true; // הפעלת טעינה
      
      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.router.navigate(['/teams']);
        },
        error: (err) => {
          this.isLoading = false;
          alert('אופס! המייל או הסיסמה לא נכונים.');
        },
      });
    }
  }
}