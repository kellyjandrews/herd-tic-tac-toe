export type Mark = "X" | "O";
export type Mode = "computer" | "two-player";
export type Board = (Mark | null)[];

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function getWinner(board: Board): Mark | null {
  for (const [first, second, third] of winningLines) {
    if (board[first] && board[first] === board[second] && board[first] === board[third]) {
      return board[first];
    }
  }
  return null;
}

export function isDraw(board: Board): boolean {
  return getWinner(board) === null && board.every((square) => square !== null);
}

export function getComputerMove(board: Board, computer: Mark): number | null {
  if (getWinner(board) || isDraw(board)) {
    return null;
  }

  const opponent: Mark = computer === "X" ? "O" : "X";

  function scorePosition(position: Board, turn: Mark, depth: number): number {
    const winner = getWinner(position);
    if (winner === computer) return 10 - depth;
    if (winner === opponent) return depth - 10;
    if (position.every((square) => square !== null)) return 0;

    const scores = position.flatMap((square, index) => {
      if (square !== null) return [];
      const next = [...position];
      next[index] = turn;
      return [scorePosition(next, turn === computer ? opponent : computer, depth + 1)];
    });

    return turn === computer ? Math.max(...scores) : Math.min(...scores);
  }

  let bestMove: number | null = null;
  let bestScore = Number.NEGATIVE_INFINITY;

  board.forEach((square, index) => {
    if (square !== null) return;
    const next = [...board];
    next[index] = computer;
    const score = scorePosition(next, opponent, 1);
    if (score > bestScore) {
      bestScore = score;
      bestMove = index;
    }
  });

  return bestMove;
}
