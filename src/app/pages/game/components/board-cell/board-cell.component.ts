import { Component, Input, OnInit } from '@angular/core';
import { BoardCell } from 'src/app/pages/shared/models/game.models';
import { GameService } from 'src/app/pages/shared/services/game.service';

@Component({
  selector: 'app-board-cell',
  templateUrl: './board-cell.component.html',
  styleUrls: ['./board-cell.component.sass'],
})
export class BoardCellComponent implements OnInit {

  @Input() cell: BoardCell;

  constructor(private gameService: GameService) { }

  ngOnInit(): void { }

  reveal() {
    this.gameService.gameState.value.hitCell(this.cell);
  }
}
