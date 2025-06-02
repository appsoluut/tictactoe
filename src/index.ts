type Coordinates = {
  row: number;
  column: number;
};

type Draw = `draw`;

export enum Player {
  X = `X`,
  O = `O`,
}

export enum Cell {
  EMPTY = ` `,
  X = `X`,
  O = `O`,
}

export enum TicTacToeState {
  INITIALIZED,
  IN_PROGRESS,
  COMPLETED,
}

export class GameState {
  state: TicTacToeState = TicTacToeState.INITIALIZED;
  winner: Player | Draw | undefined = undefined;

  constructor(state: TicTacToeState, winner: Player | Draw | undefined = undefined) {
    this.state = state;
    this.winner = winner;
  }
}

export class TicTacToeGame {
  private rows: number = 3;
  private columns: number = 3;
  private player: Player = Player.X;
  private board: Cell[][] = new Array(this.rows)
    .fill(Cell.EMPTY)
    .map(() => new Array(this.columns).fill(Cell.EMPTY));
  private gameState: GameState = new GameState(TicTacToeState.INITIALIZED);

  mark({ row, column }: Coordinates) {
    if (this.board[row][column] != Cell.EMPTY) {
      return;
    }
    this.board[row][column] = this.player == Player.X ? Cell.X : Cell.O;
    this.player = this.player == Player.X ? Player.O : Player.X;
    this.checkSolutions();
  }

  private checkSolutions() {
    let winner: Player | Draw | undefined = undefined;
    // check horizontal (rows)
    this.board.forEach((row) => {
      Object.values(Player).forEach((player) => {
        let check = player == Player.X ? Cell.X : Cell.O;
        if (row.every((cell) => cell == check)) {
          winner = player;
        }
      });
    });

    // check vertical (columns)
    for (let column = 0; column < this.columns; column++) {
      Object.values(Player).forEach((player) => {
        let check = player == Player.X ? Cell.X : Cell.O;
        if (this.board.every((row) => row[column] == check)) {
          winner = player;
        }
      });
    }

    if (winner != undefined) {
      this.gameState.state = TicTacToeState.COMPLETED;
      this.gameState.winner = winner;
    } else {
      this.gameState.state = TicTacToeState.IN_PROGRESS;
    }
  }

  getBoard(): Cell[][] {
    return this.board;
  }

  getState(): GameState {
    return this.gameState;
  }

  display(): string {
    return (
      `Game Board Creation...\n` +
      ` | | \n` +
      `-+-+-\n` +
      ` | | \n` +
      `-+-+-\n` +
      ` | | \n` +
      `\n` +
      `Board Created.\n` +
      `The game will start with player X`
    );
  }
}
