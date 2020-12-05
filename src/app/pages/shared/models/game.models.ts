export type GameDifficulty = {
  id: string,
  label: string,
  maxTurns: number,
}

export class Game {
  difficulty: GameDifficulty;

  constructor(difficulty: GameDifficulty) {
    this.difficulty = difficulty;
  }
}
