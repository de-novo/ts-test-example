type RockScissorPaperMove = "rock" | "scissor" | "paper";
type RockscissorPaperResult = "player1 win" | "player1 lose" | "draw";

type RockScissorPaper = (
  player1: RockScissorPaperMove,
  player2: RockScissorPaperMove
) => RockscissorPaperResult;

type createRockScissorPaper = () => RockScissorPaper;

const rockScissorPaper: RockScissorPaper = (player1, player2) => {
  if (player1 === player2) return "draw";
  if (player1 === "rock" && player2 === "scissor") return "player1 win";
  if (player1 === "scissor" && player2 === "paper") return "player1 win";
  if (player1 === "paper" && player2 === "rock") return "player1 win";

  return "player1 lose";
};

const createRockScissorPaper: createRockScissorPaper = () => {
  return rockScissorPaper;
};

export default createRockScissorPaper;
