import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Game, GameDifficulty } from '../models/game.models';

export type GameRecord = {
  start: Date,
  end: Date,
  turns: number,
  accuracy: number,
  status: string,
}

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
    this.router.navigateByUrl('pages/finished-games');
  }

  getGameRecords(): GameRecord[] {
    const recordsVal = localStorage.getItem('battleship-game-record');

    const records = recordsVal && JSON.parse(recordsVal) || [];

    return records;
  }

  private subscribeRecord(game: Game) {
    game.gameEnded.subscribe(gr => {
      if (gr !== 'running') {
        this.recordGame(gr, game);
      }
    });
  }

  private recordGame(gameStatus, game: Game) {

    let hit = 0
    let miss = 0;

    Object.values(game.boardState).forEach(row => {
      Object.values(row).forEach(cell => {
        if (cell.state === 'revealed') {
          if (cell.type === 'water')
            miss++;
          else
            hit++;
        }
      })
    });

    console.log('ACCURACY', game.turns, hit, miss);

    const gameResult: GameRecord = {
      start: game.startTime,
      end: game.endTime,
      turns: game.turns,
      accuracy: hit/game.turns,
      status: gameStatus,
    };

    const recordsVal = localStorage.getItem('battleship-game-record');

    const records = recordsVal && JSON.parse(recordsVal) || [];

    records.push(gameResult);

    localStorage.setItem('battleship-game-record', JSON.stringify(records));
  }
}
