import { createMachine } from "xstate";

const quizMachine = createMachine(
  {
    id: "quiz-machine",
    initial: "idle",
    states: {
      idle: {
        on: {
          START_QUIZ: {
            target: "active",
            actions: ["initalizeGame"],
          },
        },
      },
      active: {
        on: {
          NEXT_QUESTION: {
            target: "active",
            actions: ["displayNextQuestion", "increaseScore"],
          },
          WRONG_ANSWER: {
            target: "failed",
          },
          USE_LIFELINE: {
            target: "active",
            actions: ["useLifeline"],
          },
          NOT_ANSWERED:{
              target:"failed",
              actions:["notAnswered"]
          },
          GAME_COMPLETE:{
            target:"complete"
          }
        },
      },
      failed: {
        entry: "failedGame",
        on: {
          RESET_GAME: {
            target: "idle",
            actions: ["resetGame"],
          },
        },
      },
      complete: {
        entry: "gameComplete",
        on: {
          RESET_GAME: {
            target: "idle",
            actions: ["resetGame"],
          },
        },
      },
    },
  }
);

export default quizMachine;
