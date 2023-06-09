import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router: Router = inject(Router);
  return authService.userSubject.pipe(
    map((user: any) => {
      if(user){
        return true;
      } else{
        router.navigate(['/home']);
        return false;
      }
    })
  );

}
