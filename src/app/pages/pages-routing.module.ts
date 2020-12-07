import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinishedGamesComponent } from './finished-games/finished-games.component';
import { GameSetupComponent } from './game-setup/game-setup.component';
import { GameComponent } from './game/game.component';
import { PagesComponent } from './pages.component';
import { GameGuard } from './shared/guards/game.guard';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'game-setup',
        component: GameSetupComponent
      },
      {
        path: 'game',
        component: GameComponent,
        canActivate: [GameGuard],
      },
      {
        path: 'finished-games',
        component: FinishedGamesComponent
      },
      {
        path: '',
        redirectTo: 'game-setup',
        pathMatch: 'full'
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
