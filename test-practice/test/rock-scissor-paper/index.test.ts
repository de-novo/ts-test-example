import createRockScissorPaper, {
  RockScissorPaperMove,
} from "@src/rock-scissor-paper";

describe("rock-scissor-paper", () => {
  let rockSissorPaperGame: ReturnType<typeof createRockScissorPaper>;
  let player1: RockScissorPaperMove | null;
  let player2: RockScissorPaperMove | null;
  //Arrange
  beforeEach(() => {
    rockSissorPaperGame = createRockScissorPaper();
  });

  // Teardown
  afterEach(() => {
    player1 = null;
    player2 = null;
  });

  describe("play", () => {
    describe("output: draw", () => {
      const expected = "draw";
      it("player1 rock - player2 rock: draw", () => {
        // Arrange
        player1 = "rock";
        player2 = "rock";

        // Act
        const actual = rockSissorPaperGame(player1, player2);

        // Assert
        expect(actual).toEqual(expected);
      });

      it("player1 scissor - player2 scissor: draw", () => {
        // Arrange
        player1 = "scissor";
        player2 = "scissor";

        // Act
        const actual = rockSissorPaperGame(player1, player2);

        // Assert
        expect(actual).toEqual(expected);
      });

      it("player1 paper - player2 paper: draw", () => {
        // Arrange
        player1 = "paper";
        player2 = "paper";

        // Act
        const actual = rockSissorPaperGame(player1, player2);

        // Assert
        expect(actual).toEqual(expected);
      });
    });

    describe("output: player1 win", () => {
      const expected = "player1 win";

      it("player1 rock - player2 scissor: player1 win", () => {
        // Arrange
        player1 = "rock";
        player2 = "scissor";

        // Act
        const actual = rockSissorPaperGame(player1, player2);

        // Assert
        expect(actual).toEqual(expected);
      });

      it("player1 scissor - player2 paper: player1 win", () => {
        // Arrange
        player1 = "scissor";
        player2 = "paper";

        // Act
        const actual = rockSissorPaperGame(player1, player2);

        // Assert
        expect(actual).toEqual(expected);
      });

      it("player1 paper - player2 rock: player1 win", () => {
        // Arrange
        player1 = "paper";
        player2 = "rock";

        // Act
        const actual = rockSissorPaperGame(player1, player2);

        // Assert
        expect(actual).toEqual(expected);
      });
    });

    describe("output: player1 lose", () => {
      const expected = "player1 lose";
      it("player1 rock - player2 paper: player1 lose", () => {
        // Arrange
        player1 = "rock";
        player2 = "paper";

        // Act
        const actual = rockSissorPaperGame(player1, player2);

        // Assert
        expect(actual).toEqual(expected);
      });

      it("player1 scissor - player2 rock: player1 lose", () => {
        // Arrange
        player1 = "scissor";
        player2 = "rock";

        // Act
        const actual = rockSissorPaperGame(player1, player2);

        // Assert
        expect(actual).toEqual(expected);
      });

      it("player1 paper - player2 scissor: player1 lose", () => {
        // Arrange
        player1 = "paper";
        player2 = "scissor";

        // Act
        const actual = rockSissorPaperGame(player1, player2);

        // Assert
        expect(actual).toEqual(expected);
      });
    });
  });
});
