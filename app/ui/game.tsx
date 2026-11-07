"use client";

import { useState } from "react";
import { getComputerMove, getWinner, isDraw, type Mark, type Mode } from "@/lib/game";

const emptyBoard = (): (Mark | null)[] => Array<Mark | null>(9).fill(null);
const squares = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Game() {
  const [mode, setMode] = useState<Mode>("computer");
  const [board, setBoard] = useState<(Mark | null)[]>(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Mark>("X");

  const winner = getWinner(board);
  const draw = isDraw(board);
  const gameOver = winner !== null || draw;

  const status = winner
    ? mode === "computer"
      ? winner === "X"
        ? "You win!"
        : "Computer wins!"
      : `${winner} wins!`
    : draw
      ? "It's a draw!"
      : mode === "computer"
        ? currentPlayer === "X"
          ? "Your turn"
          : "Computer's turn"
        : `${currentPlayer}'s turn`;

  function resetGame(nextMode = mode) {
    setMode(nextMode);
    setBoard(emptyBoard());
    setCurrentPlayer("X");
  }

  function playSquare(index: number) {
    if (gameOver || board[index] !== null || (mode === "computer" && currentPlayer !== "X")) {
      return;
    }

    const nextBoard = [...board];
    nextBoard[index] = currentPlayer;

    if (mode === "computer" && !getWinner(nextBoard) && !isDraw(nextBoard)) {
      const computerMove = getComputerMove(nextBoard, "O");
      if (computerMove !== null) {
        nextBoard[computerMove] = "O";
      }
    } else if (mode === "two-player" && !getWinner(nextBoard) && !isDraw(nextBoard)) {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }

    setBoard(nextBoard);
  }

  return (
    <main className="page-shell">
      <header className="site-header">
        <a aria-label="Herd home" className="brand" href="/">
          <span aria-hidden="true" className="brand-mark">
            H
          </span>
          herd
        </a>
        <span className="header-label">A little friendly rivalry</span>
      </header>

      <section aria-labelledby="page-title" className="game-layout">
        <div className="intro">
          <p className="eyebrow">THE CLASSIC, REIMAGINED</p>
          <h1 id="page-title">
            Make your
            <br />
            <span>next move.</span>
          </h1>
          <p className="intro-copy">
            A quick game of Xs and Os. Challenge a friend or take on the computer.
          </p>
        </div>

        <section aria-label="Tic-tac-toe game" className="game-card">
          <div className="mode-switch">
            <button
              aria-pressed={mode === "computer"}
              className={mode === "computer" ? "mode-button selected" : "mode-button"}
              onClick={() => resetGame("computer")}
              type="button"
            >
              Vs. computer
            </button>
            <button
              aria-pressed={mode === "two-player"}
              className={mode === "two-player" ? "mode-button selected" : "mode-button"}
              onClick={() => resetGame("two-player")}
              type="button"
            >
              2 players
            </button>
          </div>

          <div aria-live="polite" className={`game-status${gameOver ? " finished" : ""}`}>
            <span aria-hidden="true" className="status-dot" />
            <span>{status}</span>
          </div>

          <fieldset aria-label="Tic-tac-toe board" className="board">
            {squares.map((squareNumber) => {
              const index = squareNumber - 1;
              const mark = board[index];
              return (
                <button
                  aria-label={`Square ${index + 1}${mark ? `, ${mark}` : ", empty"}`}
                  className={`square${mark ? ` mark-${mark.toLowerCase()}` : ""}`}
                  disabled={mark !== null || gameOver}
                  key={squareNumber}
                  onClick={() => playSquare(index)}
                  type="button"
                >
                  {mark}
                </button>
              );
            })}
          </fieldset>

          <div className="game-footer">
            <span>{mode === "computer" ? "You are X" : "X goes first"}</span>
            <button className="reset-button" onClick={() => resetGame()} type="button">
              <span aria-hidden="true">↻</span>
              New game
            </button>
          </div>
        </section>

        <aside className="how-to-play">
          <span aria-hidden="true" className="sparkle">
            ✳
          </span>
          <div>
            <h2>How to play</h2>
            <p>Get three of your marks in a row. Across, down, or diagonal. That’s it.</p>
          </div>
        </aside>
      </section>

      <footer className="site-footer">
        <span>GOOD GAMES, GOOD COMPANY.</span>
        <span>ONE MORE ROUND?</span>
      </footer>
    </main>
  );
}
