import { useRouter } from "next/router";
import React, { useState } from "react";
import LifeLineOption from "../../components/LifeLineOption";
import Question from "../../components/QuestionBox";
import Timer from "../../components/Timer";
import useTimer from "../../hooks/useTimer";
import quizMachine from "../../machines/quizMachine";
import { useMachine } from "@xstate/react";
import Score from "../../components/Score";
import questions from "../../assets/questions";
import { LifelineType } from "../../types";

// random sort function
function shuffle(a, b) {
  return Math.random() > 0.5 ? -1 : 1;
}

const QUESTION_TIME_LIMIT = 20;

const Quiz = ({ user }) => {
  const router = useRouter();

  if (!user) {
    router.push("/");
    return null;
  }

  // questions
  // random sort function

  var quizQuestions = questions.sort(shuffle);


  // use score related code

  const [score, setScore] = useState(0);

  // question related code

  const [question, setQuestion] = useState(null);

//   lifeline related code
  const [lifeline,setLifeline] = useState(null);


    //   quiz application state machine
  // contains actions that execute on certains periods of the quiz lifecycle
  const [state, send] = useMachine(quizMachine, {
    actions: {
      initalizeGame: (context, event) => {
        setScore(0);
        setQuestion(quizQuestions.splice(0,1)[0]);
        startTimer();
      },
      displayNextQuestion: (context, event) => {

        if(quizQuestions.length===0){
            const event = {
                type:'GAME_COMPLETE'
            };
            send(event);
            return ;
        }
        
        // Intentional wait
        setTimeout(()=>{
            setQuestion(quizQuestions.splice(0,1)[0]);
            resetTimer();
            startTimer();
        },1000);
      },
      useLifeline: (context, event) => {
        setLifeline(event.lifeline);
      },
      increaseScore: (context, event) => {
        setScore(score+1);
      },
      failedGame: (context, event) => {
        pauseTimer();
      },
      gameComplete: (context, event) => {
        pauseTimer();
        console.log("Game complete");
      },
      resetGame: (context, event) => {
        setScore(0);
      },
      notAnswered: (context, event) => {
        console.log("Not Answered");
      },
    },
  });


  // timer related code

  // Handle when timer completes
  const timeCompleteHandler = () => {
    const event = {
      type: "NOT_ANSWERED",
      message: "Not answered!",
    };
    send(event);
  };

  // custom hook to implement timer
  const { pauseTimer, resetTimer, startTimer, timeLeft } = useTimer(
    QUESTION_TIME_LIMIT,
    timeCompleteHandler
  );

  const isGameActive = state.matches("active")||state.matches("failed")||state.matches("complete");

  //   DOM event handlers
  const handleStartQuizBtnClick = () => {
    const event = {
      type: "START_QUIZ",
    };
    send(event);
  };

  const handleOptionClick = (selectedOption: number,correctOption: number)=>{
    if(selectedOption===correctOption){
        const event = {
            type:'NEXT_QUESTION'
        };
        send(event);
    }
    else{
        const event = {
            type:'WRONG_ANSWER'
        }
        send(event);
    }
  };

  const handleLifelineClick = (lifeline: LifelineType)=>{
      const event = {
          type:'USE_LIFELINE',
          lifeline
      };
      send(event);
  }

  if (!isGameActive) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-gray-200">
        <button
          onClick={handleStartQuizBtnClick}
          className="bg-purple-200 hover:bg-purple-400 hover:text-white cursor-pointer px-4 py-1 text-2xl"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center relative pt-20 gap-40 w-screen h-screen px-2">
      <span className="mb-6 mt-2 absolute top-0">Welcome {user.name}</span>
      <div className="flex w-full justify-around">
        <div className="flex flex-col gap-4">
          <span>Lifelines</span>
          <LifeLineOption lifelineType={LifelineType.TWO_CHANCES} handleLifelineClick={handleLifelineClick}>
            x<span className="text-lg">2</span>
          </LifeLineOption>
          <LifeLineOption lifelineType={LifelineType.FIFTY_FIFTY} handleLifelineClick={handleLifelineClick}>
            <span className="text-lg">50:50</span>
          </LifeLineOption>
        </div>
        <Timer timeLeft={timeLeft} />
        <Score userScore={score}></Score>
      </div>
      <Question question={question} handleOptionClick={handleOptionClick} lifeline={lifeline}></Question>
    </div>
  );
};

export default Quiz;
