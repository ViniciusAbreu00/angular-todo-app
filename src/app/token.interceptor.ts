import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const route = new Router();
  const token = localStorage.getItem('BEARER_TOKEN');
  const cloneRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(cloneRequest).pipe(
    catchError((err) => {
      route.navigate(['/']);
      throw new Error(err);
    })
  );
};
