import { Component, OnInit } from '@angular/core';
import { GameDifficulty } from '../shared/models/game.models';
import { GameService } from '../shared/services/game.service';

type DifficultyOption = GameDifficulty & {
  class: string,
  selectedClass: string,
}

@Component({
  selector: 'app-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.sass']
})
export class GameSetupComponent implements OnInit {

  difficulties: DifficultyOption[] = [
    {
      id: 'easy',
      label: 'easy',
      maxTurns: null,
      class: 'btn-outline-success',
      selectedClass: 'btn-success'
    },
    {
      id: 'medium',
      label: 'medium',
      maxTurns: 100,
      class: 'btn-outline-warning',
      selectedClass: 'btn-warning'
    },
    {
      id: 'hard',
      label: 'hard',
      maxTurns: 50,
      class: 'btn-outline-danger',
      selectedClass: 'btn-danger'
    },
  ];

  selectedDifficulty: GameDifficulty;
  customValue: number;
  errorMsg: string;

  get validSetup() {
    if (!this.selectedDifficulty) {
      //no difficulty selected
      this.errorMsg = 'select a difficulty';
      return false;
    } else if (this.selectedDifficulty.id === 'custom' && this.selectedDifficulty.maxTurns <= 0) {
      //custom difficulty with invalid amount of turns
      this.errorMsg = 'invalid amount of turns';
      return false;
    } else {
      // valid setup
      this.errorMsg = null;
      return true;
    }
  }

  constructor(private gameService: GameService) { }

  ngOnInit(): void {}

  setDifficulty(difficulty: GameDifficulty) {
    this.selectedDifficulty = difficulty;
    this.customValue = null;
    this.validSetup;
  }

  customDiffulty(amount) {
    this.selectedDifficulty = {
      id: 'custom',
      label: 'custom',
      maxTurns: amount,
    };
    this.validSetup;
  }

  startGame() {
    if (!this.validSetup) return;

    //init game
    this.gameService.startNewGame(this.selectedDifficulty);
  }

}
