import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { GameSetupComponent } from './game-setup/game-setup.component';
import { GameComponent } from './game/game.component';
import { FinishedGamesComponent } from './finished-games/finished-games.component';
import { FormsModule } from '@angular/forms';
import { BoardComponent } from './game/components/board/board.component';
import { BoardCellComponent } from './game/components/board-cell/board-cell.component';


@NgModule({
  declarations: [PagesComponent, GameSetupComponent, GameComponent, FinishedGamesComponent, BoardComponent, BoardCellComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
  ]
})
export class PagesModule { }
