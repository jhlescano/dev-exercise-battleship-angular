import { Component, OnInit } from '@angular/core';
import { GameRecord, GameService } from '../shared/services/game.service';

@Component({
  selector: 'app-finished-games',
  templateUrl: './finished-games.component.html',
  styleUrls: ['./finished-games.component.sass']
})
export class FinishedGamesComponent implements OnInit {

  games: GameRecord[] = [];
  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.games = this.gameService.getGameRecords().sort((a, b) => a.start < b.start ? 1 : -1);
  }

}
