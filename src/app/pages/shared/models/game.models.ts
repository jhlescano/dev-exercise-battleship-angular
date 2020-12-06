import { BehaviorSubject } from 'rxjs';

enum Rows { a = 'a', b = 'b', c = 'c', d = 'd', e = 'e', f = 'f', g = 'g', h = 'h', i = 'i', j = 'j' };

type BoardState = {
  [id in Rows]: BoardColums;
};

type BoardColums = {
  [id: number]: BoardCell;
};

export type GameDifficulty = {
  id: string,
  label: string,
  maxTurns: number,
}

type Coordinates = {
  x: Rows;
  y: number;
};

export type BoardCell = {
  state: 'hidden' | 'revealed';
  type: 'ship' | 'sunked-ship' | 'water';
} & Coordinates;

type GameState = 'running' | 'won' | 'lost';

type ShipDistribution = Coordinates[][];

type Ship = {
  id: string,
  cells: BoardCell[],
  state: 'live' | 'sunk',
}

export class Game {
  ships: Ship[];
  boardState: BoardState;
  difficulty: GameDifficulty;
  startTime: Date;
  endTime: Date;

  private _turnCount: number = 0;
  private _gameState = new BehaviorSubject<GameState>('running');

  get turns() {
    return this._turnCount;
  }

  get gameEnded() {
    return this._gameState.asObservable();
  }

  get allShipsSunk() {
    // if some cell of type ship is hidden then false
    return this.ships.every(s => s.state === 'sunk');
  }

  constructor(difficulty: GameDifficulty) {
    this.difficulty = difficulty;
    this.startTime = new Date();
    this._initGameBoard();
  }

  hitCell(cell: BoardCell) {
    if (cell.state === 'hidden' && this._gameState.value === 'running') {
      cell.state = 'revealed';

      if (cell.type === 'ship') {
        //find ship with cell reference
        const ship = this.ships.find(s => {
          return !!s.cells.find(c => c === cell);
        });

        // if every cell of the ship has been hit, sunk ship
        if (ship.cells.every(c => c.type === 'ship' && c.state === 'revealed')) {
          ship.cells.map(c => c.type = 'sunked-ship');
          ship.state = 'sunk';
        }
      }

      this._turnCount++;
      this.evaluateGameState();
    }
  }

  evaluateGameState() {
    // all ships sunk?
    if (this.allShipsSunk) {
      this.endTime = new Date();
      return this._gameState.next('won');
    }

    // max turns reached
    if (this._turnCount === this.difficulty.maxTurns) {
      this.endTime = new Date();
      return this._gameState.next('lost');
    }
  }

  private _initGameBoard() {
    const gameBoard = {};

    //initialize board
    Object.keys(Rows).map((row) => {
      gameBoard[row] = {};

      Object.keys(Rows).map((val, i) => {
        const cell: BoardCell = {
          x: Rows[row],
          y: i,
          state: 'hidden',
          type: 'water'
        }
        gameBoard[row][i] = cell;
      });
    });

    //generate ships and place on board
    const ships = this.getRandomShipDistribution();
    this.ships = [];

    ships.forEach((shipCells, index) => {
      //get cells ref
      const cells: BoardCell[] = [];
      shipCells.forEach(c => {
        const cell = (gameBoard as BoardState)[c.x][c.y];
        cell.type = 'ship';
        cells.push(cell);
      });

      this.ships.push({
        id: `ship_${index+1}_${shipCells.length}`,
        cells,
        state: 'live',
      });
    });

    this.boardState = gameBoard as BoardState;
  }

  private getRandomShipDistribution(): ShipDistribution {

    const shipList = [
      { amount: 1, size: 4 },
      { amount: 2, size: 3 },
      { amount: 3, size: 2 },
      { amount: 4, size: 1 }
    ];

    const rows = Object.keys(Rows);
    const columns = Object.keys(Rows).map((v, i) => i);

    const ships: ShipDistribution = [];

    shipList.forEach(ship => {
      for (let i = 0; i < ship.amount; i++) {

        let cells: Coordinates[];
        do {
          //random direction
          const d = Math.floor(Math.random() * 2); // 0 = vertical, 1 = horizontal

          const first = d ? rows : columns;
          const second = d ? columns : rows;

          const rngFirst = Math.floor(Math.random() * first.length);
          const rngSecond = Math.floor(Math.random() * (second.length - ship.size + 1));

          cells = new Array(ship.size).fill({ }).map((cell, i) => {
            const c = { x: undefined, y: undefined };
            c[d ? 'x' : 'y'] = first[rngFirst];
            c[d ? 'y' : 'x'] = second[rngSecond + i];

            return c;
          });

        } while (this.shipCollapse(ships, cells));

        ships.push(cells);
      }
    });

    return ships;
  }

  private shipCollapse(ships: any[], cells: Coordinates[]) {
    return ships.find(ship => {
      return ship.some(c => !!cells.find(selected => {
        return selected.x === c.x && selected.y === c.y;
      }));
    });
  }
}
