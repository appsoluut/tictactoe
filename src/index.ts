type Coordinates = {
  row: number;
  column: number;
};

export class TicTacToeGame {
  private rows: number = 3;
  private columns: number = 3;
  private player: Player = Player.X;
  private board: Cell[][] = new Array(this.rows)
    .fill(Cell.EMPTY)
    .map(() => new Array(this.columns).fill(Cell.EMPTY));

  mark({ row, column }: Coordinates) {
    this.board[row][column] = Cell.X;
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

export enum Player {
  X = `X`,
  O = `O`,
}

export enum Cell {
  EMPTY = ` `,
  X = `X`,
  O = `O`,
}
