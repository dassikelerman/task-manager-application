import { Component, inject, OnInit } from '@angular/core';  // ← שימי לב! הוספתי OnInit
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {  // ← הוספתי implements OnInit
  private authService = inject(Auth);
  private router = inject(Router);
  email = '';
  password = '';

  ngOnInit() {
    // בודק אם המשתמש כבר מחובר
    if (this.authService.isLoggedInSignal()) {
      this.router.navigate(['/teams']);
    }
  }

  onSubmit() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
          this.router.navigate(['/teams']);
        },
        error: (err) => {
          alert('אופס! המייל או הסיסמה לא נכונים.');
        }
      });
    }
  }
}
