import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from './services/auth';
import { BaseService } from './services/base.service';
import { catchError, throwError } from 'rxjs';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);
  const baseService = inject(BaseService); // הזרקנו את הבייס כדי להשתמש ב-checkHealth אם צריך
  const token = authService.getToken();

  let cloned = req;
  if (token) {
    cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(cloned).pipe(
    catchError((error: HttpErrorResponse) => {
      // אם יש שגיאה (0 זה אומר שהשרת לא עונה בכלל)
      if (error.status === 0) {
        // כאן אפשר לקרוא ל-checkHealth כדי לוודא
        baseService.checkHealth().subscribe({
          error: () => alert('⚠️ אופס! השרת כבוי לגמרי. אי אפשר לבצע פעולות.')
        });
      } 
      
      // אם זה 404 - הכתובת בסרוויס לא נכונה
      else if (error.status === 404) {
        console.error('❌ הכתובת לא נמצאה:', req.url);
      }

      return throwError(() => error);
    })
  );
};