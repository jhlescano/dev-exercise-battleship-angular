import { Component, OnInit } from '@angular/core';
import { GameService } from '../shared/services/game.service';
import Swal from 'sweetalert2';
import { Game } from '../shared/models/game.models';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass'],
})
export class GameComponent implements OnInit {
  game: Game;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {

    this.gameService.currentGame.subscribe(game => {
      this.game = game;

      this.game?.gameEnded.subscribe(state => {
        const titleText = state === 'won' ? 'Congratulations!' : 'Game Over!';
        const text = state === 'won' ? 'you won the game!' : 'do you want to play again?';

        if (state !== 'running') {
          Swal.fire({
            titleText,
            text,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: true,
            confirmButtonText: 'Home',
            confirmButtonColor: '#0083b9',
            showDenyButton: true,
            denyButtonText: 'Try Again',
            denyButtonColor: '#196483',
            showCancelButton: true,
            cancelButtonText: 'Match History',
            cancelButtonColor: '#005073'
          }).then(r => {
            if (r.isConfirmed)
              this.gameService.goHome();
            if (r.isDenied)
              this.gameService.restartGame();
            if (r.isDismissed)
              this.gameService.goToMatchHistory();
          });
        }
      });
    });
  }
}
