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
      if (row.every((cell) => cell == Cell.X)) {
        winner = Player.X;
      } else if (row.every((cell) => cell == Cell.O)) {
        winner = Player.O;
      }
    });

    // check vertical (columns)
    this.board.forEach((row, index) => {

    });

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
