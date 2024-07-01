import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { map } from 'rxjs';

/**
 * A guard that checks if the user is authenticated before allowing access to a route.
 * @param _route - The activated route snapshot.
 * @param _state - The router state snapshot.
 * @returns An Observable<boolean> indicating whether the user is authenticated or not.
 */
export const authGuard: CanActivateFn = (_route, _state) => {
  const authService = inject(AuthService);

  return authService.currentAuth$.pipe(
    map((auth) => {
      return auth != null;
    })
  );
};
