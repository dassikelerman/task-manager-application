import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  private _message = signal<string | null>(null);

  // public readonly message signal for components to read
  message = this._message;

  show(msg: string) {
    this._message.set(msg);
    // auto-hide after 6s
    setTimeout(() => this.clear(), 6000);
  }

  clear() {
    this._message.set(null);
  }
}
