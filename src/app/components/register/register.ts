import { Component, inject, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private authService = inject(Auth);
  private router = inject(Router);

  name = '';
  email = '';
  password = '';
  isLoading = false; // חיווי טעינה

  isAuthenticated = computed(() => this.authService.isLoggedInSignal());

  constructor() {
    if (this.isAuthenticated()) {
      this.router.navigate(['/teams']);
    }
  }

  onSubmit() {
    if (this.name && this.email && this.password) {
      this.isLoading = true; // הפעלת מצב טעינה
      
      this.authService.register(this.name, this.email, this.password).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/teams']);
        },
        error: () => {
          this.isLoading = false;
          alert('אופס! ההרשמה נכשלה. נסה שוב.');
        }
      });
    }
  }
}