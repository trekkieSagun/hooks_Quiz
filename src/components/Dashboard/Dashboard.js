import React from 'react'
import "./Dashboard.css"

const Dashboard = () => {
    return (
        <div>
            <h1>Select questions for your application</h1>
            <div className="question-generator">
          <form
            className="row gy-2 gx-3 align-items-center"
           
          >
            <div className="col-auto">
              <h4>Categories</h4>
              <select
                className="form-select"
                name="category"
                // onChange={this.handleChange}
              >
                <option defaultValue>Choose category...</option>
                {/* {this.props.categoryList?.map((cat, index) => {
                  return (
                    <option key={index + "xyz"} value={cat.id}>
                      {cat.name}
                    </option>
                  );
                })} */}
                <option key={Math.random()} value="option"></option>
                <option key={Math.random()} value="option"></option>
                <option key={Math.random()} value="option"></option>
              </select>
            </div>
            <div className="col-auto">
              <h4>Difficulty Level</h4>
              <select
                className="form-select"
                name="difficulty"
                // onChange={this.handleChange}
                // value={this.props.difficulty}
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
                // value={this.props.questionType}
                className="form-select"
                name="questionType"
                // onChange={this.handleChange}
              >
                <option defaultValue>Choose...</option>
                <option value="multiple">Multiple Choice Question</option>
                <option value="boolean">True/False</option>
              </select>
            </div>
            <div className="col-auto">
              <h4>No. of Questions</h4>
              <input
                // value={this.props.noOfQuestions}
                className="form-control"
                type="number"
                name="noOfQuestions"
                // onChange={this.handleChange}
              />
            </div>
            <div className="row-auto row-button">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        </div>
    )
}

export default Dashboard
