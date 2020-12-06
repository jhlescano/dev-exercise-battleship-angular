import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Game, GameDifficulty } from '../models/game.models';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  gameState = new BehaviorSubject<Game>(null);
  private selectedDifficulty: GameDifficulty;

  get currentGame() {
    return this.gameState.asObservable();
  };

  constructor(private router: Router) {}

  startNewGame(difficulty: GameDifficulty) {
    this.selectedDifficulty = difficulty;

    const game = new Game(difficulty);
    this.subscribeRecord(game);
    this.gameState.next(game);

    this.router.navigate(['pages/game']);
  }

  restartGame() {
    const game = new Game(this.selectedDifficulty);
    this.subscribeRecord(game);
    this.gameState.next(game);
  }

  goHome() {
    this.gameState.next(null);
    this.router.navigateByUrl('pages/game-setup');
  }

  goToMatchHistory() {
    this.gameState.next(null);
    this.router.navigateByUrl('pages/finided-games');
  }

  private subscribeRecord(game: Game) {
    game.gameEnded.subscribe(gr => {
      if (gr !== 'running') {
        this.recordGame(gr, game);
      }
    });
  }

  private recordGame(gameStatus, game: Game) {
    const gameResult = {
      start: game.startTime,
      end: game.endTime,
      turns: game.turns,
      accuracy: game.turns/Math.max(game.turns, game.difficulty.maxTurns),
      status: gameStatus,
    };

    const recordsVal = localStorage.getItem('battleship-game-record');

    const records = recordsVal && JSON.parse(recordsVal) || [];

    records.push(gameResult);

    localStorage.setItem('battleship-game-record', JSON.stringify(records));
  }
}
