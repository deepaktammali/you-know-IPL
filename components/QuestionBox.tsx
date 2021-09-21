import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LifelineType, Question } from "../types";

interface QuestionBoxProps {
  question: Question;
  handleOptionClick: (selectedOption: number, correctOption: number) => void;
  lifeline: LifelineType;
}

function QuestionBox({
  question,
  handleOptionClick,
  lifeline,
}: QuestionBoxProps) {
  const [highlight, setHighlight] = useState(null);
  const [chances, setChances] = useState(1);

  useEffect(() => {
    setHighlight(null);
    setChances(1);
  }, [question]);

  useEffect(() => {
    if (lifeline) {
      switch (lifeline) {
        case LifelineType.FIFTY_FIFTY: {
          const { options, answer } = question;
          const wrongAnswerIndex =
            (answer + [1, 2, 3][Math.floor(Math.random() * 3)]) % 4;
          question.options = options.map((option, index) => {
            if (index == answer || index == wrongAnswerIndex) {
              return option;
            }
            return "";
          });
          break;
        }
        case LifelineType.TWO_CHANCES: {
          setChances(2);
        }
      }
    }
  }, [lifeline]);

  const handleClick = (index) => {
    // already selected
    if (chances == 0) {
      return;
    }

    if ((question.answer == index && chances == 2) || chances == 1) {
      handleOptionClick(index, question.answer);
      setHighlight({
        index,
        color: index == question.answer ? "bg-green-600" : "bg-red-600",
      });
    }
    else{
      toast.error('Wrong answer',{duration:1000,position:'top-center'});
    }

    setChances(chances - 1);
  };

  return (
    <div className="flex flex-col items-start gap-3">
      <span className="self-start">{question?.question}</span>
      <div className="flex flex-wrap gap-2 justify-between w-full">
        {question.options.map((option, index) => {
          let hightlightOption = false;
          if (highlight) {
            if (highlight.index == index) {
              hightlightOption = true;
            }
          }
          return (
            <span
              key={index}
              onClick={() => {
                if (option == "") {
                  return;
                }
                handleClick(index);
              }}
              className={`lg:w-1/3 w-2/5 text-center min-h-[2rem] px-3 py-1 cursor-pointer ${
                hightlightOption
                  ? `${highlight.color} text-white`
                  : highlight || option == ""
                  ? "bg-gray-200"
                  : "hover:bg-green-600 bg-indigo-200 hover:text-white"
              }`}
            >
              {option}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default QuestionBox;
