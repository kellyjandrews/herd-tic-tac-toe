import { describe, expect, it } from "vitest";
import { type Board, getComputerMove, getWinner, isDraw } from "@/lib/game";

describe("tic-tac-toe rules", () => {
  it("finds a winner across rows, columns, and diagonals", () => {
    expect(getWinner(["X", "X", "X", null, "O", null, null, null, "O"])).toBe("X");
    expect(getWinner(["O", "X", null, "O", "X", null, "O", null, "X"])).toBe("O");
    expect(getWinner(["X", "O", null, "O", "X", null, null, null, "X"])).toBe("X");
  });

  it("recognizes a draw without treating a win as a draw", () => {
    const draw: Board = ["X", "O", "X", "X", "O", "O", "O", "X", "X"];
    expect(isDraw(draw)).toBe(true);
    expect(isDraw(["X", "X", "X", "O", "O", null, null, null, null])).toBe(false);
  });

  it("takes a winning move or blocks an immediate loss", () => {
    expect(getComputerMove(["O", "O", null, "X", "X", null, null, null, null], "O")).toBe(2);
    expect(getComputerMove(["X", "X", null, null, "O", null, null, null, null], "O")).toBe(2);
  });

  it("does not choose a move after the game is over", () => {
    expect(getComputerMove(["X", "X", "X", null, "O", null, null, null, null], "O")).toBeNull();
    expect(getComputerMove(["X", "O", "X", "X", "O", "O", "O", "X", "X"], "O")).toBeNull();
  });
});
