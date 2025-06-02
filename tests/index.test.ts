import { Cell, GameState, Player, TicTacToeGame, TicTacToeState } from '@/index';

describe(`Tic-Tac-Toe should`, () => {
  test(`create an empty game board and start with player X [#US-1]`, () => {
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

  test(`validate if player X can mark cell in row 0 column 0`, () => {
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

  test(`validate if player O can mark cell in row 2 column 2`, () => {
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

  test(`validate if a player can't overwrite already marked cell`, () => {
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
    tictactoe.mark({ column: 0, row: 0 });

    expect(tictactoe.getBoard()).toStrictEqual(expectedBoard);
  });

  test(`validate if player O wins if horizontal line is all marked with O's (US-3)`, () => {
    // X| |X
    // -+-+-
    // O|O|O
    // -+-+-
    // X| |
    const expectedBoard = [
      [Cell.X, Cell.EMPTY, Cell.X],
      [Cell.O, Cell.O, Cell.O],
      [Cell.X, Cell.EMPTY, Cell.EMPTY],
    ];
    const expectedState = new GameState(TicTacToeState.COMPLETED, Player.O);

    let tictactoe = new TicTacToeGame();
    tictactoe.mark({ column: 0, row: 0 }); // 0: X| |
    tictactoe.mark({ column: 0, row: 1 }); // 1: O| |
    tictactoe.mark({ column: 2, row: 0 }); // 0: X| |X
    tictactoe.mark({ column: 1, row: 1 }); // 1: O|O|
    tictactoe.mark({ column: 0, row: 2 }); // 2: X| |
    tictactoe.mark({ column: 2, row: 1 }); // 1: O|O|O

    expect(tictactoe.getBoard()).toStrictEqual(expectedBoard);
    expect(tictactoe.getState()).toStrictEqual(expectedState);
  });

  test(`validate if player X wins if horizontal line is all marked with X's (US-2)`, () => {
    // X| |
    // -+-+-
    // X|O|
    // -+-+-
    // X| |O
    const expectedBoard = [
      [Cell.X, Cell.EMPTY, Cell.EMPTY],
      [Cell.X, Cell.O, Cell.EMPTY],
      [Cell.X, Cell.EMPTY, Cell.O],
    ];
    const expectedState = new GameState(TicTacToeState.COMPLETED, Player.X);

    let tictactoe = new TicTacToeGame();
    tictactoe.mark({ column: 0, row: 0 }); // 0: X| |
    tictactoe.mark({ column: 1, row: 1 }); // 1:  |O|
    tictactoe.mark({ column: 0, row: 1 }); // 1: X| |
    tictactoe.mark({ column: 2, row: 2 }); // 2:  | |O
    tictactoe.mark({ column: 0, row: 2 }); // 2: X| |

    expect(tictactoe.getBoard()).toStrictEqual(expectedBoard);
    expect(tictactoe.getState()).toStrictEqual(expectedState);
  });
});
