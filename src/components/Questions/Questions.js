import React, { useState, useEffect } from "react";
import "./Questions.css";
const Questions = (props) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [clickViewResult, setClickViewResult] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);

  useEffect(() => {
    setClickViewResult(false);
    setDisabledBtn(false);
  }, [props.questions]);

  const viewResult = (e) => {
    window.scrollTo(0, 0);
    let results = [...props.questions];
    let resultsLength = 0;
    let correctAnswers = 0;
    results.map((data, index) => {
      if (data.chosenAnswer !== undefined) {
        resultsLength++;
      }
    });
    if (resultsLength !== results.length) {
      alert("Answer all questions first.");
      return;
    } else {
      results.forEach((data, index) => {
        if (data.chosenAnswer === data.correct_answer) {
          correctAnswers++;
          setCorrectAnswers(correctAnswers);
        }
      });
    }

    setClickViewResult(true);
    setDisabledBtn(true);
  };

  return (
    <div className="container">
      {clickViewResult && (
        <div className="score m-3">
          <h1>Score : {correctAnswers}</h1>
        </div>
      )}

      {props.questions?.map((questionsData, qIdx) => {
        return (
          <div key={qIdx} className="question-box">
            <div className="question-heading">
              <h1>{questionsData.question}</h1>
            </div>

            <div className="answer-buttons">
              {questionsData.answers.map((ans, ansIdx) => {
                return (
                  <button
                    disabled={disabledBtn}
                    key={ansIdx}
                    onClick={() => props.handleAnswerClick(ans, qIdx, ansIdx)}
                    style={
                      clickViewResult && questionsData.correct_answer === ans
                        ? { backgroundColor: "green" }
                        : questionsData.correct_answer !==
                            questionsData.chosenAnswer &&
                          questionsData.chosenAnswer === ans &&
                          clickViewResult
                        ? { backgroundColor: "red" }
                        : questionsData.chosenAnswer === ans
                        ? { backgroundColor: "purple" }
                        : null
                    }
                  >
                    {ans}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {props.questions && (
        <div className="results-btn">
          <button onClick={viewResult}>View Result</button>
        </div>
      )}
    </div>
  );
};

export default Questions;
