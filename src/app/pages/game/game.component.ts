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

      this.game.gameEnded.subscribe(state => {
        if (state !== 'running') {
          console.log('Game Ended!', state);
          Swal.fire({
            titleText: 'Congratulations!',
            text: 'you won the game!',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: true,
            confirmButtonText: 'Home',
            confirmButtonColor: '#0083b9',
            showDenyButton: true,
            denyButtonText: 'Play Again',
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
