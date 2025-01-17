import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { GameService } from '../services/game.service';

@Injectable({
  providedIn: 'root',
})
export class GameGuard implements CanActivate {
  constructor(private gameService: GameService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.gameService.gameState.value) {
      this.router.navigate(['pages/finished-games']);
      return false;
    }

    return true;
  }
}
