import { Component, inject } from '@angular/core';
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

  onSubmit() {
    if (this.name && this.email && this.password) {
      this.authService.register(this.name, this.email, this.password).subscribe({
        next: (response) => {
          this.router.navigate(['/teams']);
        },
        error: (err) => {
          alert('אופס! ההרשמה נכשלה. נסה שוב.');
        }
      });
    }
  }
}
