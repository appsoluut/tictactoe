import { TicTacToeGame } from '@/index';

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

  test('validate if player X can fill cell in row 1 column 1', () => {
    const expectedOutput =
      `Game Board Creation...\n` +
      `X| | \n` +
      `-+-+-\n` +
      ` | | \n` +
      `-+-+-\n` +
      ` | | \n` +
      `\n` +
      `Board Created.\n` +
      `The game will start with player X`;

    let tictactoe = new TicTacToeGame();
    tictactoe.mark({ column: 1, row: 1 });

    expect(tictactoe.display()).toBe(expectedOutput);
  });
});
