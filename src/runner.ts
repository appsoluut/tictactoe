import { TicTacToeGame, TicTacToeState } from './index';

let positions: number[] = [...Array(9).keys()];

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  let tictactoe = new TicTacToeGame();
  console.log(tictactoe.display());

  if (tictactoe.getState().state != TicTacToeState.COMPLETED) {
    await sleep(2000);
    console.log(`\n\n---------------\n\n`);
  }

  do {
    let index = Math.floor(Math.random() * positions.length);
    let field = remove(index);
    let row = Math.floor(field / 3);
    let column = field % 3;

    tictactoe.mark({ row, column });

    console.log(tictactoe.display());

    if (tictactoe.getState().state != TicTacToeState.COMPLETED) {
      await sleep(2000);
      console.log(`\n\n---------------\n\n`);
    }
  } while (
    tictactoe.getState().state == TicTacToeState.IN_PROGRESS ||
    tictactoe.getState().state == TicTacToeState.INITIALIZED
  );
}

function remove(index: number): number {
  if (index > -1) {
    let value = positions[index];
    positions.splice(index, 1);
    return value;
  }
  return 0;
}

main();
