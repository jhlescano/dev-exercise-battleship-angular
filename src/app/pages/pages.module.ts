import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { GameSetupComponent } from './game-setup/game-setup.component';
import { GameComponent } from './game/game.component';
import { FinishedGamesComponent } from './finished-games/finished-games.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PagesComponent, GameSetupComponent, GameComponent, FinishedGamesComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
  ]
})
export class PagesModule { }
