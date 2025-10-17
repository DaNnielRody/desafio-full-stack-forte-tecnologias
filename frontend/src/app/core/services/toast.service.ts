import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: number;
  type: ToastType;
  text: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly toastsSubject = new BehaviorSubject<ToastMessage[]>([]);
  readonly toasts$ = this.toastsSubject.asObservable();
  private nextId = 1;

  show(message: string, type: ToastType = 'info', durationMs = 3000): void {
    const toast: ToastMessage = { id: this.nextId++, type, text: message };
    const current = this.toastsSubject.getValue();
    this.toastsSubject.next([...current, toast]);
    if (durationMs > 0) {
      setTimeout(() => this.dismiss(toast.id), durationMs);
    }
  }

  success(message: string, durationMs = 2500): void {
    this.show(message, 'success', durationMs);
  }

  error(message: string, durationMs = 4000): void {
    this.show(message, 'error', durationMs);
  }

  dismiss(id: number): void {
    const next = this.toastsSubject.getValue().filter((t) => t.id !== id);
    this.toastsSubject.next(next);
  }
}
