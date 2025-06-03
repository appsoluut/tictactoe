type Coordinates = {
  row: number;
  column: number;
};

export type Draw = `draw`;

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

  private isFull(): boolean {
    for (let row in this.board) {
      if (this.board[row].some((cell) => cell == Cell.EMPTY)) {
        return false;
      }
    }
    return true;
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

    // check diagonal (\ or /)
    Object.values(Player).forEach((player) => {
      const check = player == Player.X ? Cell.X : Cell.O;
      if (this.board[0][0] == check && this.board[1][1] == check && this.board[2][2] == check) {
        winner = player;
      } else if (
        this.board[0][2] == check &&
        this.board[1][1] == check &&
        this.board[2][0] == check
      ) {
        winner = player;
      }
    });

    if (winner == undefined && this.isFull()) {
      winner = 'draw';
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
    let header: string = ``;
    switch (this.gameState.state) {
      case TicTacToeState.INITIALIZED: {
        header = `Game Board Creation...`;
        break;
      }
      case TicTacToeState.COMPLETED:
      case TicTacToeState.IN_PROGRESS: {
        const previousPlayer = this.player == Player.X ? Player.O : Player.X;
        header = `Player ${previousPlayer}:`;
        break;
      }
    }
    let footer: string = ``;
    switch (this.gameState.state) {
      case TicTacToeState.INITIALIZED: {
        footer = `Board Created.\n` + `The game will start with player ${this.player}`;
        break;
      }
      case TicTacToeState.IN_PROGRESS: {
        footer = `NEXT PLAYER ${this.player}`;
        break;
      }
      case TicTacToeState.COMPLETED: {
        if (this.gameState.winner == 'draw') {
          footer = `THE GAME ENDS WITH A DRAW!`;
        } else {
          footer = `PLAYER ${this.gameState.winner} WON!`;
        }
        break;
      }
    }

    let board: string = ``;
    for (let row in this.board) {
      board += this.board[row].join('|') + `\n`;
      if (Number(row) < this.board.length - 1) {
        board += `-+-+-\n`;
      }
    }

    return `${header}\n` + `${board}\n` + `${footer}`;
  }
}
