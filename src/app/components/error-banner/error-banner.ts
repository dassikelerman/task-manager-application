import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorService } from '../../services/error.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error-banner',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './error-banner.html',
  styleUrls: ['./error-banner.css']
})
export class ErrorBanner {
  private err = inject(ErrorService);
  message = computed(() => this.err.message());

  close() {
    this.err.clear();
  }
}
