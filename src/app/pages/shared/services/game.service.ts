import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Game, GameDifficulty } from '../models/game.models';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  gameState: Game;

  constructor(private router: Router) {}

  startNewGame(difficulty: GameDifficulty) {
    console.log('START GAME!', difficulty);
    this.gameState = new Game(difficulty);
    this.router.navigate(['pages/game']);
  }
}
