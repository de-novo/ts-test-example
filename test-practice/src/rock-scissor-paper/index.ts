type RockScissorPaperMove = "rock" | "scissor" | "paper";
type RockscissorPaperResult = "player1 win" | "player1 lose" | "draw";

type RockScissorPaper = (
  player1: RockScissorPaperMove,
  player2: RockScissorPaperMove
) => RockscissorPaperResult;

type createRockScissorPaper = () => RockScissorPaper;

const rockScissorPaper: RockScissorPaper = (player1, player2) => {
  if (player1 === player2) return "draw";

  return "player1 win";
};

const createRockScissorPaper: createRockScissorPaper = () => {
  return rockScissorPaper;
};

export default createRockScissorPaper;
