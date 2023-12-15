import createRockScissorPaper from "@src/rock-scissor-paper";

describe("rock-scissor-paper", () => {
  describe("play", () => {
    describe("output: draw", () => {
      const expected = "draw";
      it("player1 rock - player2 rock: draw", () => {
        // Arrange
        const sut = createRockScissorPaper();

        // Act
        const actual = sut("rock", "rock");

        // Assert
        expect(actual).toEqual(expected);
      });

      it("player1 scissor - player2 scissor: draw", () => {
        // Arrange
        const sut = createRockScissorPaper();

        // Act
        const actual = sut("scissor", "scissor");

        // Assert
        expect(actual).toEqual(expected);
      });

      it("player1 paper - player2 paper: draw", () => {
        // Arrange
        const sut = createRockScissorPaper();

        // Act
        const actual = sut("paper", "paper");

        // Assert
        expect(actual).toEqual(expected);
      });
    });

    describe("output: player1 win", () => {
      const expected = "player1 win";

      it("player1 rock - player2 scissor: player1 win", () => {
        // Arrange
        const sut = createRockScissorPaper();

        // Act
        const actual = sut("rock", "scissor");

        // Assert
        expect(actual).toEqual(expected);
      });

      it("player1 scissor - player2 paper: player1 win", () => {
        // Arrange
        const sut = createRockScissorPaper();

        // Act
        const actual = sut("scissor", "paper");

        // Assert
        expect(actual).toEqual(expected);
      });

      it("player1 paper - player2 rock: player1 win", () => {
        // Arrange
        const sut = createRockScissorPaper();

        // Act
        const actual = sut("paper", "rock");

        // Assert
        expect(actual).toEqual(expected);
      });
    });

    describe("output: player1 lose", () => {
      const expected = "player1 lose";
      it("player1 rock - player2 paper: player1 lose", () => {
        // Arrange
        const sut = createRockScissorPaper();

        // Act
        const actual = sut("rock", "paper");

        // Assert
        expect(actual).toEqual(expected);
      });

      it("player1 scissor - player2 rock: player1 lose", () => {
        // Arrange
        const sut = createRockScissorPaper();
        // Act
        const actual = sut("scissor", "rock");

        // Assert
        expect(actual).toEqual(expected);
      });

      it("player1 paper - player2 scissor: player1 lose", () => {
        // Arrange
        const sut = createRockScissorPaper();

        // Act
        const actual = sut("paper", "scissor");

        // Assert
        expect(actual).toEqual(expected);
      });
    });
  });
});
