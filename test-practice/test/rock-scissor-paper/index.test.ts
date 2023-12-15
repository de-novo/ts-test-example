import createRockScissorPaper from "@src/rock-scissor-paper";

describe("rock-scissor-paper", () => {
  let rockSissorPaperGame: ReturnType<typeof createRockScissorPaper>;

  //Arrange
  beforeEach(() => {
    rockSissorPaperGame = createRockScissorPaper();
  });

  describe("play", () => {
    describe("output: draw", () => {
      const expected = "draw";
      it("player1 rock - player2 rock: draw", () => {
        // Act
        const actual = rockSissorPaperGame("rock", "rock");

        // Assert
        expect(actual).toEqual(expected);
      });

      it("player1 scissor - player2 scissor: draw", () => {
        // Act
        const actual = rockSissorPaperGame("scissor", "scissor");

        // Assert
        expect(actual).toEqual(expected);
      });

      it("player1 paper - player2 paper: draw", () => {
        // Act
        const actual = rockSissorPaperGame("paper", "paper");

        // Assert
        expect(actual).toEqual(expected);
      });
    });

    describe("output: player1 win", () => {
      const expected = "player1 win";

      it("player1 rock - player2 scissor: player1 win", () => {
        // Act
        const actual = rockSissorPaperGame("rock", "scissor");

        // Assert
        expect(actual).toEqual(expected);
      });

      it("player1 scissor - player2 paper: player1 win", () => {
        // Act
        const actual = rockSissorPaperGame("scissor", "paper");

        // Assert
        expect(actual).toEqual(expected);
      });

      it("player1 paper - player2 rock: player1 win", () => {
        // Act
        const actual = rockSissorPaperGame("paper", "rock");

        // Assert
        expect(actual).toEqual(expected);
      });
    });

    describe("output: player1 lose", () => {
      const expected = "player1 lose";
      it("player1 rock - player2 paper: player1 lose", () => {
        // Act
        const actual = rockSissorPaperGame("rock", "paper");

        // Assert
        expect(actual).toEqual(expected);
      });

      it("player1 scissor - player2 rock: player1 lose", () => {
        // Act
        const actual = rockSissorPaperGame("scissor", "rock");

        // Assert
        expect(actual).toEqual(expected);
      });

      it("player1 paper - player2 scissor: player1 lose", () => {
        // Act
        const actual = rockSissorPaperGame("paper", "scissor");

        // Assert
        expect(actual).toEqual(expected);
      });
    });
  });
});
