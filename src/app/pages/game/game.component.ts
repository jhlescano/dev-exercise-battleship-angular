import { Component, OnInit } from '@angular/core';
import { GameService } from '../shared/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass'],
})
export class GameComponent implements OnInit {
  get game() {
    return this.gameService.gameState;
  }

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.game.gameEnded.subscribe(state => {
      if (state !== 'running') {
        console.log('Game Ended!', state);
      }
    })
  }
}
