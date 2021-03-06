import React, { useEffect, useState } from "react";
import "./Dashboard.css";

import axios from "axios";
import Questions from "../Questions/Questions";

function Dashboard() {
  const [questions, setQuestions] = useState(null);
  const [categoryList, setcategoryList] = useState(null);
  const [inputValue, setInputValue] = useState({
    category: "",
    difficulty: "",
    questionType: "",
    noOfQuestions: 3,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get("https://opentdb.com/api_category.php");
    setcategoryList(res.data.trivia_categories);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const newStart = () => {
    setQuestions(null);
    setInputValue({
      ...inputValue,
      category: "",
      difficulty: "",
      questionType: "",
      noOfQuestions: 3,
    });
  };

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .get(
        `https://opentdb.com/api.php?amount=${inputValue.noOfQuestions}&category=${inputValue.category}&difficulty=${inputValue.difficulty}&type=${inputValue.questionType}&encode=base64`
      )
      .then((res) => {
        const newQuestions = res.data.results;
        newQuestions.forEach((q) => {
          q.answers = [q.correct_answer, ...q.incorrect_answers];
          q.answers = shuffle(q.answers);
        });
        setQuestions(newQuestions);
        setIsLoading(false);
      });
  };

  const handleAnswerClick = (ans, qIdx, ansIdx) => {
    let newQuestions = [...questions];
    newQuestions[qIdx].chosenAnswer = ans;
    setQuestions(newQuestions);
  };

  return (
    <div>
      <h1>Select questions for your application</h1>
      <div className="question-generator">
        <form
          className="row gy-2 gx-3 align-items-center"
          onSubmit={handleSubmit}
        >
          <div className="col-auto">
            <h4>Categories</h4>
            <select
              className="form-select"
              name="category"
              value={inputValue.category}
              onChange={handleChange}
            >
              <option defaultValue>Choose category...</option>
              {categoryList?.map((cat, index) => {
                return (
                  <option key={index} value={cat.id}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-auto">
            <h4>Difficulty Level</h4>
            <select
              className="form-select"
              name="difficulty"
              value={inputValue.difficulty}
              onChange={handleChange}
            >
              <option defaultValue>Choose...</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="col-auto">
            <h4>Questions Type</h4>
            <select
              className="form-select"
              value={inputValue.questionType}
              name="questionType"
              onChange={handleChange}
            >
              <option defaultValue>Choose...</option>
              <option value="multiple">Multiple Choice Question</option>
              <option value="boolean">True/False</option>
            </select>
          </div>
          <div className="col-auto">
            <h4>No. of Questions</h4>
            <input
              value={inputValue.noOfQuestions}
              className="form-control"
              type="number"
              name="noOfQuestions"
              onChange={handleChange}
            />
          </div>
          <div className="row-auto row-button">
            {!questions?.length > 0 && (
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
      {questions?.length > 0 ? (
        <div>
          <div className="btn-reload">
            <button onClick={newStart}>Start new game</button>
          </div>
        </div>
      ) : null}
      <Questions
        questions={questions}
        handleAnswerClick={handleAnswerClick}
        isLoading={isLoading}
      />
    </div>
  );
}

export default Dashboard;
