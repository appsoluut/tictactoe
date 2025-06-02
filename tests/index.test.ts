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
});
