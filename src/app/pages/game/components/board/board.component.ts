import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/pages/shared/models/game.models';
import { GameService } from 'src/app/pages/shared/services/game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {
  game: Game;
  headers: number[];

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.gameService.currentGame.subscribe(g => {
      this.game = g;
    });

    this.headers = Object.keys(this.game.boardState).map((v, i) => i);
    this.headers.unshift(null);
  }

}
