import { Cell, TicTacToeGame } from '@/index';

describe('Tic-Tac-Toe should', () => {
  test('create an empty game board and start with player X', () => {
    const expectedOutput =
      `Game Board Creation...\n` +
      ` | | \n` +
      `-+-+-\n` +
      ` | | \n` +
      `-+-+-\n` +
      ` | | \n` +
      `\n` +
      `Board Created.\n` +
      `The game will start with player X`;

    let tictactoe = new TicTacToeGame();

    expect(tictactoe.display()).toBe(expectedOutput);
  });

  test('validate if player X can fill cell in row 0 column 0', () => {
    // X| |
    // -+-+-
    //  | |
    // -+-+-
    //  | |
    const expectedBoard = [
      [Cell.X, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
    ];

    let tictactoe = new TicTacToeGame();
    tictactoe.mark({ column: 0, row: 0 });

    expect(tictactoe.getBoard()).toStrictEqual(expectedBoard);
  });

  test('validate if player O can fill cell in row 2 column 2', () => {
    // X| |
    // -+-+-
    //  | |
    // -+-+-
    //  | |O
    const expectedBoard = [
      [Cell.X, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
      [Cell.EMPTY, Cell.EMPTY, Cell.O],
    ];

    let tictactoe = new TicTacToeGame();
    tictactoe.mark({ column: 0, row: 0 });
    tictactoe.mark({ column: 2, row: 2 });

    expect(tictactoe.getBoard()).toStrictEqual(expectedBoard);
  });
});
